/*
 * 拷贝
 * * @params   obj     需要拷贝的对象
 * * @params   target  被拷贝的对象
 * * @params   deep    是否深拷贝
 */
export default function clone(obj, target, deep) {
    if (typeof target !== 'object') return obj;

    if (deep === false) {
        for (let key in target) {
            obj[key] = target[key];
        }
    } else {
        for (let key in target) {
            if (Object.prototype.toString.call(target[key]).indexOf('Object') >= 0) {
                obj[key] = clone({}, target[key], true);
            } else if (Object.prototype.toString.call(target[key]).indexOf('Array') >= 0) {
                obj[key] = clone([], target[key], true);
            } else {
                obj[key] = target[key];
            }
        }
    }
    return obj;
}
