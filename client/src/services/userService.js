import http from "./httpService";
import config from "../config.json";

const apiEndpoint = config.apiUrl + "/users";

function register(user) {
  return http.post(apiEndpoint, {
    email: user.username,
    password: user.password,
    name: user.name,
  });
}

export default {
  register,
};
