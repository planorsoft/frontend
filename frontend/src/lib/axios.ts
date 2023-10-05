import axios from "axios";

const baseURL = "http://localhost:5050/api";

const instance = axios.create({
  baseURL,
});

instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const token = window.localStorage.getItem('token') //do not store token on localstorage!!!
    config.headers.Authorization = `Bearer ${token}`
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)


// Also add/ configure interceptors && all the other cool stuff

export default instance;