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
function _iterable_to_array(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) {
        return Array.from(iter);
    }
}
function _non_iterable_spread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _to_consumable_array(arr) {
    return _array_without_holes(arr) || _iterable_to_array(arr) || _unsupported_iterable_to_array(arr) || _non_iterable_spread();
}
function _unsupported_iterable_to_array(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _array_like_to_array(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _array_like_to_array(o, minLen);
}
var MEDIA_KEYBOARD_ITEM_PATH = 'modules/media_keyboard/native/components/MediaKeyboardItem.tsx';
var BADGE_INSET = 3;
var started = false;
var unpatch = null;
var removeModuleListener = null;
function formatBytes(bytes) {
    if (!bytes) return '0 Bytes';
    var sizes = [
        'Bytes',
        'KB',
        'MB',
        'GB',
        'TB',
        'PB',
        'EB',
        'ZB',
        'YB'
    ];
    var index = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), sizes.length - 1);
    return "".concat(Number.parseFloat((bytes / Math.pow(1024, index)).toFixed(2)), " ").concat(sizes[index]);
}
function sizeBadgesForRow(children, padding, separator) {
    var badges = [];
    for(var slot = 0; slot < children.length; slot++){
        var _child_key;
        var _child_props_item_node_image, _child_props_item_node, _child_props_item, _child_props, _child_props1;
        var child = children[slot];
        var bytes = child === null || child === void 0 ? void 0 : (_child_props = child.props) === null || _child_props === void 0 ? void 0 : (_child_props_item = _child_props.item) === null || _child_props_item === void 0 ? void 0 : (_child_props_item_node = _child_props_item.node) === null || _child_props_item_node === void 0 ? void 0 : (_child_props_item_node_image = _child_props_item_node.image) === null || _child_props_item_node_image === void 0 ? void 0 : _child_props_item_node_image.fileSize;
        var size = child === null || child === void 0 ? void 0 : (_child_props1 = child.props) === null || _child_props1 === void 0 ? void 0 : _child_props1.size;
        if (typeof bytes !== 'number' || !Number.isSafeInteger(bytes) || bytes < 0) continue;
        if (typeof size !== 'number' || !Number.isFinite(size) || size <= 0) continue;
        badges.push({
            key: "file-size-".concat((_child_key = child.key) !== null && _child_key !== void 0 ? _child_key : slot),
            label: formatBytes(bytes),
            left: padding + slot * (size + separator) + BADGE_INSET
        });
    }
    return badges;
}
function patchMediaKeyboard(module) {
    var _module_default;
    if (unpatch) return true;
    if (typeof (module === null || module === void 0 ? void 0 : (_module_default = module.default) === null || _module_default === void 0 ? void 0 : _module_default.type) !== 'function') return false;
    unpatch = window.unbound.patcher.after(module.default, 'type', function(context) {
        var _row_props, _row_props_style, _row_props1;
        var row = context.result;
        var children = row === null || row === void 0 ? void 0 : (_row_props = row.props) === null || _row_props === void 0 ? void 0 : _row_props.children;
        if (!Array.isArray(children) || !children.length) return;
        var _metro_common = window.unbound.metro.common, React1 = _metro_common.React, ReactNative = _metro_common.ReactNative, Constants = _metro_common.Constants;
        var padding = (_row_props1 = row.props) === null || _row_props1 === void 0 ? void 0 : (_row_props_style = _row_props1.style) === null || _row_props_style === void 0 ? void 0 : _row_props_style.paddingHorizontal;
        var separator = module.SEPARATOR_SIZE;
        var badges = sizeBadgesForRow(children, typeof padding === 'number' ? padding : 12, typeof separator === 'number' ? separator : 4);
        if (!badges.length) return;
        return React1.cloneElement(row, {}, _to_consumable_array(children).concat(_to_consumable_array(badges.map(function(param) {
            var key = param.key, label = param.label, left = param.left;
            return /*#__PURE__*/ React.createElement(ReactNative.View, {
                key: key,
                pointerEvents: "none",
                style: {
                    backgroundColor: '#1e1f2280',
                    borderRadius: 4,
                    left: left,
                    paddingHorizontal: 4,
                    paddingVertical: 2,
                    position: 'absolute',
                    top: BADGE_INSET
                }
            }, /*#__PURE__*/ React.createElement(ReactNative.Text, {
                style: {
                    color: 'white',
                    fontFamily: Constants.Fonts.PRIMARY_BOLD,
                    fontSize: 10,
                    includeFontPadding: false
                }
            }, label));
        }))));
    });
    return true;
}
function waitForMediaKeyboard() {
    if (patchMediaKeyboard(window.unbound.metro.findByFilePath(MEDIA_KEYBOARD_ITEM_PATH, {
        interop: false
    }))) return;
    removeModuleListener = window.unbound.metro.addListener(function() {
        if (!started) return;
        if (!patchMediaKeyboard(window.unbound.metro.findByFilePath(MEDIA_KEYBOARD_ITEM_PATH, {
            interop: false
        }))) return;
        removeModuleListener === null || removeModuleListener === void 0 ? void 0 : removeModuleListener();
        removeModuleListener = null;
    });
}
var index = {
    start: function start() {
        if (started) return;
        started = true;
        waitForMediaKeyboard();
    },
    stop: function stop() {
        started = false;
        unpatch === null || unpatch === void 0 ? void 0 : unpatch();
        unpatch = null;
        removeModuleListener === null || removeModuleListener === void 0 ? void 0 : removeModuleListener();
        removeModuleListener = null;
    }
};
return {
  default: index,
  formatBytes: formatBytes,
  sizeBadgesForRow: sizeBadgesForRow
};
})();return this.__plugin;},start(context){const module=this.__load();const plugin=module?.default??module;if(plugin&&typeof plugin.start==='function')return plugin.start(context);},stop(){const module=this.__load();const plugin=module?.default??module;if(plugin&&typeof plugin.stop==='function')return plugin.stop();}})