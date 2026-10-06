({__plugin:null,__load(){if(this.__plugin)return this.__plugin;this.__plugin=(function () {
'use strict';
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) resolve(value);
    else Promise.resolve(value).then(_next, _throw);
}
function _async_to_generator(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}
function _ts_generator(thisArg, body) {
    var f, y, t, _ = {
        label: 0,
        sent: function() {
            if (t[0] & 1) throw t[1];
            return t[1];
        },
        trys: [],
        ops: []
    }, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype), d = Object.defineProperty;
    return d(g, "next", {
        value: verb(0)
    }), d(g, "throw", {
        value: verb(1)
    }), d(g, "return", {
        value: verb(2)
    }), typeof Symbol === "function" && d(g, Symbol.iterator, {
        value: function() {
            return this;
        }
    }), g;
    function verb(n) {
        return function(v) {
            return step([
                n,
                v
            ]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while(g && (g = 0, op[0] && (_ = 0)), _)try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [
                op[0] & 2,
                t.value
            ];
            switch(op[0]){
                case 0:
                case 1:
                    t = op;
                    break;
                case 4:
                    _.label++;
                    return {
                        value: op[1],
                        done: false
                    };
                case 5:
                    _.label++;
                    y = op[1];
                    op = [
                        0
                    ];
                    continue;
                case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;
                        continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];
                        break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];
                        t = op;
                        break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];
                        _.ops.push(op);
                        break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [
                6,
                e
            ];
            y = 0;
        } finally{
            f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
            value: op[0] ? op[1] : void 0,
            done: true
        };
    }
}
function _type_of$1(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
var KLIPY_API_KEY = '685pfsUU3EODe5rjG3li8rLUdfyydxxfh8fPym7wM5dvr0jklulSi6g5BSWlL3zG';
var klipyGifCache = new Map();
var klipyGifRequests = new Map();
function isRecord$1(value) {
    return !!value && (typeof value === "undefined" ? "undefined" : _type_of$1(value)) === 'object';
}
function isGifProvider(value) {
    return /(?:klipy|tenor|giphy)/i.test(value);
}
function isDiscordExternalProxy(value) {
    try {
        var url = new URL(value);
        return /^(?:images-ext-\d+|media)\.discordapp\.net$/i.test(url.hostname) && /\/external\//i.test(url.pathname);
    } catch (unused) {
        return false;
    }
}
function getDiscordProxyTarget(value) {
    if (!isDiscordExternalProxy(value)) return null;
    try {
        var path = decodeURIComponent(new URL(value).pathname);
        var targetIndex = path.indexOf('/https/');
        if (targetIndex < 0) return null;
        var prefix = path.slice('/external/'.length, targetIndex);
        var target = "https://".concat(path.slice(targetIndex + '/https/'.length));
        return prefix.startsWith('?') ? "".concat(target).concat(prefix) : target;
    } catch (unused) {
        return null;
    }
}
function klipyMediaHash(value) {
    var _getDiscordProxyTarget;
    var target = (_getDiscordProxyTarget = getDiscordProxyTarget(value)) !== null && _getDiscordProxyTarget !== void 0 ? _getDiscordProxyTarget : value;
    try {
        var _ref;
        var match = new URL(target).pathname.match(/\/ii\/([^/]+)\//i);
        return (_ref = match === null || match === void 0 ? void 0 : match[1]) !== null && _ref !== void 0 ? _ref : null;
    } catch (unused) {
        return null;
    }
}
function klipyPageSlug(value) {
    try {
        var url = new URL(value);
        if (!url.hostname.toLowerCase().endsWith('klipy.com')) return null;
        var match = url.pathname.match(/^\/gifs\/([^/?#]+)/i);
        return (match === null || match === void 0 ? void 0 : match[1]) ? decodeURIComponent(match[1]) : null;
    } catch (unused) {
        return null;
    }
}
function findKlipyPageSlug(value) {
    var depth = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
    if (depth > 5) return null;
    if (typeof value === 'string') return klipyPageSlug(value);
    if (!isRecord$1(value)) return null;
    for(var _i = 0, _iter = [
        'url',
        'uri',
        'sourceURI',
        'sourceUri',
        'sourceUrl',
        'embed',
        'original',
        'source',
        'media'
    ]; _i < _iter.length; _i++){
        var key = _iter[_i];
        var slug = findKlipyPageSlug(value[key], depth + 1);
        if (slug) return slug;
    }
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
    try {
        for(var _iterator = Object.keys(value)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
            var key1 = _step.value;
            var slug1 = findKlipyPageSlug(value[key1], depth + 1);
            if (slug1) return slug1;
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally{
        try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
                _iterator.return();
            }
        } finally{
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }
    return null;
}
function findKlipyHash(value) {
    var depth = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
    if (depth > 5) return null;
    if (typeof value === 'string') {
        if (!/klipy/i.test(value)) return null;
        return klipyMediaHash(value);
    }
    if (!isRecord$1(value)) return null;
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
    try {
        for(var _iterator = sourceKeys[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
            var key = _step.value;
            var hash = findKlipyHash(value[key], depth + 1);
            if (hash) return hash;
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally{
        try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
                _iterator.return();
            }
        } finally{
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }
    for(var _i = 0, _iter = [
        'media',
        'source',
        'original',
        'attachment',
        'gif',
        'result',
        'data',
        'image',
        'thumbnail',
        'video',
        'embed'
    ]; _i < _iter.length; _i++){
        var key1 = _iter[_i];
        var hash1 = findKlipyHash(value[key1], depth + 1);
        if (hash1) return hash1;
    }
    var _iteratorNormalCompletion1 = true, _didIteratorError1 = false, _iteratorError1 = undefined;
    try {
        for(var _iterator1 = Object.keys(value)[Symbol.iterator](), _step1; !(_iteratorNormalCompletion1 = (_step1 = _iterator1.next()).done); _iteratorNormalCompletion1 = true){
            var key2 = _step1.value;
            var hash2 = findKlipyHash(value[key2], depth + 1);
            if (hash2) return hash2;
        }
    } catch (err) {
        _didIteratorError1 = true;
        _iteratorError1 = err;
    } finally{
        try {
            if (!_iteratorNormalCompletion1 && _iterator1.return != null) {
                _iterator1.return();
            }
        } finally{
            if (_didIteratorError1) {
                throw _iteratorError1;
            }
        }
    }
    return null;
}
function findKlipyTitle(value) {
    var depth = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
    if (depth > 5 || !isRecord$1(value)) return null;
    for(var _i = 0, _iter = [
        'title',
        'description',
        'slug'
    ]; _i < _iter.length; _i++){
        var key = _iter[_i];
        if (typeof value[key] === 'string' && value[key]) return value[key];
    }
    for(var _i1 = 0, _iter1 = [
        'media',
        'source',
        'original',
        'attachment',
        'gif',
        'result',
        'data',
        'embed'
    ]; _i1 < _iter1.length; _i1++){
        var key1 = _iter1[_i1];
        var title = findKlipyTitle(value[key1], depth + 1);
        if (title) return title;
    }
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
    try {
        for(var _iterator = Object.keys(value)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
            var key2 = _step.value;
            var title1 = findKlipyTitle(value[key2], depth + 1);
            if (title1) return title1;
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally{
        try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
                _iterator.return();
            }
        } finally{
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }
    return null;
}
function findGifUrl(value) {
    var depth = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
    if (depth > 7) return null;
    if (typeof value === 'string') return /\.gif(?:$|[?#])/i.test(value) && /klipy/i.test(value) ? value : null;
    if (!isRecord$1(value)) return null;
    for(var _i = 0, _iter = [
        'gif',
        'url',
        'sourceURI',
        'sourceUri',
        'sourceUrl',
        'originalUrl',
        'mediaUrl'
    ]; _i < _iter.length; _i++){
        var key = _iter[_i];
        var url = findGifUrl(value[key], depth + 1);
        if (url) return url;
    }
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
    try {
        for(var _iterator = Object.keys(value)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
            var key1 = _step.value;
            var url1 = findGifUrl(value[key1], depth + 1);
            if (url1) return url1;
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally{
        try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
                _iterator.return();
            }
        } finally{
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }
    return null;
}
function findMatchingKlipyGif(value, hash) {
    var depth = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0;
    if (depth > 7) return null;
    if (!isRecord$1(value)) return null;
    var gifUrl = findGifUrl(value);
    if (gifUrl && (!hash || klipyMediaHash(gifUrl) === hash)) return gifUrl;
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
    try {
        for(var _iterator = Object.keys(value)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
            var key = _step.value;
            var match = findMatchingKlipyGif(value[key], hash, depth + 1);
            if (match) return match;
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally{
        try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
                _iterator.return();
            }
        } finally{
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }
    return null;
}
function resolveKlipyGifUrl(value) {
    return _async_to_generator(function() {
        var _findKlipyPageSlug, hash, slug, cacheKey, cached, existing, request;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    hash = findKlipyHash(value);
                    slug = (_findKlipyPageSlug = findKlipyPageSlug(value)) !== null && _findKlipyPageSlug !== void 0 ? _findKlipyPageSlug : findKlipyTitle(value);
                    cacheKey = hash !== null && hash !== void 0 ? hash : slug;
                    if (!cacheKey) return [
                        2,
                        null
                    ];
                    cached = klipyGifCache.get(cacheKey);
                    if (cached) return [
                        2,
                        cached
                    ];
                    existing = klipyGifRequests.get(cacheKey);
                    if (existing) return [
                        2,
                        existing
                    ];
                    request = function() {
                        return _async_to_generator(function() {
                            var query, response, payload, data, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, item, match;
                            return _ts_generator(this, function(_state) {
                                switch(_state.label){
                                    case 0:
                                        if (!slug) return [
                                            2,
                                            null
                                        ];
                                        _state.label = 1;
                                    case 1:
                                        _state.trys.push([
                                            1,
                                            4,
                                            ,
                                            5
                                        ]);
                                        query = encodeURIComponent(slug.replace(/[-_]+/g, ' '));
                                        return [
                                            4,
                                            fetch("https://api.klipy.com/api/v1/".concat(KLIPY_API_KEY, "/gifs/search?per_page=30&q=").concat(query, "&page=1&customer_id=unbound"))
                                        ];
                                    case 2:
                                        response = _state.sent();
                                        if (!response.ok) return [
                                            2,
                                            null
                                        ];
                                        return [
                                            4,
                                            response.json()
                                        ];
                                    case 3:
                                        payload = _state.sent();
                                        data = isRecord$1(payload.data) ? payload.data.data : null;
                                        if (!Array.isArray(data)) return [
                                            2,
                                            null
                                        ];
                                        _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                                        try {
                                            for(_iterator = data[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                                                item = _step.value;
                                                match = findMatchingKlipyGif(item, hash);
                                                if (match) {
                                                    klipyGifCache.set(cacheKey, match);
                                                    if (hash) klipyGifCache.set(hash, match);
                                                    return [
                                                        2,
                                                        match
                                                    ];
                                                }
                                            }
                                        } catch (err) {
                                            _didIteratorError = true;
                                            _iteratorError = err;
                                        } finally{
                                            try {
                                                if (!_iteratorNormalCompletion && _iterator.return != null) {
                                                    _iterator.return();
                                                }
                                            } finally{
                                                if (_didIteratorError) {
                                                    throw _iteratorError;
                                                }
                                            }
                                        }
                                        return [
                                            3,
                                            5
                                        ];
                                    case 4:
                                        _state.sent();
                                        return [
                                            3,
                                            5
                                        ];
                                    case 5:
                                        return [
                                            2,
                                            null
                                        ];
                                }
                            });
                        })();
                    }();
                    klipyGifRequests.set(cacheKey, request);
                    _state.label = 1;
                case 1:
                    _state.trys.push([
                        1,
                        ,
                        3,
                        4
                    ]);
                    return [
                        4,
                        request
                    ];
                case 2:
                    return [
                        2,
                        _state.sent()
                    ];
                case 3:
                    klipyGifRequests.delete(cacheKey);
                    return [
                        7
                    ];
                case 4:
                    return [
                        2
                    ];
            }
        });
    })();
}
function hasGifExtension(value) {
    try {
        var _url_searchParams_get;
        var url = new URL(value);
        var pathname = url.pathname.toLowerCase();
        var format = (_url_searchParams_get = url.searchParams.get('format')) === null || _url_searchParams_get === void 0 ? void 0 : _url_searchParams_get.toLowerCase();
        return pathname.endsWith('.gif') || format === 'gif';
    } catch (unused) {
        return /(?:^|[/?_.-])gif(?:$|[/?_.-])/i.test(value);
    }
}
function likelyGifVideo(value) {
    try {
        var _url_searchParams_get;
        var url = new URL(value);
        var host = url.hostname.toLowerCase();
        var pathname = url.pathname.toLowerCase();
        var format = (_url_searchParams_get = url.searchParams.get('format')) === null || _url_searchParams_get === void 0 ? void 0 : _url_searchParams_get.toLowerCase();
        return isGifProvider("".concat(host).concat(pathname).concat(url.search)) && (pathname.endsWith('.mp4') || pathname.endsWith('.webm') || pathname.endsWith('.webp') || format === 'mp4' || format === 'video' || format === 'webp');
    } catch (unused) {
        return isGifProvider(value) && /\.(?:mp4|webm|webp)(?:$|[?#])/i.test(value);
    }
}
function canonicalGiphyUrl(url) {
    var mediaMatch = url.pathname.match(/\/media\/([^/]+)/i);
    if (mediaMatch) return "https://media.giphy.com/media/".concat(mediaMatch[1], "/giphy.gif");
    var pageMatch = url.pathname.match(/\/gifs\/[^/]*?([a-z0-9]{6,})$/i);
    if (pageMatch) return "https://media.giphy.com/media/".concat(pageMatch[1], "/giphy.gif");
    return url.toString();
}
function directGifUrl(value) {
    try {
        var _parsed_searchParams_get;
        var parsed = new URL(value);
        var pathname = parsed.pathname.toLowerCase();
        var format = (_parsed_searchParams_get = parsed.searchParams.get('format')) === null || _parsed_searchParams_get === void 0 ? void 0 : _parsed_searchParams_get.toLowerCase();
        if (isDiscordExternalProxy(value)) {
            var target = getDiscordProxyTarget(value);
            return target ? directGifUrl(target) : pathname.endsWith('.gif') ? parsed.toString() : null;
        }
        if (pathname.endsWith('.gif')) {
            if (format && format !== 'gif') parsed.searchParams.set('format', 'gif');
            return parsed.toString();
        }
        if (parsed.searchParams.get('animated') === 'true' && (pathname.endsWith('.webp') || pathname.endsWith('.avif') || pathname.endsWith('.mp4'))) {
            parsed.pathname = parsed.pathname.replace(/\.(?:webp|avif|mp4)$/i, '.gif');
            parsed.searchParams.set('format', 'gif');
            return parsed.toString();
        }
        if (parsed.hostname.toLowerCase().includes('giphy.com') && /\/gifs?\//i.test(parsed.pathname)) {
            var normalized = canonicalGiphyUrl(parsed);
            if (normalized !== parsed.toString()) return normalized;
        }
        if (parsed.hostname.toLowerCase() === 'tenor.com' && !parsed.pathname.toLowerCase().endsWith('.gif')) {
            parsed.pathname = "".concat(parsed.pathname, ".gif");
            return parsed.toString();
        }
    } catch (unused) {}
    return null;
}
function asGifUrl(value) {
    if (isDiscordExternalProxy(value)) {
        var target = getDiscordProxyTarget(value);
        if (target) return asGifUrl(target);
        return hasGifExtension(value) ? value : null;
    }
    var direct = directGifUrl(value);
    if (direct) return direct;
    if (!likelyGifVideo(value)) return null;
    try {
        var url = new URL(value);
        if (url.hostname.toLowerCase().includes('giphy.com')) return canonicalGiphyUrl(url);
        if (url.hostname.toLowerCase().includes('klipy.com')) return null;
        if (url.searchParams.has('format')) url.searchParams.set('format', 'gif');
        url.pathname = url.pathname.replace(/\.(?:mp4|webm)$/i, '.gif');
        url.pathname = url.pathname.replace(/\.webp$/i, '.gif');
        return url.toString();
    } catch (unused) {
        return value.replace(/\.(?:mp4|webm)(?=$|[?#])/i, '.gif');
    }
}
var sourceKeys = [
    'sourceURI',
    'sourceUri',
    'sourceUrl',
    'originalURI',
    'originalUri',
    'originalUrl',
    'proxyUrl',
    'proxyURL',
    'mediaUrl',
    'mediaURL',
    'videoURI',
    'videoUrl',
    'imageUrl',
    'src',
    'source',
    'thumbnail',
    'uri',
    'url'
];
function getPreferredGifUrl(value) {
    var depth = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
    if (depth > 3) return null;
    if (typeof value === 'string') return asGifUrl(value);
    if (!isRecord$1(value)) return null;
    var fallback = null;
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
    try {
        for(var _iterator = sourceKeys[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
            var key = _step.value;
            var candidate = value[key];
            if (typeof candidate !== 'string') continue;
            var direct = directGifUrl(candidate);
            if (direct) return direct;
            var gifUrl = asGifUrl(candidate);
            if (gifUrl && !fallback) fallback = gifUrl;
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally{
        try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
                _iterator.return();
            }
        } finally{
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }
    if (fallback) return fallback;
    var nestedFallback = null;
    for(var _i = 0, _iter = [
        'media',
        'source',
        'original',
        'attachment',
        'gif',
        'result',
        'data',
        'image',
        'thumbnail',
        'video',
        'embed'
    ]; _i < _iter.length; _i++){
        var key1 = _iter[_i];
        var nested = getPreferredGifUrl(value[key1], depth + 1);
        if (nested && !nestedFallback) nestedFallback = nested;
    }
    return nestedFallback;
}
function isGifSource(value, contentType) {
    var depth = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0;
    var _ref, _value_contentType;
    if (depth > 3) return false;
    if (typeof contentType === 'string' && contentType.toLowerCase().startsWith('image/gif')) return true;
    if (typeof value === 'string') return hasGifExtension(value) || likelyGifVideo(value);
    if (!isRecord$1(value)) return false;
    if (typeof value.providerName === 'string' && isGifProvider(value.providerName)) return true;
    var nestedType = (_ref = (_value_contentType = value.contentType) !== null && _value_contentType !== void 0 ? _value_contentType : value.mimeType) !== null && _ref !== void 0 ? _ref : value.type;
    if (typeof nestedType === 'string' && nestedType.toLowerCase().startsWith('image/gif')) return true;
    return sourceKeys.some(function(key) {
        return isGifSource(value[key], undefined, depth + 1);
    }) || [
        'media',
        'source',
        'original',
        'attachment',
        'gif',
        'result',
        'data',
        'image',
        'thumbnail',
        'video',
        'embed'
    ].some(function(key) {
        return isGifSource(value[key], undefined, depth + 1);
    });
}function _array_like_to_array(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _array_with_holes(arr) {
    if (Array.isArray(arr)) return arr;
}
function _array_without_holes(arr) {
    if (Array.isArray(arr)) return _array_like_to_array(arr);
}
function _iterable_to_array(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) {
        return Array.from(iter);
    }
}
function _iterable_to_array_limit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
        for(_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true){
            _arr.push(_s.value);
            if (i && _arr.length === i) break;
        }
    } catch (err) {
        _d = true;
        _e = err;
    } finally{
        try {
            if (!_n && _i["return"] != null) _i["return"]();
        } finally{
            if (_d) throw _e;
        }
    }
    return _arr;
}
function _non_iterable_rest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _non_iterable_spread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _sliced_to_array(arr, i) {
    return _array_with_holes(arr) || _iterable_to_array_limit(arr, i) || _unsupported_iterable_to_array(arr, i) || _non_iterable_rest();
}
function _to_consumable_array(arr) {
    return _array_without_holes(arr) || _iterable_to_array(arr) || _unsupported_iterable_to_array(arr) || _non_iterable_spread();
}
function _type_of(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
function _unsupported_iterable_to_array(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _array_like_to_array(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _array_like_to_array(o, minLen);
}
var PATCHER = window.unbound.patcher.createPatcher('unbound.fix-gif-download');
var mediaManager = null;
var unpatches = [];
var retryTimer = null;
function isRecord(value) {
    return !!value && (typeof value === "undefined" ? "undefined" : _type_of(value)) === 'object';
}
function getMediaManager() {
    var manager = window.unbound.metro.findByProps('downloadMediaAsset', 'downloadMediaAssetWithContentType');
    if ((manager === null || manager === void 0 ? void 0 : manager.downloadMediaAsset) || (manager === null || manager === void 0 ? void 0 : manager.downloadMediaAssetWithContentType)) return manager;
    return window.unbound.metro.findByProps('downloadMediaAsset');
}
function getMediaTypes() {
    var managerTypes = mediaManager === null || mediaManager === void 0 ? void 0 : mediaManager.MediaType;
    if (managerTypes) return managerTypes;
    var props = window.unbound.metro.findByProps('GIF_RE_IOS', 'MediaType');
    if (isRecord(props === null || props === void 0 ? void 0 : props.MediaType)) return props.MediaType;
    var module = window.unbound.metro.findByFilePath('modules/media/MediaTypes.tsx', {
        interop: false
    });
    if (isRecord(module === null || module === void 0 ? void 0 : module.MediaType)) return module.MediaType;
    if (isRecord(module === null || module === void 0 ? void 0 : module.default) && isRecord(module.default.MediaType)) return module.default.MediaType;
    return null;
}
function getGifMediaType() {
    var _ref;
    var _getMediaTypes;
    return (_ref = (_getMediaTypes = getMediaTypes()) === null || _getMediaTypes === void 0 ? void 0 : _getMediaTypes.GIF) !== null && _ref !== void 0 ? _ref : 1;
}
function patchDownloadMethod(manager, method) {
    if (typeof manager[method] !== 'function') return;
    var unpatch = PATCHER.instead(manager, method, function(param) {
        var args = param.args, original = param.original, self = param.this;
        var _args = _sliced_to_array(args, 3), source = _args[0], contentType = _args[2];
        var gifType = getGifMediaType();
        var directGifUrl = getPreferredGifUrl(source);
        if (directGifUrl) {
            var rewrittenArgs = _to_consumable_array(args);
            rewrittenArgs[0] = directGifUrl;
            rewrittenArgs[1] = gifType;
            if (method === 'downloadMediaAssetWithContentType') rewrittenArgs[2] = 'image/gif';
            return original.apply(self, rewrittenArgs);
        }
        if (!isGifSource(source, contentType)) return original.apply(self, args);
        return resolveKlipyGifUrl(source).then(function(gifUrl) {
            if (!gifUrl) return original.apply(self, args);
            var rewrittenArgs = _to_consumable_array(args);
            rewrittenArgs[0] = gifUrl;
            rewrittenArgs[1] = gifType;
            if (method === 'downloadMediaAssetWithContentType') rewrittenArgs[2] = 'image/gif';
            return original.apply(self, rewrittenArgs);
        });
    });
    unpatches.push(unpatch);
}
function patchGifDetection(manager) {
    if (typeof manager.isGIFSource !== 'function') return;
    var unpatch = PATCHER.after(manager, 'isGIFSource', function(ctx) {
        if (isGifSource(ctx.args[0], ctx.args[1])) return true;
        return ctx.result;
    });
    unpatches.push(unpatch);
}
function patchMediaShareActions() {
    var found = window.unbound.metro.findByProps('useMediaShareActions', {
        all: true
    });
    var modules = Array.isArray(found) ? found : found ? [
        found
    ] : [];
    var seen = new Set();
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
    try {
        for(var _iterator = modules[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
            var module = _step.value;
            if (seen.has(module) || typeof module.useMediaShareActions !== 'function') continue;
            seen.add(module);
            var unpatch = PATCHER.before(module, 'useMediaShareActions', function(ctx) {
                var options = ctx.args[0];
                if (!isRecord(options) || !isRecord(options.source)) return;
                var source = options.source;
                var gifUrl = getPreferredGifUrl(source);
                if (gifUrl) {
                    applyGifSource(source, gifUrl);
                    return;
                }
                void resolveKlipyGifUrl(source).then(function(resolved) {
                    if (resolved) applyGifSource(source, resolved);
                });
            });
            unpatches.push(unpatch);
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally{
        try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
                _iterator.return();
            }
        } finally{
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }
}
function applyGifSource(source, gifUrl) {
    source.uri = gifUrl;
    source.sourceURI = gifUrl;
    source.contentType = 'image/gif';
    delete source.videoURI;
    delete source.isGIFV;
}
function patchMediaExtraction(manager) {
    for(var _i = 0, _iter = [
        'extractMediaSourcesFromMessage',
        'extractMediaSourcesFromEmbed',
        'extractMediaFromEmbed',
        'extractMediaFromAttachment',
        'getEmbedMedia'
    ]; _i < _iter.length; _i++){
        var method = _iter[_i];
        if (typeof manager[method] !== 'function') continue;
        var unpatch = PATCHER.after(manager, method, function(param) {
            var args = param.args, result = param.result;
            void resolveKlipyGifUrl(args[0]);
            void resolveKlipyGifUrl(result);
            return result;
        });
        unpatches.push(unpatch);
    }
}
function patchMediaManager() {
    if (mediaManager) return true;
    var manager = getMediaManager();
    if (!manager) return false;
    mediaManager = manager;
    patchMediaShareActions();
    patchMediaExtraction(manager);
    patchGifDetection(manager);
    patchDownloadMethod(manager, 'downloadMediaAsset');
    patchDownloadMethod(manager, 'downloadMediaAssetWithContentType');
    return unpatches.length > 0;
}
function stopRetrying() {
    if (!retryTimer) return;
    clearInterval(retryTimer);
    retryTimer = null;
}
function start() {
    if (patchMediaManager()) return;
    retryTimer = setInterval(function() {
        if (!patchMediaManager()) return;
        stopRetrying();
    }, 1000);
}
function stop() {
    stopRetrying();
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
    try {
        for(var _iterator = unpatches.splice(0)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
            var unpatch = _step.value;
            try {
                unpatch();
            } catch (unused) {}
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally{
        try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
                _iterator.return();
            }
        } finally{
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }
    PATCHER.unpatchAll();
    mediaManager = null;
}
var index = {
    start: start,
    stop: stop
};
return index;
})();return this.__plugin;},start(context){const module=this.__load();const plugin=module?.default??module;if(plugin&&typeof plugin.start==='function')return plugin.start(context);},stop(){const module=this.__load();const plugin=module?.default??module;if(plugin&&typeof plugin.stop==='function')return plugin.stop();}})