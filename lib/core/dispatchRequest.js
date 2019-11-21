"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var xhr_1 = require("./xhr");
var transform_1 = require("./transform");
var url_1 = require("../helpers/url");
var headers_1 = require("../helpers/headers");
function dispatchRequest(config) {
    processConfig(config);
    return xhr_1.xhr(config).then(transformResponseData);
}
exports.dispatchRequest = dispatchRequest;
function processConfig(config) {
    config.url = transformUrl(config);
    config.data = transform_1.transform(config.data, config.headers, config.transformRequest);
    config.headers = headers_1.transformHeaders(config.headers);
}
function transformUrl(config) {
    var baseURL = config.baseURL, params = config.params;
    var url = config.url;
    url = url_1.compineUrl(baseURL, url);
    return url_1.buildUrl(url, params);
}
function transformResponseData(res) {
    res.data = transform_1.transform(res.data, res.headers, res.config.transformResponse);
    return res;
}
//# sourceMappingURL=dispatchRequest.js.map