import { mapMutations, mapGetters } from 'vuex'
import { addCss } from './book'
import { themeList } from "@/utils/book.js";
import { saveLocation, getReadTime, getBookmark, saveReadProgress } from '@/utils/localStorage.js'

export default {
  computed: {
    ...mapGetters([
      'baseUrl',
      'fileName',
      'ifTitleAndMenuVisiable',
      'ifSettingVisible',
      'defaultFontSize',
      'defaultFontFamily',
      'book',
      'ifSettingFontFamilyVisible',
      "defaultTheme",
      "bookAvailable",
      'progress',
      'section',
      'cover',
      'author',
      'metadata',
      'navItems',
      'offsetY',
      'htmlFontSize',
      'ifBookmark',
      'ifReload'
    ]),
    themeList() {
      return themeList()
    },
    getSectionName() {
      return this.section ? this.navItems[this.section].label : '';
    },


  },
  methods: {
    ...mapMutations([
      'SET_FILENAME',
      'TOGGLE_TITLEANDMENUVISIABLE',
      "SET_SETTINGVISIBLE",
      "SET_DEFAULTFONTSIZE",
      "SET_BOOK",
      "SET_IFSETTINGFONTVISIBLE",
      "SET_DEFAULTFONTFAMILY",
      "SET_DEFAULTTHEME",
      "SET_BOOKAVAIABLE",
      "SET_PROGRESS",
      "SET_SECTION",
      "SET_COVER",
      "SET_HTMLFONTSIZE",
      "SET_AUTHOR",
      'SET_METADATA',
      "SET_IFBOOKMARK",
      "SET_NAVIGATION",
      "SET_OFFSETY",
      "SET_IFRELOAD"
    ]),
    initGlobalCss() {
      let cssURL = `${process.env.VUE_APP_RES_URL}/theme/theme_default.css`
      switch (this.defaultTheme) {
        case 'Default':
          cssURL = `${process.env.VUE_APP_RES_URL}/theme/theme_default.css`;
          break;
        case 'Eye':
          cssURL = `${process.env.VUE_APP_RES_URL}/theme/theme_eye.css`;
          break;
        case 'Gold':
          cssURL = `${process.env.VUE_APP_RES_URL}/theme/theme_gold.css`;
          break;
        case 'Night':
          cssURL = `${process.env.VUE_APP_RES_URL}/theme/theme_night.css`;
          break;
        default:
          cssURL = `${process.env.VUE_APP_RES_URL}/theme/theme_default.css`;
      }
      addCss(cssURL);
    },

    // 刷新 section章节 progress阅读进度、location位置、书签bookmark
    refreshLocation() {
      // 获取当前位置
      const currentLocation = this.book.rendition.currentLocation()
      if (currentLocation && currentLocation.start) {
        // 设置章节 
        this.SET_SECTION(currentLocation.start.index);

        // 获取阅读进度 并 保存
        const startCfi = currentLocation.start.cfi;
        const progress = this.book.locations.percentageFromCfi(startCfi);
        saveReadProgress(progress);
        this.SET_PROGRESS(Math.floor(progress * 100));
        saveLocation(this.fileName, startCfi);

        // 是否显示书签
        const bokmks = getBookmark(this.fileName);
        if (bokmks) {
          let isbookmark = bokmks.some(item => item.cfi === startCfi);
          // console.log('isbookmark: ',isbookmark);
          isbookmark ? this.SET_IFBOOKMARK(true) : this.SET_IFBOOKMARK(false);
        }
      }

    },
    displays(target, callback) {
      if (target) {
        this.book.rendition.display(target).then(() => {
          this.refreshLocation();
          if (callback) callback();
        })
      } else {
        this.book.rendition.display().then(() => {
          this.refreshLocation();
          if (callback) callback();
        })
      }

    },
    getTimeByMinites() {
      let readTime = getReadTime(this.fileName);
      if (!readTime) {
        return 0;
      } else {
        return Math.ceil(readTime / 60);
      }
    },
    getHTMLFontSize() {
      var html = document.querySelector("html");
      this.SET_HTMLFONTSIZE(html.style.fontSize);
      console.log("html-font-size: ", this.htmlFontSize);
    },
    fname(fileName) {
      return fileName
        .replace(/.*_/g, "")
        .replace(/([A-Z])/g, " $1")
        .trim();
    },
    categoryToChinese(categoryNum) {
      if (!categoryNum) return;
      switch (categoryNum) {
        case 1:
          return "计算机科学";
        case 2:
          return "社会科学";
        case 3:
          return "经济学";
        case 4:
          return "教育学";
        case 5:
          return "基础工程";
        case 6:
          return "环境学";
        case 7:
          return "地质学";
        case 8:
          return "历史学";
        case 9:
          return "法律";
        case 10:
          return "生活科学";
        case 11:
          return "文学";
        case 12:
          return "生物医学";
        case 13:
          return "业务";
        case 14:
          return "地球科学";
        case 15:
          return "材料科学";
        case 16:
          return "数学";
        case 17:
          return "公共卫生";
        case 18:
          return "哲学";
        case 19:
          return "物理";
        case 20:
          return "国际政治";
        case 21:
          return "心理学";
        case 22:
          return "统计";
      }
    },
  }
}



