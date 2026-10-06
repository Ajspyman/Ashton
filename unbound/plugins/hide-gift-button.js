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
var GIFT_BUTTON_PATH = 'modules/chat_input/native/action_buttons/ChatInputActionButtonGiftOrThread.tsx';
var RIGHT_ACTIONS_PATH = 'modules/chat_input/native/action_buttons/ChatInputRightActions.tsx';
var unpatchGiftButton = null;
var unpatchRightActions = null;
var removeModuleListener = null;
var giftComponent = null;
function unwrapComponent(mod) {
    var holder = mod;
    var prop = 'default';
    var current = mod === null || mod === void 0 ? void 0 : mod.default;
    var depth = 0;
    while(current && (typeof current === "undefined" ? "undefined" : _type_of(current)) === 'object' && depth < 5){
        var next = current.type !== undefined ? 'type' : current.render !== undefined ? 'render' : null;
        if (!next) break;
        holder = current;
        prop = next;
        current = current[next];
        depth++;
    }
    return typeof current === 'function' ? {
        holder: holder,
        prop: prop,
        component: current
    } : null;
}
function modulePath(id) {
    var _globalThis_window_modules_get, _globalThis_window_modules, _globalThis_window;
    return (_globalThis_window = globalThis.window) === null || _globalThis_window === void 0 ? void 0 : (_globalThis_window_modules = _globalThis_window.modules) === null || _globalThis_window_modules === void 0 ? void 0 : (_globalThis_window_modules_get = _globalThis_window_modules.get(id)) === null || _globalThis_window_modules_get === void 0 ? void 0 : _globalThis_window_modules_get.__filePath;
}
function resolveComponent(value) {
    var current = value;
    var depth = 0;
    while(current && (typeof current === "undefined" ? "undefined" : _type_of(current)) === 'object' && depth < 5){
        var next = current.type !== undefined ? 'type' : current.render !== undefined ? 'render' : null;
        if (!next) break;
        current = current[next];
        depth++;
    }
    return current;
}
function containsGift(node) {
    var depth = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
    if (!node || depth > 10 || (typeof node === "undefined" ? "undefined" : _type_of(node)) !== 'object') return false;
    if (resolveComponent(node.type) === giftComponent) return true;
    var props = node.props;
    if (!props || (typeof props === "undefined" ? "undefined" : _type_of(props)) !== 'object') return false;
    if (containsGift(props.item, depth + 1)) return true;
    if (containsGift(props.children, depth + 1)) return true;
    if (Array.isArray(props.children)) return props.children.some(function(child) {
        return containsGift(child, depth + 1);
    });
    return false;
}
function patchGiftButton(mod) {
    if (unpatchGiftButton) return true;
    var target = unwrapComponent(mod);
    if (!target) return false;
    giftComponent = target.component;
    unpatchGiftButton = window.unbound.patcher.instead(target.holder, target.prop, function(ctx) {
        var props = ctx.args[0];
        if (props && (typeof props === "undefined" ? "undefined" : _type_of(props)) === 'object' && typeof props.hideGiftButton === 'boolean') {
            ctx.args[0] = _object_spread_props(_object_spread({}, props), {
                hideGiftButton: true
            });
            return ctx.original.apply(ctx.this, ctx.args);
        }
        return null;
    });
    return true;
}
function patchRightActions(mod) {
    if (unpatchRightActions) return true;
    var target = unwrapComponent(mod);
    if (!target) return false;
    unpatchRightActions = window.unbound.patcher.after(target.holder, target.prop, function(ctx) {
        try {
            var _React;
            var result = ctx.result;
            if (!(result === null || result === void 0 ? void 0 : result.props) || !giftComponent) return;
            var React = window.unbound.metro.common.React;
            var children = React.Children.toArray(result.props.children);
            var filtered = children.filter(function(child) {
                return !containsGift(child);
            });
            if (filtered.length === children.length) return;
            return (_React = React).cloneElement.apply(_React, [
                result,
                null
            ].concat(_to_consumable_array(filtered)));
        } catch (unused) {}
    });
    return true;
}
function patchLoadedModules() {
    var giftPatched = patchGiftButton(window.unbound.metro.findByFilePath(GIFT_BUTTON_PATH, {
        interop: false
    }));
    var rightActionsPatched = patchRightActions(window.unbound.metro.findByFilePath(RIGHT_ACTIONS_PATH, {
        interop: false
    }));
    return giftPatched && rightActionsPatched;
}
var index = {
    start: function start() {
        if (patchLoadedModules()) return;
        removeModuleListener = window.unbound.metro.addListener(function(module, id) {
            var path = modulePath(id);
            if (path !== GIFT_BUTTON_PATH && path !== RIGHT_ACTIONS_PATH) return;
            if (!patchLoadedModules()) return;
            removeModuleListener === null || removeModuleListener === void 0 ? void 0 : removeModuleListener();
            removeModuleListener = null;
        });
    },
    stop: function stop() {
        unpatchRightActions === null || unpatchRightActions === void 0 ? void 0 : unpatchRightActions();
        unpatchRightActions = null;
        unpatchGiftButton === null || unpatchGiftButton === void 0 ? void 0 : unpatchGiftButton();
        unpatchGiftButton = null;
        giftComponent = null;
        removeModuleListener === null || removeModuleListener === void 0 ? void 0 : removeModuleListener();
        removeModuleListener = null;
    }
};
return index;
})();return this.__plugin;},start(context){const module=this.__load();const plugin=module?.default??module;if(plugin&&typeof plugin.start==='function')return plugin.start(context);},stop(){const module=this.__load();const plugin=module?.default??module;if(plugin&&typeof plugin.stop==='function')return plugin.stop();}})