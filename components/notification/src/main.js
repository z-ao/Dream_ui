import Vue from 'vue';
import NotificationVue from './main.vue';
let NotificationConstructor = Vue.extend(NotificationVue);

let instance,         //提示框
    InstanceArr = [], //提示框集合
    tag         = 0;  //提示框标记

let Notification = function (options) {
    let option = options || {};

    const _OFFSET       = 16;     //默认上下左右偏移16px
    const _MARGIN       = 5;
    let position        = options.position || 'top-right';
    let CurrentOffset   = {};
    let vertical        = position.split('-')[0];
    let horizontal      = position.split('-')[1]; 

    //设置提示框高度
    CurrentOffset[vertical] = CurrentOffset[horizontal] = _OFFSET;
    InstanceArr.filter((instance) => {
        return instance && instance.position === position;
    }).forEach((item) => {
        CurrentOffset[vertical] += item.$el.offsetHeight + _MARGIN;
    });

    //传入数据给组件
    option.offset       = CurrentOffset;
    option.tag          = tag;
    option.AutoGone     = options.AutoGone || 'true';
    option.closeEvent   = Notification.closeEvent;
    option.position     = position;
    //实例提示框
	instance = new NotificationConstructor({
        data: option
    });

  	instance.vm = instance.$mount();
    //插入提示框
  	document.body.appendChild(instance.vm.$el);
    InstanceArr[tag] = instance;
    tag++;
}

/*
    [closeEvent]    提示框关闭触发事件
    @param   {number}   tag     提示框标记
*/
Notification.closeEvent = function (tag) {
    let _position       = InstanceArr[tag].position;
    let vertical        = _position.split('-')[0];
    let h               = 16;         //重设高度
    InstanceArr[tag]    = null;      //清除对应数据

    InstanceArr.filter((instance) => {
        return instance && instance.position === _position;
    }).forEach((item) => {
        item.offset[vertical] = h;
        h += item.$el.offsetHeight + 5;
    })
};

/*
    [clear]    清除所有提示框
    @param   {function}   cb     回调函数
*/
Notification.clear = function (cb) {
    InstanceArr.forEach((item) => {
        if (item) {
            item.visible = false;
        };
    })

    cb && cb();
}

export default Notification;
