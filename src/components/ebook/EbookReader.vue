<template>
  <!-- http://localhost:8080/#/ebook/story|pride-and-prejudice -->
  <div class="ebook-reader">
    <div id="area"></div>
    <div
      class="ebook-mask"
      @click="onMaskClick"
      @touchmove="move"
      @touchend="moveEnd"
      @mousedown.left="onMouseEnter"
      @mousemove.left="onMouseMove"
      @mouseup.left="onMouseUp"
    ></div>
  </div>
</template>

<script>
import ePub from "epubjs";
import {getLocalForage} from '@/utils/localForage'
import {
  getFontFamily,
  saveFontFamily,
  getFontSize,
  saveFontSize,
  getTheme,
  saveTheme,
  getLocation,
} from "@/utils/localStorage";
import { flatten } from "@/utils/book.js";
import { themeList, addCss } from "@/utils/book";
export default {
  data() {
    return {
      rendtion: null,
      offsetX: -1,
      timestamp: -1,
      firstOffsetY: null,
      mouseState: null,
      mouseStartTime: null,
      URL: null,
    };
  },
  methods: {
    // 1- 鼠标进入
    // 2- 鼠标进入后的移动
    // 3- 鼠标从移动状态松手
    // 4- 鼠标还原
    onMouseEnter(e) {
      this.mouseState = 1;
      this.mouseStartTime = e.timeStamp;
      e.preventDefault();
      e.stopPropagation();
    },
    onMouseMove(e) {
      if (this.mouseState === 1) {
        this.mouseState = 2;
      } else if (this.mouseState === 2) {
        let offsetY = 0;
        if (this.firstOffsetY) {
          offsetY = e.clientY - this.firstOffsetY;
          this.SET_OFFSETY(offsetY);
        } else {
          this.firstOffsetY = e.clientY;
        }
      }
      e.preventDefault();
      e.stopPropagation();
    },
    onMouseUp(e) {
      if (this.mouseState === 2) {
        this.SET_OFFSETY(0);
        this.firstOffsetY = null;
        this.mouseState = 3;
        // console.log("change the m:", this.mouseState);
      } else {
        this.mouseState = 4;
        // console.log("change the mx:", this.mouseState);
      }
      const time = e.timeStamp - this.mouseStartTime;
      if (time < 100) {
        this.mouseState = 4;
      }
      e.preventDefault();
      e.stopPropagation();
    },

    move(e) {
      let bookmarkHeight = parseInt(this.htmlFontSize) * 6;
      let y = 0;
      if (this.firstOffsetY) {
        y = e.changedTouches[0].clientY - this.firstOffsetY;
        y >= bookmarkHeight ? (y = bookmarkHeight) : null;
        this.SET_OFFSETY(y);
      } else {
        this.firstOffsetY = e.changedTouches[0].clientY;
      }
      e.preventDefault();
      e.stopPropagation();
    },
    moveEnd(e) {
      this.SET_OFFSETY(0);
      this.firstOffsetY = null;
    },
    onMaskClick(e) {
      if (this.mouseState && (this.mouseState === 2 || this.mouseState === 3)) {
        return;
      }
      let offsetX = e.offsetX;
      let width = window.innerWidth;
      if (offsetX > 0 && offsetX < 0.3 * width) {
        this.prePage();
      } else if (offsetX > 0 && offsetX > 0.7 * width) {
        this.nextPage();
      } else {
        this.toggleMenuAndTitle();
      }
      // console.log(e);
      e.preventDefault();
      e.stopPropagation();
    },
    // 根据路由参数，获取文件链接
    getFileUrl() {
      const fileName = this.$route.params.fileName.split("|")[1];
      const fileUrl = this.$route.params.fileName.split("|").join("/");
      const Url = `${process.env.VUE_APP_BASE_URL}/${fileUrl}.epub`

      // 如果本地有缓存，则用本地indexDB中的数据
      // 如果本地没有缓存，则在线阅读
      const data = getLocalForage(fileName, (err, blob) => {
        if (!err && blob) {
          this.URL =  blob
        } else {
          this.SET_FILENAME(Url);
          this.URL =  Url;
        }
        this.initEpub(this.URL);
      });
    },
    toggleMenuAndTitle() {
      this.TOGGLE_TITLEANDMENUVISIABLE();
    },
    prePage() {
      this.rendtion.prev();
      this.TOGGLE_TITLEANDMENUVISIABLE(true);
      this.refreshLocation();
    },
    nextPage() {
      this.rendtion.next();
      this.TOGGLE_TITLEANDMENUVISIABLE(true);
      this.refreshLocation();
    },

    // 初始化localStorage
    initLocalStorage() {
      // 从localStorage中获取初始化设置
      this.rendtion.hooks.content.register((contents) => {
        Promise.all([
          contents.addStylesheet(
            `${process.env.VUE_APP_RES_URL}/fonts/daysOne.css`
          ),
          contents.addStylesheet(
            `${process.env.VUE_APP_RES_URL}/fonts/cabin.css`
          ),
          contents.addStylesheet(
            `${process.env.VUE_APP_RES_URL}/fonts/montserrat.css`
          ),
          contents.addStylesheet(
            `${process.env.VUE_APP_RES_URL}/fonts/tangerine.css`
          ),
        ]).then((_) => {});
      });

      const location = getLocation(this.fileName);
      this.displays(location, () => {
        let font = getFontFamily(this.fileName);
        let size = getFontSize(this.fileName);
        let theme = getTheme(this.fileName);

        this.themeList.forEach((theme) => {
          this.book.rendition.themes.register(theme.name, theme.style);
        }); // 注册主题
        // 初始化 字体、 字号 、主题
        font
          ? (this.book.rendition.themes.font(font),
            this.SET_DEFAULTFONTFAMILY(font))
          : saveFontFamily(this.fileName, this.defaultFontFamily);
        size
          ? (this.book.rendition.themes.fontSize(size),
            this.SET_DEFAULTFONTSIZE(size))
          : saveFontSize(this.fileName, this.defaultFontSize);
        theme
          ? (this.book.rendition.themes.select(theme),
            this.SET_DEFAULTTHEME(theme))
          : saveTheme(this.fileName, this.defaultTheme);
        this.initGlobalCss();
        this.refreshLocation();
      });

      this.SET_BOOKAVAIABLE(true);
    },
    // 初始化分页
    initPages() {
      this.book.ready.then(() => {
        return this.book.locations
          .generate(
            750 * (window.innerWidth / 375) * (getFontSize(this.fileName) / 16)
          )
          .then((locations) => {
            this.refreshLocation();
            this.SET_BOOKAVAIABLE(true);
          });
      });
    },
    parseBook() {
      this.book.loaded.cover.then((cover) => {
        // 获取封面
        this.book.archive.createUrl(cover).then((url) => {
          this.SET_COVER(url);
          // console.log('Cover: ',url);
        });
        // 获取元数据信息
        this.book.loaded.metadata.then((metadata) => {
          this.SET_METADATA(metadata);
          // console.log('Metadata:',metadata);
        });
        // 获取书籍目录信息
        this.book.loaded.navigation.then((nav) => {
          // 多维数组扁平化
          const navItem = flatten(nav.toc);

          // 添加目录层级属性
          function find(item, level = 0) {
            return !item.parent
              ? level
              : find(
                  navItem.filter(
                    (parentItem) => parentItem.id === item.parent
                  )[0],
                  ++level
                );
          }

          navItem.forEach((item) => {
            item.level = find(item);
          });
          this.SET_NAVIGATION(navItem);
          // console.log('Inavgations:',this.navItems)
        });
      });
    },
    initEpub(url) {
      // 将电子书渲染到页面上
      // var ebook = ePub(this.fileName);
      var ebook = ePub(url);
      this.SET_BOOK(ebook);
      this.rendtion = this.book.renderTo("area", {
        width: window.innerWidth,
        height: window.innerHeight,
        method: "default", // 支持微信
        // flow: 'scrolled' // 滚动模式
      });
      this.initLocalStorage();
      this.parseBook();
      this.initPages();
    },
  },
  mounted() {
    this.getFileUrl();
  },
};
</script>
<style lang='scss' scoped>
.ebook-reader {
  width: 100%;
  height: 100%;
  position: relative;
  #area {
    z-index: 0;
  }
  .ebook-mask {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    background: transparent;
  }
}
</style>

