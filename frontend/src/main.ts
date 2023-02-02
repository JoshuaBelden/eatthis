import { createApp } from 'vue'
import { createPinia } from 'pinia'
import BootstrapVue3 from 'bootstrap-vue-3'

import './extensions/string'
import { setDefaults } from './lib/request'
import { useUserStore } from './stores/user'
import router from './router'
import App from './App.vue'

import './styles/reset.css'
import './styles/site.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'

const app = createApp(App)
app.use(BootstrapVue3)
app.use(createPinia())
app.use(router)

// if (process.env.NODE_ENV === "production") {
//   axios.defaults.baseURL = "https://api.johnappseed.com"
// } else {
setDefaults('http://localhost:7000/api')
//}

app.mount('#app')

const userStore = useUserStore()
if (!userStore.isAuthenticated && localStorage.token) {
  await userStore.setAuthToken(localStorage.token)
}
