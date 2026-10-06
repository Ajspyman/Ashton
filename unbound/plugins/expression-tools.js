({__plugin:null,__load(){if(this.__plugin)return this.__plugin;this.__plugin=(function () {
'use strict';
function _array_like_to_array(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _array_with_holes(arr) {
    if (Array.isArray(arr)) return arr;
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
function _instanceof(left, right) {
    "@swc/helpers - instanceof";
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
        return !!right[Symbol.hasInstance](left);
    } else return left instanceof right;
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
var PLUGIN_ID = 'unbound.expression-tools';
var ACTION_ROW_KEY = "".concat(PLUGIN_ID, "-action");
var SHEET_KEY_PREFIX = "".concat(PLUGIN_ID, "-sheet-");
var unpatches = [];
var patchedSheets = new WeakSet();
var patchedOuterSheets = new WeakSet();
var patchedDetailSheets = new WeakSet();
function getDesignModule() {
    var discord = window.unbound.metro.components.Discord;
    if (discord === null || discord === void 0 ? void 0 : discord.ActionSheet) return discord;
    return window.unbound.metro.findByProps('ActionSheet');
}
function getSheets() {
    return window.unbound.metro.findByProps('openLazy', 'hideActionSheet');
}
function showError(error) {
    var _record_body;
    var record = error && (typeof error === "undefined" ? "undefined" : _type_of(error)) === 'object' ? error : null;
    var message = _instanceof(error, Error) ? error.message : typeof (record === null || record === void 0 ? void 0 : (_record_body = record.body) === null || _record_body === void 0 ? void 0 : _record_body.message) === 'string' ? record.body.message : typeof (record === null || record === void 0 ? void 0 : record.message) === 'string' ? record.message : typeof (record === null || record === void 0 ? void 0 : record.text) === 'string' ? record.text : 'The operation could not be completed.';
    window.unbound.toasts.showToast({
        title: 'Expression Tools',
        content: message
    });
}
function showToast(content) {
    window.unbound.toasts.showToast({
        title: 'Expression Tools',
        content: content
    });
}
function findValue(value, predicate) {
    var depth = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0;
    if (depth > 8 || !value || (typeof value === "undefined" ? "undefined" : _type_of(value)) !== 'object') return null;
    if (Array.isArray(value)) {
        var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
        try {
            for(var _iterator = value[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                var item = _step.value;
                var found = findValue(item, predicate, depth + 1);
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
    var candidate = value;
    if (predicate(candidate)) return candidate;
    var _iteratorNormalCompletion1 = true, _didIteratorError1 = false, _iteratorError1 = undefined;
    try {
        for(var _iterator1 = Object.values(candidate)[Symbol.iterator](), _step1; !(_iteratorNormalCompletion1 = (_step1 = _iterator1.next()).done); _iteratorNormalCompletion1 = true){
            var child = _step1.value;
            var found1 = findValue(child, predicate, depth + 1);
            if (found1) return found1;
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
function getTypeName(value) {
    var _ref, _ref1;
    if (!value || (typeof value === "undefined" ? "undefined" : _type_of(value)) !== 'object') return null;
    var type = value.type;
    if (typeof type === 'string') return type;
    return (_ref = (_ref1 = type === null || type === void 0 ? void 0 : type.displayName) !== null && _ref1 !== void 0 ? _ref1 : type === null || type === void 0 ? void 0 : type.name) !== null && _ref !== void 0 ? _ref : null;
}
function findElement(value, predicate) {
    var depth = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0;
    var _element_props;
    if (depth > 12 || !value || (typeof value === "undefined" ? "undefined" : _type_of(value)) !== 'object') return null;
    if (Array.isArray(value)) {
        var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
        try {
            for(var _iterator = value[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                var child = _step.value;
                var found = findElement(child, predicate, depth + 1);
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
    var element = value;
    if (predicate(element)) return element;
    return findElement((_element_props = element.props) === null || _element_props === void 0 ? void 0 : _element_props.children, predicate, depth + 1);
}
function findChildArray(value) {
    var depth = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
    var _element_props;
    if (depth > 12 || !value || (typeof value === "undefined" ? "undefined" : _type_of(value)) !== 'object') return null;
    if (Array.isArray(value)) return value;
    var element = value;
    var children = (_element_props = element.props) === null || _element_props === void 0 ? void 0 : _element_props.children;
    if (Array.isArray(children)) return children;
    return findChildArray(children, depth + 1);
}
function parseEmoji(props) {
    var record = props;
    var emoji = record === null || record === void 0 ? void 0 : record.emoji;
    var emojiNode = record === null || record === void 0 ? void 0 : record.emojiNode;
    var source = typeof (emojiNode === null || emojiNode === void 0 ? void 0 : emojiNode.src) === 'string' ? emojiNode.src : '';
    var sourceMatch = /\/emojis\/(\d+)\.(gif|png|webp)/.exec(source);
    var id = typeof (emoji === null || emoji === void 0 ? void 0 : emoji.id) === 'string' ? emoji.id : sourceMatch === null || sourceMatch === void 0 ? void 0 : sourceMatch[1];
    if (!id) return null;
    var name = typeof (emoji === null || emoji === void 0 ? void 0 : emoji.name) === 'string' ? emoji.name : typeof (emojiNode === null || emojiNode === void 0 ? void 0 : emojiNode.alt) === 'string' ? emojiNode.alt.replace(/:/g, '') : 'emoji';
    var animated = (emoji === null || emoji === void 0 ? void 0 : emoji.animated) === true || (sourceMatch === null || sourceMatch === void 0 ? void 0 : sourceMatch[2]) === 'gif';
    return {
        animated: animated,
        description: '',
        formatType: null,
        id: id,
        kind: 'emoji',
        name: name,
        tags: ''
    };
}
function parseSticker(props) {
    var sticker = findValue(props, function(candidate) {
        return typeof candidate.id === 'string' && typeof candidate.format_type === 'number';
    });
    if (!sticker || typeof sticker.id !== 'string') return null;
    return {
        animated: sticker.format_type === 2 || sticker.format_type === 3,
        description: typeof sticker.description === 'string' ? sticker.description : '',
        formatType: typeof sticker.format_type === 'number' ? sticker.format_type : null,
        id: sticker.id,
        kind: 'sticker',
        name: typeof sticker.name === 'string' ? sticker.name : 'sticker',
        tags: typeof sticker.tags === 'string' ? sticker.tags : typeof sticker.name === 'string' ? sticker.name : 'sticker'
    };
}
function getExpression(kind, props) {
    return kind === 'emoji' ? parseEmoji(props) : parseSticker(props);
}
function getAssetUrl(expression) {
    if (expression.kind === 'emoji') {
        var extension = expression.animated ? 'gif' : 'png';
        return "https://cdn.discordapp.com/emojis/".concat(expression.id, ".").concat(extension, "?size=160&quality=lossless");
    }
    var extension1 = expression.formatType === 3 ? 'json' : expression.formatType === 4 ? 'gif' : 'png';
    return "https://media.discordapp.net/stickers/".concat(expression.id, ".").concat(extension1, "?size=160&quality=lossless");
}
function getExpressionLink(expression) {
    return expression.kind === 'emoji' ? getAssetUrl(expression) : "https://discord.com/stickers/".concat(expression.id);
}
function getStickerUploadFile(expression, name) {
    var extension = expression.formatType === 3 ? 'json' : expression.formatType === 4 ? 'gif' : 'png';
    var type = extension === 'json' ? 'application/json' : extension === 'gif' ? 'image/gif' : 'image/png';
    return {
        name: "".concat(name, ".").concat(extension),
        type: type,
        uri: "https://cdn.discordapp.com/stickers/".concat(expression.id, ".").concat(extension)
    };
}
function getMarkup(expression) {
    if (expression.kind === 'emoji') return "<".concat(expression.animated ? 'a' : '', ":").concat(expression.name, ":").concat(expression.id, ">");
    return getExpressionLink(expression);
}
function copyText(text, confirmation) {
    var clipboard = window.unbound.metro.common.Clipboard;
    if (typeof (clipboard === null || clipboard === void 0 ? void 0 : clipboard.setString) !== 'function') throw new Error('Clipboard access is unavailable on this client build.');
    void Promise.resolve(clipboard.setString(text)).then(function() {
        return showToast(confirmation);
    }).catch(showError);
}
function getOwnedGuilds() {
    var _ref;
    var _userStore_getCurrentUser, _userStore_getCurrentUser1, _guildStore_getGuilds;
    var guildStore = window.unbound.metro.findStore('Guild');
    var userStore = window.unbound.metro.findByProps('getCurrentUser', 'getUser');
    var currentUserId = userStore === null || userStore === void 0 ? void 0 : (_userStore_getCurrentUser1 = userStore.getCurrentUser) === null || _userStore_getCurrentUser1 === void 0 ? void 0 : (_userStore_getCurrentUser = _userStore_getCurrentUser1.call(userStore)) === null || _userStore_getCurrentUser === void 0 ? void 0 : _userStore_getCurrentUser.id;
    if (!currentUserId) return [];
    return Object.values((_ref = guildStore === null || guildStore === void 0 ? void 0 : (_guildStore_getGuilds = guildStore.getGuilds) === null || _guildStore_getGuilds === void 0 ? void 0 : _guildStore_getGuilds.call(guildStore)) !== null && _ref !== void 0 ? _ref : {}).filter(function(guild) {
        return guild.ownerId === currentUserId;
    }).sort(function(first, second) {
        return first.name.localeCompare(second.name);
    });
}
function getDataUrl(expression) {
    return _async_to_generator(function() {
        var response, blob, reader;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    return [
                        4,
                        fetch(getAssetUrl(expression))
                    ];
                case 1:
                    response = _state.sent();
                    if (!response.ok) throw new Error("Could not fetch ".concat(expression.name, "."));
                    return [
                        4,
                        response.blob()
                    ];
                case 2:
                    blob = _state.sent();
                    reader = new FileReader();
                    return [
                        4,
                        new Promise(function(resolve, reject) {
                            reader.onerror = function() {
                                var _reader_error;
                                return reject((_reader_error = reader.error) !== null && _reader_error !== void 0 ? _reader_error : new Error('Could not read the expression file.'));
                            };
                            reader.onload = function() {
                                return resolve(String(reader.result));
                            };
                            reader.readAsDataURL(blob);
                        })
                    ];
                case 3:
                    return [
                        2,
                        _state.sent()
                    ];
            }
        });
    })();
}
function cloneExpression(expression, guild, name) {
    return _async_to_generator(function() {
        var emojiActions, _, _tmp, _auth_getToken, _userStore_getCurrentUser, auth, token, form, body, dispatcher, userStore;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    if (!(expression.kind === 'emoji')) return [
                        3,
                        3
                    ];
                    emojiActions = window.unbound.metro.findByProps('uploadEmoji');
                    if (typeof (emojiActions === null || emojiActions === void 0 ? void 0 : emojiActions.uploadEmoji) !== 'function') throw new Error('Emoji uploads are unavailable on this client build.');
                    _ = emojiActions.uploadEmoji;
                    _tmp = {
                        guildId: guild.id
                    };
                    return [
                        4,
                        getDataUrl(expression)
                    ];
                case 1:
                    return [
                        4,
                        _.apply(emojiActions, [
                            (_tmp.image = _state.sent(), _tmp.name = name, _tmp)
                        ])
                    ];
                case 2:
                    _state.sent();
                    return [
                        3,
                        5
                    ];
                case 3:
                    auth = window.unbound.metro.findByProps('getToken');
                    token = auth === null || auth === void 0 ? void 0 : (_auth_getToken = auth.getToken) === null || _auth_getToken === void 0 ? void 0 : _auth_getToken.call(auth);
                    if (!token) throw new Error('Sticker uploads are unavailable on this client build.');
                    form = new FormData();
                    form.append('name', name);
                    form.append('tags', expression.tags || name);
                    form.append('description', expression.description);
                    form.append('file', getStickerUploadFile(expression, name));
                    return [
                        4,
                        new Promise(function(resolve, reject) {
                            var request = new XMLHttpRequest();
                            request.open('POST', "https://discord.com/api/v10/guilds/".concat(guild.id, "/stickers"));
                            request.setRequestHeader('Authorization', token);
                            request.onerror = function() {
                                return reject(new Error('Sticker upload failed.'));
                            };
                            request.onload = function() {
                                var payload;
                                try {
                                    payload = JSON.parse(request.responseText);
                                } catch (unused) {
                                    reject(new Error('Sticker upload returned an invalid response.'));
                                    return;
                                }
                                if (request.status >= 200 && request.status < 300) {
                                    resolve(payload);
                                    return;
                                }
                                reject({
                                    body: payload
                                });
                            };
                            request.send(form);
                        })
                    ];
                case 4:
                    body = _state.sent();
                    dispatcher = window.unbound.metro.findByProps('dispatch', 'subscribe');
                    userStore = window.unbound.metro.findByProps('getCurrentUser', 'getUser');
                    if (body && typeof (dispatcher === null || dispatcher === void 0 ? void 0 : dispatcher.dispatch) === 'function') dispatcher.dispatch({
                        guildId: guild.id,
                        sticker: _object_spread_props(_object_spread({}, body), {
                            user: userStore === null || userStore === void 0 ? void 0 : (_userStore_getCurrentUser = userStore.getCurrentUser) === null || _userStore_getCurrentUser === void 0 ? void 0 : _userStore_getCurrentUser.call(userStore)
                        }),
                        type: 'GUILD_STICKERS_CREATE_SUCCESS'
                    });
                    _state.label = 5;
                case 5:
                    showToast("Cloned ".concat(expression.name, " to ").concat(guild.name, "."));
                    return [
                        2
                    ];
            }
        });
    })();
}
function isFavoriteSticker(expression) {
    var _stickers_isFavoriteSticker;
    if (expression.kind !== 'sticker') return false;
    var stickers = window.unbound.metro.findByProps('isFavoriteSticker');
    return (stickers === null || stickers === void 0 ? void 0 : (_stickers_isFavoriteSticker = stickers.isFavoriteSticker) === null || _stickers_isFavoriteSticker === void 0 ? void 0 : _stickers_isFavoriteSticker.call(stickers, expression.id)) === true;
}
function toggleFavoriteSticker(expression, favorite) {
    return _async_to_generator(function() {
        var actions, action;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    actions = window.unbound.metro.findByProps('favoriteSticker', 'unfavoriteSticker');
                    action = favorite ? actions === null || actions === void 0 ? void 0 : actions.favoriteSticker : actions === null || actions === void 0 ? void 0 : actions.unfavoriteSticker;
                    if (typeof action !== 'function') throw new Error('Favorites are unavailable on this client build.');
                    return [
                        4,
                        action(expression.id)
                    ];
                case 1:
                    _state.sent();
                    showToast(favorite ? "".concat(expression.name, " added to favorites.") : "".concat(expression.name, " removed from favorites."));
                    return [
                        2
                    ];
            }
        });
    })();
}
function CloneSheet(param) {
    var expression = param.expression, onClose = param.onClose;
    var _$React = window.unbound.metro.common.React;
    var ReactNative = window.unbound.metro.common.ReactNative;
    var Discord = getDesignModule();
    var _React_useState = _sliced_to_array(_$React.useState(expression.name), 2), name = _React_useState[0], setName = _React_useState[1];
    var _React_useState1 = _sliced_to_array(_$React.useState(''), 2), query = _React_useState1[0], setQuery = _React_useState1[1];
    var _React_useState2 = _sliced_to_array(_$React.useState(false), 2), busy = _React_useState2[0], setBusy = _React_useState2[1];
    var guilds = _$React.useMemo(function() {
        return getOwnedGuilds();
    }, []);
    var visibleGuilds = _$React.useMemo(function() {
        return guilds.filter(function(guild) {
            return guild.name.toLowerCase().includes(query.trim().toLowerCase());
        });
    }, [
        guilds,
        query
    ]);
    if (!(Discord === null || Discord === void 0 ? void 0 : Discord.ActionSheet) || !Discord.TextField) {
        return /*#__PURE__*/ React.createElement(ReactNative.View, {
            style: {
                padding: 16
            }
        }, /*#__PURE__*/ React.createElement(ReactNative.Text, null, "Cloning is unavailable on this client build."));
    }
    return /*#__PURE__*/ React.createElement(Discord.ActionSheet, null, /*#__PURE__*/ React.createElement(ReactNative.View, {
        style: {
            paddingHorizontal: 16,
            paddingTop: 8,
            paddingBottom: 16
        }
    }, /*#__PURE__*/ React.createElement(ReactNative.View, {
        style: {
            alignItems: 'center',
            flexDirection: 'row',
            marginBottom: 16
        }
    }, /*#__PURE__*/ React.createElement(ReactNative.Image, {
        source: {
            uri: getAssetUrl(expression)
        },
        style: {
            borderRadius: 12,
            height: 48,
            marginRight: 12,
            width: 48
        }
    }), /*#__PURE__*/ React.createElement(ReactNative.View, {
        style: {
            flex: 1
        }
    }, /*#__PURE__*/ React.createElement(ReactNative.Text, {
        style: {
            color: '#f2f3f5',
            fontSize: 18,
            fontWeight: '700'
        }
    }, "Clone to a server"), /*#__PURE__*/ React.createElement(ReactNative.Text, {
        numberOfLines: 1,
        style: {
            color: '#b5bac1',
            fontSize: 13,
            marginTop: 2
        }
    }, expression.name))), /*#__PURE__*/ React.createElement(ReactNative.Text, {
        style: {
            color: '#b5bac1',
            fontSize: 12,
            fontWeight: '600',
            marginBottom: 7
        }
    }, "NAME"), /*#__PURE__*/ React.createElement(Discord.TextField, {
        value: name,
        onChange: setName,
        placeholder: "Expression name"
    }), /*#__PURE__*/ React.createElement(ReactNative.Text, {
        style: {
            color: '#b5bac1',
            fontSize: 12,
            fontWeight: '600',
            marginBottom: 7,
            marginTop: 16
        }
    }, "YOUR SERVERS"), /*#__PURE__*/ React.createElement(Discord.TextField, {
        value: query,
        onChange: setQuery,
        placeholder: "Search servers",
        isClearable: true
    }), /*#__PURE__*/ React.createElement(ReactNative.View, {
        style: {
            gap: 8,
            marginTop: 12
        }
    }, visibleGuilds.map(function(guild) {
        return /*#__PURE__*/ React.createElement(ReactNative.Pressable, {
            key: guild.id,
            disabled: busy || !name.trim(),
            onPress: function onPress() {
                if (busy || !name.trim()) return;
                setBusy(true);
                onClose();
                void cloneExpression(expression, guild, name.trim()).catch(showError).finally(function() {
                    return setBusy(false);
                });
            },
            style: function style(param) {
                var pressed = param.pressed;
                return {
                    alignItems: 'center',
                    backgroundColor: pressed ? '#35373c' : '#2b2d31',
                    borderRadius: 12,
                    flexDirection: 'row',
                    minHeight: 58,
                    opacity: busy || !name.trim() ? 0.5 : 1,
                    paddingHorizontal: 12
                };
            }
        }, guild.icon ? /*#__PURE__*/ React.createElement(ReactNative.Image, {
            source: {
                uri: "https://cdn.discordapp.com/icons/".concat(guild.id, "/").concat(guild.icon, ".png?size=64")
            },
            style: {
                borderRadius: 18,
                height: 36,
                marginRight: 12,
                width: 36
            }
        }) : /*#__PURE__*/ React.createElement(ReactNative.View, {
            style: {
                alignItems: 'center',
                backgroundColor: '#5865f2',
                borderRadius: 18,
                height: 36,
                justifyContent: 'center',
                marginRight: 12,
                width: 36
            }
        }, /*#__PURE__*/ React.createElement(ReactNative.Text, {
            style: {
                color: '#fff',
                fontSize: 15,
                fontWeight: '700'
            }
        }, guild.name.slice(0, 1).toUpperCase())), /*#__PURE__*/ React.createElement(ReactNative.Text, {
            numberOfLines: 1,
            style: {
                color: '#f2f3f5',
                flex: 1,
                fontSize: 15,
                fontWeight: '600'
            }
        }, guild.name), /*#__PURE__*/ React.createElement(ReactNative.Text, {
            style: {
                color: '#949ba4',
                fontSize: 18
            }
        }, busy ? '…' : '›'));
    }), guilds.length === 0 ? /*#__PURE__*/ React.createElement(ReactNative.Text, {
        style: {
            color: '#b5bac1',
            paddingVertical: 16,
            textAlign: 'center'
        }
    }, "You do not own any servers.") : null, guilds.length > 0 && visibleGuilds.length === 0 ? /*#__PURE__*/ React.createElement(ReactNative.Text, {
        style: {
            color: '#b5bac1',
            paddingVertical: 16,
            textAlign: 'center'
        }
    }, "No servers match that search.") : null)));
}
function openCloneSheet(expression) {
    var sheets = getSheets();
    if (!(sheets === null || sheets === void 0 ? void 0 : sheets.openLazy)) throw new Error('Action sheets are unavailable on this client build.');
    var key = "".concat(SHEET_KEY_PREFIX, "clone-").concat(Date.now());
    sheets.openLazy(Promise.resolve({
        default: function _default() {
            return /*#__PURE__*/ React.createElement(CloneSheet, {
                expression: expression,
                onClose: function onClose() {
                    var _sheets_hideActionSheet;
                    return (_sheets_hideActionSheet = sheets.hideActionSheet) === null || _sheets_hideActionSheet === void 0 ? void 0 : _sheets_hideActionSheet.call(sheets, key);
                }
            });
        }
    }), key, {
        onClose: function onClose() {
            var _sheets_hideActionSheet;
            return (_sheets_hideActionSheet = sheets.hideActionSheet) === null || _sheets_hideActionSheet === void 0 ? void 0 : _sheets_hideActionSheet.call(sheets, key);
        }
    });
}
function ExpressionActionBar(param) {
    var expression = param.expression, sheetKey = param.sheetKey;
    var _$React = window.unbound.metro.common.React;
    var ReactNative = window.unbound.metro.common.ReactNative;
    var _React_useState = _sliced_to_array(_$React.useState(function() {
        return isFavoriteSticker(expression);
    }), 2), favorite = _React_useState[0], setFavorite = _React_useState[1];
    var _React_useState1 = _sliced_to_array(_$React.useState(false), 2), updatingFavorite = _React_useState1[0], setUpdatingFavorite = _React_useState1[1];
    var close = function close() {
        var _getSheets_hideActionSheet, _getSheets;
        if (expression.kind === 'sticker') {
            var stickerSheets = window.unbound.metro.findByProps('hideStickerDetailActionSheet');
            if (typeof (stickerSheets === null || stickerSheets === void 0 ? void 0 : stickerSheets.hideStickerDetailActionSheet) === 'function') {
                stickerSheets.hideStickerDetailActionSheet();
                return;
            }
        }
        (_getSheets = getSheets()) === null || _getSheets === void 0 ? void 0 : (_getSheets_hideActionSheet = _getSheets.hideActionSheet) === null || _getSheets_hideActionSheet === void 0 ? void 0 : _getSheets_hideActionSheet.call(_getSheets, sheetKey);
    };
    var compactButton = function compactButton(label, onPress) {
        var disabled = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
        return /*#__PURE__*/ React.createElement(ReactNative.Pressable, {
            disabled: disabled,
            onPress: onPress,
            style: function style(param) {
                var pressed = param.pressed;
                return {
                    alignItems: 'center',
                    backgroundColor: pressed ? '#4752c4' : '#5865f2',
                    borderRadius: 9,
                    flex: 1,
                    justifyContent: 'center',
                    minHeight: 38,
                    opacity: disabled ? 0.55 : 1,
                    paddingHorizontal: 6
                };
            }
        }, /*#__PURE__*/ React.createElement(ReactNative.Text, {
            numberOfLines: 1,
            style: {
                color: '#f2f3f5',
                fontSize: 12,
                fontWeight: '700'
            }
        }, label));
    };
    return /*#__PURE__*/ React.createElement(ReactNative.View, {
        style: {
            flexDirection: 'row',
            gap: 6,
            marginHorizontal: 12,
            marginTop: 10
        }
    }, compactButton('Copy URL', function() {
        close();
        copyText(getExpressionLink(expression), 'URL copied to the clipboard.');
    }), expression.kind === 'emoji' ? compactButton('Copy markup', function() {
        close();
        copyText(getMarkup(expression), 'Emoji markup copied to the clipboard.');
    }) : compactButton(favorite ? 'Unfavorite' : 'Favorite', function() {
        if (updatingFavorite) return;
        close();
        setUpdatingFavorite(true);
        void toggleFavoriteSticker(expression, !favorite).then(function() {
            return setFavorite(function(value) {
                return !value;
            });
        }).catch(showError).finally(function() {
            return setUpdatingFavorite(false);
        });
    }, updatingFavorite), compactButton('Clone', function() {
        close();
        openCloneSheet(expression);
    }));
}
function addToolsRows(result, expression, key) {
    var rows = findChildArray(result);
    if (!rows || rows.some(function(row) {
        return (row === null || row === void 0 ? void 0 : row.type) === ExpressionActionBar;
    })) return;
    rows.push(window.unbound.metro.common.React.createElement(ExpressionActionBar, {
        expression: expression,
        key: ACTION_ROW_KEY,
        sheetKey: key
    }));
}
function addToolsToRoot(result, expression, key) {
    var _result_props;
    var rows = result === null || result === void 0 ? void 0 : (_result_props = result.props) === null || _result_props === void 0 ? void 0 : _result_props.children;
    if (Array.isArray(rows)) {
        if (rows.some(function(row) {
            return (row === null || row === void 0 ? void 0 : row.type) === ExpressionActionBar;
        })) return;
        rows.push(window.unbound.metro.common.React.createElement(ExpressionActionBar, {
            expression: expression,
            key: ACTION_ROW_KEY,
            sheetKey: key
        }));
        return;
    }
    addToolsRows(result, expression, key);
}
function patchDetailSheet(detail, expression, key) {
    if (patchedDetailSheets.has(detail)) return;
    var element = detail;
    if (typeof element.type !== 'function') return;
    patchedDetailSheets.add(detail);
    unpatches.push(window.unbound.patcher.after(element, 'type', function(ctx) {
        addToolsToRoot(ctx.result, expression, key);
        return ctx.result;
    }));
}
function patchExpressionSheet(instance, kind, key) {
    if (patchedSheets.has(instance)) return;
    var sheet = instance;
    if (typeof sheet.default !== 'function') return;
    patchedSheets.add(instance);
    unpatches.push(window.unbound.patcher.after(sheet, 'default', function(ctx) {
        var expression = getExpression(kind, ctx.args[0]);
        if (!expression || !ctx.result || _type_of(ctx.result) !== 'object') return ctx.result;
        addToolsRows(ctx.result, expression, key);
        var outer = ctx.result;
        if (typeof outer.type !== 'function' || patchedOuterSheets.has(outer)) return ctx.result;
        patchedOuterSheets.add(outer);
        unpatches.push(window.unbound.patcher.after(outer, 'type', function(innerCtx) {
            var detail = findElement(innerCtx.result, function(element) {
                var _element_props, _element_props1;
                return Boolean((_element_props = element.props) === null || _element_props === void 0 ? void 0 : _element_props.emojiNode) && ((_element_props1 = element.props) === null || _element_props1 === void 0 ? void 0 : _element_props1.nonce) !== undefined;
            });
            if (detail) patchDetailSheet(detail, expression, key);
            addToolsRows(innerCtx.result, expression, key);
            return innerCtx.result;
        }));
        return ctx.result;
    }));
}
function patchStickerSheet() {
    var module = window.unbound.metro.findByFilePath('modules/stickers/native/StickerDetailActionSheet.tsx');
    var component = module === null || module === void 0 ? void 0 : module.default;
    if (!component || typeof component.type !== 'function') return;
    unpatches.push(window.unbound.patcher.after(component, 'type', function(ctx) {
        var _parseSticker;
        var expression = (_parseSticker = parseSticker(ctx.args[0])) !== null && _parseSticker !== void 0 ? _parseSticker : parseSticker(ctx.result);
        var detail = findElement(ctx.result, function(element) {
            return getTypeName(element) === 'GuildStickerDetail';
        });
        if (expression && detail) patchDetailSheet(detail, expression, 'StickerDetailActionSheet');
        return ctx.result;
    }));
}
function start() {
    patchedSheets = new WeakSet();
    patchedOuterSheets = new WeakSet();
    patchedDetailSheets = new WeakSet();
    var sheets = getSheets();
    if (!(sheets === null || sheets === void 0 ? void 0 : sheets.openLazy)) throw new Error('Action sheets are unavailable on this client build.');
    unpatches.push(window.unbound.patcher.before(sheets, 'openLazy', function(ctx) {
        var _ctx_args = _sliced_to_array(ctx.args, 2), componentPromise = _ctx_args[0], key = _ctx_args[1];
        if (typeof key !== 'string' || !(componentPromise === null || componentPromise === void 0 ? void 0 : componentPromise.then)) return;
        var kind = /emoji/i.test(key) ? 'emoji' : /sticker/i.test(key) ? 'sticker' : null;
        if (!kind) return;
        void componentPromise.then(function(instance) {
            if (instance && (typeof instance === "undefined" ? "undefined" : _type_of(instance)) === 'object') patchExpressionSheet(instance, kind, key);
        }).catch(function() {
            return undefined;
        });
    }));
    patchStickerSheet();
}
function stop() {
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
    try {
        for(var _iterator = unpatches.splice(0)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
            var unpatch = _step.value;
            unpatch();
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
    patchedSheets = new WeakSet();
    patchedOuterSheets = new WeakSet();
    patchedDetailSheets = new WeakSet();
}
var index = {
    start: start,
    stop: stop
};
return index;
})();return this.__plugin;},start(context){const module=this.__load();const plugin=module?.default??module;if(plugin&&typeof plugin.start==='function')return plugin.start(context);},stop(){const module=this.__load();const plugin=module?.default??module;if(plugin&&typeof plugin.stop==='function')return plugin.stop();}})