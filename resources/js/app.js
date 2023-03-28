import './bootstrap';
import { createApp } from 'vue';
import App from '../App.vue';
import { routes } from './routes';
import {createRouter, createWebHistory} from 'vue-router';
import { createPinia } from 'pinia';

const router = createRouter({
  history: createWebHistory(),
  routes: routes 
});

const pinia = createPinia();
const app = createApp(App);

app.use(router);
app.use(pinia);

app.mount('#app');
