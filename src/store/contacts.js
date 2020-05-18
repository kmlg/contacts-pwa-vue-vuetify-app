import dataService from '../services/app.service'
import logService from '../services/log.service'

const state = () => {
  return {
    contact: {},
    list: []
  }
}

const mutations = {

  LIST_CONTACTS_REQUEST (state) {
    logService.log('List contacts')
  },
  LIST_CONTACTS_SUCCESS (state, data) {
    // we also have data.items and data.pages
    state.list = data.data
  },
  LIST_CONTACTS_FAILURE (state, error) {
    logService.log(error)
  },

  FETCH_CONTACT_REQUEST (state) {
    logService.log('Fetch contact details')
  },
  FETCH_CONTACT_SUCCESS (state, data) {
    state.contact = data
  },
  FETCH_CONTACT_FAILURE (state, error) {
    logService.log(error)
  },

  CREATE_CONTACT_REQUEST (state) {
    logService.log('Creating contact')
  },
  CREATE_CONTACT_SUCCESS (state, data) {
    logService.log('Created contact', data.name)
    state.contact = data
    state.list.push(data)
  },
  CREATE_CONTACT_FAILURE (state, error) {
    logService.log(error)
  },
  
  UPDATE_CONTACT_REQUEST (state) {
    logService.log('Updating contact')
  },
  UPDATE_CONTACT_SUCCESS (state, data) {
    logService.log('Updated contact')
    state.contact = data
  },
  UPDATE_CONTACT_FAILURE (state, error) {
    logService.log(error)
  },
  
  DELETE_CONTACT_REQUEST (state) {
    logService.log('Deleting contact')
  },
  DELETE_CONTACT_SUCCESS (state, data) {
    logService.log('Deleted contact')
    state.contact = {}
  },
  DELETE_CONTACT_FAILURE (state, error) {
    logService.log(error)
  }
}

const actions = {
  createContact ({ commit }, payload) {
    commit('CREATE_CONTACT_REQUEST')
    return dataService.post('/contacts', payload).then((response) => {
      commit('CREATE_CONTACT_SUCCESS', response.data)
      commit('NOTIFICATION_SUCCESS', { message: 'Contact created' }, { root: true })
    }).catch((error) => {
      commit('CREATE_CONTACT_FAILURE', error)
      commit('NOTIFICATION_FAILURE', error.response.data, { root: true })
    })
  },
  updateContact ({ commit }, payload) {
    commit('UPDATE_CONTACT_REQUEST')
    return dataService.put(`/contacts/${payload._id}`, payload).then((response) => {
      commit('UPDATE_CONTACT_SUCCESS', response.data)
      commit('NOTIFICATION_SUCCESS', { message: 'Contact updated' }, { root: true })
    }).catch((error) => {
      commit('UPDATE_CONTACT_FAILURE', error)
      commit('NOTIFICATION_FAILURE', error.response.data, { root: true })
    })
  },
  deleteContact ({ commit }, payload) {
    commit('DELETE_CONTACT_REQUEST')
    return dataService.delete(`/contacts/${payload._id}`).then((response) => {
      commit('DELETE_CONTACT_SUCCESS', response.data)
      commit('NOTIFICATION_SUCCESS', { message: 'Contact deleted' }, { root: true })
    }).catch((error) => {
      commit('DELETE_CONTACT_FAILURE', error)
      commit('NOTIFICATION_FAILURE', error.response.data, { root: true })
    })
  },
  getContact ({ commit }, payload) {
    commit('FETCH_CONTACT_REQUEST')
    return dataService.get(`/contacts/${payload._id}`, 0).then((response) => {
      commit('FETCH_CONTACT_SUCCESS', response.data)
    }).catch((error) => {
      commit('FETCH_CONTACT_FAILURE', error)
      commit('NOTIFICATION_FAILURE', error.response.data, { root: true })
    })
  },
  listContacts ({ state, commit }, reload) {
    commit('LIST_CONTACTS_REQUEST')
    if (process.browser) {
      if (state.list.length === 0 || reload === true) {
        console.log('has own property?', reload)
        return dataService.get('/contacts', 0).then((response) => {
          commit('LIST_CONTACTS_SUCCESS', response.data)
        }).catch((error) => {
          commit('LIST_CONTACTS_FAILURE', error)
          commit('NOTIFICATION_FAILURE', error.response.data, { root: true })
        })
      } else {
        console.log('noo..', reload)
      }
    }
  }
}

export default {
  state,
  mutations,
  actions
}
