"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("./util");
var query_1 = require("./query");
function transfromRequest(data, headers) {
    if (util_1.isPlainObject(data)) {
        var contentType = headers['Content-Type'];
        if (/application\/x-www-form-urlencoded/i.test(contentType)) {
            return query_1.queryString(data);
        }
        return JSON.stringify(data);
    }
    return data;
}
exports.transfromRequest = transfromRequest;
//# sourceMappingURL=data.js.map