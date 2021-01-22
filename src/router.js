import { createRouter, createWebHashHistory,createWebHistory } from 'vue-router'
const routes = [
  {
    path: '/',
    redirect: '/store'
  },
  {
    path: '/ebook',
    component: () => import('./views/ebook.vue'),
    children: [
      {
        path: ':fileName',
        component: () => import('./components/ebook/EbookReader.vue')
      }
    ]
  },
  {
    path: '/store',
    component:()=>import("@/views/store/store"),
    redirect: '/store/shelf',
    children:[
      {
        path: 'home',
        component: ()=>import('@/views/store/storeHome')
      },
      {
        path: 'detail',
        component: ()=>import('@/views/store/storeDetail')
      },
      {
        path: 'shelf',
        component: ()=>import('@/views/store/storeShelf')
      },
      {
        path: 'category',
        component: ()=>import('@/views/store/storeCate')
      }
    ]
  }
]

const router = createRouter({
  // history: createWebHashHistory(),
  history: createWebHistory(),
  routes
})


export default router
