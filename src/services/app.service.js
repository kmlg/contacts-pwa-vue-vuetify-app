import httpService from './http.service.js'

const dataService = {
  cacheRequest (path, cacheTime) {
    return new Promise((resolve, reject) => {
      httpService.get(path, cacheTime)
        .then(response => { resolve(response) })
        .catch(err => { reject(err) })
    })
  },
  get (path, cacheTime = 0, config = {}) {
    return httpService.get(path, cacheTime, config)
  },
  post (path, data) {
    return httpService.post(path, data)
  },
  delete (path) {
    return httpService.delete(path)
  },
  patch (path, data) {
    return httpService.patch(path, data)
  },
  put (path, data) {
    return httpService.put(path, data)
  }
}

export default dataService
