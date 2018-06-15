/*  [dom绑定事件]
**  @params     element     { object }    dom对象
**  @params     event       { string }    事件名称
**  @params     handler     { function }  绑定事件
*/
export const on = (function () {
    if (document.addEventListener) {
        return function(element, event, handler) {
            if (element && event && handler) {
                element.addEventListener(event, handler, false);
            }
        };
    } else {
        return function(element, event, handler) {
            if (element && event && handler) {
                element.attachEvent('on' + event, handler);
            }
        };
    }
})();

/*  [dom解绑事件]
**  @params     element     { object }    dom对象
**  @params     event       { string }    事件名称
**  @params     handler     { function }  绑定事件
*/
export const off = (function () {
    if (document.removeEventListener) {
        return function(element, event, handler) {
            if (element && event && handler) {
                element.removeEventListener(event, handler, false);
            }
        };
    } else {
        return function(element, event, handler) {
            if (element && event && handler) {
                element.detachEvent('on' + event, handler);
            }
        };
    }
})();
