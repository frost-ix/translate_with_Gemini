import './assets/main.css'

import { createApp } from 'vue'
import axios from 'axios'
import App from './App.vue'

createApp(App).mount('#app')
createApp(App).config.globalProperties.$axios = axios
