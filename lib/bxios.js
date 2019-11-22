"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Bxios_1 = require("./core/Bxios");
var defaults_1 = require("./defaults");
var util_1 = require("./helpers/util");
var mergeConfig_1 = require("./core/mergeConfig");
var CancelToken_1 = require("./cancel/CancelToken");
function createInstance(config) {
    var context = new Bxios_1.Bxios(config);
    var instance = Bxios_1.Bxios.prototype.request.bind(context);
    util_1.extend(instance, context);
    return instance;
}
var bxios = createInstance(defaults_1.default);
bxios.create = function (config) {
    return createInstance(mergeConfig_1.mergeConfig(defaults_1.default, config));
};
bxios.Bxios = Bxios_1.Bxios;
bxios.CancelToken = CancelToken_1.CancelToken;
exports.default = bxios;
//# sourceMappingURL=bxios.js.map