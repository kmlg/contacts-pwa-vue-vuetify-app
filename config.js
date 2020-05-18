// the environment that will be considered when building the skin, either `production` or `development`
const nodeEnv = process.env.NODE_ENV || "development"

module.exports = {
  nodeEnv: nodeEnv,
  isProduction: nodeEnv === "production",
  isStaging: nodeEnv === "staging",
  isTesting: nodeEnv === "testing",

  server: {
    port: process.env.SERVER_PORT || 3000
  },

  apiDomain: 'http://localhost:9000',
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
