import post_routes from './api/post-routes.js';
import user_routes from './api/user-routes.js';
const api_prefix = "/api"

// module.exports = (app) => {
const routes = (app) => {
  // app.use(api_prefix, import("./api/post-routes"));
  app.use(api_prefix, post_routes);
  app.use(api_prefix, user_routes);
}

export {
  routes
}