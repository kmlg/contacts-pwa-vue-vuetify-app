// the environment that will be considered when building the skin, either `production` or `development`
const nodeEnv = "staging"

module.exports = {
  nodeEnv: nodeEnv,
  isProduction: nodeEnv === "production",
  isStaging: nodeEnv === "staging",
  isTesting: nodeEnv === "testing",

  server: {
    port: process.env.SERVER_PORT || 3000
  },

  apiDomain: 'http://api.yourdomain.com',
  loadDbName: 'addressbookLocal',
  logoUrl: '/assets/romlogo.png',
  caching: {
    partial: 3600, // an hour
    api: 0,
    local: 3600
  },
  flags: {
    contacts: true
  }
}
