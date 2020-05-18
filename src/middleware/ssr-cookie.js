import dataService from '../services/app.service'

export default function ({isServer, req}) {
  if (isServer) {
    dataService.defaults.headers.common.cookie = req.headers.cookie
  }
}
