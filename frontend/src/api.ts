import axios from 'axios';

const defaultOptions = {
    baseURL: 'http://127.0.0.1:8000',
    // method: 'get',
    // headers: {
    //     "Access-Control-Allow-Origin": "*",    
    // // 'Content-Type': 'application/json',
    // },
}

const axiosApiInstance = axios.create(defaultOptions);

axiosApiInstance.interceptors.request.use(
    // async 
    (config) => {
        //   const value = await redisClient.get(rediskey)
        //   const keys = JSON.parse(value)
        const token = localStorage.getItem('user.access');
        config.headers.Authorization = token ? `Bearer ${token}` : '';
        return config;
    }, error => {
        console.error(error);
    }
);

export default axiosApiInstance;
// Request interceptor for API calls
// axiosApiInstance.interceptors.request.use(
//     async (config) => {
//     //   const value = await redisClient.get(rediskey)
//     //   const keys = JSON.parse(value)
//     const token = localStorage.getItem('token');
//       config.headers.Authorization =  token ? `Bearer ${token}` : '';
//       return config;
//     }, error => {
//       Promise.reject(error)
//     }
// );


//////////////////////////////

    // return {
    //     get: (url, options = {}) => axios.get(url, { ...defaultOptions, ...options }),
    //     post: (url, data, options = {}) => axios.post(url, data, { ...defaultOptions, ...options }),
    //     put: (url, data, options = {}) => axios.put(url, data, { ...defaultOptions, ...options }),
    //     delete: (url, options = {}) => axios.delete(url, { ...defaultOptions, ...options }),
    // };


// const request = client('MY SECRET TOKEN');

// request.get(PAGES_URL);


// const fetchClient = () => {
//     const defaultOptions = {
//     //   baseURL: process.env.REACT_APP_API_PATH,
//       method: 'get',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     };
  
//     // Create instance
//     let instance = axios.create(defaultOptions);
  
//     // Set the AUTH token for any request
//     instance.interceptors.request.use(function (config) {
//       const token = localStorage.getItem('token');
//       config.headers.Authorization =  token ? `Bearer ${token}` : '';
//       return config;
//     });
  
//     return instance;
// };
  