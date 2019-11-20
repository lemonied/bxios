"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var InterceptorManager = (function () {
    function InterceptorManager() {
        this.interceptors = [];
    }
    InterceptorManager.prototype.forEach = function (fn) {
        this.interceptors.forEach(function (item) {
            if (item !== null) {
                fn(item);
            }
        });
    };
    InterceptorManager.prototype.use = function (resolved, rejected) {
        this.interceptors.push({
            resolved: resolved,
            rejected: rejected
        });
        return this.interceptors.length - 1;
    };
    InterceptorManager.prototype.eject = function (id) {
        this.interceptors[id] = null;
    };
    return InterceptorManager;
}());
exports.InterceptorManager = InterceptorManager;
//# sourceMappingURL=interceptorManager.js.map