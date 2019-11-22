"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var url_1 = require("../helpers/url");
var toString = Object.prototype.toString;
function isDate(val) {
    return toString.call(val) === '[object Date]';
}
exports.isDate = isDate;
function isObject(val) {
    return val !== null && typeof val === 'object';
}
exports.isObject = isObject;
function isPlainObject(val) {
    return toString.call(val) === '[object Object]';
}
exports.isPlainObject = isPlainObject;
function obj2Array(val) {
    var arr = [];
    if (isPlainObject(val)) {
        Object.keys(val).forEach(function (key) {
            arr.push([key, val[key]]);
        });
    }
    return arr;
}
exports.obj2Array = obj2Array;
function isNull(val) {
    return val === undefined || val === null;
}
exports.isNull = isNull;
function deepMerge() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var ret = Object.create(null);
    args.forEach(function (obj) {
        if (isPlainObject(obj)) {
            Object.keys(obj).forEach(function (key) {
                var val = obj[key];
                if (isPlainObject(val)) {
                    if (isPlainObject(ret[key])) {
                        ret[key] = deepMerge(ret[key], val);
                    }
                    else {
                        ret[key] = deepMerge(val);
                    }
                }
                ret[key] = val;
            });
        }
    });
    return ret;
}
exports.deepMerge = deepMerge;
function isURLSearchParams(val) {
    return typeof val !== 'undefined' && val instanceof URLSearchParams;
}
exports.isURLSearchParams = isURLSearchParams;
function isUrlSameOrigin(requestUrl) {
    if (!url_1.isWholeUrl(requestUrl))
        return true;
    var parsedUrl = url_1.urlParser(requestUrl);
    var current = url_1.urlParser(window.location.href);
    return parsedUrl.origin === current.origin;
}
exports.isUrlSameOrigin = isUrlSameOrigin;
function extend(to, from) {
    for (var key in from) {
        ;
        to[key] = from[key];
    }
    return to;
}
exports.extend = extend;
//# sourceMappingURL=util.js.map