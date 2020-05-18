'use strict'

import Config from '../../config'
import request from 'axios'
import localforage from 'localforage'
import logService from '@/services/log.service'

request.defaults.baseURL = Config.apiDomain + '/api'

let requestConfig = {}

const httpService = {
  store: '',
  storeCacheTime: '',
  currentTime: '',
  isBrowser: false,
  networkFirstStrategy: (path, cacheTime) => {
    return new Promise((resolve, reject) => {
      request
        .get(path, requestConfig)
        .then(response => {
          // Response returned, cache it and return it
          if (response.status === 200) {
            if (httpService.isBrowser) {
              httpService.storeCacheTime.setItem(
                path,
                httpService.currentTime + cacheTime
              )
              httpService.store
                .setItem(path, {
                  data: response.data,
                  headers: response.headers
                })
                .then(response => resolve(response))
                .catch(err => reject(err))
            } else {
              resolve(response)
            }
          } else {
            if (httpService.isBrowser) {
              httpService.store
                .getItem(path)
                .then(response => resolve(response))
                .catch(err => reject(err))
            } else {
              reject(new Error('Cannot get ' + path))
            }
          }
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  offlineFirstStrategy: (path, cacheTime) => {
    return new Promise((resolve, reject) => {
      httpService.storeCacheTime
        .getItem(path)
        .then(function (timeLastCached) {
          // Cache has expired
          if (timeLastCached < httpService.currentTime) {
            httpService
              .networkFirstStrategy(path, cacheTime)
              .then(response => {
                resolve(response)
              })
              .catch(err => reject(err))
          } else {
            // Get item from cache
            httpService.store
              .getItem(path)
              .then(response => {
                if (response) {
                  // Is in cache perfect!
                  resolve(response)
                } else {
                  // Doesn't exist in cache try network
                  httpService
                    .networkFirstStrategy(path, cacheTime)
                    .then(response => resolve(response))
                    .catch(err => reject(err))
                }
              })
              .catch(error => {
                logService.log(error)
                // Doesn't exist in cache try network
                httpService
                  .networkFirstStrategy(path, cacheTime)
                  .then(response => resolve(response))
                  .catch(err => reject(err))
              })
          }
        })
        .catch(error => {
          logService.log(error)
          // Doesn't exist in cache timeouts try network
          httpService
            .networkFirstStrategy(path, cacheTime)
            .then(response => resolve(response))
            .catch(err => reject(err))
        })
    })
  },
  get: function (path, cacheTime, config = {}) {
    if (config.accessToken) {
      requestConfig.headers = {
        'Authorization': `Basic ${config.accessToken}`
      }
    }
    return new Promise((resolve, reject) => {
      httpService.currentTime = Math.floor(Date.now() / 1000)
      httpService.isBrowser = typeof window !== 'undefined'
      if (httpService.isBrowser) {
        httpService.store = localforage.createInstance({
          name: Config.loadDbName
        })
        httpService.storeCacheTime = localforage.createInstance({
          name: Config.loadDbName + '_cacheTime'
        })
      }
      if (!cacheTime || cacheTime === 0 || !httpService.storeCacheTime) {
        httpService
          .networkFirstStrategy(path, 0)
          .then(response => {
            if (!response) {
              resolve('')
            } else {
              resolve(response)
            }
          })
          .catch(err => {
            reject(err)
          })
      } else {
        httpService
          .offlineFirstStrategy(path, cacheTime)
          .then(response => {
            if (!response) {
              resolve('')
            } else {
              resolve(response)
            }
          })
          .catch(err => {
            reject(err)
          })
      }
    })
  },
  post: function (path, data) {
    return new Promise((resolve, reject) => {
      request
        .post(path, data, requestConfig)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  delete: function (path) {
    return new Promise((resolve, reject) => {
      request
        .delete(path, requestConfig)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  patch: function (path, data) {
    return new Promise((resolve, reject) => {
      request
        .patch(path, data, requestConfig)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  put: function (path, data) {
    return new Promise((resolve, reject) => {
      request
        .put(path, data, requestConfig)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
}

export default httpService
