import { mapGetters, mapMutations } from 'vuex'
import { saveBookShelfList, getBookShelfList } from '@/utils/localStorage'

export default {
    computed: {
        ...mapGetters([
            "flapCardVisible",
            'isEditMode',
            'shelfList',
            'shelfSelected',
            'shelfTitleVisible',
            'ifTickVisible',
            'shelfBkIndex',
            'dragSourceIndex',
            'dragTargetIndex',
            'testList',
            'ifCategoryVisible',
            'categoryData',
            'ifCategoryTitleEdit',
            'homeOffSetY',
            'ifClickNotRealize'
        ]),
        Height() {
            let WidthValue = (window.innerWidth / 3 - parseFloat(this.htmlFontSize) * 2) * 7 / 5
            return WidthValue + 'px'
        },
    },
    methods: {
        ...mapMutations([
            "SET_FLAP_CARD_VISIBLE",
            "SET_EDIT_MODE",
            "SET_SHELF_LIST",
            "SET_SHELF_SELECTED",
            'setIfTickVisible',
            'setShelfBkIndex',
            'setDragSourceIndex',
            'setDragTargetIndex',
            "setTestList",
            'setIfCategoryVisible',
            'setCategoryData',
            'setIfCategoryTitleEdit',
            'setHomeOffSetY',
            'setIfClickNotRealize'
        ]),
        // 跳转到指定图书的详情页
        showBookDetail(fileName, categoryText) {
            console.log(`跳转到指定图书的详情页：${fileName}`);
            this.$router.push({
                path: `/store/detail`,
                query: {
                    filename: fileName,
                    category: categoryText
                }
            })
        },
        // 跳转到指定图书渲染
        showEbook(fileName, categoryText) {
            console.log(`跳转到指定图书的渲染：${fileName}`);
            this.$router.push({
                path: `/ebook/${categoryText}|${fileName}`,
            });
        },
        lang(language) {
            if (!language) return;
            switch (language) {
                case 'en': return '英语';
                case 'zh': return '中文';
                default: return '中文'
            }
        },
        back() {
            this.$router.go(-1);
        },
        addToBookShelf(book) {
            // 将书籍添加入vuex
            // 将vuex写入到localStorage
            let newList = this.shelfList;
            newList.push(book)
            this.SET_SHELF_LIST(newList);
            saveBookShelfList(this.shelfList);
        },

        refreshBookShelf() {
            /* 将localStorage中的数据写入到vuex */
            let book = getBookShelfList();
            this.SET_SHELF_LIST(book);
        },
        refreshLocalStorage(booklist) {
            /* 将VueX和LocalStorage的所有数据全部重新注入 */
            this.SET_SHELF_LIST(booklist);
            saveBookShelfList(booklist);
        },

        removeFromBookShelf(title) {
            // 将书籍从vuex中删除
            let books = this.shelfList.filter(item => item.title !== title);
            this.SET_SHELF_LIST(books);
            // 将vuex中的内容重新写入到localStorage中
            saveBookShelfList(books);
        },

        // 清除书架上的所有图书
        clearBookShelf() {
            console.log('执行了clearBookShelf方法，将itemlist push 了 id -1');
            this.SET_SHELF_LIST([
                {
                    id: "-1",
                    type: "3",
                    content: null
                }
            ]);
            saveBookShelfList(this.shelfList);
        },
        // 判断当前书架上的 +  是否存在，如果不存在，则添加
        ifAddIsExit(shelflist = [], ifUseLocalStorage = false) {
            let jude;
            if (ifUseLocalStorage) {
                shelflist = getBookShelfList();
                jude = !shelflist.some(i => {
                    return i.content === null && i.type == 3 && i.id == -1
                })
            } else {
                jude = !shelflist.some(i => {
                    return i.content === null && i.type == 3 && i.id == -1
                })
            }
            if (jude) {
                shelflist.push({ id: "-1", type: "3", content: null });
            }

            // 同步到VUEX
            this.SET_SHELF_LIST(shelflist);
            saveBookShelfList(shelflist);
            return shelflist
        },
    }
}