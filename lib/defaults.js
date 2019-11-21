"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var headers_1 = require("./helpers/headers");
var data_1 = require("./helpers/data");
var defaults = {
    baseURL: '',
    headers: {
        common: {
            Accept: 'application/json, text/plain, */*'
        }
    },
    transformRequest: [function (data, headers) {
            headers_1.processHeaders(headers, data);
            return data_1.transfromRequest(data, headers);
        }],
    transformResponse: [data_1.transformResponse]
};
exports.default = defaults;
//# sourceMappingURL=defaults.js.map