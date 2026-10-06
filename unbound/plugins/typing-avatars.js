({__plugin:null,__load(){if(this.__plugin)return this.__plugin;this.__plugin=(function () {
'use strict';
function _array_like_to_array(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _array_without_holes(arr) {
    if (Array.isArray(arr)) return _array_like_to_array(arr);
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
function _iterable_to_array(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) {
        return Array.from(iter);
    }
}
function _non_iterable_spread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
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
var TYPING_INDICATOR_PATH = 'modules/chat/native/TypingIndicator.tsx';
var AVATAR_GUTTER = 24;
var AVATAR_HEIGHT = 16;
var AVATAR_OVERLAP = -6;
var MAX_AVATARS = 3;
var components = null;
var users = null;
var unpatch = null;
var removeModuleListener = null;
function collapseGutter(item) {
    if (!Array.isArray(item.wrapperStyle)) return;
    item.wrapperStyle = item.wrapperStyle.map(function(style) {
        return (style === null || style === void 0 ? void 0 : style.paddingLeft) != null ? _object_spread_props(_object_spread({}, style), {
            paddingLeft: 0
        }) : style;
    });
}
function TypingAvatars(param) {
    var item = param.item, typingUsers = param.typingUsers;
    var ReactNative = window.unbound.metro.common.ReactNative;
    var visibleUsers = typingUsers.slice(0, MAX_AVATARS);
    return /*#__PURE__*/ React.createElement(ReactNative.View, {
        style: {
            flexDirection: 'row',
            height: AVATAR_HEIGHT,
            marginRight: 0,
            transform: [
                {
                    translateY: -2
                }
            ],
            width: visibleUsers.length ? AVATAR_HEIGHT + (visibleUsers.length - 1) * (AVATAR_HEIGHT + AVATAR_OVERLAP) : 0
        }
    }, visibleUsers.map(function(user, index) {
        var _item_channel;
        return /*#__PURE__*/ React.createElement(ReactNative.View, {
            key: user.id,
            style: {
                marginLeft: index ? AVATAR_OVERLAP : 0,
                zIndex: visibleUsers.length - index
            }
        }, /*#__PURE__*/ React.createElement(components.Avatar, {
            user: user,
            size: components.AvatarSizes.SIZE_16,
            guildId: (_item_channel = item.channel) === null || _item_channel === void 0 ? void 0 : _item_channel.guild_id
        }));
    }));
}
function modulePath(id) {
    var _globalThis_window_modules_get, _globalThis_window_modules_get1, _globalThis_window_modules, _globalThis_window;
    return (_globalThis_window = globalThis.window) === null || _globalThis_window === void 0 ? void 0 : (_globalThis_window_modules = _globalThis_window.modules) === null || _globalThis_window_modules === void 0 ? void 0 : (_globalThis_window_modules_get1 = _globalThis_window_modules.get) === null || _globalThis_window_modules_get1 === void 0 ? void 0 : (_globalThis_window_modules_get = _globalThis_window_modules_get1.call(_globalThis_window_modules, id)) === null || _globalThis_window_modules_get === void 0 ? void 0 : _globalThis_window_modules_get.__filePath;
}
function resolvePatchTarget(module) {
    var holder = module;
    var prop = 'default';
    var current = module === null || module === void 0 ? void 0 : module.default;
    while(current && (typeof current === "undefined" ? "undefined" : _type_of(current)) === 'object'){
        var next = current.type ? 'type' : current.render ? 'render' : null;
        if (!next) break;
        holder = current;
        prop = next;
        current = current[next];
    }
    return typeof current === 'function' ? {
        holder: holder,
        prop: prop
    } : null;
}
function patchTypingIndicator(module) {
    var target = resolvePatchTarget(module);
    if (unpatch || !target) return Boolean(unpatch);
    unpatch = window.unbound.patcher.after(target.holder, target.prop, function(param) {
        var result = param.result;
        var _ref;
        var _result_props, _result_props1, _result_props2, _result_props3, _result_props4;
        var renderItem = result === null || result === void 0 ? void 0 : (_result_props = result.props) === null || _result_props === void 0 ? void 0 : _result_props.renderItem;
        var item = result === null || result === void 0 ? void 0 : (_result_props1 = result.props) === null || _result_props1 === void 0 ? void 0 : _result_props1.item;
        var directIds = result === null || result === void 0 ? void 0 : (_result_props2 = result.props) === null || _result_props2 === void 0 ? void 0 : _result_props2.typingUserIds;
        var ids = (_ref = item === null || item === void 0 ? void 0 : item.typingUserIds) !== null && _ref !== void 0 ? _ref : Array.isArray(directIds) ? directIds : undefined;
        var resolvedItem = item !== null && item !== void 0 ? item : {
            channel: result === null || result === void 0 ? void 0 : (_result_props3 = result.props) === null || _result_props3 === void 0 ? void 0 : _result_props3.channel,
            wrapperStyle: result === null || result === void 0 ? void 0 : (_result_props4 = result.props) === null || _result_props4 === void 0 ? void 0 : _result_props4.wrapperStyle
        };
        if (typeof renderItem !== 'function' || !(ids === null || ids === void 0 ? void 0 : ids.length)) return result;
        var _metro_common = window.unbound.metro.common, React1 = _metro_common.React, ReactNative = _metro_common.ReactNative;
        collapseGutter(resolvedItem);
        return React1.cloneElement(result, {
            renderItem: function renderItem1() {
                for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
                    args[_key] = arguments[_key];
                }
                var inner = renderItem.apply(void 0, _to_consumable_array(args));
                var typingUsers = ids.map(function(id) {
                    var _users_getUser;
                    return users === null || users === void 0 ? void 0 : (_users_getUser = users.getUser) === null || _users_getUser === void 0 ? void 0 : _users_getUser.call(users, id);
                }).filter(function(user) {
                    return Boolean(user);
                });
                if (!typingUsers.length) return inner;
                return /*#__PURE__*/ React.createElement(ReactNative.View, {
                    style: {
                        alignItems: 'center',
                        flexDirection: 'row',
                        paddingLeft: AVATAR_GUTTER
                    }
                }, /*#__PURE__*/ React.createElement(TypingAvatars, {
                    item: resolvedItem,
                    typingUsers: typingUsers
                }), /*#__PURE__*/ React.createElement(ReactNative.View, {
                    style: {
                        flex: 1,
                        marginLeft: -26
                    }
                }, inner));
            }
        });
    });
    return true;
}
function start() {
    components = window.unbound.metro.findByProps('SummarizedIconRow', 'Avatar', 'AvatarSizes');
    users = window.unbound.metro.findByProps('getCurrentUser', 'getUser');
    if (!(components === null || components === void 0 ? void 0 : components.SummarizedIconRow) || !(components === null || components === void 0 ? void 0 : components.Avatar) || !(users === null || users === void 0 ? void 0 : users.getUser)) return;
    if (patchTypingIndicator(window.unbound.metro.findByFilePath(TYPING_INDICATOR_PATH, {
        interop: false
    }))) return;
    removeModuleListener = window.unbound.metro.addListener(function(module, id) {
        if (modulePath(id) !== TYPING_INDICATOR_PATH || !patchTypingIndicator(module)) return;
        removeModuleListener === null || removeModuleListener === void 0 ? void 0 : removeModuleListener();
        removeModuleListener = null;
    });
}
var index = {
    start: start,
    stop: function stop() {
        unpatch === null || unpatch === void 0 ? void 0 : unpatch();
        unpatch = null;
        removeModuleListener === null || removeModuleListener === void 0 ? void 0 : removeModuleListener();
        removeModuleListener = null;
        components = null;
        users = null;
    }
};
return index;
})();return this.__plugin;},start(context){const module=this.__load();const plugin=module?.default??module;if(plugin&&typeof plugin.start==='function')return plugin.start(context);},stop(){const module=this.__load();const plugin=module?.default??module;if(plugin&&typeof plugin.stop==='function')return plugin.stop();}})