import Vue from 'vue'
import Router from 'vue-router'

import page404 from '@/views/page-404.vue'

import Contacts from '@/components/contacts/Contacts'
import ContactManage from '@/components/contacts/ContactManage'
import ContactDetails from '@/components/contacts/ContactDetails'

Vue.use(Router)

let routes = [
  { path: '/', component: Contacts },
  {
    path: '/contacts',
    name: 'Contacts',
    component: Contacts
  },
  {
    path: '/contact/create',
    name: 'ContactCreate',
    component: ContactManage
  },
  {
    path: '/contact/:id',
    name: 'ContactDetails',
    component: ContactDetails
  },
  {
    path: '/contact/:id/settings',
    name: 'ContactManage',
    component: ContactManage
  },
  { path: '/404', component: page404 },
  { path: '/404/:type', component: page404 }
]

// push as last element because the wildcard match will catch all the unknown urls
routes.push({ path: '*', component: page404 })

const routerOptions = {
  mode: 'history',
  linkActiveClass: 'is-active',
  base: __dirname,
  scrollBehavior: (to, from, savedPosition) => {
    if (to.hash) {
      return {
        selector: to.hash
      }
    } else {
      return {
        y: 0
      }
    }
  },
  routes
}

const router = new Router(routerOptions)

export function createRouter() {
  return router
}
