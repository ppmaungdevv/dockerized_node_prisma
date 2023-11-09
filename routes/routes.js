const api_prefix = "/api"

module.exports = (app) => {
  app.use(api_prefix, require("./api/post-routes"));
  app.use(api_prefix, require("./api/user-routes"));
}