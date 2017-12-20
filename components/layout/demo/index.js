import 'babel-polyfill';

import Vue from 'vue';
import DLayout from '../index.js';
import App from './App.vue';

Vue.use(DLayout);
new Vue({
    el: '#app',
    render: h => h(App)
});