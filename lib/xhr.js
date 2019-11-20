"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("./helpers/util");
function xhr(config) {
    return new Promise(function (resolve, reject) {
        var _a = config.data, data = _a === void 0 ? null : _a, url = config.url, _b = config.method, method = _b === void 0 ? 'get' : _b, headers = config.headers, responseType = config.responseType, timeout = config.timeout;
        var request = new XMLHttpRequest();
        if (responseType)
            request.responseType = responseType;
        request.onreadystatechange = function () {
            if (this.readyState === 4 && this.status >= 200 && this.status < 300 || this.status === 304) {
                resolve(onLoadingSuccess(this, config));
            }
        };
        request.onerror = reject;
        request.ontimeout = reject;
        request.onabort = reject;
        request.open(method.toUpperCase(), url, true);
        if (timeout)
            request.timeout = timeout;
        Object.keys(headers).forEach(function (key) {
            if (util_1.isNull(data) && key.toLowerCase() === 'content-type') {
                delete headers[key];
            }
            else {
                request.setRequestHeader(key, headers[key]);
            }
        });
        request.send(data);
    });
}
exports.default = xhr;
function onLoadingSuccess(request, config) {
    var responseHeaders = request.getAllResponseHeaders();
    var responseData = request.responseType !== 'text' ?
        request.response :
        request.responseText;
    return {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
    };
}
//# sourceMappingURL=xhr.js.map