import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)
const target = document.getElementById('amx-bulletin') || document.getElementById('app')
app.mount(target!)
