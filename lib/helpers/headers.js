"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("./util");
function normalizeHeaderName(headers, normalizedName) {
    if (!headers)
        return;
    Object.keys(headers).forEach(function (key) {
        if (key !== normalizedName && key.toUpperCase() === normalizedName.toUpperCase()) {
            headers[normalizedName] = headers[key];
            delete headers[key];
        }
    });
}
function processHeaders(headers, data) {
    headers || (headers = {});
    normalizeHeaderName(headers, 'Content-Type');
    if (util_1.isPlainObject(data)) {
        if (!headers['Content-Type']) {
            headers['Content-Type'] = 'application/json;charset=utf-8';
        }
    }
    return headers;
}
exports.processHeaders = processHeaders;
function headersParser(str) {
    var headers = Object.create(null);
    if (typeof str !== 'string' || !str)
        return headers;
    str.split('\r\n').forEach(function (line) {
        var _a = line.split(':'), key = _a[0], vals = _a.slice(1);
        if (!key)
            return;
        var name = key.trim().toLowerCase();
        var val = vals.join(':').trim();
        headers[name] = val;
    });
    return headers;
}
exports.headersParser = headersParser;
//# sourceMappingURL=headers.js.map