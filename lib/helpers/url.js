"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var query_1 = require("./query");
var util_1 = require("./util");
function urlParser(href) {
    var l = href.split('#');
    var hash = l[1] ? "#" + l[1] : '';
    var wholePath = l[0].split('?');
    var path = wholePath[0];
    var query = wholePath[1] ? "?" + wholePath[1] : '';
    return {
        path: path,
        query: query,
        hash: hash,
        origin: getOrigin(path)
    };
}
exports.urlParser = urlParser;
function getOrigin(url) {
    if (!isWholeUrl(url))
        return '';
    return url.replace(/([^\/])\/[^\/].*/, '$1');
}
function buildUrl(url, params, paramsSerializer) {
    var parsedUrl = urlParser(url);
    var search = parsedUrl.query, path = parsedUrl.path;
    var stringedQuery;
    if (util_1.isURLSearchParams(params)) {
        stringedQuery = params.toString();
    }
    else if (typeof paramsSerializer === 'function') {
        stringedQuery = paramsSerializer(params);
    }
    else {
        var query = Object.assign(query_1.queryParse(search), query_1.queryParse(params));
        stringedQuery = query_1.queryString(query);
    }
    return "" + path + (stringedQuery ? '?' + stringedQuery : '');
}
exports.buildUrl = buildUrl;
function isWholeUrl(url) {
    return /^http(s?):\/{2}/.test(url);
}
exports.isWholeUrl = isWholeUrl;
function isAbsoluteUrl(url) {
    return /^\//.test(url);
}
exports.isAbsoluteUrl = isAbsoluteUrl;
function compineUrl(baseUrl, url) {
    if (isWholeUrl(url))
        return url;
    return baseUrl.replace(/\/+$/, '') + '/' + url.replace(/^\/+/, '');
}
exports.compineUrl = compineUrl;
function resolveUrl(from, to) {
    if (!from)
        return to;
    if (!to)
        return '';
    if (isWholeUrl(to))
        return to;
    var baseUrl = urlParser(from);
    if (isAbsoluteUrl(to)) {
        return baseUrl.origin + to;
    }
    else {
        return baseUrl.path.replace(/(\/)[^\/.]*$/, '$1') + to;
    }
}
exports.resolveUrl = resolveUrl;
//# sourceMappingURL=url.js.map