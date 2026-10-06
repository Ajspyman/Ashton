({__plugin:null,__load(){if(this.__plugin)return this.__plugin;this.__plugin=(function () {
'use strict';
function getNativeModuleLocale() {
    var _ref;
    var _NativeModules_I18nManager;
    if (window.ReactNative.Platform.OS === 'ios') {
        var _ref1, _ref2;
        var _NativeModules_SettingsManager, _settings_AppleLanguages;
        var settings = (_NativeModules_SettingsManager = window.ReactNative.NativeModules.SettingsManager) === null || _NativeModules_SettingsManager === void 0 ? void 0 : _NativeModules_SettingsManager.settings;
        return (_ref1 = (_ref2 = settings === null || settings === void 0 ? void 0 : settings.AppleLocale) !== null && _ref2 !== void 0 ? _ref2 : settings === null || settings === void 0 ? void 0 : (_settings_AppleLanguages = settings.AppleLanguages) === null || _settings_AppleLanguages === void 0 ? void 0 : _settings_AppleLanguages[0]) !== null && _ref1 !== void 0 ? _ref1 : null;
    }
    return (_ref = (_NativeModules_I18nManager = window.ReactNative.NativeModules.I18nManager) === null || _NativeModules_I18nManager === void 0 ? void 0 : _NativeModules_I18nManager.localeIdentifier) !== null && _ref !== void 0 ? _ref : null;
}
function getIntlLocale() {
    try {
        var _Intl_DateTimeFormat_resolvedOptions_locale;
        return (_Intl_DateTimeFormat_resolvedOptions_locale = Intl.DateTimeFormat().resolvedOptions().locale) !== null && _Intl_DateTimeFormat_resolvedOptions_locale !== void 0 ? _Intl_DateTimeFormat_resolvedOptions_locale : null;
    } catch (unused) {
        return null;
    }
}
function getDeviceLocale() {
    var _ref, _getNativeModuleLocale;
    return (_ref = (_getNativeModuleLocale = getNativeModuleLocale()) !== null && _getNativeModuleLocale !== void 0 ? _getNativeModuleLocale : getIntlLocale()) !== null && _ref !== void 0 ? _ref : 'unknown';
}function _array_like_to_array(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _array_with_holes(arr) {
    if (Array.isArray(arr)) return arr;
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
var Patcher = window.unbound.patcher.createPatcher('adrian.aussie-mode');
var ROTATED_ROOT_COMPONENT_NAMES = [
    'ErrorBoundary'
];
var ROTATED_COMPONENT_FILE_PATHS = [
    'modules/main_tabs_v2/native/tabs/you/YouScreen.tsx',
    'modules/main_tabs_v2/native/tabs/settings/Settings.tsx',
    'modules/main_tabs_v2/native/tabs/you/YouAccountActionSheet.tsx'
];
function rotateResult(result) {
    return /*#__PURE__*/ React.createElement(window.ReactNative.View, {
        pointerEvents: "box-none",
        style: {
            flex: 1,
            transform: [
                {
                    rotate: '180deg'
                }
            ]
        }
    }, result);
}
function rotateClassComponentRender(componentName) {
    var _Component_prototype;
    var Component = window.unbound.metro.findByName(componentName);
    if (!(Component === null || Component === void 0 ? void 0 : (_Component_prototype = Component.prototype) === null || _Component_prototype === void 0 ? void 0 : _Component_prototype.render)) return;
    Patcher.after(Component.prototype, 'render', function(param) {
        var result = param.result;
        return rotateResult(result);
    });
}
var FILE_COMPONENT_POLL_INTERVAL_MS = 500;
var FILE_COMPONENT_POLL_MAX_ATTEMPTS = 60;
function attachFileRotation(module) {
    var Component = module === null || module === void 0 ? void 0 : module.default;
    if (typeof Component === 'function') {
        Patcher.after(module, 'default', function(param) {
            var result = param.result;
            return rotateResult(result);
        });
        return;
    }
    if (typeof (Component === null || Component === void 0 ? void 0 : Component.type) === 'function') {
        Patcher.after(Component, 'type', function(param) {
            var result = param.result;
            return rotateResult(result);
        });
    }
}
function rotateFileComponent(filePath) {
    var existing = window.unbound.metro.findByFilePath(filePath, {
        interop: false
    });
    if (existing) {
        attachFileRotation(existing);
        return;
    }
    var attempts = 0;
    var interval = setInterval(function() {
        attempts++;
        var module = window.unbound.metro.findByFilePath(filePath, {
            interop: false
        });
        if (module) {
            clearInterval(interval);
            attachFileRotation(module);
            return;
        }
        if (attempts >= FILE_COMPONENT_POLL_MAX_ATTEMPTS) clearInterval(interval);
    }, FILE_COMPONENT_POLL_INTERVAL_MS);
}
function rotateNavigatorScreen(siblingRouteNames, targetRouteName) {
    var nav = window.unbound.metro.findByProps('useNavigationBuilder');
    if (typeof (nav === null || nav === void 0 ? void 0 : nav.useNavigationBuilder) !== 'function') return;
    var patchedComponents = new WeakSet();
    Patcher.before(nav, 'useNavigationBuilder', function(param) {
        var args = param.args;
        var _args_, _target_props;
        var children = (_args_ = args[1]) === null || _args_ === void 0 ? void 0 : _args_.children;
        var screens = Array.isArray(children) ? children : children ? [
            children
        ] : [];
        var names = screens.map(function(screen) {
            var _screen_props;
            return screen === null || screen === void 0 ? void 0 : (_screen_props = screen.props) === null || _screen_props === void 0 ? void 0 : _screen_props.name;
        }).filter(Boolean);
        if (!siblingRouteNames.every(function(name) {
            return names.includes(name);
        })) return;
        var target = screens.find(function(screen) {
            var _screen_props;
            return (screen === null || screen === void 0 ? void 0 : (_screen_props = screen.props) === null || _screen_props === void 0 ? void 0 : _screen_props.name) === targetRouteName;
        });
        var getComponent = target === null || target === void 0 ? void 0 : (_target_props = target.props) === null || _target_props === void 0 ? void 0 : _target_props.getComponent;
        if (typeof getComponent !== 'function') return;
        var Component = getComponent();
        if (!Component || (typeof Component === "undefined" ? "undefined" : _type_of(Component)) !== 'object' || typeof Component.type !== 'function') return;
        if (patchedComponents.has(Component)) return;
        patchedComponents.add(Component);
        Patcher.after(Component, 'type', function(param) {
            var result = param.result;
            return rotateResult(result);
        });
    });
}
function rotateActionSheets() {
    var sheets = window.unbound.metro.findByProps('openLazy', 'hideActionSheet');
    if (typeof (sheets === null || sheets === void 0 ? void 0 : sheets.openLazy) !== 'function') return;
    Patcher.before(sheets, 'openLazy', function(param) {
        var args = param.args;
        var _args = _sliced_to_array(args, 1), componentPromise = _args[0];
        if (typeof (componentPromise === null || componentPromise === void 0 ? void 0 : componentPromise.then) !== 'function') return;
        args[0] = componentPromise.then(function(module) {
            var Component = module === null || module === void 0 ? void 0 : module.default;
            if (!Component) return module;
            return _object_spread_props(_object_spread({}, module), {
                default: function _default(props) {
                    return rotateResult(/*#__PURE__*/ React.createElement(Component, props));
                }
            });
        });
    });
}
function startRotation() {
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
    try {
        for(var _iterator = ROTATED_ROOT_COMPONENT_NAMES[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
            var componentName = _step.value;
            rotateClassComponentRender(componentName);
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
    var _iteratorNormalCompletion1 = true, _didIteratorError1 = false, _iteratorError1 = undefined;
    try {
        for(var _iterator1 = ROTATED_COMPONENT_FILE_PATHS[Symbol.iterator](), _step1; !(_iteratorNormalCompletion1 = (_step1 = _iterator1.next()).done); _iteratorNormalCompletion1 = true){
            var filePath = _step1.value;
            rotateFileComponent(filePath);
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
    rotateNavigatorScreen([
        'root',
        'search_chat_preview',
        'pinned-messages',
        'mute',
        'threads'
    ], 'root');
    rotateActionSheets();
}
function stopRotation() {
    try {
        Patcher.unpatchAll();
    } catch (unused) {}
}var TARGET_LOCALE = 'en-AU';
var STORE = window.unbound.storage.getStore('adrian.aussie-mode');
function isTargetLocale(locale) {
    var normalizedLocale = locale.replace('_', '-');
    return normalizedLocale === TARGET_LOCALE || normalizedLocale.startsWith("".concat(TARGET_LOCALE, "-"));
}
var index = {
    start: function start() {
        var locale = getDeviceLocale();
        if (!isTargetLocale(locale)) return;
        var reloadedSinceEnable = STORE.get('reloadedSinceEnable', false);
        if (!reloadedSinceEnable) {
            STORE.set('reloadedSinceEnable', true);
            void window.unbound.native.reload();
            return;
        }
        startRotation();
    },
    stop: function stop() {
        stopRotation();
        var reloadedSinceEnable = STORE.get('reloadedSinceEnable', false);
        STORE.set('reloadedSinceEnable', false);
        if (reloadedSinceEnable) {
            void window.unbound.native.reload();
        }
    }
};
return index;
})();return this.__plugin;},start(context){const module=this.__load();const plugin=module?.default??module;if(plugin&&typeof plugin.start==='function')return plugin.start(context);},stop(){const module=this.__load();const plugin=module?.default??module;if(plugin&&typeof plugin.stop==='function')return plugin.stop();}})