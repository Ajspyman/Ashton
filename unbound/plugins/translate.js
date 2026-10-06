({__plugin:null,__load(){if(this.__plugin)return this.__plugin;this.__plugin=(function () {
'use strict';
function asyncGeneratorStep$3(gen, resolve, reject, _next, _throw, key, arg) {
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
function _async_to_generator$3(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                asyncGeneratorStep$3(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                asyncGeneratorStep$3(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}
function _ts_generator$3(thisArg, body) {
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
var PATCHER_ID = 'unbound.translate';
var DEFAULT_API_BASE_URL = 'https://translate.unbound.rip';
var DEFAULT_TARGET_LANGUAGE = 'en';
var DEFAULT_SOURCE_LANGUAGE = 'auto';
var STORE$1 = window.unbound.storage.getStore(PATCHER_ID);
var TOKEN_SKEW_MS = 15000;
var TRANSLATION_LANGUAGES = [
    {
        code: 'ar',
        name: 'Arabic',
        nativeName: 'العربية'
    },
    {
        code: 'az',
        name: 'Azerbaijani',
        nativeName: 'Azərbaycanca'
    },
    {
        code: 'bg',
        name: 'Bulgarian',
        nativeName: 'Български'
    },
    {
        code: 'ca',
        name: 'Catalan',
        nativeName: 'Català'
    },
    {
        code: 'cs',
        name: 'Czech',
        nativeName: 'Čeština'
    },
    {
        code: 'da',
        name: 'Danish',
        nativeName: 'Dansk'
    },
    {
        code: 'de',
        name: 'German',
        nativeName: 'Deutsch'
    },
    {
        code: 'el',
        name: 'Greek',
        nativeName: 'Ελληνικά'
    },
    {
        code: 'en',
        name: 'English'
    },
    {
        code: 'eo',
        name: 'Esperanto'
    },
    {
        code: 'es',
        name: 'Spanish',
        nativeName: 'Español'
    },
    {
        code: 'et',
        name: 'Estonian',
        nativeName: 'Eesti'
    },
    {
        code: 'fa',
        name: 'Persian',
        nativeName: 'فارسی'
    },
    {
        code: 'fi',
        name: 'Finnish',
        nativeName: 'Suomi'
    },
    {
        code: 'fr',
        name: 'French',
        nativeName: 'Français'
    },
    {
        code: 'he',
        name: 'Hebrew',
        nativeName: 'עברית'
    },
    {
        code: 'hi',
        name: 'Hindi',
        nativeName: 'हिन्दी'
    },
    {
        code: 'hu',
        name: 'Hungarian',
        nativeName: 'Magyar'
    },
    {
        code: 'id',
        name: 'Indonesian',
        nativeName: 'Bahasa Indonesia'
    },
    {
        code: 'it',
        name: 'Italian',
        nativeName: 'Italiano'
    },
    {
        code: 'ja',
        name: 'Japanese',
        nativeName: '日本語'
    },
    {
        code: 'ko',
        name: 'Korean',
        nativeName: '한국어'
    },
    {
        code: 'lt',
        name: 'Lithuanian',
        nativeName: 'Lietuvių'
    },
    {
        code: 'lv',
        name: 'Latvian',
        nativeName: 'Latviešu'
    },
    {
        code: 'nl',
        name: 'Dutch',
        nativeName: 'Nederlands'
    },
    {
        code: 'pl',
        name: 'Polish',
        nativeName: 'Polski'
    },
    {
        code: 'pt',
        name: 'Portuguese',
        nativeName: 'Português'
    },
    {
        code: 'ro',
        name: 'Romanian',
        nativeName: 'Română'
    },
    {
        code: 'ru',
        name: 'Russian',
        nativeName: 'Русский'
    },
    {
        code: 'sk',
        name: 'Slovak',
        nativeName: 'Slovenčina'
    },
    {
        code: 'sl',
        name: 'Slovenian',
        nativeName: 'Slovenščina'
    },
    {
        code: 'sv',
        name: 'Swedish',
        nativeName: 'Svenska'
    },
    {
        code: 'tr',
        name: 'Turkish',
        nativeName: 'Türkçe'
    },
    {
        code: 'uk',
        name: 'Ukrainian',
        nativeName: 'Українська'
    },
    {
        code: 'zh',
        name: 'Chinese',
        nativeName: '中文'
    }
].sort(function(left, right) {
    return left.name.localeCompare(right.name);
});
function getApiBaseUrl() {
    return STORE$1.get('apiBaseUrl', DEFAULT_API_BASE_URL);
}
function readTokens() {
    var accessToken = STORE$1.get('accessToken', '');
    var refreshToken = STORE$1.get('refreshToken', '');
    var expiresAt = STORE$1.get('expiresAt', 0);
    if (!accessToken || !refreshToken || !expiresAt) return null;
    return {
        accessToken: accessToken,
        refreshToken: refreshToken,
        expiresAt: expiresAt
    };
}
function writeTokens(tokens) {
    STORE$1.set('accessToken', tokens.accessToken);
    STORE$1.set('refreshToken', tokens.refreshToken);
    STORE$1.set('expiresAt', tokens.expiresAt);
}
function storeSessionTokens(tokens) {
    writeTokens(tokens);
}
function hasRefreshToken() {
    return typeof STORE$1.get('refreshToken', '') === 'string' && STORE$1.get('refreshToken', '').length > 0;
}
function clearTokens() {
    STORE$1.remove('accessToken');
    STORE$1.remove('refreshToken');
    STORE$1.remove('expiresAt');
}
function getSourceLanguage() {
    return STORE$1.get('sourceLanguage', DEFAULT_SOURCE_LANGUAGE);
}
function getTargetLanguage() {
    return STORE$1.get('targetLanguage', DEFAULT_TARGET_LANGUAGE);
}
function setSourceLanguage(code) {
    STORE$1.set('sourceLanguage', code);
}
function setTargetLanguage(code) {
    STORE$1.set('targetLanguage', code);
}
function getApiBaseUrlSetting() {
    return STORE$1.get('apiBaseUrl', DEFAULT_API_BASE_URL);
}
function refreshSessionTokens() {
    return _async_to_generator$3(function() {
        var refreshToken, response, reason, data, next;
        return _ts_generator$3(this, function(_state) {
            switch(_state.label){
                case 0:
                    refreshToken = STORE$1.get('refreshToken', '');
                    if (!refreshToken) {
                        throw new Error('No refresh token configured. Open plugin settings and complete login.');
                    }
                    return [
                        4,
                        fetch("".concat(getApiBaseUrl(), "/auth/refresh"), {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                refreshToken: refreshToken
                            })
                        })
                    ];
                case 1:
                    response = _state.sent();
                    if (!!response.ok) return [
                        3,
                        3
                    ];
                    if (response.status === 401) clearTokens();
                    return [
                        4,
                        response.text().catch(function() {
                            return 'refresh failed';
                        })
                    ];
                case 2:
                    reason = _state.sent();
                    throw new Error("Auth refresh failed (".concat(response.status, "): ").concat(reason));
                case 3:
                    return [
                        4,
                        response.json()
                    ];
                case 4:
                    data = _state.sent();
                    if (!data.accessToken || !data.refreshToken || typeof data.expiresIn !== 'number') {
                        throw new Error('Auth refresh returned an invalid payload.');
                    }
                    next = {
                        accessToken: data.accessToken,
                        refreshToken: data.refreshToken,
                        expiresAt: Date.now() + data.expiresIn * 1000
                    };
                    writeTokens(next);
                    return [
                        2,
                        next
                    ];
            }
        });
    })();
}
function getValidAccessToken() {
    return _async_to_generator$3(function() {
        var current, refreshed;
        return _ts_generator$3(this, function(_state) {
            switch(_state.label){
                case 0:
                    current = readTokens();
                    if (current && current.expiresAt - TOKEN_SKEW_MS > Date.now()) {
                        return [
                            2,
                            current.accessToken
                        ];
                    }
                    return [
                        4,
                        refreshSessionTokens()
                    ];
                case 1:
                    refreshed = _state.sent();
                    return [
                        2,
                        refreshed.accessToken
                    ];
            }
        });
    })();
}
function listLanguages() {
    return _async_to_generator$3(function() {
        return _ts_generator$3(this, function(_state) {
            return [
                2,
                TRANSLATION_LANGUAGES
            ];
        });
    })();
}
function translateText(text) {
    return _async_to_generator$3(function() {
        var requestBody, requestOnce, token, response, reason, data, first;
        return _ts_generator$3(this, function(_state) {
            switch(_state.label){
                case 0:
                    if (!text.trim()) {
                        throw new Error('Message is empty.');
                    }
                    requestBody = {
                        q: text,
                        source: getSourceLanguage(),
                        target: getTargetLanguage()
                    };
                    requestOnce = function requestOnce(token) {
                        return _async_to_generator$3(function() {
                            return _ts_generator$3(this, function(_state) {
                                return [
                                    2,
                                    fetch("".concat(getApiBaseUrl(), "/translate"), {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json',
                                            Authorization: "Bearer ".concat(token)
                                        },
                                        body: JSON.stringify(requestBody)
                                    })
                                ];
                            });
                        })();
                    };
                    return [
                        4,
                        getValidAccessToken()
                    ];
                case 1:
                    token = _state.sent();
                    return [
                        4,
                        requestOnce(token)
                    ];
                case 2:
                    response = _state.sent();
                    if (!(response.status === 401)) return [
                        3,
                        5
                    ];
                    return [
                        4,
                        refreshSessionTokens()
                    ];
                case 3:
                    token = _state.sent().accessToken;
                    return [
                        4,
                        requestOnce(token)
                    ];
                case 4:
                    response = _state.sent();
                    _state.label = 5;
                case 5:
                    if (!!response.ok) return [
                        3,
                        7
                    ];
                    return [
                        4,
                        response.text().catch(function() {
                            return 'translation failed';
                        })
                    ];
                case 6:
                    reason = _state.sent();
                    throw new Error("Translate failed (".concat(response.status, "): ").concat(reason));
                case 7:
                    return [
                        4,
                        response.json()
                    ];
                case 8:
                    data = _state.sent();
                    if ('translatedText' in data && typeof data.translatedText === 'string') {
                        return [
                            2,
                            data.translatedText
                        ];
                    }
                    if ('translations' in data && Array.isArray(data.translations) && data.translations.length > 0) {
                        first = data.translations[0];
                        if (typeof (first === null || first === void 0 ? void 0 : first.translatedText) === 'string') return [
                            2,
                            first.translatedText
                        ];
                        if (typeof (first === null || first === void 0 ? void 0 : first.text) === 'string') return [
                            2,
                            first.text
                        ];
                    }
                    throw new Error('Translation API returned an unexpected payload.');
            }
        });
    })();
}function _array_like_to_array$3(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _array_with_holes$3(arr) {
    if (Array.isArray(arr)) return arr;
}
function asyncGeneratorStep$2(gen, resolve, reject, _next, _throw, key, arg) {
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
function _async_to_generator$2(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                asyncGeneratorStep$2(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                asyncGeneratorStep$2(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}
function _instanceof$3(left, right) {
    "@swc/helpers - instanceof";
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
        return !!right[Symbol.hasInstance](left);
    } else return left instanceof right;
}
function _iterable_to_array_limit$3(arr, i) {
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
function _non_iterable_rest$3() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _sliced_to_array$3(arr, i) {
    return _array_with_holes$3(arr) || _iterable_to_array_limit$3(arr, i) || _unsupported_iterable_to_array$3(arr, i) || _non_iterable_rest$3();
}
function _ts_generator$2(thisArg, body) {
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
function _unsupported_iterable_to_array$3(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _array_like_to_array$3(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _array_like_to_array$3(o, minLen);
}
var Patcher = window.unbound.patcher.createPatcher('unbound.translate');
var TRANSLATE_ROW_KEY = 'unbound-translate';
function typeName(node) {
    var _ref, _ref1;
    var type = node === null || node === void 0 ? void 0 : node.type;
    if (typeof type === 'string') return type;
    return (_ref = (_ref1 = type === null || type === void 0 ? void 0 : type.name) !== null && _ref1 !== void 0 ? _ref1 : type === null || type === void 0 ? void 0 : type.displayName) !== null && _ref !== void 0 ? _ref : null;
}
function findInTree(node, predicate) {
    var depth = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0;
    var _element_props;
    if (depth > 15 || !node || (typeof node === "undefined" ? "undefined" : _type_of$1(node)) !== 'object') return null;
    if (Array.isArray(node)) {
        var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
        try {
            for(var _iterator = node[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                var child = _step.value;
                var found = findInTree(child, predicate, depth + 1);
                if (found) return found;
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
    var element = node;
    if (predicate(element)) return element;
    return findInTree(element === null || element === void 0 ? void 0 : (_element_props = element.props) === null || _element_props === void 0 ? void 0 : _element_props.children, predicate, depth + 1);
}
function showError(error) {
    window.unbound.toasts.showToast({
        title: 'Translate Error',
        content: _instanceof$3(error, Error) ? error.message : String(error)
    });
}
function translateMessage(message) {
    return _async_to_generator$2(function() {
        var _metro_common, content, translated, clipboard;
        return _ts_generator$2(this, function(_state) {
            switch(_state.label){
                case 0:
                    content = typeof message.content === 'string' ? message.content : '';
                    if (!content.trim()) {
                        window.unbound.toasts.showToast({
                            title: 'Translate',
                            content: 'Message has no text to translate.'
                        });
                        return [
                            2
                        ];
                    }
                    return [
                        4,
                        translateText(content)
                    ];
                case 1:
                    translated = _state.sent();
                    clipboard = window.unbound.metro === null || window.unbound.metro === void 0 ? void 0 : (_metro_common = window.unbound.metro.common) === null || _metro_common === void 0 ? void 0 : _metro_common.Clipboard;
                    if (!clipboard || typeof clipboard.setString !== 'function') {
                        window.unbound.toasts.showToast({
                            title: 'Translate Error',
                            content: 'Clipboard API is unavailable.'
                        });
                        return [
                            2
                        ];
                    }
                    return [
                        4,
                        clipboard.setString(translated)
                    ];
                case 2:
                    _state.sent();
                    window.unbound.toasts.showToast({
                        title: 'Translated',
                        content: translated
                    });
                    return [
                        2
                    ];
            }
        });
    })();
}
var patchedInstances = new WeakSet();
function startTranslateMenuPatch() {
    var _metro_findByProps;
    if (typeof (window.unbound.metro === null || window.unbound.metro === void 0 ? void 0 : window.unbound.metro.findByProps) !== 'function') return;
    var sheetsHost = window.unbound.metro.findByProps('openLazy', 'hideActionSheet');
    var ActionSheetRow = (_metro_findByProps = window.unbound.metro.findByProps('ActionSheetRow')) === null || _metro_findByProps === void 0 ? void 0 : _metro_findByProps.ActionSheetRow;
    if (!(sheetsHost === null || sheetsHost === void 0 ? void 0 : sheetsHost.openLazy) || !ActionSheetRow) return;
    var currentMessage = null;
    var currentKey = null;
    Patcher.before(sheetsHost, 'openLazy', function(ctx) {
        var _ctx_args = _sliced_to_array$3(ctx.args, 3), componentPromise = _ctx_args[0], key = _ctx_args[1], extra = _ctx_args[2];
        if (typeof key !== 'string' || !key.endsWith('MessageLongPressActionSheet') || !(componentPromise === null || componentPromise === void 0 ? void 0 : componentPromise.then)) return;
        if (extra === null || extra === void 0 ? void 0 : extra.message) currentMessage = extra.message;
        currentKey = key;
        componentPromise.then(function(instance) {
            if (!instance || patchedInstances.has(instance)) return;
            patchedInstances.add(instance);
            Patcher.after(instance, 'default', function(param) {
                var result = param.result;
                var _assets_getIDByName;
                var _rowGroup_props, _assets_Icons;
                var message = currentMessage;
                if (!message || typeof message.content !== 'string' || !message.content.trim()) return result;
                var rowGroup = findInTree(result, function(node) {
                    return typeName(node) === 'ActionSheetRowGroup';
                });
                var rows = rowGroup === null || rowGroup === void 0 ? void 0 : (_rowGroup_props = rowGroup.props) === null || _rowGroup_props === void 0 ? void 0 : _rowGroup_props.children;
                if (!(rowGroup === null || rowGroup === void 0 ? void 0 : rowGroup.props) || !Array.isArray(rows)) return result;
                if (rows.some(function(row) {
                    return (row === null || row === void 0 ? void 0 : row.key) === TRANSLATE_ROW_KEY;
                })) return result;
                var action = function action() {
                    var _sheetsHost_hideActionSheet;
                    if (currentKey) (_sheetsHost_hideActionSheet = sheetsHost.hideActionSheet) === null || _sheetsHost_hideActionSheet === void 0 ? void 0 : _sheetsHost_hideActionSheet.call(sheetsHost, currentKey);
                    void translateMessage(message).catch(showError);
                };
                var iconId = (_assets_getIDByName = window.unbound.assets.getIDByName('LanguageIcon')) !== null && _assets_getIDByName !== void 0 ? _assets_getIDByName : (_assets_Icons = window.unbound.assets.Icons) === null || _assets_Icons === void 0 ? void 0 : _assets_Icons.LanguageIcon;
                var translateRow = window.unbound.metro.common.React.createElement(ActionSheetRow, {
                    key: TRANSLATE_ROW_KEY,
                    label: 'Translate',
                    icon: iconId ? window.unbound.metro.common.React.createElement(ActionSheetRow.Icon, {
                        source: iconId
                    }) : undefined,
                    onPress: action
                });
                rows.splice(1, 0, translateRow);
                return result;
            });
        }).catch(function() {
            return undefined;
        });
    });
}
function stopTranslateMenuPatch() {
    Patcher.unpatchAll();
}function _array_like_to_array$2(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _array_with_holes$2(arr) {
    if (Array.isArray(arr)) return arr;
}
function asyncGeneratorStep$1(gen, resolve, reject, _next, _throw, key, arg) {
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
function _async_to_generator$1(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                asyncGeneratorStep$1(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                asyncGeneratorStep$1(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}
function _instanceof$2(left, right) {
    "@swc/helpers - instanceof";
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
        return !!right[Symbol.hasInstance](left);
    } else return left instanceof right;
}
function _iterable_to_array_limit$2(arr, i) {
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
function _non_iterable_rest$2() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _sliced_to_array$2(arr, i) {
    return _array_with_holes$2(arr) || _iterable_to_array_limit$2(arr, i) || _unsupported_iterable_to_array$2(arr, i) || _non_iterable_rest$2();
}
function _ts_generator$1(thisArg, body) {
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
function _type_of(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
function _unsupported_iterable_to_array$2(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _array_like_to_array$2(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _array_like_to_array$2(o, minLen);
}
function findOAuth2AuthorizeModal() {
    if (typeof (window.unbound.metro === null || window.unbound.metro === void 0 ? void 0 : window.unbound.metro.findByProps) === 'function') {
        var byProp = window.unbound.metro.findByProps('OAuth2AuthorizeModal');
        if (byProp === null || byProp === void 0 ? void 0 : byProp.OAuth2AuthorizeModal) return byProp.OAuth2AuthorizeModal;
    }
    if (typeof (window.unbound.metro === null || window.unbound.metro === void 0 ? void 0 : window.unbound.metro.findByName) === 'function') {
        return window.unbound.metro.findByName('OAuth2AuthorizeModal');
    }
    return null;
}
function getQueryParam(url, key) {
    var queryIndex = url.indexOf('?');
    if (queryIndex < 0) return null;
    var query = url.slice(queryIndex + 1);
    if (!query) return null;
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
    try {
        for(var _iterator = query.split('&')[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
            var part = _step.value;
            var _part_split = _sliced_to_array$2(part.split('='), 2), rawKey = _part_split[0], tmp = _part_split[1], rawValue = tmp === void 0 ? '' : tmp;
            if (decodeURIComponent(rawKey !== null && rawKey !== void 0 ? rawKey : '') !== key) continue;
            return decodeURIComponent(rawValue.replace(/\+/g, ' '));
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
function getOAuthError(url) {
    var error = getQueryParam(url, 'error');
    var description = getQueryParam(url, 'error_description');
    if (description) return description;
    if (error) return error;
    return null;
}
function getOAuthLocation(result) {
    if (typeof result === 'string') return result;
    if (!result || (typeof result === "undefined" ? "undefined" : _type_of(result)) !== 'object') return null;
    var value = result;
    for(var _i = 0, _iter = [
        value.location,
        value.url,
        value.redirectUrl,
        value.redirectURL
    ]; _i < _iter.length; _i++){
        var location = _iter[_i];
        if (typeof location === 'string') return location;
    }
    return null;
}
function handleAuthResult(location, redirectUri) {
    return _async_to_generator$1(function() {
        var errorCode, _getOAuthError, code, state, result, raw, payload, error;
        return _ts_generator$1(this, function(_state) {
            switch(_state.label){
                case 0:
                    errorCode = getQueryParam(location, 'error');
                    if (errorCode) {
                        if (errorCode !== 'access_denied') {
                            window.unbound.toasts.showToast({
                                title: 'Translate',
                                content: (_getOAuthError = getOAuthError(location)) !== null && _getOAuthError !== void 0 ? _getOAuthError : errorCode
                            });
                        }
                        return [
                            2
                        ];
                    }
                    if (!location.startsWith(redirectUri)) return [
                        2
                    ];
                    code = getQueryParam(location, 'code');
                    state = getQueryParam(location, 'state');
                    if (!code || !state) return [
                        2
                    ];
                    _state.label = 1;
                case 1:
                    _state.trys.push([
                        1,
                        4,
                        ,
                        5
                    ]);
                    return [
                        4,
                        fetch(location, {
                            headers: {
                                Accept: 'application/json'
                            }
                        })
                    ];
                case 2:
                    result = _state.sent();
                    return [
                        4,
                        result.text()
                    ];
                case 3:
                    raw = _state.sent();
                    payload = null;
                    try {
                        payload = JSON.parse(raw);
                    } catch (unused) {
                        if (!result.ok) {
                            throw new Error(raw.trim() || 'Discord login failed.');
                        }
                        throw new Error('Discord login returned an invalid payload.');
                    }
                    if (!result.ok) {
                        throw new Error(typeof (payload === null || payload === void 0 ? void 0 : payload.error) === 'string' ? payload.error : 'Discord login failed.');
                    }
                    if (typeof (payload === null || payload === void 0 ? void 0 : payload.accessToken) !== 'string' || typeof (payload === null || payload === void 0 ? void 0 : payload.refreshToken) !== 'string' || typeof (payload === null || payload === void 0 ? void 0 : payload.expiresIn) !== 'number') {
                        throw new Error('Discord login returned an invalid payload.');
                    }
                    storeSessionTokens({
                        accessToken: payload.accessToken,
                        refreshToken: payload.refreshToken,
                        expiresAt: Date.now() + payload.expiresIn * 1000
                    });
                    window.unbound.toasts.showToast({
                        title: 'Translate',
                        content: 'Discord login completed.'
                    });
                    return [
                        3,
                        5
                    ];
                case 4:
                    error = _state.sent();
                    window.unbound.toasts.showToast({
                        title: 'Translate',
                        content: _instanceof$2(error, Error) ? error.message : String(error)
                    });
                    return [
                        3,
                        5
                    ];
                case 5:
                    return [
                        2
                    ];
            }
        });
    })();
}
function openDiscordLoginFlow(onSettled) {
    if (typeof (window.unbound.metro === null || window.unbound.metro === void 0 ? void 0 : window.unbound.metro.findByProps) !== 'function') {
        window.unbound.toasts.showToast({
            title: 'Translate',
            content: 'OAuth is unavailable.'
        });
        onSettled === null || onSettled === void 0 ? void 0 : onSettled();
        return;
    }
    void function() {
        return _async_to_generator$1(function() {
            var _response_headers_get, _response_headers, modals, OAuth2AuthorizeModal, response, authorizeUrl, clientId, state, redirectUri, key, completed, complete, error;
            return _ts_generator$1(this, function(_state) {
                switch(_state.label){
                    case 0:
                        _state.trys.push([
                            0,
                            2,
                            ,
                            3
                        ]);
                        modals = window.unbound.metro.findByProps('pushModal', 'popModal');
                        OAuth2AuthorizeModal = findOAuth2AuthorizeModal();
                        if (!(modals === null || modals === void 0 ? void 0 : modals.pushModal) || !(modals === null || modals === void 0 ? void 0 : modals.popModal) || !OAuth2AuthorizeModal) {
                            window.unbound.toasts.showToast({
                                title: 'Translate',
                                content: 'OAuth modal is unavailable.'
                            });
                            onSettled === null || onSettled === void 0 ? void 0 : onSettled();
                            return [
                                2
                            ];
                        }
                        return [
                            4,
                            fetch("".concat(getApiBaseUrlSetting(), "/auth/login"), {
                                method: 'GET',
                                redirect: 'manual'
                            })
                        ];
                    case 1:
                        response = _state.sent();
                        authorizeUrl = typeof ((_response_headers = response.headers) === null || _response_headers === void 0 ? void 0 : _response_headers.get) === 'function' ? (_response_headers_get = response.headers.get('location')) !== null && _response_headers_get !== void 0 ? _response_headers_get : response.url : response.url;
                        clientId = getQueryParam(authorizeUrl, 'client_id');
                        state = getQueryParam(authorizeUrl, 'state');
                        redirectUri = "".concat(getApiBaseUrlSetting(), "/auth/callback");
                        if (!clientId || !state) {
                            window.unbound.toasts.showToast({
                                title: 'Translate',
                                content: 'OAuth configuration is incomplete.'
                            });
                            onSettled === null || onSettled === void 0 ? void 0 : onSettled();
                            return [
                                2
                            ];
                        }
                        key = 'unbound-translate-oauth2-authorize';
                        completed = false;
                        complete = function complete(result) {
                            var _modals_popModal;
                            if (completed) return;
                            completed = true;
                            var location = getOAuthLocation(result);
                            (_modals_popModal = modals.popModal) === null || _modals_popModal === void 0 ? void 0 : _modals_popModal.call(modals, key);
                            if (!location) {
                                onSettled === null || onSettled === void 0 ? void 0 : onSettled();
                                return;
                            }
                            void handleAuthResult(location, redirectUri).finally(onSettled);
                        };
                        modals.pushModal({
                            key: key,
                            closable: true,
                            modal: {
                                key: key,
                                modal: OAuth2AuthorizeModal,
                                animation: 'slide-up',
                                shouldPersistUnderModals: false,
                                props: {
                                    clientId: clientId,
                                    redirectUri: redirectUri,
                                    state: state,
                                    scopes: [
                                        'identify',
                                        'email',
                                        'guilds'
                                    ],
                                    responseType: 'code',
                                    permissions: 0n,
                                    cancelCompletesFlow: false,
                                    callback: complete,
                                    onClose: complete,
                                    dismissOAuthModal: function dismissOAuthModal() {
                                        var _modals_popModal;
                                        return (_modals_popModal = modals.popModal) === null || _modals_popModal === void 0 ? void 0 : _modals_popModal.call(modals, key);
                                    }
                                }
                            }
                        });
                        return [
                            3,
                            3
                        ];
                    case 2:
                        error = _state.sent();
                        window.unbound.toasts.showToast({
                            title: 'Translate',
                            content: _instanceof$2(error, Error) ? error.message : 'Connect flow failed unexpectedly.'
                        });
                        onSettled === null || onSettled === void 0 ? void 0 : onSettled();
                        return [
                            3,
                            3
                        ];
                    case 3:
                        return [
                            2
                        ];
                }
            });
        })();
    }();
}function _array_like_to_array$1(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _array_with_holes$1(arr) {
    if (Array.isArray(arr)) return arr;
}
function _array_without_holes(arr) {
    if (Array.isArray(arr)) return _array_like_to_array$1(arr);
}
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
function _instanceof$1(left, right) {
    "@swc/helpers - instanceof";
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
        return !!right[Symbol.hasInstance](left);
    } else return left instanceof right;
}
function _iterable_to_array(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) {
        return Array.from(iter);
    }
}
function _iterable_to_array_limit$1(arr, i) {
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
function _non_iterable_rest$1() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _non_iterable_spread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _sliced_to_array$1(arr, i) {
    return _array_with_holes$1(arr) || _iterable_to_array_limit$1(arr, i) || _unsupported_iterable_to_array$1(arr, i) || _non_iterable_rest$1();
}
function _to_consumable_array(arr) {
    return _array_without_holes(arr) || _iterable_to_array(arr) || _unsupported_iterable_to_array$1(arr) || _non_iterable_spread();
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
function _unsupported_iterable_to_array$1(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _array_like_to_array$1(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _array_like_to_array$1(o, minLen);
}
function getDesignModule() {
    var _metro_components;
    var discord = window.unbound.metro === null || window.unbound.metro === void 0 ? void 0 : (_metro_components = window.unbound.metro.components) === null || _metro_components === void 0 ? void 0 : _metro_components.Discord;
    if ((discord === null || discord === void 0 ? void 0 : discord.ActionSheet) && (discord === null || discord === void 0 ? void 0 : discord.TextField) && (discord === null || discord === void 0 ? void 0 : discord.ActionSheetRow)) return discord;
    if (typeof (window.unbound.metro === null || window.unbound.metro === void 0 ? void 0 : window.unbound.metro.findByProps) === 'function') {
        var found = window.unbound.metro.findByProps('ActionSheet', 'TextField', 'ActionSheetRow');
        if ((found === null || found === void 0 ? void 0 : found.ActionSheet) && (found === null || found === void 0 ? void 0 : found.TextField) && (found === null || found === void 0 ? void 0 : found.ActionSheetRow)) return found;
    }
    return null;
}
function languageLabel(language) {
    return language.nativeName && language.nativeName !== language.name ? "".concat(language.name, " (").concat(language.nativeName, ")") : language.name;
}
function LanguagePickerSheet(param) {
    var title = param.title, includeAuto = param.includeAuto, current = param.current, onSelect = param.onSelect, onClose = param.onClose;
    var _ref, _assets_getIDByName, _Discord_ActionSheetRowGroup;
    var _assets_Icons;
    var ReactNative = window.unbound.metro.common.ReactNative;
    var Discord = getDesignModule();
    var _useState = _sliced_to_array$1(window.React.useState(''), 2), query = _useState[0], setQuery = _useState[1];
    var _useState1 = _sliced_to_array$1(window.React.useState([]), 2), languages = _useState1[0], setLanguages = _useState1[1];
    var _useState2 = _sliced_to_array$1(window.React.useState(null), 2), error = _useState2[0], setError = _useState2[1];
    window.React.useEffect(function() {
        var cancelled = false;
        void function() {
            return _async_to_generator(function() {
                var loaded, err;
                return _ts_generator(this, function(_state) {
                    switch(_state.label){
                        case 0:
                            _state.trys.push([
                                0,
                                2,
                                ,
                                3
                            ]);
                            return [
                                4,
                                listLanguages()
                            ];
                        case 1:
                            loaded = _state.sent();
                            if (!cancelled) setLanguages(loaded);
                            return [
                                3,
                                3
                            ];
                        case 2:
                            err = _state.sent();
                            if (!cancelled) setError(_instanceof$1(err, Error) ? err.message : String(err));
                            return [
                                3,
                                3
                            ];
                        case 3:
                            return [
                                2
                            ];
                    }
                });
            })();
        }();
        return function() {
            cancelled = true;
        };
    }, []);
    var rows = window.React.useMemo(function() {
        var normalizedQuery = query.trim().toLowerCase();
        var matches = languages.filter(function(language) {
            var _language_nativeName;
            if (!normalizedQuery) return true;
            return language.code.toLowerCase().includes(normalizedQuery) || language.name.toLowerCase().includes(normalizedQuery) || ((_language_nativeName = language.nativeName) === null || _language_nativeName === void 0 ? void 0 : _language_nativeName.toLowerCase().includes(normalizedQuery));
        });
        return includeAuto ? [
            {
                code: 'auto',
                name: 'Auto detect'
            }
        ].concat(_to_consumable_array(matches)) : matches;
    }, [
        includeAuto,
        languages,
        query
    ]);
    function choose(code) {
        onSelect(code);
        onClose();
    }
    if (!(Discord === null || Discord === void 0 ? void 0 : Discord.ActionSheet) || !(Discord === null || Discord === void 0 ? void 0 : Discord.TextField) || !(Discord === null || Discord === void 0 ? void 0 : Discord.ActionSheetRow)) {
        return /*#__PURE__*/ React.createElement(ReactNative.View, {
            style: {
                padding: 16
            }
        }, /*#__PURE__*/ React.createElement(ReactNative.Text, null, "Language picker is unavailable on this client build."));
    }
    var checkIconId = (_ref = (_assets_getIDByName = window.unbound.assets.getIDByName('CheckmarkLargeIcon')) !== null && _assets_getIDByName !== void 0 ? _assets_getIDByName : window.unbound.assets.getIDByName('CheckIcon')) !== null && _ref !== void 0 ? _ref : (_assets_Icons = window.unbound.assets.Icons) === null || _assets_Icons === void 0 ? void 0 : _assets_Icons.CheckmarkIcon;
    var RowGroup = (_Discord_ActionSheetRowGroup = Discord.ActionSheetRowGroup) !== null && _Discord_ActionSheetRowGroup !== void 0 ? _Discord_ActionSheetRowGroup : ReactNative.View;
    var rowList = /*#__PURE__*/ React.createElement(RowGroup, null, rows.map(function(language) {
        var isSelected = language.code === current;
        return /*#__PURE__*/ React.createElement(Discord.ActionSheetRow, {
            key: language.code,
            label: language.code === 'auto' ? 'Auto detect' : languageLabel(language),
            subLabel: language.code,
            icon: isSelected && checkIconId ? /*#__PURE__*/ React.createElement(Discord.ActionSheetRow.Icon, {
                source: checkIconId
            }) : undefined,
            onPress: function onPress() {
                return choose(language.code);
            }
        });
    }), !error && rows.length === 0 ? /*#__PURE__*/ React.createElement(Discord.ActionSheetRow, {
        label: "No matches",
        onPress: onClose
    }) : null);
    return /*#__PURE__*/ React.createElement(Discord.ActionSheet, null, Discord.Text ? /*#__PURE__*/ React.createElement(Discord.Text, {
        variant: "heading-lg/semibold",
        style: {
            paddingHorizontal: 16,
            paddingTop: 8,
            paddingBottom: 12
        }
    }, title) : null, /*#__PURE__*/ React.createElement(ReactNative.View, {
        style: {
            paddingHorizontal: 16,
            paddingBottom: 12
        }
    }, /*#__PURE__*/ React.createElement(Discord.TextField, {
        size: "md",
        value: query,
        onChange: setQuery,
        isClearable: true,
        isRound: true,
        placeholder: "Search languages"
    })), error ? /*#__PURE__*/ React.createElement(Discord.ActionSheetRow, {
        label: error,
        onPress: onClose
    }) : rowList);
}var SETTINGS_SPACING = {
    outer: 16,
    section: 24,
    card: 16,
    rowGap: 10,
    touchTarget: 48
};
function getSettingsColors() {
    var _ref;
    var _metro_common_Theme;
    var colors = (_ref = (_metro_common_Theme = window.unbound.metro.common.Theme) === null || _metro_common_Theme === void 0 ? void 0 : _metro_common_Theme.colors) !== null && _ref !== void 0 ? _ref : {};
    var color = function color(key, fallback) {
        return typeof colors[key] === 'string' ? colors[key] : fallback;
    };
    return {
        page: color('BACKGROUND_MOBILE_PRIMARY', color('BACKGROUND_PRIMARY', '#111214')),
        surface: color('BACKGROUND_SECONDARY', '#1e1f22'),
        input: color('BACKGROUND_TERTIARY', '#111214'),
        border: color('BACKGROUND_MODIFIER_ACCENT', '#4e5058'),
        text: color('TEXT_NORMAL', '#f2f3f5'),
        muted: color('TEXT_MUTED', '#b5bac1'),
        accent: color('BRAND_500', '#5865f2'),
        danger: color('RED_400', '#ed4245')
    };
}
function SettingsScrollView(param) {
    var children = param.children, onTouchStart = param.onTouchStart;
    var ReactNative = window.unbound.metro.common.ReactNative;
    var colors = getSettingsColors();
    return /*#__PURE__*/ React.createElement(ReactNative.ScrollView, {
        contentContainerStyle: {
            backgroundColor: colors.page,
            gap: SETTINGS_SPACING.section,
            padding: SETTINGS_SPACING.outer,
            paddingBottom: 32
        },
        keyboardDismissMode: onTouchStart ? 'on-drag' : 'none',
        keyboardShouldPersistTaps: "handled",
        onTouchStart: onTouchStart
    }, children);
}
function SettingsSection(param) {
    var title = param.title, children = param.children;
    var ReactNative = window.unbound.metro.common.ReactNative;
    var colors = getSettingsColors();
    return /*#__PURE__*/ React.createElement(ReactNative.View, {
        style: {
            gap: SETTINGS_SPACING.rowGap
        }
    }, /*#__PURE__*/ React.createElement(ReactNative.Text, {
        style: {
            color: colors.muted,
            fontSize: 13,
            fontWeight: '800',
            letterSpacing: 0.5,
            paddingHorizontal: 4,
            textTransform: 'uppercase'
        }
    }, title), /*#__PURE__*/ React.createElement(ReactNative.View, {
        style: {
            gap: SETTINGS_SPACING.rowGap
        }
    }, children));
}
function SettingsCard(param) {
    var children = param.children;
    var ReactNative = window.unbound.metro.common.ReactNative;
    var colors = getSettingsColors();
    return /*#__PURE__*/ React.createElement(ReactNative.View, {
        style: {
            backgroundColor: colors.surface,
            borderColor: colors.border,
            borderRadius: 14,
            borderWidth: 1,
            padding: SETTINGS_SPACING.card
        }
    }, children);
}
function SettingsRow(param) {
    var label = param.label, description = param.description, onPress = param.onPress, disabled = param.disabled, trailing = param.trailing, arrow = param.arrow;
    var ReactNative = window.unbound.metro.common.ReactNative;
    var colors = getSettingsColors();
    var trailingContent = trailing !== undefined && trailing !== null ? typeof trailing === 'string' || typeof trailing === 'number' ? /*#__PURE__*/ React.createElement(ReactNative.Text, {
        style: {
            color: colors.accent,
            fontSize: 18,
            fontWeight: '800'
        }
    }, trailing) : trailing : arrow ? /*#__PURE__*/ React.createElement(ReactNative.Text, {
        style: {
            color: colors.muted,
            fontSize: 26,
            lineHeight: 26
        }
    }, "›") : null;
    var content = /*#__PURE__*/ React.createElement(ReactNative.View, {
        style: {
            alignItems: 'center',
            flexDirection: 'row',
            gap: 12,
            minHeight: SETTINGS_SPACING.touchTarget
        }
    }, /*#__PURE__*/ React.createElement(ReactNative.View, {
        style: {
            flex: 1,
            gap: 4
        }
    }, /*#__PURE__*/ React.createElement(ReactNative.Text, {
        style: {
            color: colors.text,
            fontSize: 16,
            fontWeight: '700'
        }
    }, label), description ? /*#__PURE__*/ React.createElement(ReactNative.Text, {
        style: {
            color: colors.muted,
            fontSize: 14,
            lineHeight: 19
        }
    }, description) : null), trailingContent);
    if (!onPress) return /*#__PURE__*/ React.createElement(SettingsCard, null, content);
    return /*#__PURE__*/ React.createElement(ReactNative.Pressable, {
        disabled: disabled,
        onPress: onPress,
        style: function style(param) {
            var pressed = param.pressed;
            return {
                opacity: disabled ? 0.45 : pressed ? 0.7 : 1
            };
        }
    }, /*#__PURE__*/ React.createElement(SettingsCard, null, content));
}function _array_like_to_array(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _array_with_holes(arr) {
    if (Array.isArray(arr)) return arr;
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
function _sliced_to_array(arr, i) {
    return _array_with_holes(arr) || _iterable_to_array_limit(arr, i) || _unsupported_iterable_to_array(arr, i) || _non_iterable_rest();
}
function _unsupported_iterable_to_array(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _array_like_to_array(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _array_like_to_array(o, minLen);
}
var STORE = window.unbound.storage.getStore('unbound.translate');
function openLanguageSheet(options) {
    var sheets = typeof (window.unbound.metro === null || window.unbound.metro === void 0 ? void 0 : window.unbound.metro.findByProps) === 'function' ? window.unbound.metro.findByProps('openLazy', 'hideActionSheet') : null;
    if (!sheets) {
        window.unbound.toasts.showToast({
            title: 'Translate',
            content: 'Language picker is unavailable.'
        });
        return;
    }
    var key = "unbound-translate-".concat(options.title, "-").concat(options.current);
    sheets.openLazy(Promise.resolve({
        default: LanguagePickerSheet
    }), key, {
        title: options.title,
        current: options.current,
        includeAuto: options.includeAuto,
        onSelect: options.onSelect,
        onClose: function onClose() {
            return sheets.hideActionSheet(key);
        }
    });
}
function TranslateSettingsScreen() {
    var state = STORE.useSettingsStore();
    var refreshConfigured = hasRefreshToken() || !!state.get('refreshToken', '');
    var targetLanguage = getTargetLanguage();
    var sourceLanguage = getSourceLanguage();
    var _useState = _sliced_to_array(window.React.useState(false), 2), connecting = _useState[0], setConnecting = _useState[1];
    return /*#__PURE__*/ React.createElement(SettingsScrollView, null, /*#__PURE__*/ React.createElement(SettingsSection, {
        title: "Translate API"
    }, /*#__PURE__*/ React.createElement(SettingsRow, {
        label: connecting ? 'Connecting Discord account…' : refreshConfigured ? 'Reconnect Discord account' : 'Connect Discord account',
        description: connecting ? 'Finishing Discord authorization' : refreshConfigured ? 'Re-authenticate with Discord' : 'Sign in to enable translation',
        disabled: connecting,
        onPress: function onPress() {
            setConnecting(true);
            openDiscordLoginFlow(function() {
                return setConnecting(false);
            });
        }
    })), /*#__PURE__*/ React.createElement(SettingsSection, {
        title: "Languages"
    }, /*#__PURE__*/ React.createElement(SettingsRow, {
        label: "Source Language",
        description: sourceLanguage,
        arrow: true,
        disabled: !refreshConfigured,
        onPress: function onPress() {
            return refreshConfigured && openLanguageSheet({
                title: 'Select source language',
                current: sourceLanguage,
                includeAuto: true,
                onSelect: setSourceLanguage
            });
        }
    }), /*#__PURE__*/ React.createElement(SettingsRow, {
        label: "Target Language",
        description: targetLanguage,
        arrow: true,
        disabled: !refreshConfigured,
        onPress: function onPress() {
            return refreshConfigured && openLanguageSheet({
                title: 'Select target language',
                current: targetLanguage,
                onSelect: setTargetLanguage
            });
        }
    })));
}function _instanceof(left, right) {
    "@swc/helpers - instanceof";
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
        return !!right[Symbol.hasInstance](left);
    } else return left instanceof right;
}
var index = {
    start: function start() {
        try {
            startTranslateMenuPatch();
        } catch (error) {
            window.unbound.toasts.showToast({
                title: 'Translate',
                content: _instanceof(error, Error) ? error.message : String(error)
            });
        }
    },
    stop: function stop() {
        try {
            stopTranslateMenuPatch();
        } catch (unused) {}
    },
    getSettingsPanel: function getSettingsPanel() {
        return /*#__PURE__*/ React.createElement(TranslateSettingsScreen, null);
    }
};
return index;
})();return this.__plugin;},start(context){const module=this.__load();const plugin=module?.default??module;if(plugin&&typeof plugin.start==='function')return plugin.start(context);},stop(){const module=this.__load();const plugin=module?.default??module;if(plugin&&typeof plugin.stop==='function')return plugin.stop();},getSettingsPanel(...args){const module=this.__load();const plugin=module?.default??module;const settingsPanel=plugin?.getSettingsPanel??module?.getSettingsPanel;if(typeof settingsPanel==='function')return settingsPanel.apply(plugin,args);return null;}})