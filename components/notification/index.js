import Vue from 'vue';
import Notification from './src/main.js';

Notification.install = (Vue) => {
	Vue.prototype.$notify = Notification;
}

export default Notification;