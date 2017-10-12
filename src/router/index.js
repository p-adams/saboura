import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import About from '@/components/about'
import WhiteboardSandbox from '@/components/whiteboard-sandbox'
import DashboardPage from '@/components/dashboard-page'
import WhiteboardApp from '@/components/whiteboard-app'
import UserAccount from '@/components/user-account'
import UserAdmin from '@/components/user-admin'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/user-account',
      name: 'Account',
      component: UserAccount
    },
    {
      path: '/user-admin',
      name: 'Admin',
      component: UserAdmin
    },
    {
      path: '/whiteboard-sandbox',
      name: 'WhiteboardSandbox',
      component: WhiteboardSandbox
    },
    {
      path: '/dashboard-page',
      name: 'DashboardPage',
      component: DashboardPage
    },
    {
      path: '/whiteboard-app',
      name: 'WhiteboardApp',
      component: WhiteboardApp
    }
  ]
})
