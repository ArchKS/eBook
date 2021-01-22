
export default {
    state: {
        flapCardVisible: false, // 卡片翻转动画
        isEditMode: false, // 是否进入编辑模式
        shelfList: [], // 书架图书列表
        shelfSelected: [], // 书架图书选中列表
        shelfTitleVisible: true, // 书架标题的显示状态
        ifTickVisible: false, // 打勾动画
        shelfBkIndex: -1, // 书架中选中的书籍的下标
        dragTargetIndex: -1, // 拖拽下标
        dragSourceIndex: -1, // 
        testList: [],
        categoryData: -1, // 分类数据 
        ifCategoryVisible: false, // 是否展示分类详情
        ifCategoryTitleEdit: false, // 是否编辑分组标题
        homeOffSetY: -1, // 书城首页滚动条偏移量
        ifClickNotRealize: false, // 点击未实现的功能
        textNotRealize: '该功能暂时未实现' 
    },
    mutations: {
        SET_FLAP_CARD_VISIBLE(state, options) { state.flapCardVisible = options },
        SET_EDIT_MODE(state, options) {
            if (typeof options !== 'undefined') {
                state.isEditMode = options;
            } else {
                state.isEditMode = !state.isEditMode;
            }
        },
        SET_SHELF_LIST(state, options) {state.shelfList = options},
        SET_SHELF_SELECTED(state,options){state.shelfSelected = options},
        setIfTickVisible(state,options){state.ifTickVisible = options},
        setShelfBkIndex(state,options){state.shelfBkIndex = options},
        setDragSourceIndex(state,options){state.dragSourceIndex = options},
        setDragTargetIndex(state,options){state.dragTargetIndex = options},
        setTestList(state,options){state.testList = options},
        setCategoryData(state,options){state.categoryData= options},
        setIfCategoryVisible(state,options){state.ifCategoryVisible= options},
        setIfCategoryTitleEdit(state,options){state.ifCategoryTitleEdit= options},
        setHomeOffSetY(state,options){state.homeOffSetY= options},
        setIfClickNotRealize(state,options){state.ifClickNotRealize= options},

    },
    actions: {},
    getters: {

    },
}