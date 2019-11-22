"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("../helpers/util");
var headers_1 = require("../helpers/headers");
var cookie_1 = require("../helpers/cookie");
var error_1 = require("../helpers/error");
function xhr(config) {
    return new Promise(function (resolve, reject) {
        var _a = config.data, data = _a === void 0 ? null : _a, url = config.url, _b = config.method, method = _b === void 0 ? 'get' : _b, headers = config.headers, responseType = config.responseType, timeout = config.timeout, withCredentials = config.withCredentials, onDownloadProgress = config.onDownloadProgress, onUploadProgress = config.onUploadProgress;
        var request = new XMLHttpRequest();
        request.onprogress = onDownloadProgress;
        request.upload.onprogress = onUploadProgress;
        request.onreadystatechange = function () {
            if (this.readyState === 4 && request.status !== 0) {
                handleResponse();
            }
        };
        request.onerror = function () {
            reject(error_1.createError("NetWork Error", config, null, request));
        };
        request.ontimeout = function () {
            reject(error_1.createError("Timeout of " + timeout + "ms exceeded", config, 'ECONNABORTED', request));
        };
        request.open(method.toUpperCase(), url, true);
        configureRequest();
        processHeaders();
        processCancel();
        request.send(data);
        function configureRequest() {
            if (responseType)
                request.responseType = responseType;
            if (timeout)
                request.timeout = timeout;
            if (withCredentials)
                request.withCredentials = withCredentials;
        }
        function processHeaders() {
            var xsrfCookieName = config.xsrfCookieName, xsrfHeaderName = config.xsrfHeaderName;
            if ((withCredentials || util_1.isUrlSameOrigin(url)) && xsrfCookieName) {
                var xsrfValue = cookie_1.cookie.read(xsrfCookieName);
                if (xsrfHeaderName && xsrfValue) {
                    headers[xsrfHeaderName] = xsrfValue;
                }
            }
            var auth = config.auth;
            if (auth) {
                headers['Authorization'] = "Basic " + btoa(auth.username + " : " + auth.password);
            }
            Object.keys(headers).forEach(function (key) {
                if (util_1.isNull(data) && key.toLowerCase() === 'content-type') {
                    delete headers[key];
                }
                else {
                    request.setRequestHeader(key, headers[key]);
                }
            });
        }
        function handleResponse() {
            var validateStatus = config.validateStatus;
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
            if (validateStatus(request.status)) {
                resolve(response);
            }
            else {
                reject(error_1.createError("Request failed with status code " + request.status, config, request.status, request, response));
            }
        }
        function processCancel() {
            var cancelToken = config.cancelToken;
            if (cancelToken) {
                cancelToken.promise.then(function (reason) {
                    request.abort();
                    reject(reason);
                });
            }
        }
    });
}
exports.xhr = xhr;
//# sourceMappingURL=xhr.js.map