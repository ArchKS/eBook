import { createApp } from 'vue'
import App from './App.vue'
import router from './router.js'
import store from './store/index'
import ebookMixin from './utils/ebookMixin'
import storeMixin from './utils/storeMixin'
// import './mock'
// 引入全局文件 Web字体图标、重置浏览器基础样式、全局样式
import './assets/styles/icon.css'
import './assets/styles/reset.scss'
import './assets/styles/global.scss'


let app = createApp(App)
app.use(store).use(router)
app.mixin(ebookMixin)
app.mixin(storeMixin)
app.mount('#app')


// EbookReader: 
// http://localhost:8080/#/ebook/Education|2014_Book_PreparingForLifeInADigitalAge
// http://localhost:8080/#/ebook/Literature|2010_Book_CyborgsInLatinAmerica