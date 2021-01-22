import { createStore } from 'vuex'
import ebook from './ebook.js'
import store from './store.js'

export default createStore({
    state: {},
    mutations: {

    },
    actions: {},
    getters: {
        book: state => state.ebook.book,
        baseUrl: state => state.ebook.baseUrl,
        fileName: state => state.ebook.fileName,
        author: state => state.ebook.author,
        ifTitleAndMenuVisiable: state => state.ebook.ifTitleAndMenuVisiable,
        ifSettingVisible: state => state.ebook.ifSettingVisible,
        defaultFontSize: state => state.ebook.defaultFontSize,
        defaultFontFamily: state => state.ebook.defaultFontFamily,
        ifSettingFontFamilyVisible: state => state.ebook.ifSettingFontFamilyVisible,
        defaultTheme: state => state.ebook.defaultTheme,
        bookAvailable: state => state.ebook.bookAvailable,
        progress: state => state.ebook.progress,
        cover: state => state.ebook.cover,
        navItems: state => state.ebook.navItems,
        metadata: state => state.ebook.metadata,
        tabHeight: state => state.ebook.tabHeight,
        section: state => state.ebook.section,
        offsetY: state => state.ebook.offsetY,
        htmlFontSize: state => state.ebook.htmlFontSize,
        ifBookmark: state => state.ebook.ifBookmark,
        bookmarks: state => state.ebook.bookmarks,
        ifReload: state => state.ebook.ifReload,
        flapCardVisible: state => state.store.flapCardVisible,
        isEditMode: state => state.store.isEditMode,
        shelfList: state => state.store.shelfList,
        shelfSelected: state => state.store.shelfSelected,
        shelfTitleVisible: state => state.store.shelfTitleVisible,
        ifTickVisible: state => state.store.ifTickVisible,
        shelfBkIndex: state => state.store.shelfBkIndex,
        dragTargetIndex: state => state.store.dragTargetIndex,
        dragSourceIndex: state => state.store.dragSourceIndex,
        testList: state => state.store.testList,
        categoryData: state => state.store.categoryData,
        ifCategoryVisible: state => state.store.ifCategoryVisible,
        ifCategoryTitleEdit: state => state.store.ifCategoryTitleEdit,
        homeOffSetY: state => state.store.homeOffSetY,
        ifClickNotRealize: state => state.store.ifClickNotRealize,
        textNotRealize: state => state.store.textNotRealize,

    },


    modules: {
        ebook: ebook,
        store: store,
    },
})