import Vue from 'vue'
import App from './App.vue'
import VueRouter from "vue-router";
import VueResource from 'vue-resource'

//开启debug模式
Vue.config.debug = true;

Vue.use(VueRouter);
Vue.use(VueResource);

//模版导入
import home from './component/home.vue'
import joke from './component/joke.vue'


const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    {
      path: '/',
      component:home
    },
    {
      path: '/joke',
      component: joke
    }
  ]
})



new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
})
