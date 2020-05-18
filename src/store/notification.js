// https://vuetifyjs.com/components/snackbars
const state = () => {
  return {
    pending: false,
    success: false,
    failure: false,

    context: 'info',
    text: '',
    snackbar: false
  }
}
const mutations = {
  NOTIFICATION_PENDING (state) {
    state.mode = 'info'
    state.pending = true
  },
  NOTIFICATION_SUCCESS (state, data) {
    state.failure = false
    state.context = 'success'
    state.success = true
    state.text = data.message
    state.snackbar = true
    state.pending = false
  },
  NOTIFICATION_FAILURE (state, data) {
    state.success = false
    state.context = 'error'
    state.failure = true
    state.text = data.message
    state.snackbar = true
    state.pending = false
  },
  UPDATE_SNACKBAR (state, value) {
    state.snackbar = value
  }
}

export default {
  state,
  mutations
}
