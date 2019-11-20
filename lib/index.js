"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var xhr_1 = require("./core/xhr");
var url_1 = require("./helpers/url");
var data_1 = require("./helpers/data");
var headers_1 = require("./helpers/headers");
function axios(config) {
    processConfig(config);
    return xhr_1.default(config);
}
function processConfig(config) {
    config.url = transformUrl(config);
    config.headers = transformHeaders(config);
    config.data = transformRequestData(config);
}
function transformUrl(config) {
    var url = config.url, params = config.params;
    return url_1.buildUrl(url, params);
}
function transformRequestData(config) {
    return data_1.transfromRequest(config.data, config.headers);
}
function transformHeaders(config) {
    return headers_1.processHeaders(config.headers, config.data);
}
exports.default = axios;
//# sourceMappingURL=index.js.map