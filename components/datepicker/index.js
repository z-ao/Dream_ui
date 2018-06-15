import datepicker from './src/index.vue';

export default {
    install(Vue) {
        Vue.component(datepicker.name, datepicker)
    }
}
