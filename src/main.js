import { createApp } from 'vue'
import App from './App.vue'
import Vue from "vue"
import router from "./router"


 createApp(App).mount('#app')
 new Vue({
    router,
    el: "#app",
    components: { App },
    render: h => h(App)
  });
  
