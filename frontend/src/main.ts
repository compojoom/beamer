import './main.css';
import '@fontsource/sora';
import 'vue-select/dist/vue-select.css';
import 'floating-vue/dist/style.css';

import FloatingVue from 'floating-vue';
import { createPinia } from 'pinia';
import piniaPersistState from 'pinia-plugin-persistedstate';
import { createApp } from 'vue';

import App from './App.vue';
import router from './router';

const pinia = createPinia();
pinia.use(piniaPersistState);

createApp(App).use(router).use(FloatingVue).use(pinia).mount('#app');
