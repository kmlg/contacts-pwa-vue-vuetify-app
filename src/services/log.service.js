import { isBrowser } from '@/utils/isBrowser'
import Config from '../../config'

const logService = {
  log(value) {
    const copy = JSON.parse(JSON.stringify(value))

    if (isBrowser) {
      // completely lock down development to console log
      if (Config.nodeEnv !== 'development') {
        console.log(value) // or any 3rd-party log service provider
      } else {
        console.log(value)
      }
    } else {
      console.log(copy)
    }
    return copy
  },
  install(Vue, options) {
    Vue.prototype.$log = this.log
  }
}

export default logService
