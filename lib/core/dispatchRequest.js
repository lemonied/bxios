"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var xhr_1 = require("./xhr");
function dispatchRequest(config) {
    processConfig(config);
    return xhr_1.xhr(config);
}
exports.dispatchRequest = dispatchRequest;
function processConfig(config) {
    config.url = transformUrl(config);
    config.headers = transformHeaders(config);
    config.data = transformRequestData(config);
}
function transformUrl(config) {
    var url = config.url, params = config.params;
    return buildUrl(url, params);
}
//# sourceMappingURL=dispatchRequest.js.map