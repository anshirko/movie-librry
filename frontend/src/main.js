import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "./router.js";

import WidgetSelectAuthors from "./components/WidgetSelectAuthors.vue";
import {config} from "jenesius-vue-form";
import {createPinia} from "pinia";

config({
    inputTypes: {
        authors: WidgetSelectAuthors
    }
})
const pinia = createPinia()
createApp(App)
    .use(router)
    .use(pinia)
    .mount('#app')
