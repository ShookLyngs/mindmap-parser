// Create App instance
import { createApp } from 'vue';
import App from './app.vue';
const app = createApp(App);

// VueRouter
import router from '@/modules/router';
app.use(router);

// Styles
import './assets/styles/index.css';

// Mount
app.mount('#app');