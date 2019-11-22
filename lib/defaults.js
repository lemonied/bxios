"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var headers_1 = require("./helpers/headers");
var data_1 = require("./helpers/data");
var defaults = {
    method: 'get',
    headers: {
        common: {
            Accept: 'application/json, text/plain, */*'
        }
    },
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
    transformRequest: [function (data, headers) {
            headers_1.processHeaders(headers, data);
            return data_1.transfromRequest(data, headers);
        }],
    transformResponse: [data_1.transformResponse],
    validateStatus: function (status) {
        return status >= 200 && status < 300 || status === 304;
    }
};
exports.default = defaults;
//# sourceMappingURL=defaults.js.map