"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var interceptorManager_1 = require("../core/interceptorManager");
var mergeConfig_1 = require("../core/mergeConfig");
var dispatchRequest_1 = require("./dispatchRequest");
var Bxios = (function () {
    function Bxios(initConfig) {
        this.defaults = initConfig;
        this.interceptors = {
            request: new interceptorManager_1.InterceptorManager(),
            response: new interceptorManager_1.InterceptorManager()
        };
    }
    Bxios.prototype.request = function (url, config) {
        if (typeof url === 'string') {
            if (!config) {
                config = {};
            }
            config.url = url;
        }
        else {
            config = url;
        }
        config = mergeConfig_1.mergeConfig(config, this.defaults);
        var chain = [{
                resolved: dispatchRequest_1.dispatchRequest
            }];
        this.interceptors.request.forEach(function (interceptor) {
            chain.unshift(interceptor);
        });
        this.interceptors.response.forEach(function (iterceptor) {
            chain.push(iterceptor);
        });
        var promise = Promise.resolve(config);
        while (chain.length > 0) {
            var _a = chain.shift(), resolved = _a.resolved, rejected = _a.rejected;
            promise = promise.then(resolved, rejected);
        }
        return promise;
    };
    return Bxios;
}());
exports.default = Bxios;
//# sourceMappingURL=Bxios.js.map