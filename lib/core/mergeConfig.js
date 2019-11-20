"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("../helpers/util");
function mergeConfig(config1, config2) {
    var merged = Object.create(null);
    var mergeStratOption = ['headers', 'auth'];
    if (util_1.isPlainObject(config1)) {
        if (util_1.isPlainObject(config2)) {
            Object.keys(config1).forEach(function (key) {
                if (key in mergeStratOption) {
                    merged[key] = util_1.deepMerge(config1, config2);
                }
                else if (typeof config2[key] === 'undefined') {
                    merged[key] = config1[key];
                }
            });
        }
        else {
            merged = util_1.deepMerge(config1);
        }
    }
    else if (util_1.isPlainObject(config2)) {
        merged = util_1.deepMerge(config2);
    }
    return merged;
}
exports.mergeConfig = mergeConfig;
//# sourceMappingURL=mergeConfig.js.map