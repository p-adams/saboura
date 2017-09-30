import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import About from '@/components/about'
import AccountInformation from '@/components/account-information'
import AccountActivity from '@/components/account-activity'
import WhiteboardSandbox from '@/components/whiteboard-sandbox'
import DashboardPage from '@/components/dashboard-page'
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
      path: 'account-information',
      name: 'AccountInformation',
      component: AccountInformation
    },
    {
      path: 'account-activity', 
      name: 'AccountActivity', 
      component: AccountActivity
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
    }
  ]
})
