import { saveSection } from "@/utils/localStorage";

export default {
    state: {
        book: null,
        baseUrl: 'http://localhost:3000/',
        fileName: '', // 当前浏览的电子书的URL
        cover: null, // 文章封面
        author: null, // 书籍作者
        bookAvailable: false,
        ifTitleAndMenuVisiable: false,
        ifSettingVisible: -1, // -1: 不显示，0: 目录，1: 进度，2: 主题 3: 字号
        ifSettingFontFamilyVisible: false, // 字体设置栏
        defaultFontSize: '16px',
        defaultFontFamily: 'Default',
        defaultTheme: 'Default',
        progress: 0,
        section: 0,
        metadata: null,
        navItems: null, // 目录信息
        tabHeight: 0, // 目录菜单栏高度
        offsetY: 0, // 下拉的偏移量
        htmlFontSize: '10px',
        ifBookmark: false,
        ifReload: true,

    },
    mutations: {
        SET_FILENAME(state, options) {state.fileName = options},
        TOGGLE_TITLEANDMENUVISIABLE(state, options) {
            // 用户点击展开或收起菜单栏和标题栏，同时收起设置栏
            if (options) {
                state.ifTitleAndMenuVisiable = false;
            } else {
                state.ifTitleAndMenuVisiable = !state.ifTitleAndMenuVisiable
            }
            state.ifSettingVisible = -1
        },
        SET_SETTINGVISIBLE(state, options) {
            // 如果两次点击相同，则将设置栏置为-1，这样可以避免点击设置无法关闭的现象
            if (state.ifSettingVisible === options) {
                state.ifSettingVisible = -1
            } else {
                state.ifSettingVisible = options
            }
        },
        SET_DEFAULTFONTSIZE(state, options) {/* 设置默认字体大小 */ state.defaultFontSize = options},
        SET_BOOK(state, options) {state.book = options;},
        SET_DEFAULTFONTFAMILY(state, options) {state.defaultFontFamily = options;},
        SET_IFSETTINGFONTVISIBLE(state, options) {state.ifSettingFontFamilyVisible = options},
        SET_DEFAULTTHEME(state, options) {state.defaultTheme = options},
        SET_BOOKAVAIABLE(state,  options) {state.bookAvailable = options},
        SET_PROGRESS(state, options) {state.progress = options},
        SET_SECTION(state, options) { state.section = options;saveSection(state.fileName,options)},
        SET_COVER(state,options){state.cover = options},
        SET_AUTHOR(state,options){state.author = options},
        SET_METADATA(state,options){state.metadata = options},
        SET_NAVIGATION(state,options){ state.navItems = options},
        SET_TABHEIGHT(state,options){state.tabHeight = options},
        SET_OFFSETY(state,options){state.offsetY = options},
        SET_HTMLFONTSIZE(state,options){state.htmlFontSize = options},
        SET_IFBOOKMARK(state,options){state.ifBookmark = options},
        SET_IFRELOAD(state,options){state.ifReload = options},
    },
    actions: {},
    getters: {

    },
}