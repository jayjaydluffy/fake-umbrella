import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8000',
    // headers: {
    //     'Access-Control-Allow-Origin': "*",
    //     'Access-Control-Allow-Methods': "GET,POST,PUT,DELETE,OPTIONS",
    //     'Access-Control-Allow-Headers': "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
    // }
});
instance.interceptors.request.use(config => {
    config.headers.common['Access-Control-Allow-Origin'] = "*";
    config.headers.common['Access-Control-Allow-Headers'] = "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With";
    return config;
});
// instance.defaults.headers.common['Access-Control-Allow-Origin'] = "*";
// instance.defaults.headers.common['Access-Control-Allow-Headers'] = "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With";

export default instance;