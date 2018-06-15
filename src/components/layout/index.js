import DContainer 	from './src/container.vue';
import DHeader 		from './src/header.vue';
import DFooter 		from './src/footer.vue';
import DMain 		from './src/main.vue';
import DAside  		from './src/aside.vue';

let DLayout = {
	DContainer,
	DHeader,
	DFooter,
	DMain,
	DAside
};

Object.defineProperty(DLayout, 'install', {
	enumerable: false,
	value: function (Vue) {
		for (let [key, Component] of Object.entries(DLayout)) {
			Vue.component(key, Component);
		}
	}
});

export default DLayout;