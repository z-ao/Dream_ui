/*
 *  [dom绑定事件]
 * *  @params     element     { object }    dom对象
 * *  @params     event       { string }    事件名称
 * *  @params     handler     { function }  绑定事件
 */
export const on = (function() {
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

/*
 *  [dom解绑事件]
 * *  @params     element     { object }    dom对象
 * *  @params     event       { string }    事件名称
 * *  @params     handler     { function }  绑定事件
 */
export const off = (function() {
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

/*
 *  [节流]
 * *  @params     handler     { function }  绑定事件
 * *  @params     delay       { number   }  间隔多少时间执行,单位毫秒
 */
export const throttle = function(handler, delay = 200) {
    let timer, last,
        args = Array.prototype.slice.call(arguments, 2);

    return function() {
        let now = Date.now();
        clearTimeout(timer);
        if (last && now - last < delay) {
            timer = setTimeout(function() {
                handler.apply(null, args);
            }, delay);
        } else {
            last = now;
            handler.apply(null, args);
        }
    };
};

/*
 *  [㧍抖动]
 * *  @params     handler     { function }  绑定事件
 * *  @params     delay       { number   }  延迟多少时间执行,单位毫秒
 */
export const debounce = function(handler, delay = 200) {
    let timer, args = Array.prototype.slice.call(arguments, 2);

    return function() {
        clearTimeout(timer);
        timer = setTimeout(function() {
            handler.apply(null, args);
        }, delay);
    };
};
