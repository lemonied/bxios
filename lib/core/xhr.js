"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("../helpers/util");
var headers_1 = require("../helpers/headers");
function xhr(config) {
    return new Promise(function (resolve, reject) {
        var _a = config.data, data = _a === void 0 ? null : _a, url = config.url, _b = config.method, method = _b === void 0 ? 'get' : _b, headers = config.headers, responseType = config.responseType, timeout = config.timeout;
        var request = new XMLHttpRequest();
        if (responseType)
            request.responseType = responseType;
        request.onreadystatechange = function () {
            if (this.readyState === 4) {
                handleResponse();
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
        function handleResponse() {
            var responseHeaders = request.getAllResponseHeaders();
            var responseData = request.responseType !== 'text' ?
                request.response :
                request.responseText;
            var response = {
                data: responseData,
                status: request.status,
                statusText: request.statusText,
                headers: headers_1.headersParser(responseHeaders),
                config: config,
                request: request
            };
            resolve(response);
        }
    });
}
exports.xhr = xhr;
//# sourceMappingURL=xhr.js.map