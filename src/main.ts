import { createApp } from 'vue';
import App from './App.vue';
import { createVuetify } from 'vuetify';
import { createPinia } from 'pinia';
import 'vuetify/styles';

const vuetify = createVuetify();
const pinia = createPinia();

createApp(App).use(vuetify).use(pinia).mount('#app');
