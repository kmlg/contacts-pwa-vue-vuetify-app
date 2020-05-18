import Vue from 'vue'
import Vuex from 'vuex'
import logService from '../services/log.service'
import Config from '../../config'

import notification from './notification'
import contacts from './contacts'

Vue.use(Vuex)

export function createStore() {
  return new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',

    modules: {
      notification,
      contacts
    },

    state: () => {
      return {
        isLoading: true,
        lists: {
          contacts: []
        },
        flags: Config.flags
      }
    },
    mutations: {
      FETCH_UP_SUCCESS(state, payload) {
        state.isLoading = false
      },
      FETCH_ALL_CONTACTS_SUCCESS (state, contacts) {
        state.lists.contacts = contacts
        logService.log('Fetch all contacts success!')
      },
      CLEAR_LISTS (state) {
        // set each list to an empty array
        Object.keys(state.lists).forEach(list => {
          state.lists[list] = []
        })
      },
      SET_LOADING (state, value) {
        state.isLoading = value
      }
    },
    actions: {
      disableLoading ({ state, commit }) {
        // lets do in some time ok ?
        setTimeout(() => {
          commit('SET_LOADING', false)
        }, 0)
      }
    }
  })
}
