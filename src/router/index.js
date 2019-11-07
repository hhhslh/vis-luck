import Vue from 'vue'
import Router from 'vue-router'
import page01 from '@/components/page01'
// import page02 from '@/components/page02'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'page01',
      component: page01
    },
    // {
    //     path: '/',
    //     name: 'page02',
    //     component: page02
    // }
  ]
})
