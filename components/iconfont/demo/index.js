import 'babel-polyfill';

import Vue from 'vue';
import DIcon from '../index.js';
import App from './App.vue';

Vue.use(DIcon);
new Vue({
    el: '#app',
    render: h => h(App)
});