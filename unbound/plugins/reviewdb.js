({__plugin:null,__load(){if(this.__plugin)return this.__plugin;this.__plugin=(function () {
'use strict';
function _array_like_to_array$4(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _array_with_holes$3(arr) {
    if (Array.isArray(arr)) return arr;
}
function asyncGeneratorStep$5(gen, resolve, reject, _next, _throw, key, arg) {
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
function _async_to_generator$5(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                asyncGeneratorStep$5(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                asyncGeneratorStep$5(gen, resolve, reject, _next, _throw, "throw", err);
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
    return _array_with_holes$3(arr) || _iterable_to_array_limit$3(arr, i) || _unsupported_iterable_to_array$4(arr, i) || _non_iterable_rest$3();
}
function _ts_generator$5(thisArg, body) {
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
function _unsupported_iterable_to_array$4(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _array_like_to_array$4(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _array_like_to_array$4(o, minLen);
}
var STORE$3 = window.unbound.storage.getStore('unbound.reviewdb');
var CLIENT_ID = '915703782174752809';
var AUTH_REDIRECT_URI = 'https://manti.vendicated.dev/api/reviewdb/auth';
var CLIENT_MOD = 'enmity';
var currentUser = null;
function getCurrentUser() {
    return currentUser;
}
function setCurrentUser(user) {
    currentUser = user;
}
function getToken() {
    return STORE$3.get('token', '');
}
function hasToken() {
    return getToken().length > 0;
}
function setToken(token) {
    STORE$3.set('token', token);
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
            var _part_split = _sliced_to_array$3(part.split('='), 2), rawKey = _part_split[0], tmp = _part_split[1], rawValue = tmp === void 0 ? '' : tmp;
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
function handleAuthResult(location, onSuccess) {
    return _async_to_generator$5(function() {
        var errorCode, _getQueryParam, url, response, payload, error;
        return _ts_generator$5(this, function(_state) {
            switch(_state.label){
                case 0:
                    errorCode = getQueryParam(location, 'error');
                    if (errorCode) {
                        if (errorCode !== 'access_denied') {
                            window.unbound.toasts.showToast({
                                title: 'ReviewDB',
                                content: (_getQueryParam = getQueryParam(location, 'error_description')) !== null && _getQueryParam !== void 0 ? _getQueryParam : errorCode
                            });
                        }
                        return [
                            2
                        ];
                    }
                    if (!location.startsWith(AUTH_REDIRECT_URI)) return [
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
                    url = new URL(location);
                    url.searchParams.append('clientMod', CLIENT_MOD);
                    return [
                        4,
                        fetch(url.toString(), {
                            headers: {
                                Accept: 'application/json'
                            }
                        })
                    ];
                case 2:
                    response = _state.sent();
                    return [
                        4,
                        response.json().catch(function() {
                            return null;
                        })
                    ];
                case 3:
                    payload = _state.sent();
                    if (!response.ok) {
                        throw new Error(typeof (payload === null || payload === void 0 ? void 0 : payload.message) === 'string' ? payload.message : 'ReviewDB login failed.');
                    }
                    if (typeof (payload === null || payload === void 0 ? void 0 : payload.token) !== 'string') {
                        throw new Error('ReviewDB login returned an invalid payload.');
                    }
                    setToken(payload.token);
                    window.unbound.toasts.showToast({
                        title: 'ReviewDB',
                        content: 'Successfully authorized with ReviewDB.'
                    });
                    onSuccess === null || onSuccess === void 0 ? void 0 : onSuccess();
                    return [
                        3,
                        5
                    ];
                case 4:
                    error = _state.sent();
                    window.unbound.toasts.showToast({
                        title: 'ReviewDB',
                        content: _instanceof$1(error, Error) ? error.message : 'Authorization failed.'
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
function authorize(onSuccess) {
    if (typeof (window.unbound.metro === null || window.unbound.metro === void 0 ? void 0 : window.unbound.metro.findByProps) !== 'function') {
        window.unbound.toasts.showToast({
            title: 'ReviewDB',
            content: 'OAuth is unavailable.'
        });
        return;
    }
    var modals = window.unbound.metro.findByProps('pushModal', 'popModal');
    var OAuth2AuthorizeModal = findOAuth2AuthorizeModal();
    if (!(modals === null || modals === void 0 ? void 0 : modals.pushModal) || !(modals === null || modals === void 0 ? void 0 : modals.popModal) || !OAuth2AuthorizeModal) {
        window.unbound.toasts.showToast({
            title: 'ReviewDB',
            content: 'OAuth modal is unavailable.'
        });
        return;
    }
    var key = 'unbound-reviewdb-oauth2-authorize';
    modals.pushModal({
        key: key,
        closable: true,
        modal: {
            key: key,
            modal: OAuth2AuthorizeModal,
            animation: 'slide-up',
            shouldPersistUnderModals: false,
            props: {
                clientId: CLIENT_ID,
                redirectUri: AUTH_REDIRECT_URI,
                scopes: [
                    'identify'
                ],
                responseType: 'code',
                permissions: 0n,
                cancelCompletesFlow: false,
                callback: function callback(param) {
                    var location = param.location;
                    if (!location) return;
                    void handleAuthResult(location, onSuccess);
                },
                dismissOAuthModal: function dismissOAuthModal() {
                    var _modals_popModal;
                    return (_modals_popModal = modals.popModal) === null || _modals_popModal === void 0 ? void 0 : _modals_popModal.call(modals, key);
                }
            }
        }
    });
}function _array_like_to_array$3(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _array_without_holes$1(arr) {
    if (Array.isArray(arr)) return _array_like_to_array$3(arr);
}
function asyncGeneratorStep$4(gen, resolve, reject, _next, _throw, key, arg) {
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
function _async_to_generator$4(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                asyncGeneratorStep$4(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                asyncGeneratorStep$4(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}
function _define_property$2(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else obj[key] = value;
    return obj;
}
function _iterable_to_array$1(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) {
        return Array.from(iter);
    }
}
function _non_iterable_spread$1() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _object_spread$2(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            _define_property$2(target, key, source[key]);
        });
    }
    return target;
}
function ownKeys$2(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        keys.push.apply(keys, symbols);
    }
    return keys;
}
function _object_spread_props$2(target, source) {
    source = source != null ? source : {};
    if (Object.getOwnPropertyDescriptors) Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    else {
        ownKeys$2(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}
function _to_consumable_array$1(arr) {
    return _array_without_holes$1(arr) || _iterable_to_array$1(arr) || _unsupported_iterable_to_array$3(arr) || _non_iterable_spread$1();
}
function _ts_generator$4(thisArg, body) {
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
function _unsupported_iterable_to_array$3(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _array_like_to_array$3(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _array_like_to_array$3(o, minLen);
}
var API_URL = 'https://manti.vendicated.dev/api/reviewdb';
var REVIEWS_PER_PAGE = 50;
function showToast$1(content) {
    window.unbound.toasts.showToast({
        title: 'ReviewDB',
        content: content
    });
}
function rdbRequest(_0) {
    return _async_to_generator$4(function(path) {
        var options, headers, response, data;
        var _arguments = arguments;
        return _ts_generator$4(this, function(_state) {
            switch(_state.label){
                case 0:
                    options = _arguments.length > 1 && _arguments[1] !== void 0 ? _arguments[1] : {};
                    headers = _object_spread$2({
                        Accept: 'application/json',
                        Authorization: getToken()
                    }, options.headers);
                    if (options.body) headers['Content-Type'] = 'application/json';
                    _state.label = 1;
                case 1:
                    _state.trys.push([
                        1,
                        3,
                        ,
                        4
                    ]);
                    return [
                        4,
                        fetch("".concat(API_URL).concat(path), _object_spread_props$2(_object_spread$2({}, options), {
                            headers: headers
                        }))
                    ];
                case 2:
                    response = _state.sent();
                    return [
                        3,
                        4
                    ];
                case 3:
                    _state.sent();
                    showToast$1('Network error: Failed to connect to ReviewDB.');
                    return [
                        2,
                        null
                    ];
                case 4:
                    return [
                        4,
                        response.json().catch(function() {
                            return null;
                        })
                    ];
                case 5:
                    data = _state.sent();
                    if (!response.ok) {
                        showToast$1(typeof (data === null || data === void 0 ? void 0 : data.message) === 'string' ? data.message : "ReviewDB: Request failed with status ".concat(response.status));
                        return [
                            2,
                            null
                        ];
                    }
                    return [
                        2,
                        data
                    ];
            }
        });
    }).apply(this, arguments);
}
function getReviews(_0) {
    return _async_to_generator$4(function(id) {
        var _ref, limit, _ref_offset, offset, _ref_fetchVotes, fetchVotes, params, votesPromise, response, message, data, votes, voteByReviewId;
        var _arguments = arguments;
        return _ts_generator$4(this, function(_state) {
            switch(_state.label){
                case 0:
                    _ref = _arguments.length > 1 && _arguments[1] !== void 0 ? _arguments[1] : {}, limit = _ref.limit, _ref_offset = _ref.offset, offset = _ref_offset === void 0 ? 0 : _ref_offset, _ref_fetchVotes = _ref.fetchVotes, fetchVotes = _ref_fetchVotes === void 0 ? false : _ref_fetchVotes;
                    params = new URLSearchParams();
                    if (offset) params.append('offset', String(offset));
                    if (limit) params.append('limit', String(limit));
                    votesPromise = fetchVotes ? getReviewVotes(id).catch(function() {
                        return [];
                    }) : Promise.resolve([]);
                    _state.label = 1;
                case 1:
                    _state.trys.push([
                        1,
                        3,
                        ,
                        4
                    ]);
                    return [
                        4,
                        fetch("".concat(API_URL, "/users/").concat(id, "/reviews?").concat(params))
                    ];
                case 2:
                    response = _state.sent();
                    return [
                        3,
                        4
                    ];
                case 3:
                    _state.sent();
                    showToast$1('Network error: Failed to connect to ReviewDB.');
                    return [
                        2,
                        {
                            message: 'Network error.',
                            reviews: [],
                            updated: false,
                            hasNextPage: false,
                            reviewCount: 0,
                            hasOptedOut: false
                        }
                    ];
                case 4:
                    if (!response.ok) {
                        message = response.status === 429 ? 'You are sending requests too fast. Wait a few seconds and try again.' : 'An error occurred while fetching reviews. Please try again later.';
                        showToast$1(message);
                        return [
                            2,
                            {
                                message: message,
                                reviews: [],
                                updated: false,
                                hasNextPage: false,
                                reviewCount: 0,
                                hasOptedOut: false
                            }
                        ];
                    }
                    return [
                        4,
                        response.json()
                    ];
                case 5:
                    data = _state.sent();
                    if (!fetchVotes || data.reviews.length === 0) return [
                        2,
                        data
                    ];
                    return [
                        4,
                        votesPromise
                    ];
                case 6:
                    votes = _state.sent();
                    if (votes.length === 0) return [
                        2,
                        data
                    ];
                    voteByReviewId = new Map(votes.map(function(vote) {
                        return [
                            vote.reviewID,
                            vote.isUpvote
                        ];
                    }));
                    data.reviews = data.reviews.map(function(review) {
                        var _voteByReviewId_get;
                        return _object_spread_props$2(_object_spread$2({}, review), {
                            userVote: (_voteByReviewId_get = voteByReviewId.get(review.id)) !== null && _voteByReviewId_get !== void 0 ? _voteByReviewId_get : null
                        });
                    });
                    return [
                        2,
                        data
                    ];
            }
        });
    }).apply(this, arguments);
}
function getReviewVotes(id) {
    return _async_to_generator$4(function() {
        var _ref, data;
        return _ts_generator$4(this, function(_state) {
            switch(_state.label){
                case 0:
                    if (!getToken()) return [
                        2,
                        []
                    ];
                    return [
                        4,
                        rdbRequest("/users/".concat(id, "/reviews/votes"))
                    ];
                case 1:
                    data = _state.sent();
                    return [
                        2,
                        (_ref = data === null || data === void 0 ? void 0 : data.votes) !== null && _ref !== void 0 ? _ref : []
                    ];
            }
        });
    })();
}
function addReview(review) {
    return _async_to_generator$4(function() {
        var data;
        return _ts_generator$4(this, function(_state) {
            switch(_state.label){
                case 0:
                    if (!getToken()) {
                        showToast$1('Please authorize to add a review.');
                        return [
                            2,
                            null
                        ];
                    }
                    return [
                        4,
                        rdbRequest("/users/".concat(review.userid, "/reviews"), {
                            method: 'PUT',
                            body: JSON.stringify(review)
                        })
                    ];
                case 1:
                    data = _state.sent();
                    if (data === null || data === void 0 ? void 0 : data.message) showToast$1(data.message);
                    return [
                        2,
                        data
                    ];
            }
        });
    })();
}
function deleteReview(id) {
    return _async_to_generator$4(function() {
        var data;
        return _ts_generator$4(this, function(_state) {
            switch(_state.label){
                case 0:
                    return [
                        4,
                        rdbRequest("/users/".concat(id, "/reviews"), {
                            method: 'DELETE',
                            body: JSON.stringify({
                                reviewid: id
                            })
                        })
                    ];
                case 1:
                    data = _state.sent();
                    if (data === null || data === void 0 ? void 0 : data.message) showToast$1(data.message);
                    return [
                        2,
                        data
                    ];
            }
        });
    })();
}
function reportReview(id) {
    return _async_to_generator$4(function() {
        var data;
        return _ts_generator$4(this, function(_state) {
            switch(_state.label){
                case 0:
                    return [
                        4,
                        rdbRequest('/reports', {
                            method: 'PUT',
                            body: JSON.stringify({
                                reviewid: id
                            })
                        })
                    ];
                case 1:
                    data = _state.sent();
                    if (data === null || data === void 0 ? void 0 : data.message) showToast$1(data.message);
                    return [
                        2
                    ];
            }
        });
    })();
}
function voteReview(id, isUpvote) {
    return _async_to_generator$4(function() {
        var data;
        return _ts_generator$4(this, function(_state) {
            switch(_state.label){
                case 0:
                    if (!getToken()) {
                        showToast$1('Please authorize to vote on reviews.');
                        return [
                            2,
                            false
                        ];
                    }
                    return [
                        4,
                        rdbRequest("/reviews/".concat(id, "/vote"), {
                            method: 'POST',
                            body: JSON.stringify({
                                isUpvote: isUpvote
                            })
                        })
                    ];
                case 1:
                    data = _state.sent();
                    return [
                        2,
                        data != null
                    ];
            }
        });
    })();
}
function deleteReviewVote(id) {
    return _async_to_generator$4(function() {
        var data;
        return _ts_generator$4(this, function(_state) {
            switch(_state.label){
                case 0:
                    if (!getToken()) {
                        showToast$1('Please authorize to vote on reviews.');
                        return [
                            2,
                            false
                        ];
                    }
                    return [
                        4,
                        rdbRequest("/reviews/".concat(id, "/vote"), {
                            method: 'DELETE'
                        })
                    ];
                case 1:
                    data = _state.sent();
                    return [
                        2,
                        data != null
                    ];
            }
        });
    })();
}
function patchBlock(action, userId) {
    return _async_to_generator$4(function() {
        var data, user, blockedUsers;
        return _ts_generator$4(this, function(_state) {
            switch(_state.label){
                case 0:
                    return [
                        4,
                        rdbRequest('/blocks', {
                            method: 'PATCH',
                            body: JSON.stringify({
                                action: action,
                                discordId: userId
                            })
                        })
                    ];
                case 1:
                    data = _state.sent();
                    if (!data) return [
                        2
                    ];
                    showToast$1("Successfully ".concat(action, "ed user"));
                    user = getCurrentUser();
                    if (user === null || user === void 0 ? void 0 : user.blockedUsers) {
                        blockedUsers = action === 'block' ? _to_consumable_array$1(user.blockedUsers).concat([
                            userId
                        ]) : user.blockedUsers.filter(function(id) {
                            return id !== userId;
                        });
                        setCurrentUser(_object_spread_props$2(_object_spread$2({}, user), {
                            blockedUsers: blockedUsers
                        }));
                    }
                    return [
                        2
                    ];
            }
        });
    })();
}
var blockUser = function blockUser(userId) {
    return patchBlock('block', userId);
};
var unblockUser = function unblockUser(userId) {
    return patchBlock('unblock', userId);
};
function fetchBlocks() {
    return _async_to_generator$4(function() {
        var _ref;
        return _ts_generator$4(this, function(_state) {
            switch(_state.label){
                case 0:
                    return [
                        4,
                        rdbRequest('/blocks')
                    ];
                case 1:
                    return [
                        2,
                        (_ref = _state.sent()) !== null && _ref !== void 0 ? _ref : []
                    ];
            }
        });
    })();
}
function getCurrentUserInfo() {
    return rdbRequest('/users', {
        method: 'POST'
    });
}var UserType = /*#__PURE__*/ function(UserType) {
    UserType[UserType["Banned"] = -1] = "Banned";
    UserType[UserType["Normal"] = 0] = "Normal";
    UserType[UserType["Admin"] = 1] = "Admin";
    return UserType;
}({});
var ReviewType = /*#__PURE__*/ function(ReviewType) {
    ReviewType[ReviewType["User"] = 0] = "User";
    ReviewType[ReviewType["Server"] = 1] = "Server";
    ReviewType[ReviewType["Support"] = 2] = "Support";
    ReviewType[ReviewType["System"] = 3] = "System";
    return ReviewType;
}({});function showToast(content) {
    window.unbound.toasts.showToast({
        title: 'ReviewDB',
        content: content
    });
}
function getCurrentUserId() {
    if (typeof (window.unbound.metro === null || window.unbound.metro === void 0 ? void 0 : window.unbound.metro.findByProps) !== 'function') return null;
    try {
        var _ref;
        var _store_getCurrentUser, _store_getCurrentUser1;
        var store = window.unbound.metro.findByProps('getCurrentUser', 'getUser');
        return (_ref = store === null || store === void 0 ? void 0 : (_store_getCurrentUser1 = store.getCurrentUser) === null || _store_getCurrentUser1 === void 0 ? void 0 : (_store_getCurrentUser = _store_getCurrentUser1.call(store)) === null || _store_getCurrentUser === void 0 ? void 0 : _store_getCurrentUser.id) !== null && _ref !== void 0 ? _ref : null;
    } catch (unused) {
        return null;
    }
}
function isRelationshipBlocked(userId) {
    if (typeof (window.unbound.metro === null || window.unbound.metro === void 0 ? void 0 : window.unbound.metro.findByProps) !== 'function') return false;
    try {
        var _store_isBlocked;
        var store = window.unbound.metro.findByProps('isBlocked', 'isFriend');
        return !!(store === null || store === void 0 ? void 0 : (_store_isBlocked = store.isBlocked) === null || _store_isBlocked === void 0 ? void 0 : _store_isBlocked.call(store, userId));
    } catch (unused) {
        return false;
    }
}
function canDeleteReview(profileId, review, myId) {
    var _getCurrentUser;
    return myId != null && (myId === profileId || review.sender.discordID === myId || ((_getCurrentUser = getCurrentUser()) === null || _getCurrentUser === void 0 ? void 0 : _getCurrentUser.type) === UserType.Admin);
}
function canBlockReviewAuthor(profileId, review, myId) {
    return myId != null && profileId === myId && review.sender.discordID !== myId;
}
function canReportReview(review, myId) {
    return myId != null && review.sender.discordID !== myId;
}function getReviewColors() {
    var _ref;
    var _metro_common_Theme;
    var colors = (_ref = (_metro_common_Theme = window.unbound.metro.common.Theme) === null || _metro_common_Theme === void 0 ? void 0 : _metro_common_Theme.colors) !== null && _ref !== void 0 ? _ref : {};
    var color = function color(key, fallback) {
        return typeof colors[key] === 'string' ? colors[key] : fallback;
    };
    return {
        page: color('BACKGROUND_MOBILE_PRIMARY', color('BACKGROUND_PRIMARY', '#111214')),
        surface: color('BACKGROUND_SECONDARY', '#1e1f22'),
        surfaceAlt: color('BACKGROUND_SECONDARY_ALT', '#232428'),
        input: color('BACKGROUND_TERTIARY', '#111214'),
        border: color('BACKGROUND_MODIFIER_ACCENT', '#4e5058'),
        text: color('TEXT_NORMAL', '#f2f3f5'),
        muted: color('TEXT_MUTED', '#b5bac1'),
        accent: color('BRAND_500', '#5865f2'),
        accentText: '#ffffff',
        positive: color('GREEN_360', '#23a559'),
        danger: color('RED_400', '#ed4245'),
        link: color('TEXT_LINK', '#00a8fc')
    };
}function _array_like_to_array$2(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _array_with_holes$2(arr) {
    if (Array.isArray(arr)) return arr;
}
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
function _unsupported_iterable_to_array$2(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _array_like_to_array$2(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _array_like_to_array$2(o, minLen);
}
var dateFormatter = new Intl.DateTimeFormat();
function Badge(param) {
    var label = param.label, color = param.color, colors = param.colors;
    var ReactNative = window.unbound.metro.common.ReactNative;
    return /*#__PURE__*/ React.createElement(ReactNative.View, {
        style: {
            backgroundColor: color,
            borderRadius: 6,
            paddingHorizontal: 7,
            paddingVertical: 3
        }
    }, /*#__PURE__*/ React.createElement(ReactNative.Text, {
        style: {
            color: colors.accentText,
            fontSize: 11,
            fontWeight: '800',
            letterSpacing: 0.4
        }
    }, label));
}
function ActionButton(param) {
    var label = param.label, onPress = param.onPress, danger = param.danger, colors = param.colors;
    var ReactNative = window.unbound.metro.common.ReactNative;
    var color = danger ? colors.danger : colors.text;
    return /*#__PURE__*/ React.createElement(ReactNative.Pressable, {
        onPress: onPress,
        hitSlop: 6,
        style: function style(param) {
            var pressed = param.pressed;
            return {
                backgroundColor: danger ? "".concat(colors.danger, "22") : colors.surface,
                borderColor: danger ? "".concat(colors.danger, "66") : colors.border,
                borderRadius: 9,
                borderWidth: 1,
                opacity: pressed ? 0.65 : 1,
                minHeight: 38,
                justifyContent: 'center',
                paddingHorizontal: 12
            };
        }
    }, /*#__PURE__*/ React.createElement(ReactNative.Text, {
        style: {
            color: color,
            fontSize: 13,
            fontWeight: '700'
        }
    }, label));
}
function ReviewItem(param) {
    var review = param.review, profileId = param.profileId, hideTimestamps = param.hideTimestamps, onChanged = param.onChanged;
    var _review_userVote, _review_score, _ref, _review_comment;
    var _getCurrentUser_blockedUsers, _getCurrentUser;
    var ReactNative = window.unbound.metro.common.ReactNative;
    var colors = getReviewColors();
    var _useState = _sliced_to_array$2(window.React.useState(false), 2), expanded = _useState[0], setExpanded = _useState[1];
    var _useState1 = _sliced_to_array$2(window.React.useState(false), 2), busy = _useState1[0], setBusy = _useState1[1];
    var _useState2 = _sliced_to_array$2(window.React.useState((_review_userVote = review.userVote) !== null && _review_userVote !== void 0 ? _review_userVote : null), 2), localVote = _useState2[0], setLocalVote = _useState2[1];
    var _useState3 = _sliced_to_array$2(window.React.useState((_review_score = review.score) !== null && _review_score !== void 0 ? _review_score : 0), 2), score = _useState3[0], setScore = _useState3[1];
    var _useState4 = _sliced_to_array$2(window.React.useState(false), 2), actionsVisible = _useState4[0], setActionsVisible = _useState4[1];
    var _useState5 = _sliced_to_array$2(window.React.useState(false), 2), deleteArmed = _useState5[0], setDeleteArmed = _useState5[1];
    var myId = getCurrentUserId();
    var isOwnReview = review.sender.discordID === myId;
    var isAuthorBlocked = (_ref = (_getCurrentUser = getCurrentUser()) === null || _getCurrentUser === void 0 ? void 0 : (_getCurrentUser_blockedUsers = _getCurrentUser.blockedUsers) === null || _getCurrentUser_blockedUsers === void 0 ? void 0 : _getCurrentUser_blockedUsers.includes(review.sender.discordID)) !== null && _ref !== void 0 ? _ref : false;
    function handleVote(isUpvote) {
        return _async_to_generator$3(function() {
            var delta;
            return _ts_generator$3(this, function(_state) {
                switch(_state.label){
                    case 0:
                        if (busy || review.id === 0) return [
                            2
                        ];
                        if (isOwnReview) {
                            showToast('You cannot vote on your own review.');
                            return [
                                2
                            ];
                        }
                        setBusy(true);
                        _state.label = 1;
                    case 1:
                        _state.trys.push([
                            1,
                            ,
                            5,
                            6
                        ]);
                        if (!(localVote === isUpvote)) return [
                            3,
                            3
                        ];
                        return [
                            4,
                            deleteReviewVote(review.id)
                        ];
                    case 2:
                        if (_state.sent()) {
                            setLocalVote(null);
                            setScore(function(current) {
                                return current + (isUpvote ? -1 : 1);
                            });
                        }
                        return [
                            2
                        ];
                    case 3:
                        return [
                            4,
                            voteReview(review.id, isUpvote)
                        ];
                    case 4:
                        if (_state.sent()) {
                            delta = localVote == null ? isUpvote ? 1 : -1 : isUpvote ? 2 : -2;
                            setLocalVote(isUpvote);
                            setScore(function(current) {
                                return current + delta;
                            });
                        }
                        return [
                            3,
                            6
                        ];
                    case 5:
                        setBusy(false);
                        return [
                            7
                        ];
                    case 6:
                        return [
                            2
                        ];
                }
            });
        })();
    }
    function handleDelete() {
        return _async_to_generator$3(function() {
            return _ts_generator$3(this, function(_state) {
                switch(_state.label){
                    case 0:
                        if (busy) return [
                            2
                        ];
                        setBusy(true);
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
                            deleteReview(review.id)
                        ];
                    case 2:
                        if (_state.sent()) onChanged();
                        return [
                            3,
                            4
                        ];
                    case 3:
                        setBusy(false);
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
    function handleReport() {
        return _async_to_generator$3(function() {
            return _ts_generator$3(this, function(_state) {
                switch(_state.label){
                    case 0:
                        if (busy) return [
                            2
                        ];
                        setBusy(true);
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
                            reportReview(review.id)
                        ];
                    case 2:
                        _state.sent();
                        return [
                            3,
                            4
                        ];
                    case 3:
                        setBusy(false);
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
    function handleBlockToggle() {
        return _async_to_generator$3(function() {
            return _ts_generator$3(this, function(_state) {
                switch(_state.label){
                    case 0:
                        if (busy) return [
                            2
                        ];
                        setBusy(true);
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
                            isAuthorBlocked ? unblockUser(review.sender.discordID) : blockUser(review.sender.discordID)
                        ];
                    case 2:
                        _state.sent();
                        onChanged();
                        return [
                            3,
                            4
                        ];
                    case 3:
                        setBusy(false);
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
    var comment = (_review_comment = review.comment) !== null && _review_comment !== void 0 ? _review_comment : '';
    var truncated = comment.length > 200 && !expanded;
    var canVote = review.id !== 0;
    var canDelete = canDeleteReview(profileId, review, myId);
    var canReport = canReportReview(review, myId);
    var canBlock = canBlockReviewAuthor(profileId, review, myId);
    var timestamp = !hideTimestamps && review.type !== ReviewType.System && review.timestamp > 0 ? dateFormatter.format(review.timestamp * 1000) : null;
    var voteControls = canVote ? /*#__PURE__*/ React.createElement(ReactNative.View, {
        style: {
            alignItems: 'center',
            backgroundColor: colors.surfaceAlt,
            borderColor: colors.border,
            borderRadius: 10,
            borderWidth: 1,
            flexDirection: 'row',
            height: 38,
            overflow: 'hidden'
        }
    }, /*#__PURE__*/ React.createElement(ReactNative.Pressable, {
        disabled: busy,
        hitSlop: 6,
        onPress: function onPress() {
            return void handleVote(true);
        },
        style: function style(param) {
            var pressed = param.pressed;
            return {
                alignItems: 'center',
                backgroundColor: localVote === true ? "".concat(colors.positive, "33") : 'transparent',
                borderRadius: 8,
                height: 36,
                justifyContent: 'center',
                opacity: pressed || busy ? 0.6 : 1,
                width: 36
            };
        }
    }, /*#__PURE__*/ React.createElement(ReactNative.Text, {
        style: {
            color: localVote === true ? colors.positive : colors.muted,
            fontSize: 18,
            fontWeight: '800'
        }
    }, "▲")), /*#__PURE__*/ React.createElement(ReactNative.Text, {
        style: {
            color: colors.text,
            fontSize: 14,
            fontWeight: '800',
            minWidth: 24,
            textAlign: 'center'
        }
    }, score), /*#__PURE__*/ React.createElement(ReactNative.Pressable, {
        disabled: busy,
        hitSlop: 6,
        onPress: function onPress() {
            return void handleVote(false);
        },
        style: function style(param) {
            var pressed = param.pressed;
            return {
                alignItems: 'center',
                backgroundColor: localVote === false ? "".concat(colors.danger, "33") : 'transparent',
                borderRadius: 8,
                height: 36,
                justifyContent: 'center',
                opacity: pressed || busy ? 0.6 : 1,
                width: 36
            };
        }
    }, /*#__PURE__*/ React.createElement(ReactNative.Text, {
        style: {
            color: localVote === false ? colors.danger : colors.muted,
            fontSize: 18,
            fontWeight: '800'
        }
    }, "▼"))) : null;
    function openReviewActions() {
        if (!canDelete && !canReport && !canBlock) return;
        setDeleteArmed(false);
        setActionsVisible(true);
    }
    return /*#__PURE__*/ React.createElement(ReactNative.View, {
        style: {
            gap: 8
        }
    }, /*#__PURE__*/ React.createElement(ReactNative.Pressable, {
        delayLongPress: 350,
        onLongPress: openReviewActions,
        style: function style(param) {
            var pressed = param.pressed;
            return {
                backgroundColor: colors.surface,
                borderColor: colors.border,
                borderRadius: 16,
                borderWidth: 1,
                opacity: pressed ? 0.82 : 1,
                padding: 14
            };
        }
    }, /*#__PURE__*/ React.createElement(ReactNative.View, {
        style: {
            flexDirection: 'row',
            gap: 11
        }
    }, /*#__PURE__*/ React.createElement(ReactNative.Image, {
        source: {
            uri: review.sender.profilePhoto
        },
        style: {
            backgroundColor: colors.surfaceAlt,
            borderRadius: 22,
            height: 44,
            width: 44
        }
    }), /*#__PURE__*/ React.createElement(ReactNative.View, {
        style: {
            flex: 1,
            gap: 7
        }
    }, /*#__PURE__*/ React.createElement(ReactNative.View, {
        style: {
            alignItems: 'center',
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 6
        }
    }, /*#__PURE__*/ React.createElement(ReactNative.Text, {
        style: {
            color: colors.text,
            flexShrink: 1,
            fontSize: 16,
            fontWeight: '800'
        },
        numberOfLines: 1
    }, review.sender.username), review.type === ReviewType.System && /*#__PURE__*/ React.createElement(Badge, {
        color: colors.accent,
        colors: colors,
        label: "SYSTEM"
    }), isAuthorBlocked && /*#__PURE__*/ React.createElement(Badge, {
        color: colors.danger,
        colors: colors,
        label: "BLOCKED"
    })), timestamp && /*#__PURE__*/ React.createElement(ReactNative.Text, {
        style: {
            color: colors.muted,
            fontSize: 12
        }
    }, timestamp)), voteControls), /*#__PURE__*/ React.createElement(ReactNative.View, {
        style: {
            backgroundColor: colors.border,
            height: 1,
            marginTop: 13,
            opacity: 0.55
        }
    }), /*#__PURE__*/ React.createElement(ReactNative.Text, {
        style: {
            color: colors.text,
            fontSize: 15,
            lineHeight: 22,
            paddingTop: 12
        }
    }, truncated ? "".concat(comment.slice(0, 200), "...") : comment), comment.length > 200 && /*#__PURE__*/ React.createElement(ReactNative.Pressable, {
        hitSlop: 6,
        onPress: function onPress() {
            return setExpanded(function(value) {
                return !value;
            });
        },
        style: {
            alignSelf: 'flex-start',
            marginTop: 6
        }
    }, /*#__PURE__*/ React.createElement(ReactNative.Text, {
        style: {
            color: colors.link,
            fontSize: 13,
            fontWeight: '700'
        }
    }, expanded ? 'Show less' : 'Read more'))), actionsVisible && /*#__PURE__*/ React.createElement(ReactNative.View, {
        style: {
            backgroundColor: colors.surfaceAlt,
            borderColor: colors.border,
            borderRadius: 13,
            borderWidth: 1,
            gap: 10,
            padding: 12
        }
    }, /*#__PURE__*/ React.createElement(ReactNative.Text, {
        style: {
            color: colors.muted,
            fontSize: 11,
            fontWeight: '800',
            letterSpacing: 0.6
        }
    }, "REVIEW ACTIONS"), /*#__PURE__*/ React.createElement(ReactNative.View, {
        style: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 8
        }
    }, canReport && /*#__PURE__*/ React.createElement(ActionButton, {
        colors: colors,
        label: "Report",
        onPress: function onPress() {
            return void handleReport();
        }
    }), canBlock && /*#__PURE__*/ React.createElement(ActionButton, {
        colors: colors,
        label: isAuthorBlocked ? 'Unblock user' : 'Block user',
        onPress: function onPress() {
            return void handleBlockToggle();
        }
    }), canDelete && /*#__PURE__*/ React.createElement(ActionButton, {
        colors: colors,
        danger: true,
        label: deleteArmed ? 'Confirm delete' : 'Delete review',
        onPress: function onPress() {
            if (deleteArmed) void handleDelete();
            else setDeleteArmed(true);
        }
    }), /*#__PURE__*/ React.createElement(ActionButton, {
        colors: colors,
        label: "Close",
        onPress: function onPress() {
            return setActionsVisible(false);
        }
    }))));
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
function _define_property$1(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else obj[key] = value;
    return obj;
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
function _object_spread$1(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            _define_property$1(target, key, source[key]);
        });
    }
    return target;
}
function ownKeys$1(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        keys.push.apply(keys, symbols);
    }
    return keys;
}
function _object_spread_props$1(target, source) {
    source = source != null ? source : {};
    if (Object.getOwnPropertyDescriptors) Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    else {
        ownKeys$1(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}
function _sliced_to_array$1(arr, i) {
    return _array_with_holes$1(arr) || _iterable_to_array_limit$1(arr, i) || _unsupported_iterable_to_array$1(arr, i) || _non_iterable_rest$1();
}
function _to_consumable_array(arr) {
    return _array_without_holes(arr) || _iterable_to_array(arr) || _unsupported_iterable_to_array$1(arr) || _non_iterable_spread();
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
function _unsupported_iterable_to_array$1(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _array_like_to_array$1(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _array_like_to_array$1(o, minLen);
}
var STORE$2 = window.unbound.storage.getStore('unbound.reviewdb');
function getDesignModule$1() {
    var _metro_components;
    var discord = window.unbound.metro === null || window.unbound.metro === void 0 ? void 0 : (_metro_components = window.unbound.metro.components) === null || _metro_components === void 0 ? void 0 : _metro_components.Discord;
    if (discord === null || discord === void 0 ? void 0 : discord.ActionSheet) return discord;
    if (typeof (window.unbound.metro === null || window.unbound.metro === void 0 ? void 0 : window.unbound.metro.findByProps) === 'function') {
        var found = window.unbound.metro.findByProps('ActionSheet');
        if (found === null || found === void 0 ? void 0 : found.ActionSheet) return found;
    }
    return null;
}
function ReviewsSheet(param) {
    var discordId = param.discordId, name = param.name, onClose = param.onClose;
    var _ref, _ref1;
    var ReactNative = window.unbound.metro.common.ReactNative;
    var Discord = getDesignModule$1();
    var colors = getReviewColors();
    var _useState = _sliced_to_array$1(window.React.useState(null), 2), data = _useState[0], setData = _useState[1];
    var _useState1 = _sliced_to_array$1(window.React.useState(true), 2), loading = _useState1[0], setLoading = _useState1[1];
    var _useState2 = _sliced_to_array$1(window.React.useState(''), 2), comment = _useState2[0], setComment = _useState2[1];
    var _useState3 = _sliced_to_array$1(window.React.useState(false), 2), submitting = _useState3[0], setSubmitting = _useState3[1];
    var state = STORE$2.useSettingsStore();
    var myId = getCurrentUserId();
    var hideTimestamps = state.get('hideTimestamps', false);
    var hideBlockedUsers = state.get('hideBlockedUsers', true);
    var load = window.React.useCallback(function(offset, append) {
        return _async_to_generator$2(function() {
            var result;
            return _ts_generator$2(this, function(_state) {
                switch(_state.label){
                    case 0:
                        setLoading(true);
                        return [
                            4,
                            getReviews(discordId, {
                                offset: offset,
                                limit: REVIEWS_PER_PAGE,
                                fetchVotes: true
                            })
                        ];
                    case 1:
                        result = _state.sent();
                        setData(function(previous) {
                            return append && previous ? _object_spread_props$1(_object_spread$1({}, result), {
                                reviews: _to_consumable_array(previous.reviews).concat(_to_consumable_array(result.reviews))
                            }) : result;
                        });
                        setLoading(false);
                        return [
                            2
                        ];
                }
            });
        })();
    }, [
        discordId
    ]);
    window.React.useEffect(function() {
        void load(0, false);
    }, [
        load
    ]);
    function refetch() {
        void load(0, false);
    }
    var visibleReviews = ((_ref = data === null || data === void 0 ? void 0 : data.reviews) !== null && _ref !== void 0 ? _ref : []).filter(function(review) {
        return !hideBlockedUsers || !isRelationshipBlocked(review.sender.discordID);
    });
    var ownReview = visibleReviews.find(function(review) {
        return review.sender.discordID === myId;
    });
    var isOwnProfile = myId != null && discordId === myId;
    var authorized = !!state.get('token', '');
    function submit() {
        return _async_to_generator$2(function() {
            var trimmed, result;
            return _ts_generator$2(this, function(_state) {
                switch(_state.label){
                    case 0:
                        trimmed = comment.trim();
                        if (!trimmed) return [
                            2
                        ];
                        setSubmitting(true);
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
                            addReview({
                                userid: discordId,
                                comment: trimmed
                            })
                        ];
                    case 2:
                        result = _state.sent();
                        if (result) {
                            setComment('');
                            refetch();
                        }
                        return [
                            3,
                            4
                        ];
                    case 3:
                        setSubmitting(false);
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
    if (!(Discord === null || Discord === void 0 ? void 0 : Discord.ActionSheet)) {
        return /*#__PURE__*/ React.createElement(ReactNative.View, {
            style: {
                backgroundColor: colors.page,
                flex: 1,
                padding: 16
            }
        }, /*#__PURE__*/ React.createElement(ReactNative.Text, {
            style: {
                color: colors.text
            }
        }, "Reviews are unavailable on this client build."));
    }
    var content = /*#__PURE__*/ React.createElement(ReactNative.ScrollView, {
        contentContainerStyle: {
            backgroundColor: colors.page,
            gap: 12,
            padding: 16,
            paddingBottom: 32
        },
        keyboardShouldPersistTaps: "handled",
        style: {
            backgroundColor: colors.page,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            overflow: 'hidden'
        }
    }, /*#__PURE__*/ React.createElement(ReactNative.View, {
        style: {
            gap: 8,
            paddingBottom: 4
        }
    }, /*#__PURE__*/ React.createElement(ReactNative.Text, {
        style: {
            color: colors.text,
            fontSize: 24,
            fontWeight: '800'
        }
    }, "Reviews for @", name), /*#__PURE__*/ React.createElement(ReactNative.Text, {
        style: {
            color: colors.muted,
            fontSize: 14,
            lineHeight: 20
        }
    }, "Community feedback shared through ReviewDB."), /*#__PURE__*/ React.createElement(ReactNative.View, {
        style: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 8
        }
    }, /*#__PURE__*/ React.createElement(ReactNative.View, {
        style: {
            backgroundColor: colors.surfaceAlt,
            borderColor: colors.border,
            borderRadius: 8,
            borderWidth: 1,
            paddingHorizontal: 9,
            paddingVertical: 5
        }
    }, /*#__PURE__*/ React.createElement(ReactNative.Text, {
        style: {
            color: colors.text,
            fontSize: 12,
            fontWeight: '700'
        }
    }, (_ref1 = data === null || data === void 0 ? void 0 : data.reviewCount) !== null && _ref1 !== void 0 ? _ref1 : visibleReviews.length, " reviews")), authorized && /*#__PURE__*/ React.createElement(ReactNative.View, {
        style: {
            backgroundColor: "".concat(colors.positive, "22"),
            borderColor: "".concat(colors.positive, "66"),
            borderRadius: 8,
            borderWidth: 1,
            paddingHorizontal: 9,
            paddingVertical: 5
        }
    }, /*#__PURE__*/ React.createElement(ReactNative.Text, {
        style: {
            color: colors.positive,
            fontSize: 12,
            fontWeight: '700'
        }
    }, "ReviewDB connected")))), loading && /*#__PURE__*/ React.createElement(ReactNative.View, {
        style: {
            alignItems: 'center',
            backgroundColor: colors.surface,
            borderColor: colors.border,
            borderRadius: 16,
            borderWidth: 1,
            gap: 8,
            padding: 28
        }
    }, /*#__PURE__*/ React.createElement(ReactNative.ActivityIndicator, {
        color: colors.link
    }), /*#__PURE__*/ React.createElement(ReactNative.Text, {
        style: {
            color: colors.muted,
            fontSize: 14
        }
    }, "Loading reviews…")), !loading && visibleReviews.length === 0 && /*#__PURE__*/ React.createElement(ReactNative.View, {
        style: {
            alignItems: 'center',
            backgroundColor: colors.surface,
            borderColor: colors.border,
            borderRadius: 16,
            borderWidth: 1,
            gap: 6,
            padding: 24
        }
    }, /*#__PURE__*/ React.createElement(ReactNative.Text, {
        style: {
            color: colors.text,
            fontSize: 17,
            fontWeight: '800'
        }
    }, "No reviews yet"), /*#__PURE__*/ React.createElement(ReactNative.Text, {
        style: {
            color: colors.muted,
            fontSize: 14,
            textAlign: 'center'
        }
    }, "Be the first person to leave feedback.")), visibleReviews.map(function(review) {
        return /*#__PURE__*/ React.createElement(ReviewItem, {
            key: review.id,
            review: review,
            profileId: discordId,
            hideTimestamps: hideTimestamps,
            onChanged: refetch
        });
    }), (data === null || data === void 0 ? void 0 : data.hasNextPage) && !loading && /*#__PURE__*/ React.createElement(ReactNative.Pressable, {
        onPress: function onPress() {
            return void load(data.reviews.length, true);
        },
        style: function style(param) {
            var pressed = param.pressed;
            return {
                alignItems: 'center',
                backgroundColor: colors.surfaceAlt,
                borderColor: colors.border,
                borderRadius: 12,
                borderWidth: 1,
                opacity: pressed ? 0.7 : 1,
                paddingVertical: 13
            };
        }
    }, /*#__PURE__*/ React.createElement(ReactNative.Text, {
        style: {
            color: colors.link,
            fontSize: 14,
            fontWeight: '800'
        }
    }, "Load more reviews")), !isOwnProfile && authorized && /*#__PURE__*/ React.createElement(ReactNative.View, {
        style: {
            backgroundColor: colors.surface,
            borderColor: colors.border,
            borderRadius: 16,
            borderWidth: 1,
            gap: 10,
            padding: 14
        }
    }, /*#__PURE__*/ React.createElement(ReactNative.View, {
        style: {
            gap: 4
        }
    }, /*#__PURE__*/ React.createElement(ReactNative.Text, {
        style: {
            color: colors.text,
            fontSize: 17,
            fontWeight: '800'
        }
    }, ownReview ? 'Update your review' : 'Leave a review'), /*#__PURE__*/ React.createElement(ReactNative.Text, {
        style: {
            color: colors.muted,
            fontSize: 13,
            lineHeight: 18
        }
    }, ownReview ? 'Your new text will replace your existing review.' : "Share helpful feedback about @".concat(name, "."))), /*#__PURE__*/ React.createElement(ReactNative.TextInput, {
        maxLength: 1000,
        multiline: true,
        onChangeText: setComment,
        placeholder: ownReview ? "Update review for @".concat(name) : "Review @".concat(name),
        placeholderTextColor: colors.muted,
        style: {
            backgroundColor: colors.input,
            borderColor: colors.border,
            borderRadius: 12,
            borderWidth: 1,
            color: colors.text,
            fontSize: 15,
            minHeight: 92,
            paddingHorizontal: 12,
            paddingVertical: 11,
            textAlignVertical: 'top'
        },
        value: comment
    }), /*#__PURE__*/ React.createElement(ReactNative.View, {
        style: {
            alignItems: 'center',
            flexDirection: 'row',
            gap: 10
        }
    }, /*#__PURE__*/ React.createElement(ReactNative.Text, {
        style: {
            color: colors.muted,
            flex: 1,
            fontSize: 12
        }
    }, comment.length, "/1000"), /*#__PURE__*/ React.createElement(ReactNative.Pressable, {
        disabled: !comment.trim() || submitting,
        onPress: function onPress() {
            return void submit();
        },
        style: function style(param) {
            var pressed = param.pressed;
            return {
                backgroundColor: colors.accent,
                borderRadius: 11,
                minHeight: 44,
                justifyContent: 'center',
                opacity: !comment.trim() || submitting ? 0.45 : pressed ? 0.75 : 1,
                paddingHorizontal: 16
            };
        }
    }, submitting ? /*#__PURE__*/ React.createElement(ReactNative.ActivityIndicator, {
        color: colors.accentText
    }) : /*#__PURE__*/ React.createElement(ReactNative.Text, {
        style: {
            color: colors.accentText,
            fontSize: 14,
            fontWeight: '800'
        }
    }, ownReview ? 'Update review' : 'Submit review')))), !isOwnProfile && !authorized && /*#__PURE__*/ React.createElement(ReactNative.Pressable, {
        onPress: function onPress() {
            onClose();
            authorize(function() {
                return openReviewsSheet(discordId, name);
            });
        },
        style: function style(param) {
            var pressed = param.pressed;
            return {
                backgroundColor: colors.surface,
                borderColor: colors.border,
                borderRadius: 16,
                borderWidth: 1,
                opacity: pressed ? 0.7 : 1,
                padding: 16
            };
        }
    }, /*#__PURE__*/ React.createElement(ReactNative.Text, {
        style: {
            color: colors.link,
            fontSize: 15,
            fontWeight: '800',
            textAlign: 'center'
        }
    }, "Sign in to leave a review")));
    return /*#__PURE__*/ React.createElement(Discord.ActionSheet, {
        startExpanded: true
    }, content);
}
function openReviewsSheet(discordId, name) {
    if (typeof (window.unbound.metro === null || window.unbound.metro === void 0 ? void 0 : window.unbound.metro.findByProps) !== 'function') return;
    var sheets = window.unbound.metro.findByProps('openLazy', 'hideActionSheet');
    if (!(sheets === null || sheets === void 0 ? void 0 : sheets.openLazy)) {
        showToast('Reviews are unavailable on this client build.');
        return;
    }
    var key = "unbound-reviewdb-".concat(discordId, "-").concat(Date.now());
    sheets.openLazy(Promise.resolve({
        default: ReviewsSheet
    }), key, {
        discordId: discordId,
        name: name,
        onClose: function onClose() {
            var _sheets_hideActionSheet;
            return (_sheets_hideActionSheet = sheets.hideActionSheet) === null || _sheets_hideActionSheet === void 0 ? void 0 : _sheets_hideActionSheet.call(sheets, key);
        }
    });
}var Patcher = window.unbound.patcher.createPatcher('unbound.reviewdb');
function resolveUsername(userId) {
    if (typeof (window.unbound.metro === null || window.unbound.metro === void 0 ? void 0 : window.unbound.metro.findByProps) !== 'function') return 'User';
    try {
        var _ref, _ref1;
        var _UserStore_getUser;
        var UserStore = window.unbound.metro.findByProps('getCurrentUser', 'getUser');
        var user = UserStore === null || UserStore === void 0 ? void 0 : (_UserStore_getUser = UserStore.getUser) === null || _UserStore_getUser === void 0 ? void 0 : _UserStore_getUser.call(UserStore, userId);
        return (_ref = (_ref1 = user === null || user === void 0 ? void 0 : user.globalName) !== null && _ref1 !== void 0 ? _ref1 : user === null || user === void 0 ? void 0 : user.username) !== null && _ref !== void 0 ? _ref : 'User';
    } catch (unused) {
        return 'User';
    }
}
function extractUserId(children) {
    if (!Array.isArray(children)) return null;
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
    try {
        for(var _iterator = children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
            var child = _step.value;
            var _child_props;
            var userId = child === null || child === void 0 ? void 0 : (_child_props = child.props) === null || _child_props === void 0 ? void 0 : _child_props.userId;
            if (typeof userId === 'string') return userId;
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
function ReviewsButton(param) {
    var userId = param.userId;
    var _metro_components;
    var ReactNative = window.unbound.metro.common.ReactNative;
    var Discord = window.unbound.metro === null || window.unbound.metro === void 0 ? void 0 : (_metro_components = window.unbound.metro.components) === null || _metro_components === void 0 ? void 0 : _metro_components.Discord;
    if (!(Discord === null || Discord === void 0 ? void 0 : Discord.Button)) return null;
    return /*#__PURE__*/ React.createElement(ReactNative.View, {
        style: {
            marginTop: 8,
            alignSelf: 'flex-start'
        }
    }, /*#__PURE__*/ React.createElement(Discord.Button, {
        text: "View Reviews",
        variant: "secondary",
        size: "sm",
        onPress: function onPress() {
            return openReviewsSheet(userId, resolveUsername(userId));
        }
    }));
}
function startReviewMenuPatch() {
    if (typeof (window.unbound.metro === null || window.unbound.metro === void 0 ? void 0 : window.unbound.metro.findByName) !== 'function') return;
    var mod = window.unbound.metro.findByName('UserProfileCard', {
        interop: false
    });
    if (typeof (mod === null || mod === void 0 ? void 0 : mod.default) !== 'function') return;
    Patcher.after(mod, 'default', function(ctx) {
        var _ctx_args;
        var props = (_ctx_args = ctx.args) === null || _ctx_args === void 0 ? void 0 : _ctx_args[0];
        if (!props || props.title) return ctx.result;
        var userId = extractUserId(props.children);
        if (!userId) return ctx.result;
        return window.unbound.metro.common.React.createElement(window.unbound.metro.common.React.Fragment, null, ctx.result, window.unbound.metro.common.React.createElement(ReviewsButton, {
            userId: userId
        }));
    });
}
function stopReviewMenuPatch() {
    Patcher.unpatchAll();
}function _array_like_to_array(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _array_with_holes(arr) {
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
function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else obj[key] = value;
    return obj;
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
function _object_spread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            _define_property(target, key, source[key]);
        });
    }
    return target;
}
function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        keys.push.apply(keys, symbols);
    }
    return keys;
}
function _object_spread_props(target, source) {
    source = source != null ? source : {};
    if (Object.getOwnPropertyDescriptors) Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    else {
        ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}
function _sliced_to_array(arr, i) {
    return _array_with_holes(arr) || _iterable_to_array_limit(arr, i) || _unsupported_iterable_to_array(arr, i) || _non_iterable_rest();
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
function _unsupported_iterable_to_array(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _array_like_to_array(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _array_like_to_array(o, minLen);
}
function getDesignModule() {
    var _metro_components;
    var discord = window.unbound.metro === null || window.unbound.metro === void 0 ? void 0 : (_metro_components = window.unbound.metro.components) === null || _metro_components === void 0 ? void 0 : _metro_components.Discord;
    if ((discord === null || discord === void 0 ? void 0 : discord.ActionSheet) && (discord === null || discord === void 0 ? void 0 : discord.Text)) return discord;
    if (typeof (window.unbound.metro === null || window.unbound.metro === void 0 ? void 0 : window.unbound.metro.findByProps) === 'function') {
        var found = window.unbound.metro.findByProps('ActionSheet', 'Text');
        if ((found === null || found === void 0 ? void 0 : found.ActionSheet) && (found === null || found === void 0 ? void 0 : found.Text)) return found;
    }
    return null;
}
function BlockedUsersSheet() {
    var ReactNative = window.unbound.metro.common.ReactNative;
    var Discord = getDesignModule();
    var _useState = _sliced_to_array(window.React.useState(null), 2), users = _useState[0], setUsers = _useState[1];
    var _useState1 = _sliced_to_array(window.React.useState(null), 2), busyId = _useState1[0], setBusyId = _useState1[1];
    window.React.useEffect(function() {
        void fetchBlocks().then(setUsers).catch(function() {
            return setUsers([]);
        });
    }, []);
    function handleUnblock(userId) {
        return _async_to_generator$1(function() {
            return _ts_generator$1(this, function(_state) {
                switch(_state.label){
                    case 0:
                        if (busyId) return [
                            2
                        ];
                        setBusyId(userId);
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
                            unblockUser(userId)
                        ];
                    case 2:
                        _state.sent();
                        setUsers(function(current) {
                            var _ref;
                            return (_ref = current === null || current === void 0 ? void 0 : current.filter(function(user) {
                                return user.discordID !== userId;
                            })) !== null && _ref !== void 0 ? _ref : current;
                        });
                        return [
                            3,
                            4
                        ];
                    case 3:
                        setBusyId(null);
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
    if (!(Discord === null || Discord === void 0 ? void 0 : Discord.ActionSheet)) {
        return /*#__PURE__*/ React.createElement(ReactNative.View, {
            style: {
                padding: 16
            }
        }, /*#__PURE__*/ React.createElement(ReactNative.Text, null, "Blocked users are unavailable on this client build."));
    }
    return /*#__PURE__*/ React.createElement(Discord.ActionSheet, null, /*#__PURE__*/ React.createElement(Discord.Text, {
        variant: "heading-lg/semibold",
        style: {
            paddingHorizontal: 16,
            paddingTop: 4,
            paddingBottom: 8
        }
    }, "Blocked Users"), /*#__PURE__*/ React.createElement(ReactNative.View, null, users == null && /*#__PURE__*/ React.createElement(ReactNative.View, {
        style: {
            padding: 12,
            alignItems: 'center'
        }
    }, /*#__PURE__*/ React.createElement(ReactNative.ActivityIndicator, null)), (users === null || users === void 0 ? void 0 : users.length) === 0 && /*#__PURE__*/ React.createElement(Discord.Text, {
        style: {
            padding: 12
        },
        color: "text-muted"
    }, "No blocked users."), users === null || users === void 0 ? void 0 : users.map(function(user) {
        var _Discord_Card;
        var Row = (_Discord_Card = Discord.Card) !== null && _Discord_Card !== void 0 ? _Discord_Card : ReactNative.View;
        var rowProps = Discord.Card ? {
            variant: 'secondary',
            border: 'subtle',
            radius: 8
        } : {};
        return /*#__PURE__*/ React.createElement(Row, _object_spread_props(_object_spread({
            key: user.discordID
        }, rowProps), {
            style: {
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
                paddingVertical: 8,
                paddingHorizontal: 12,
                marginBottom: 8,
                marginHorizontal: 12
            }
        }), /*#__PURE__*/ React.createElement(ReactNative.Image, {
            source: {
                uri: user.profilePhoto
            },
            style: {
                width: 28,
                height: 28,
                borderRadius: 14
            }
        }), /*#__PURE__*/ React.createElement(Discord.Text, {
            style: {
                flex: 1
            }
        }, user.username), /*#__PURE__*/ React.createElement(ReactNative.Pressable, {
            disabled: busyId === user.discordID,
            onPress: function onPress() {
                return handleUnblock(user.discordID);
            }
        }, /*#__PURE__*/ React.createElement(Discord.Text, {
            variant: "text-sm/semibold",
            color: "text-danger"
        }, "Unblock")));
    })));
}
function openBlockedUsersSheet() {
    if (typeof (window.unbound.metro === null || window.unbound.metro === void 0 ? void 0 : window.unbound.metro.findByProps) !== 'function') return;
    var sheets = window.unbound.metro.findByProps('openLazy', 'hideActionSheet');
    if (!(sheets === null || sheets === void 0 ? void 0 : sheets.openLazy)) {
        showToast('Blocked users are unavailable on this client build.');
        return;
    }
    var key = "unbound-reviewdb-blocked-".concat(Date.now());
    sheets.openLazy(Promise.resolve({
        default: BlockedUsersSheet
    }), key, {
        onClose: function onClose() {
            var _sheets_hideActionSheet;
            return (_sheets_hideActionSheet = sheets.hideActionSheet) === null || _sheets_hideActionSheet === void 0 ? void 0 : _sheets_hideActionSheet.call(sheets, key);
        }
    });
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
}
function SettingsSwitchRow(param) {
    var label = param.label, description = param.description, value = param.value, onValueChange = param.onValueChange;
    var ReactNative = window.unbound.metro.common.ReactNative;
    var colors = getSettingsColors();
    return /*#__PURE__*/ React.createElement(SettingsCard, null, /*#__PURE__*/ React.createElement(ReactNative.View, {
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
    }, description) : null), /*#__PURE__*/ React.createElement(ReactNative.Switch, {
        onValueChange: onValueChange,
        value: value
    })));
}var STORE$1 = window.unbound.storage.getStore('unbound.reviewdb');
function openExternalLink(url) {
    var _ReactNative_Linking_openURL_catch, _ReactNative_Linking_openURL, _ReactNative_Linking;
    var ReactNative = window.unbound.metro.common.ReactNative;
    (_ReactNative_Linking = ReactNative.Linking) === null || _ReactNative_Linking === void 0 ? void 0 : (_ReactNative_Linking_openURL = _ReactNative_Linking.openURL(url)) === null || _ReactNative_Linking_openURL === void 0 ? void 0 : (_ReactNative_Linking_openURL_catch = _ReactNative_Linking_openURL.catch) === null || _ReactNative_Linking_openURL_catch === void 0 ? void 0 : _ReactNative_Linking_openURL_catch.call(_ReactNative_Linking_openURL, function() {
        return undefined;
    });
}
function ReviewDBSettingsScreen() {
    var state = STORE$1.useSettingsStore();
    var authorized = !!state.get('token', '');
    var myId = getCurrentUserId();
    return /*#__PURE__*/ React.createElement(SettingsScrollView, null, /*#__PURE__*/ React.createElement(SettingsSection, {
        title: "Account"
    }, /*#__PURE__*/ React.createElement(SettingsRow, {
        label: authorized ? 'Reauthorize with ReviewDB' : 'Authorize with ReviewDB',
        description: authorized ? 'You are connected to ReviewDB' : 'Sign in to review users and see your reviews',
        onPress: function onPress() {
            return authorize();
        }
    }), /*#__PURE__*/ React.createElement(SettingsRow, {
        label: "View My Reviews",
        arrow: true,
        disabled: !myId,
        onPress: function onPress() {
            return myId && openReviewsSheet(myId, 'You');
        }
    }), /*#__PURE__*/ React.createElement(SettingsRow, {
        label: "Manage Blocked Users",
        description: "Users you have blocked from leaving reviews",
        arrow: true,
        disabled: !authorized,
        onPress: function onPress() {
            return authorized && openBlockedUsersSheet();
        }
    })), /*#__PURE__*/ React.createElement(SettingsSection, {
        title: "Preferences"
    }, /*#__PURE__*/ React.createElement(SettingsSwitchRow, {
        label: "Notify About New Reviews",
        description: "Show a toast on startup when you have new reviews",
        value: state.get('notifyReviews', true),
        onValueChange: function onValueChange(value) {
            return state.set('notifyReviews', value);
        }
    }), /*#__PURE__*/ React.createElement(SettingsSwitchRow, {
        label: "Hide Timestamps",
        value: state.get('hideTimestamps', false),
        onValueChange: function onValueChange(value) {
            return state.set('hideTimestamps', value);
        }
    }), /*#__PURE__*/ React.createElement(SettingsSwitchRow, {
        label: "Hide Reviews From Blocked Users",
        description: "Hide reviews from users you have blocked on Discord",
        value: state.get('hideBlockedUsers', true),
        onValueChange: function onValueChange(value) {
            return state.set('hideBlockedUsers', value);
        }
    })), /*#__PURE__*/ React.createElement(SettingsSection, {
        title: "Links"
    }, /*#__PURE__*/ React.createElement(SettingsRow, {
        label: "ReviewDB Website",
        arrow: true,
        onPress: function onPress() {
            return openExternalLink('https://reviewdb.mantikafasi.dev');
        }
    }), /*#__PURE__*/ React.createElement(SettingsRow, {
        label: "ReviewDB Support Server",
        arrow: true,
        onPress: function onPress() {
            return openExternalLink('https://discord.gg/eWPBSbvznt');
        }
    })));
}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
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
function _instanceof(left, right) {
    "@swc/helpers - instanceof";
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
        return !!right[Symbol.hasInstance](left);
    } else return left instanceof right;
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
var STORE = window.unbound.storage.getStore('unbound.reviewdb');
function showError(error) {
    window.unbound.toasts.showToast({
        title: 'ReviewDB',
        content: _instanceof(error, Error) ? error.message : String(error)
    });
}
var index = {
    start: function start() {
        try {
            startReviewMenuPatch();
        } catch (error) {
            showError(error);
        }
        void (function() {
            return _async_to_generator(function() {
                var user, lastReviewId;
                return _ts_generator(this, function(_state) {
                    switch(_state.label){
                        case 0:
                            if (!hasToken()) return [
                                2
                            ];
                            return [
                                4,
                                getCurrentUserInfo()
                            ];
                        case 1:
                            user = _state.sent();
                            if (!user) return [
                                2
                            ];
                            setCurrentUser(user);
                            if (STORE.get('notifyReviews', true)) {
                                lastReviewId = STORE.get('lastReviewId', 0);
                                if (lastReviewId && lastReviewId < user.lastReviewID && user.lastReviewID !== 0) {
                                    window.unbound.toasts.showToast({
                                        title: 'ReviewDB',
                                        content: 'You have new reviews on your profile!'
                                    });
                                }
                                STORE.set('lastReviewId', user.lastReviewID);
                            }
                            return [
                                2
                            ];
                    }
                });
            })();
        })().catch(function() {
            return undefined;
        });
    },
    stop: function stop() {
        try {
            stopReviewMenuPatch();
        } catch (unused) {}
    },
    getSettingsPanel: function getSettingsPanel() {
        return /*#__PURE__*/ React.createElement(ReviewDBSettingsScreen, null);
    }
};
return index;
})();return this.__plugin;},start(context){const module=this.__load();const plugin=module?.default??module;if(plugin&&typeof plugin.start==='function')return plugin.start(context);},stop(){const module=this.__load();const plugin=module?.default??module;if(plugin&&typeof plugin.stop==='function')return plugin.stop();},getSettingsPanel(...args){const module=this.__load();const plugin=module?.default??module;const settingsPanel=plugin?.getSettingsPanel??module?.getSettingsPanel;if(typeof settingsPanel==='function')return settingsPanel.apply(plugin,args);return null;}})