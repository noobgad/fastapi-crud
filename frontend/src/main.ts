import { createApp } from 'vue'
import { createPinia } from 'pinia';

import './style.css'
import App from './App.vue'
import router from './router';
import axios from 'axios';
import axiosApiInstance from './api';

axios.defaults.baseURL = 'http://127.0.0.1:8000'

createApp(App)
    .use(createPinia())
    .use(router, axiosApiInstance)
    .mount('#app')
