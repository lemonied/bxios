"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("./util");
function encode(val) {
    return encodeURIComponent(val)
        .replace(/%40/g, '@')
        .replace(/%3A/gi, ':')
        .replace(/%24/g, '$')
        .replace(/%2C/gi, ',')
        .replace(/%20/g, '+')
        .replace(/%5B/gi, '[')
        .replace(/%5D/gi, ']');
}
function arrayParser(arr, prefix) {
    return arr.map(function (item, key) {
        var preKey = key === 0 ? '' : key;
        if (util_1.isNull(item))
            return prefix + "[" + preKey + "]=";
        if (typeof item === 'string') {
            return prefix + "[" + preKey + "]=" + encode(item);
        }
        else if (Array.isArray(item)) {
            return arrayParser(item, prefix + "[" + preKey + "]");
        }
        else if (util_1.isPlainObject(item)) {
            return queryString(item, prefix + "[" + preKey + "]");
        }
        else {
            return prefix + "[" + preKey + "]=" + JSON.stringify(item);
        }
    }).join('&');
}
function queryString(val, prefix) {
    if (util_1.isPlainObject(val)) {
        var serializedParams_1 = [];
        Object.keys(val).forEach(function (key) {
            var value = val[key];
            if (util_1.isNull(value))
                return;
            if (util_1.isDate(value)) {
                value = value.toISOString();
            }
            else if (Array.isArray(value)) {
                return serializedParams_1.push(arrayParser(value, key));
            }
            else if (util_1.isPlainObject(value)) {
                value = JSON.stringify(value);
            }
            var ret = prefix ?
                prefix + "[" + key + "]=" + encode(value) :
                key + "=" + encode(value);
            serializedParams_1.push(ret);
        });
        return serializedParams_1.join('&');
    }
    else {
        return val || '';
    }
}
exports.queryString = queryString;
function queryParse(val) {
    if (typeof val === 'string') {
        if (val.indexOf('?') === 0)
            val = val.substr(1);
        var query_1 = {};
        val.split('&').forEach(function (item) {
            var arr = item.split('=');
            query_1[arr[0]] = arr[1];
        });
        return query_1;
    }
    else if (util_1.isPlainObject(val)) {
        return val;
    }
    else {
        return {};
    }
}
exports.queryParse = queryParse;
//# sourceMappingURL=query.js.map