({__plugin:null,__load(){if(this.__plugin)return this.__plugin;this.__plugin=(function () {
'use strict';
var SETTINGS_SPACING = {
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
var ADDON_ID = 'unbound.message-latency';
var ANDROID_NONCE_OFFSET = 1471228928;
var ANDROID_OFFSET_TOLERANCE = 86400000;
var DISCORD_EPOCH = 1420070400000;
var SNOWFLAKE_SHIFT = 4194304;
var LATENCY_OPTIONS = [
    1,
    2,
    3,
    5,
    10
];
var LATENCY_ICON_WIDTH = 12;
var LATENCY_ICON_HEIGHT = 12;
var LATENCY_CONTROL_WIDTH = 16;
var LATENCY_CONTROL_HEIGHT = 20;
var LATENCY_ROW_RESERVATION = LATENCY_CONTROL_WIDTH;
var TOOLTIP_MAX_WIDTH = 250;
var TOOLTIP_ARROW_HEIGHT = 8;
var TOOLTIP_ANCHOR_GAP = 3;
var LAYOUT_ATTRIBUTE_CENTER_Y = 10;
var LAYOUT_ATTRIBUTE_HEIGHT = 8;
var LAYOUT_ATTRIBUTE_LEADING = 5;
var LAYOUT_ATTRIBUTE_NOT_AN_ATTRIBUTE = 0;
var LAYOUT_ATTRIBUTE_TRAILING = 6;
var LAYOUT_ATTRIBUTE_WIDTH = 7;
var LAYOUT_RELATION_EQUAL = 0;
var MAX_LATENCY_RECORDS = 500;
var MAX_CELL_NODES = 120;
var MAX_CELL_DEPTH = 12;
var STORE = window.unbound.storage.getStore(ADDON_ID);
var rowUnpatch = null;
var users = null;
var themeStore = null;
var objc = null;
var fabric = null;
var started = false;
var activeTooltip = null;
var activeTooltipSurface = null;
var activeTooltipOwnerKey = null;
var tooltipTimer = null;
var tooltipDismissHook = null;
var tooltipGeneration = 0;
var tooltipSurfaceModuleName = '';
var removeModuleListener = null;
var removeMessageCreateListener = null;
var removeThemeListener = null;
var lifecycle = 0;
var cellHooks = [];
var latencyRecords = new Map();
var activeCells = new Map();
var activeCellMessageIds = new Map();
var cellsByMessageId = new Map();
var pendingCells = new Set();
var latencyViews = new Map();
function snowflakeTimestamp(value) {
    if (typeof value === 'number' && !Number.isSafeInteger(value)) return null;
    var digits = String(value);
    if (!/^\d+$/.test(digits)) return null;
    var remainder = 0;
    var quotient = '';
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
    try {
        for(var _iterator = digits[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
            var digit = _step.value;
            var current = remainder * 10 + Number(digit);
            var next = Math.floor(current / SNOWFLAKE_SHIFT);
            remainder = current % SNOWFLAKE_SHIFT;
            if (quotient || next) quotient += String(next);
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
    if (!quotient) return null;
    var timestamp = DISCORD_EPOCH + Number(quotient);
    return Number.isSafeInteger(timestamp) ? timestamp : null;
}
function formatLatency(delta, showMillis) {
    var values = [
        [
            Math.floor(delta / 86400000),
            'days'
        ],
        [
            Math.floor(delta / 3600000 % 24),
            'hours'
        ],
        [
            Math.floor(delta / 60000 % 60),
            'minutes'
        ],
        [
            Math.floor(delta / 1000 % 60),
            'seconds'
        ],
        [
            Math.floor(delta % 1000),
            'milliseconds'
        ]
    ];
    var result = '';
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
    try {
        for(var _iterator = values[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
            var _step_value = _sliced_to_array(_step.value, 2), value = _step_value[0], unit = _step_value[1];
            if (!value) continue;
            var part = "".concat(value, " ").concat(value > 1 ? unit : unit.slice(0, -1));
            if (result) {
                var separator = showMillis ? unit === 'milliseconds' : unit === 'seconds';
                result += separator ? ' and ' : ' ';
            }
            result += part;
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
    return result || '0 seconds';
}
function latencyDetails(message, currentUserId, options) {
    var _message_author, _message_author1;
    if (message.nonce == null || ((_message_author = message.author) === null || _message_author === void 0 ? void 0 : _message_author.bot)) return null;
    if (options.ignoreSelf && ((_message_author1 = message.author) === null || _message_author1 === void 0 ? void 0 : _message_author1.id) === currentUserId) return null;
    var messageTimestamp = snowflakeTimestamp(message.id);
    var nonceTimestamp = snowflakeTimestamp(message.nonce);
    if (messageTimestamp == null || nonceTimestamp == null) return null;
    var delta = messageTimestamp - nonceTimestamp;
    if (!options.showMillis) delta = Math.round(delta / 1000) * 1000;
    var androidClient = false;
    if (-delta >= ANDROID_NONCE_OFFSET - ANDROID_OFFSET_TOLERANCE) {
        androidClient = options.detectDiscordKotlin;
        delta += ANDROID_NONCE_OFFSET;
    }
    var absoluteDelta = Math.abs(delta);
    var ahead = absoluteDelta !== delta;
    var displayDelta = absoluteDelta >= options.latency * 1000 ? formatLatency(absoluteDelta, options.showMillis) : null;
    var fill = androidClient ? [
        'positive',
        'positive',
        'muted'
    ] : delta >= 120000 || ahead ? [
        'muted',
        'muted',
        'muted'
    ] : delta >= options.latency * 2000 ? [
        'danger',
        'muted',
        'muted'
    ] : [
        'warning',
        'warning',
        'muted'
    ];
    if (displayDelta === null && !androidClient) return null;
    return {
        ahead: ahead,
        androidClient: androidClient,
        delta: absoluteDelta,
        displayDelta: displayDelta,
        fill: fill
    };
}
function latencyTooltip(details) {
    if (!details.displayDelta) return 'User is suspected to be on an old Discord Android client';
    var message = details.ahead ? "This user's clock is ".concat(details.displayDelta, " ahead.") : "This message was sent with a delay of ".concat(details.displayDelta, ".");
    return details.androidClient ? "".concat(message, " User is suspected to be on an old Discord Android client.") : message;
}
function messageFromCreateEvent(event) {
    var message = event.message;
    if (!message || (typeof message === "undefined" ? "undefined" : _type_of(message)) !== 'object') return null;
    return message;
}
function currentOptions() {
    return {
        detectDiscordKotlin: STORE.get('detectDiscordKotlin', true),
        ignoreSelf: STORE.get('ignoreSelf', false),
        latency: STORE.get('latency', 2),
        showMillis: STORE.get('showMillis', false)
    };
}
function nativeCall(handle, selector) {
    for(var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++){
        args[_key - 2] = arguments[_key];
    }
    if (!objc) return null;
    try {
        return objc.invoke(handle, selector, args, {
            thread: 'main'
        });
    } catch (unused) {
        return null;
    }
}
function nativeKey(handle) {
    try {
        var _ref;
        var value = nativeCall(handle, 'hash');
        return value == null ? null : "".concat((_ref = objc === null || objc === void 0 ? void 0 : objc.className(handle)) !== null && _ref !== void 0 ? _ref : 'NSObject', ":").concat(String(value));
    } catch (unused) {
        return null;
    }
}
function nativeArray(value) {
    if (Array.isArray(value)) return value;
    if (!objc || !value || (typeof value === "undefined" ? "undefined" : _type_of(value)) !== 'object') return [];
    try {
        return objc.array(value);
    } catch (unused) {
        return [];
    }
}
function frameFromRect(value) {
    var _ref;
    var rect = (_ref = value === null || value === void 0 ? void 0 : value.value) !== null && _ref !== void 0 ? _ref : value;
    if (!rect || (typeof rect === "undefined" ? "undefined" : _type_of(rect)) !== 'object') return null;
    var origin = rect.origin;
    var size = rect.size;
    if (!origin || !size) return null;
    var x = Number(origin.x);
    var y = Number(origin.y);
    var width = Number(size.width);
    var height = Number(size.height);
    if (![
        x,
        y,
        width,
        height
    ].every(Number.isFinite)) return null;
    return {
        height: height,
        width: width,
        x: x,
        y: y
    };
}
function nativeFrame(view) {
    return frameFromRect(nativeCall(view, 'frame'));
}
function setNativeFrame(view, frame) {
    if (!objc) return;
    try {
        nativeCall(view, 'setFrame:', objc.struct('CGRect', {
            origin: {
                x: frame.x,
                y: frame.y
            },
            size: {
                width: frame.width,
                height: frame.height
            }
        }));
    } catch (unused) {
        return;
    }
}
function cellMessageId(cell) {
    if (!objc) return null;
    try {
        var viewModel = objc.getIvar(cell, 'viewModel');
        if (!viewModel || !objc.respondsTo(viewModel, 'message')) return null;
        var message = nativeCall(viewModel, 'message');
        if (!message || !objc.respondsTo(message, 'id')) return null;
        var id = nativeCall(message, 'id');
        return id == null ? null : String(id);
    } catch (unused) {
        return null;
    }
}
function labelForUsername(cell, username) {
    if (!objc) return null;
    var queue = [
        {
            depth: 0,
            view: cell
        }
    ];
    for(var index = 0; index < queue.length && index < MAX_CELL_NODES; index++){
        var current = queue[index];
        if (!current) continue;
        var isMatchingLabel = false;
        try {
            isMatchingLabel = objc.className(current.view) === 'DCDLabel' && nativeCall(current.view, 'text') === username;
        } catch (unused) {
            isMatchingLabel = false;
        }
        if (isMatchingLabel) {
            var frame = nativeFrame(current.view);
            if (frame && frame.width > 0 && frame.height > 0) return current.view;
        }
        if (current.depth >= MAX_CELL_DEPTH) continue;
        var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
        try {
            for(var _iterator = nativeArray(nativeCall(current.view, 'subviews'))[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                var child = _step.value;
                queue.push({
                    depth: current.depth + 1,
                    view: child
                });
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
    return null;
}
function headerForUsername(label) {
    if (!objc) return null;
    var labelFrame = nativeFrame(label);
    if (!labelFrame) return null;
    var current = label;
    for(var depth = 0; current && depth < 8; depth++){
        current = nativeCall(current, 'superview');
        if (!current) return null;
        var frame = nativeFrame(current);
        if (frame && frame.height <= labelFrame.height + 4 && frame.width >= 120 && frame.width > labelFrame.width * 1.5) {
            return current;
        }
    }
    return null;
}
function iconColors(fill) {
    var _ref;
    if (!objc) return [];
    var theme = window.unbound.metro.common.Theme;
    var appearance = (_ref = themeStore === null || themeStore === void 0 ? void 0 : themeStore.theme) !== null && _ref !== void 0 ? _ref : theme.themes.DARK;
    var tokens = {
        danger: 'STATUS_DANGER',
        muted: 'TEXT_MUTED',
        positive: 'STATUS_POSITIVE',
        warning: 'STATUS_WARNING'
    };
    var uiColor = objc.getClass('UIColor');
    if (!uiColor) return [];
    return fill.map(function(color) {
        try {
            var hex = theme.internal.resolveSemanticColor(appearance, theme.colors[tokens[color]]);
            var match = /^#([0-9a-f]{6})$/i.exec(hex);
            if (!(match === null || match === void 0 ? void 0 : match[1])) return null;
            var value = Number.parseInt(match[1], 16);
            return nativeCall(uiColor, 'colorWithRed:green:blue:alpha:', (value >> 16 & 255) / 255, (value >> 8 & 255) / 255, (value & 255) / 255, 1);
        } catch (unused) {
            return null;
        }
    });
}
function createLatencyIcon(record) {
    var _record_details_displayDelta;
    if (!objc) return null;
    var view = objc.alloc('UIButton');
    nativeCall(view, 'setUserInteractionEnabled:', true);
    nativeCall(view, 'setExclusiveTouch:', true);
    nativeCall(view, 'setIsAccessibilityElement:', true);
    nativeCall(view, 'setAccessibilityIdentifier:', 'message-latency');
    nativeCall(view, 'setAccessibilityLabel:', (_record_details_displayDelta = record.details.displayDelta) !== null && _record_details_displayDelta !== void 0 ? _record_details_displayDelta : 'Old Discord Android client');
    nativeCall(view, 'setAccessibilityHint:', record.tooltip);
    var colors = iconColors(record.details.fill);
    if (colors.length !== 3 || colors.some(function(color) {
        return !color;
    })) return null;
    var bars = [
        {
            height: 2.4,
            width: 2.4,
            x: 1.2,
            y: 12.4
        },
        {
            height: 6,
            width: 2.4,
            x: 4.8,
            y: 8.8
        },
        {
            height: 9.6,
            width: 2.4,
            x: 8.4,
            y: 5.2
        }
    ];
    for(var index = 0; index < bars.length; index++){
        var bar = objc.alloc('UIView');
        var frame = bars[index];
        var color = colors[index];
        if (!frame || !color) continue;
        setNativeFrame(bar, _object_spread_props(_object_spread({}, frame), {
            width: frame.width,
            height: frame.height
        }));
        nativeCall(bar, 'setUserInteractionEnabled:', false);
        nativeCall(bar, 'setBackgroundColor:', color);
        var layer = nativeCall(bar, 'layer');
        if (layer) nativeCall(layer, 'setCornerRadius:', 0.5);
        nativeCall(view, 'addSubview:', bar);
    }
    return view;
}
function captureLatencyFrame(view) {
    var frame = nativeFrame(view);
    if (!frame) throw new Error('Failed to read message latency layout frame');
    return {
        frame: frame,
        translates: Boolean(nativeCall(view, 'translatesAutoresizingMaskIntoConstraints')),
        view: view
    };
}
function removeLatencyConstraints(constraints) {
    if (!objc) return;
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
    try {
        for(var _iterator = constraints[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
            var _step_value = _step.value, constraint = _step_value.constraint, container = _step_value.container;
            nativeCall(container, 'removeConstraint:', constraint);
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
function restoreLatencyLayout(layout) {
    removeLatencyConstraints(layout.constraints);
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
    try {
        for(var _iterator = layout.views[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
            var _step_value = _step.value, frame = _step_value.frame, translates = _step_value.translates, view = _step_value.view;
            setNativeFrame(view, frame);
            nativeCall(view, 'setTranslatesAutoresizingMaskIntoConstraints:', translates);
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
function addLatencyConstraints(container, specs, state) {
    if (!objc) throw new Error('Native Objective-C bridge is unavailable');
    var constraintClass = objc.getClass('NSLayoutConstraint');
    if (!constraintClass) throw new Error('NSLayoutConstraint is unavailable');
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
    try {
        for(var _iterator = specs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
            var _step_value = _sliced_to_array(_step.value, 5), firstItem = _step_value[0], firstAttribute = _step_value[1], secondItem = _step_value[2], secondAttribute = _step_value[3], constant = _step_value[4];
            var constraint = objc.invoke(constraintClass, 'constraintWithItem:attribute:relatedBy:toItem:attribute:multiplier:constant:', [
                firstItem,
                firstAttribute,
                LAYOUT_RELATION_EQUAL,
                secondItem,
                secondAttribute,
                1,
                constant
            ], {
                thread: 'main'
            });
            if (!constraint) throw new Error('Failed to create message latency layout constraint');
            objc.invoke(container, 'addConstraint:', [
                constraint
            ], {
                thread: 'main'
            });
            state.constraints.push({
                constraint: constraint,
                container: container
            });
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
function installLatencyLayout(icon, username, row) {
    if (!objc) throw new Error('Native Objective-C bridge is unavailable');
    var usernameWrapper = nativeCall(username, 'superview');
    var group = usernameWrapper ? nativeCall(usernameWrapper, 'superview') : null;
    var groupRow = group ? nativeCall(group, 'superview') : null;
    if (!usernameWrapper || !group || !groupRow || nativeKey(groupRow) !== nativeKey(row)) {
        throw new Error('Message latency username row has an unsupported native layout');
    }
    var groupFrame = nativeFrame(group);
    var rowFrame = nativeFrame(row);
    var usernameFrame = nativeFrame(usernameWrapper);
    if (!groupFrame || !rowFrame || !usernameFrame) {
        throw new Error('Message latency username row has an unsupported native frame');
    }
    var trailingViews = nativeArray(nativeCall(group, 'subviews')).filter(function(view) {
        return nativeKey(view) !== nativeKey(usernameWrapper);
    }).map(function(view) {
        return {
            frame: nativeFrame(view),
            view: view
        };
    }).filter(function(entry) {
        return Boolean(entry.frame && entry.frame.width > 0 && entry.frame.x >= usernameFrame.x + usernameFrame.width - 0.5);
    }).sort(function(left, right) {
        return left.frame.x - right.frame.x;
    });
    var timestamp = nativeArray(nativeCall(row, 'subviews')).find(function(view) {
        var frame = nativeFrame(view);
        return (objc === null || objc === void 0 ? void 0 : objc.className(view)) === 'DCDLabel' && frame != null && frame.width > 0 && frame.x >= groupFrame.x + groupFrame.width - 0.5;
    });
    var timestampFrame = timestamp ? nativeFrame(timestamp) : null;
    if (!timestamp || !timestampFrame) {
        throw new Error('Message latency timestamp row is unavailable');
    }
    var layout = {
        constraints: [],
        views: [
            group,
            usernameWrapper
        ].concat(_to_consumable_array(trailingViews.map(function(param) {
            var view = param.view;
            return view;
        })), [
            timestamp
        ]).map(captureLatencyFrame)
    };
    try {
        var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
        try {
            for(var _iterator = layout.views[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                var view = _step.value.view;
                nativeCall(view, 'setTranslatesAutoresizingMaskIntoConstraints:', false);
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
        nativeCall(icon, 'setTranslatesAutoresizingMaskIntoConstraints:', false);
        nativeCall(group, 'addSubview:', icon);
        addLatencyConstraints(row, [
            [
                group,
                LAYOUT_ATTRIBUTE_LEADING,
                row,
                LAYOUT_ATTRIBUTE_LEADING,
                groupFrame.x
            ],
            [
                group,
                LAYOUT_ATTRIBUTE_CENTER_Y,
                row,
                LAYOUT_ATTRIBUTE_CENTER_Y,
                0
            ],
            [
                group,
                LAYOUT_ATTRIBUTE_WIDTH,
                null,
                LAYOUT_ATTRIBUTE_NOT_AN_ATTRIBUTE,
                groupFrame.width + LATENCY_ROW_RESERVATION
            ],
            [
                group,
                LAYOUT_ATTRIBUTE_HEIGHT,
                null,
                LAYOUT_ATTRIBUTE_NOT_AN_ATTRIBUTE,
                groupFrame.height
            ],
            [
                timestamp,
                LAYOUT_ATTRIBUTE_LEADING,
                group,
                LAYOUT_ATTRIBUTE_TRAILING,
                timestampFrame.x - groupFrame.x - groupFrame.width
            ],
            [
                timestamp,
                LAYOUT_ATTRIBUTE_CENTER_Y,
                row,
                LAYOUT_ATTRIBUTE_CENTER_Y,
                timestampFrame.y + timestampFrame.height / 2 - rowFrame.height / 2
            ],
            [
                timestamp,
                LAYOUT_ATTRIBUTE_WIDTH,
                null,
                LAYOUT_ATTRIBUTE_NOT_AN_ATTRIBUTE,
                timestampFrame.width
            ],
            [
                timestamp,
                LAYOUT_ATTRIBUTE_HEIGHT,
                null,
                LAYOUT_ATTRIBUTE_NOT_AN_ATTRIBUTE,
                timestampFrame.height
            ]
        ], layout);
        var groupCenterOffset = usernameFrame.y + usernameFrame.height / 2 - groupFrame.height / 2;
        addLatencyConstraints(group, [
            [
                icon,
                LAYOUT_ATTRIBUTE_LEADING,
                group,
                LAYOUT_ATTRIBUTE_LEADING,
                usernameFrame.x
            ],
            [
                icon,
                LAYOUT_ATTRIBUTE_CENTER_Y,
                group,
                LAYOUT_ATTRIBUTE_CENTER_Y,
                0
            ],
            [
                icon,
                LAYOUT_ATTRIBUTE_WIDTH,
                null,
                LAYOUT_ATTRIBUTE_NOT_AN_ATTRIBUTE,
                LATENCY_CONTROL_WIDTH
            ],
            [
                icon,
                LAYOUT_ATTRIBUTE_HEIGHT,
                null,
                LAYOUT_ATTRIBUTE_NOT_AN_ATTRIBUTE,
                LATENCY_CONTROL_HEIGHT
            ],
            [
                usernameWrapper,
                LAYOUT_ATTRIBUTE_LEADING,
                icon,
                LAYOUT_ATTRIBUTE_TRAILING,
                0
            ],
            [
                usernameWrapper,
                LAYOUT_ATTRIBUTE_CENTER_Y,
                group,
                LAYOUT_ATTRIBUTE_CENTER_Y,
                groupCenterOffset
            ],
            [
                usernameWrapper,
                LAYOUT_ATTRIBUTE_WIDTH,
                null,
                LAYOUT_ATTRIBUTE_NOT_AN_ATTRIBUTE,
                usernameFrame.width
            ],
            [
                usernameWrapper,
                LAYOUT_ATTRIBUTE_HEIGHT,
                null,
                LAYOUT_ATTRIBUTE_NOT_AN_ATTRIBUTE,
                usernameFrame.height
            ]
        ], layout);
        var previousView = usernameWrapper;
        var previousFrame = usernameFrame;
        var _iteratorNormalCompletion1 = true, _didIteratorError1 = false, _iteratorError1 = undefined;
        try {
            for(var _iterator1 = trailingViews[Symbol.iterator](), _step1; !(_iteratorNormalCompletion1 = (_step1 = _iterator1.next()).done); _iteratorNormalCompletion1 = true){
                var _step_value = _step1.value, frame = _step_value.frame, view1 = _step_value.view;
                var spacing = frame.x - previousFrame.x - previousFrame.width;
                addLatencyConstraints(group, [
                    [
                        view1,
                        LAYOUT_ATTRIBUTE_LEADING,
                        previousView,
                        LAYOUT_ATTRIBUTE_TRAILING,
                        spacing
                    ],
                    [
                        view1,
                        LAYOUT_ATTRIBUTE_CENTER_Y,
                        group,
                        LAYOUT_ATTRIBUTE_CENTER_Y,
                        frame.y + frame.height / 2 - groupFrame.height / 2
                    ],
                    [
                        view1,
                        LAYOUT_ATTRIBUTE_WIDTH,
                        null,
                        LAYOUT_ATTRIBUTE_NOT_AN_ATTRIBUTE,
                        frame.width
                    ],
                    [
                        view1,
                        LAYOUT_ATTRIBUTE_HEIGHT,
                        null,
                        LAYOUT_ATTRIBUTE_NOT_AN_ATTRIBUTE,
                        frame.height
                    ]
                ], layout);
                previousView = view1;
                previousFrame = frame;
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
    } catch (error) {
        restoreLatencyLayout(layout);
        nativeCall(icon, 'removeFromSuperview');
        throw error;
    }
    return layout;
}
function fillKey(fill) {
    var _ref;
    return "".concat((_ref = themeStore === null || themeStore === void 0 ? void 0 : themeStore.theme) !== null && _ref !== void 0 ? _ref : 'darker', ":").concat(fill.join(':'));
}
function restoreLatencyView(state) {
    if (activeTooltipOwnerKey === state.cellKey) dismissLatencyTooltip();
    restoreLatencyLayout(state.layout);
    if (objc) {
        nativeCall(state.icon, 'removeFromSuperview');
    }
    latencyViews.delete(state.cellKey);
}
function createLatencyView(cellKey, messageId, record, username, header) {
    if (!objc) return null;
    var icon = createLatencyIcon(record);
    var iconKey = icon ? nativeKey(icon) : null;
    if (!icon || !iconKey) return null;
    var layout = installLatencyLayout(icon, username, header);
    var state = {
        cellKey: cellKey,
        fillKey: fillKey(record.details.fill),
        icon: icon,
        layout: layout,
        messageId: messageId,
        tooltip: record.tooltip,
        username: record.username
    };
    latencyViews.set(cellKey, state);
    nativeCall(header, 'setNeedsLayout');
    nativeCall(header, 'layoutIfNeeded');
    return state;
}
function updateLatencyView(state, record) {
    if (!objc) return;
    if (state.fillKey !== fillKey(record.details.fill)) {
        var colors = iconColors(record.details.fill);
        var bars = nativeArray(nativeCall(state.icon, 'subviews'));
        for(var index = 0; index < bars.length && index < colors.length; index++){
            var bar = bars[index];
            var color = colors[index];
            if (bar && color) nativeCall(bar, 'setBackgroundColor:', color);
        }
        state.fillKey = fillKey(record.details.fill);
    }
    if (state.tooltip !== record.tooltip) {
        var _record_details_displayDelta;
        nativeCall(state.icon, 'setAccessibilityLabel:', (_record_details_displayDelta = record.details.displayDelta) !== null && _record_details_displayDelta !== void 0 ? _record_details_displayDelta : 'Old Discord Android client');
        nativeCall(state.icon, 'setAccessibilityHint:', record.tooltip);
        state.tooltip = record.tooltip;
    }
}
function dismissLatencyTooltip() {
    if (tooltipTimer) clearTimeout(tooltipTimer);
    tooltipTimer = null;
    tooltipGeneration++;
    tooltipDismissHook === null || tooltipDismissHook === void 0 ? void 0 : tooltipDismissHook.remove();
    tooltipDismissHook = null;
    if (activeTooltipSurface && fabric) fabric.unmount(activeTooltipSurface);
    activeTooltipSurface = null;
    if (activeTooltip) nativeCall(activeTooltip, 'removeFromSuperview');
    activeTooltip = null;
    activeTooltipOwnerKey = null;
}
function installTooltipDismissHook(generation) {
    if (!objc || !activeTooltip || tooltipDismissHook || generation !== tooltipGeneration) return;
    try {
        tooltipDismissHook = objc.hook('UIWindow', 'sendEvent:', {
            after: function after() {
                if (generation === tooltipGeneration) dismissLatencyTooltip();
            }
        });
    } catch (unused) {
        return;
    }
}
function LatencyTooltipSurface(param) {
    var arrowDirection = param.arrowDirection, arrowOffset = param.arrowOffset, label = param.label, width = param.width;
    var _ref;
    var tooltip = window.unbound.metro.findByProps('TooltipArrowDirections', 'TooltipArrowPositions');
    if (!(tooltip === null || tooltip === void 0 ? void 0 : tooltip.Tooltip)) return null;
    var theme = window.unbound.metro.common.Theme;
    var appearance = (_ref = themeStore === null || themeStore === void 0 ? void 0 : themeStore.theme) !== null && _ref !== void 0 ? _ref : theme.themes.DARK;
    var background = theme.internal.resolveSemanticColor(appearance, theme.colors.BACKGROUND_SURFACE_HIGHEST);
    var foreground = theme.internal.resolveSemanticColor(appearance, theme.colors.TEXT_DEFAULT);
    return window.unbound.metro.common.React.createElement(tooltip.Tooltip, {
        arrowDirection: arrowDirection,
        arrowOffset: arrowOffset,
        arrowPosition: tooltip.TooltipArrowPositions.LEFT,
        arrowStyle: {
            borderBottomColor: background,
            borderTopColor: background
        },
        containerStyle: {
            backgroundColor: background
        },
        label: label,
        labelStyle: {
            color: foreground
        },
        style: {
            width: width
        }
    });
}
function registerTooltipSurface() {
    if (tooltipSurfaceModuleName) return true;
    var registry = window.unbound.metro.common.ReactNative.AppRegistry;
    if (typeof (registry === null || registry === void 0 ? void 0 : registry.registerComponent) !== 'function') return false;
    var moduleName = "MessageLatencyTooltipSurface".concat(Date.now());
    try {
        registry.registerComponent(moduleName, function() {
            return LatencyTooltipSurface;
        });
        tooltipSurfaceModuleName = moduleName;
        return true;
    } catch (unused) {
        return false;
    }
}
function showLatencyTooltip(state) {
    if (!objc || !fabric || !registerTooltipSurface()) return;
    dismissLatencyTooltip();
    var window = nativeCall(state.icon, 'window');
    var windowFrame = window ? frameFromRect(nativeCall(window, 'bounds')) : null;
    if (!window || !windowFrame) return;
    try {
        var _ref;
        var label = objc.alloc('UILabel');
        nativeCall(label, 'setText:', state.tooltip);
        nativeCall(label, 'setNumberOfLines:', 0);
        var fonts = objc.getClass('UIFont');
        if (!fonts) return;
        nativeCall(label, 'setFont:', nativeCall(fonts, 'systemFontOfSize:', 13));
        var maximumWidth = Math.max(120, Math.min(TOOLTIP_MAX_WIDTH, windowFrame.width - 32));
        var measured = objc.invoke(label, 'sizeThatFits:', [
            objc.struct('CGSize', {
                width: maximumWidth - 20,
                height: 1000
            })
        ], {
            thread: 'main'
        });
        var measuredSize = (_ref = measured === null || measured === void 0 ? void 0 : measured.value) !== null && _ref !== void 0 ? _ref : measured;
        var textWidth = Math.min(maximumWidth - 20, Number(measuredSize === null || measuredSize === void 0 ? void 0 : measuredSize.width));
        var textHeight = Number(measuredSize === null || measuredSize === void 0 ? void 0 : measuredSize.height);
        if (![
            textWidth,
            textHeight
        ].every(Number.isFinite) || textWidth <= 0 || textHeight <= 0) return;
        var bubbleWidth = textWidth + 28;
        var bubbleHeight = textHeight + 20 + TOOLTIP_ARROW_HEIGHT;
        var iconRect = objc.struct('CGRect', {
            origin: {
                x: 0,
                y: 4
            },
            size: {
                width: LATENCY_ICON_WIDTH,
                height: LATENCY_ICON_HEIGHT
            }
        });
        var iconFrame = frameFromRect(nativeCall(state.icon, 'convertRect:toView:', iconRect, window));
        if (!iconFrame) return;
        var x = Math.max(8, Math.min(iconFrame.x + (iconFrame.width - bubbleWidth) / 2, windowFrame.width - bubbleWidth - 8));
        var belowY = iconFrame.y + iconFrame.height + TOOLTIP_ANCHOR_GAP;
        var below = belowY + bubbleHeight <= windowFrame.height - 8;
        var y = below ? belowY : Math.max(8, iconFrame.y - bubbleHeight - TOOLTIP_ANCHOR_GAP);
        var host = objc.alloc('UIView');
        nativeCall(host, 'setUserInteractionEnabled:', false);
        nativeCall(host, 'setAccessibilityIdentifier:', 'message-latency-tooltip');
        setNativeFrame(host, {
            height: bubbleHeight,
            width: bubbleWidth,
            x: x,
            y: y
        });
        nativeCall(window, 'addSubview:', host);
        activeTooltip = host;
        var surface = fabric.mount(host, tooltipSurfaceModuleName, {
            arrowDirection: below ? 'UP' : 'DOWN',
            arrowOffset: iconFrame.x + iconFrame.width / 2 - x - 8,
            label: state.tooltip,
            width: bubbleWidth
        });
        fabric.setSize(surface, {
            width: bubbleWidth,
            height: bubbleHeight
        }, {
            width: bubbleWidth,
            height: bubbleHeight
        });
        fabric.setFrame(surface, {
            x: 0,
            y: 0,
            width: bubbleWidth,
            height: bubbleHeight
        });
        activeTooltipSurface = surface;
        activeTooltipOwnerKey = state.cellKey;
        var generation = tooltipGeneration;
        setTimeout(function() {
            return installTooltipDismissHook(generation);
        }, 0);
        tooltipTimer = setTimeout(function() {
            if (generation !== tooltipGeneration) return;
            dismissLatencyTooltip();
        }, 3000);
    } catch (unused) {
        dismissLatencyTooltip();
    }
}
function renderCell(cell) {
    if (!objc) return;
    var key = nativeKey(cell);
    var messageId = cellMessageId(cell);
    if (!key || !messageId) return;
    var existing = latencyViews.get(key);
    if (existing && existing.messageId !== messageId) restoreLatencyView(existing);
    var record = latencyRecords.get(messageId);
    if (!record) {
        var current = latencyViews.get(key);
        if (current) restoreLatencyView(current);
        return;
    }
    var current1 = latencyViews.get(key);
    if (current1) {
        updateLatencyView(current1, record);
        return;
    }
    try {
        var label = labelForUsername(cell, record.username);
        if (!label) return;
        var header = headerForUsername(label);
        if (!header) return;
        createLatencyView(key, messageId, record, label, header);
    } catch (unused) {
        return;
    }
}
function scheduleCell(cell) {
    if (!objc) return;
    var key = nativeKey(cell);
    if (!key || pendingCells.has(key)) return;
    pendingCells.add(key);
    var token = lifecycle;
    setTimeout(function() {
        pendingCells.delete(key);
        if (token !== lifecycle || !objc) return;
        if (nativeCall(cell, 'window')) {
            activeCells.set(key, cell);
            var messageId = cellMessageId(cell);
            var previousMessageId = activeCellMessageIds.get(key);
            if (previousMessageId && previousMessageId !== messageId) {
                cellsByMessageId.delete(previousMessageId);
                activeCellMessageIds.delete(key);
            }
            if (messageId) {
                activeCellMessageIds.set(key, messageId);
                cellsByMessageId.set(messageId, cell);
            }
            try {
                renderCell(cell);
            } catch (unused) {
                disposeCell(cell);
            }
        }
    }, 0);
}
function disposeCell(cell) {
    var key = nativeKey(cell);
    if (!key) return;
    var state = latencyViews.get(key);
    if (state) restoreLatencyView(state);
    activeCells.delete(key);
    var messageId = activeCellMessageIds.get(key);
    if (messageId && cellsByMessageId.get(messageId) === cell) cellsByMessageId.delete(messageId);
    activeCellMessageIds.delete(key);
    pendingCells.delete(key);
}
function installNativeHooks() {
    if (!objc || cellHooks.length > 0) return;
    var installed = [];
    try {
        installed.push(objc.hook('UIControl', 'endTrackingWithTouch:withEvent:', {
            after: function after(param) {
                var self = param.self;
                var key = nativeKey(self);
                if (!key) return;
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = latencyViews.values()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var state = _step.value;
                        if (nativeKey(state.icon) !== key) continue;
                        showLatencyTooltip(state);
                        return;
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
        }));
        installed.push(objc.hook('DCDMessageTableViewCell', 'didMoveToWindow', {
            after: function after(param) {
                var self = param.self;
                if (nativeCall(self, 'window')) {
                    scheduleCell(self);
                } else {
                    disposeCell(self);
                }
            }
        }));
        installed.push(objc.hook('DCDMessageTableViewCell', 'prepareForReuse', {
            after: function after(param) {
                var self = param.self;
                disposeCell(self);
                scheduleCell(self);
            }
        }));
        cellHooks = installed;
    } catch (unused) {
        var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
        try {
            for(var _iterator = installed[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                var hook = _step.value;
                hook.remove();
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
}
function cacheLatency(messageRow, message) {
    var fallbackUsername = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : '';
    var _users_getCurrentUser, _users_getCurrentUser1, _message_author, _latencyRecords_get;
    if (!message || message.id == null) return;
    if (message.nonce == null) return;
    var messageId = String(message.id);
    var details = latencyDetails(message, users === null || users === void 0 ? void 0 : (_users_getCurrentUser1 = users.getCurrentUser) === null || _users_getCurrentUser1 === void 0 ? void 0 : (_users_getCurrentUser = _users_getCurrentUser1.call(users)) === null || _users_getCurrentUser === void 0 ? void 0 : _users_getCurrentUser.id, currentOptions());
    if (!details) {
        if (latencyRecords.delete(messageId)) {
            var cell = cellsByMessageId.get(messageId);
            if (cell) scheduleCell(cell);
        }
        return;
    }
    var username = typeof (messageRow === null || messageRow === void 0 ? void 0 : messageRow.username) === 'string' && messageRow.username || fallbackUsername || ((_message_author = message.author) === null || _message_author === void 0 ? void 0 : _message_author.username) || ((_latencyRecords_get = latencyRecords.get(messageId)) === null || _latencyRecords_get === void 0 ? void 0 : _latencyRecords_get.username) || '';
    if (!username) return;
    latencyRecords.delete(messageId);
    latencyRecords.set(messageId, {
        details: details,
        messageId: messageId,
        tooltip: latencyTooltip(details),
        username: username
    });
    while(latencyRecords.size > MAX_LATENCY_RECORDS){
        var oldest = latencyRecords.keys().next().value;
        if (!oldest) break;
        latencyRecords.delete(oldest);
    }
    var cell1 = cellsByMessageId.get(messageId);
    if (cell1) scheduleCell(cell1);
}
function onMessageCreate(event) {
    var _message_author;
    var message = messageFromCreateEvent(event);
    if (!message) return;
    cacheLatency(undefined, message, (_message_author = message.author) === null || _message_author === void 0 ? void 0 : _message_author.username);
}
function subscribeToMessageCreate() {
    if (removeMessageCreateListener) return;
    var dispatcher = window.unbound.metro.findByProps('dispatch', 'subscribe');
    if (!(dispatcher === null || dispatcher === void 0 ? void 0 : dispatcher.subscribe) || !dispatcher.unsubscribe) return;
    dispatcher.subscribe('MESSAGE_CREATE', onMessageCreate);
    removeMessageCreateListener = function removeMessageCreateListener() {
        var _dispatcher_unsubscribe;
        return (_dispatcher_unsubscribe = dispatcher.unsubscribe) === null || _dispatcher_unsubscribe === void 0 ? void 0 : _dispatcher_unsubscribe.call(dispatcher, 'MESSAGE_CREATE', onMessageCreate);
    };
}
function initialize() {
    if (!started) return false;
    users = window.unbound.metro.findByProps('getCurrentUser');
    subscribeToMessageCreate();
    installNativeHooks();
    if (rowUnpatch) return true;
    var target = window.unbound.metro.findByProps('generateMessageRowData');
    if (typeof (target === null || target === void 0 ? void 0 : target.generateMessageRowData) !== 'function') return false;
    themeStore = window.unbound.metro.find(function(module) {
        var theme = module === null || module === void 0 ? void 0 : module.theme;
        return typeof theme === 'string' && Object.values(window.unbound.metro.common.Theme.themes).includes(theme);
    });
    if (!removeThemeListener && (themeStore === null || themeStore === void 0 ? void 0 : themeStore.addChangeListener) && themeStore.removeChangeListener) {
        var onThemeChange = function onThemeChange() {
            var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
            try {
                for(var _iterator = latencyViews.values()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                    var state = _step.value;
                    var record = latencyRecords.get(state.messageId);
                    if (record) updateLatencyView(state, record);
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
        };
        themeStore.addChangeListener(onThemeChange);
        removeThemeListener = function removeThemeListener() {
            var _themeStore_removeChangeListener;
            return themeStore === null || themeStore === void 0 ? void 0 : (_themeStore_removeChangeListener = themeStore.removeChangeListener) === null || _themeStore_removeChangeListener === void 0 ? void 0 : _themeStore_removeChangeListener.call(themeStore, onThemeChange);
        };
    }
    rowUnpatch = window.unbound.patcher.after(target, 'generateMessageRowData', function(context) {
        try {
            var _context_result, _context_args_;
            cacheLatency((_context_result = context.result) === null || _context_result === void 0 ? void 0 : _context_result.message, (_context_args_ = context.args[0]) === null || _context_args_ === void 0 ? void 0 : _context_args_.message);
        } catch (unused) {
            return;
        }
    });
    return true;
}
function waitForMessageRows() {
    if (initialize()) return;
    removeModuleListener = window.unbound.metro.addListener(function() {
        if (!initialize()) return;
        removeModuleListener === null || removeModuleListener === void 0 ? void 0 : removeModuleListener();
        removeModuleListener = null;
    });
}
function MessageLatencySettings() {
    var state = STORE.useSettingsStore();
    var latency = state.get('latency', 2);
    var thresholdIndex = LATENCY_OPTIONS.indexOf(latency);
    var nextThreshold = LATENCY_OPTIONS[(thresholdIndex + 1) % LATENCY_OPTIONS.length];
    return /*#__PURE__*/ React.createElement(SettingsScrollView, null, /*#__PURE__*/ React.createElement(SettingsSection, {
        title: "Indicator"
    }, /*#__PURE__*/ React.createElement(SettingsRow, {
        label: "Latency threshold",
        description: "Show an indicator when a message takes at least this long to send.",
        trailing: "".concat(latency, "s"),
        onPress: function onPress() {
            return state.set('latency', nextThreshold);
        }
    }), /*#__PURE__*/ React.createElement(SettingsSwitchRow, {
        label: "Show milliseconds",
        description: "Include millisecond precision in the indicator.",
        value: state.get('showMillis', false),
        onValueChange: function onValueChange(value) {
            return state.set('showMillis', value);
        }
    }), /*#__PURE__*/ React.createElement(SettingsSwitchRow, {
        label: "Ignore my messages",
        description: "Only mark messages sent by other people.",
        value: state.get('ignoreSelf', false),
        onValueChange: function onValueChange(value) {
            return state.set('ignoreSelf', value);
        }
    }), /*#__PURE__*/ React.createElement(SettingsSwitchRow, {
        label: "Detect legacy Android clients",
        description: "Show a marker for the known timestamp offset in older Discord Android clients.",
        value: state.get('detectDiscordKotlin', true),
        onValueChange: function onValueChange(value) {
            return state.set('detectDiscordKotlin', value);
        }
    })));
}
function cleanup() {
    var _nativeKey;
    dismissLatencyTooltip();
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
    try {
        for(var _iterator = _to_consumable_array(latencyViews.values())[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
            var state = _step.value;
            restoreLatencyView(state);
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
        for(var _iterator1 = cellHooks[Symbol.iterator](), _step1; !(_iteratorNormalCompletion1 = (_step1 = _iterator1.next()).done); _iteratorNormalCompletion1 = true){
            var hook = _step1.value;
            hook.remove();
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
    cellHooks = [];
    var _iteratorNormalCompletion2 = true, _didIteratorError2 = false, _iteratorError2 = undefined;
    try {
        for(var _iterator2 = activeCells.values()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true){
            var cell = _step2.value;
            pendingCells.delete((_nativeKey = nativeKey(cell)) !== null && _nativeKey !== void 0 ? _nativeKey : '');
        }
    } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
    } finally{
        try {
            if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
                _iterator2.return();
            }
        } finally{
            if (_didIteratorError2) {
                throw _iteratorError2;
            }
        }
    }
    activeCells.clear();
    activeCellMessageIds.clear();
    cellsByMessageId.clear();
    pendingCells.clear();
    latencyRecords.clear();
    rowUnpatch === null || rowUnpatch === void 0 ? void 0 : rowUnpatch();
    rowUnpatch = null;
    removeModuleListener === null || removeModuleListener === void 0 ? void 0 : removeModuleListener();
    removeModuleListener = null;
    removeMessageCreateListener === null || removeMessageCreateListener === void 0 ? void 0 : removeMessageCreateListener();
    removeMessageCreateListener = null;
    removeThemeListener === null || removeThemeListener === void 0 ? void 0 : removeThemeListener();
    removeThemeListener = null;
    users = null;
    themeStore = null;
    started = false;
    objc = null;
    fabric = null;
}
var index = {
    start: function start(context) {
        var _ref, _ref1;
        if (started) return;
        started = true;
        lifecycle++;
        objc = (_ref = context === null || context === void 0 ? void 0 : context.native.objc) !== null && _ref !== void 0 ? _ref : null;
        fabric = (_ref1 = context === null || context === void 0 ? void 0 : context.native.fabric) !== null && _ref1 !== void 0 ? _ref1 : null;
        waitForMessageRows();
    },
    stop: function stop() {
        started = false;
        lifecycle++;
        cleanup();
    },
    getSettingsPanel: function getSettingsPanel() {
        return /*#__PURE__*/ React.createElement(MessageLatencySettings, null);
    }
};
return {
  default: index,
  formatLatency: formatLatency,
  latencyDetails: latencyDetails,
  latencyTooltip: latencyTooltip,
  messageFromCreateEvent: messageFromCreateEvent,
  snowflakeTimestamp: snowflakeTimestamp
};
})();return this.__plugin;},start(context){const module=this.__load();const plugin=module?.default??module;if(plugin&&typeof plugin.start==='function')return plugin.start(context);},stop(){const module=this.__load();const plugin=module?.default??module;if(plugin&&typeof plugin.stop==='function')return plugin.stop();},getSettingsPanel(...args){const module=this.__load();const plugin=module?.default??module;const settingsPanel=plugin?.getSettingsPanel??module?.getSettingsPanel;if(typeof settingsPanel==='function')return settingsPanel.apply(plugin,args);return null;}})