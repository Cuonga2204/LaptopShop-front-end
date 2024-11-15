import axios from "axios";


axios.defaults.baseURL = "http://localhost:4000/api/";

// Thiết lập headers mặc định, bao gồm Authorization token
axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("access_token")}`;

axios.interceptors.request.use(function (config) {
    // Do something before request is sent

    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

export default axios;