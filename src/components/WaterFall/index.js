import WaterFall from './src/WaterFall';
let myComponent = {};

/* eslint no-unused-vars: "off"*/
myComponent.install = function(vue) {
    vue.component(WaterFall.name, WaterFall);
};

export default myComponent;
