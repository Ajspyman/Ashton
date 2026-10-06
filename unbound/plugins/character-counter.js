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
var ADDON_ID = 'unbound.character-counter';
var COMPOSER_CONTAINER_PATH = 'modules/chat_input/native/FloatingChatInputContainer.tsx';
var INPUT_REFRESH_INTERVAL_MS = 200;
var STORE = window.unbound.storage.getStore(ADDON_ID);
var started = false;
var unpatch = null;
var removeModuleListener = null;
var chatInputs = null;
var users = null;
var selectedChannel = null;
function characterLimit(premiumType) {
    return premiumType === 2 ? 4000 : 2000;
}
function counterTone(count, limit, enabled) {
    if (!enabled) return 'primary';
    var percentage = count / limit * 100;
    if (percentage < 50) return 'muted';
    if (percentage < 75) return 'yellow';
    if (percentage < 90) return 'orange';
    return 'red';
}
function counterOverlayStyle() {
    return {
        position: 'absolute',
        top: -26,
        right: 28,
        zIndex: 10
    };
}
function unwrapComponent(module) {
    var holder = module;
    var prop = 'default';
    var current = module === null || module === void 0 ? void 0 : module.default;
    var depth = 0;
    while(current && (typeof current === "undefined" ? "undefined" : _type_of(current)) === 'object' && depth < 8){
        var next = current.type !== undefined ? 'type' : current.render !== undefined ? 'render' : null;
        if (!next) break;
        holder = current;
        prop = next;
        current = current[next];
        depth++;
    }
    return typeof current === 'function' ? {
        holder: holder,
        prop: prop
    } : null;
}
function counterColor(tone) {
    var _ref, _ref1, _colors_BRAND_330, _ref2, _colors_YELLOW_330, _ref3, _colors_ORANGE_330, _ref4, _colors_RED_360, _colors_TEXT_NORMAL;
    var _metro_common_Theme;
    var colors = (_ref = (_metro_common_Theme = window.unbound.metro.common.Theme) === null || _metro_common_Theme === void 0 ? void 0 : _metro_common_Theme.colors) !== null && _ref !== void 0 ? _ref : {};
    if (tone === 'primary') return (_ref1 = (_colors_BRAND_330 = colors.BRAND_330) !== null && _colors_BRAND_330 !== void 0 ? _colors_BRAND_330 : colors.BRAND_500) !== null && _ref1 !== void 0 ? _ref1 : '#5865f2';
    if (tone === 'yellow') return (_ref2 = (_colors_YELLOW_330 = colors.YELLOW_330) !== null && _colors_YELLOW_330 !== void 0 ? _colors_YELLOW_330 : colors.YELLOW_300) !== null && _ref2 !== void 0 ? _ref2 : '#fee75c';
    if (tone === 'orange') return (_ref3 = (_colors_ORANGE_330 = colors.ORANGE_330) !== null && _colors_ORANGE_330 !== void 0 ? _colors_ORANGE_330 : colors.ORANGE_300) !== null && _ref3 !== void 0 ? _ref3 : '#f0b232';
    if (tone === 'red') return (_ref4 = (_colors_RED_360 = colors.RED_360) !== null && _colors_RED_360 !== void 0 ? _colors_RED_360 : colors.RED_400) !== null && _ref4 !== void 0 ? _ref4 : '#ed4245';
    return (_colors_TEXT_NORMAL = colors.TEXT_NORMAL) !== null && _colors_TEXT_NORMAL !== void 0 ? _colors_TEXT_NORMAL : '#f2f3f5';
}
function counterSurface(textColor) {
    var _textColor_match;
    if (typeof textColor !== 'string') return 'rgba(255, 255, 255, 0.12)';
    var hex = (_textColor_match = textColor.match(/^#?([\da-f]{6})$/i)) === null || _textColor_match === void 0 ? void 0 : _textColor_match[1];
    var rgb = textColor.match(/^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i);
    var channels = hex ? [
        0,
        2,
        4
    ].map(function(index) {
        return Number.parseInt(hex.slice(index, index + 2), 16);
    }) : rgb === null || rgb === void 0 ? void 0 : rgb.slice(1, 4).map(Number);
    if (!channels) return 'rgba(255, 255, 255, 0.12)';
    var brightness = (channels[0] * 299 + channels[1] * 587 + channels[2] * 114) / 1000;
    return brightness > 160 ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.08)';
}
function counterBackground() {
    var _ref, _colors_TEXT_DEFAULT;
    var _metro_common_Theme;
    var colors = (_ref = (_metro_common_Theme = window.unbound.metro.common.Theme) === null || _metro_common_Theme === void 0 ? void 0 : _metro_common_Theme.colors) !== null && _ref !== void 0 ? _ref : {};
    return counterSurface((_colors_TEXT_DEFAULT = colors.TEXT_DEFAULT) !== null && _colors_TEXT_DEFAULT !== void 0 ? _colors_TEXT_DEFAULT : colors.TEXT_NORMAL);
}
function readSnapshot(channelId) {
    var _chatInputs_getBestActiveInputForChannelId, _input_getText, _users_getCurrentUser, _users_getCurrentUser1;
    var input = chatInputs === null || chatInputs === void 0 ? void 0 : (_chatInputs_getBestActiveInputForChannelId = chatInputs.getBestActiveInputForChannelId) === null || _chatInputs_getBestActiveInputForChannelId === void 0 ? void 0 : _chatInputs_getBestActiveInputForChannelId.call(chatInputs, channelId);
    var textValue = input === null || input === void 0 ? void 0 : (_input_getText = input.getText) === null || _input_getText === void 0 ? void 0 : _input_getText.call(input);
    var text = typeof textValue === 'string' ? textValue : '';
    var limit = characterLimit(users === null || users === void 0 ? void 0 : (_users_getCurrentUser1 = users.getCurrentUser) === null || _users_getCurrentUser1 === void 0 ? void 0 : (_users_getCurrentUser = _users_getCurrentUser1.call(users)) === null || _users_getCurrentUser === void 0 ? void 0 : _users_getCurrentUser.premiumType);
    var colorEffects = STORE.get('colorEffects', true);
    return {
        colorEffects: colorEffects,
        limit: limit,
        text: text
    };
}
function CharacterCounter(param) {
    var channelId = param.channelId;
    var _metro_common = window.unbound.metro.common, _$React = _metro_common.React, ReactNative = _metro_common.ReactNative;
    var _React_useState = _sliced_to_array(_$React.useState({
        colorEffects: true,
        limit: 2000,
        text: ''
    }), 2), snapshot = _React_useState[0], setSnapshot = _React_useState[1];
    _$React.useEffect(function() {
        function refresh() {
            var next = readSnapshot(channelId);
            setSnapshot(function(current) {
                return current.text === next.text && current.limit === next.limit && current.colorEffects === next.colorEffects ? current : next;
            });
        }
        refresh();
        var timer = setInterval(refresh, INPUT_REFRESH_INTERVAL_MS);
        return function() {
            return clearInterval(timer);
        };
    }, [
        channelId
    ]);
    if (!snapshot.text.length) return null;
    var tone = counterTone(snapshot.text.length, snapshot.limit, snapshot.colorEffects);
    return /*#__PURE__*/ React.createElement(ReactNative.View, {
        style: {
            alignItems: 'center',
            backgroundColor: counterBackground(),
            borderRadius: 999,
            height: 20,
            justifyContent: 'center',
            paddingHorizontal: 7
        }
    }, /*#__PURE__*/ React.createElement(ReactNative.Text, {
        accessibilityLabel: "".concat(snapshot.text.length, " of ").concat(snapshot.limit, " characters"),
        style: {
            color: counterColor(tone),
            fontSize: 11,
            fontVariant: [
                'tabular-nums'
            ],
            fontWeight: '600',
            lineHeight: 14,
            textAlign: 'center'
        }
    }, snapshot.text.length, "/", snapshot.limit));
}
function CounterOverlay(param) {
    var channelId = param.channelId;
    var _metro_common = window.unbound.metro.common; _metro_common.React; var ReactNative = _metro_common.ReactNative;
    return /*#__PURE__*/ React.createElement(ReactNative.View, {
        pointerEvents: "none",
        style: counterOverlayStyle()
    }, /*#__PURE__*/ React.createElement(CharacterCounter, {
        channelId: channelId
    }));
}
function stripCounterOverlays(children, React1) {
    var _children_props;
    if (Array.isArray(children)) {
        var stripped = children.map(function(child) {
            return stripCounterOverlays(child, React1);
        });
        if (stripped.every(function(child, index) {
            return child === children[index];
        })) return children;
        return stripped.filter(function(child) {
            return child !== null;
        });
    }
    if (!children || (typeof children === "undefined" ? "undefined" : _type_of(children)) !== 'object') return children;
    if (children.type === CounterOverlay) return null;
    if (children.type !== React1.Fragment) return children;
    var originalChildren = (_children_props = children.props) === null || _children_props === void 0 ? void 0 : _children_props.children;
    var strippedChildren = stripCounterOverlays(originalChildren, React1);
    if (strippedChildren === originalChildren) return children;
    return React1.cloneElement(children, {}, strippedChildren);
}
function patchComposer(module) {
    if (unpatch) return true;
    var target = unwrapComponent(module);
    if (!target) return false;
    unpatch = window.unbound.patcher.after(target.holder, target.prop, function(ctx) {
        try {
            var _ref, _ref1;
            var _props_channel, _selectedChannel_getChannelId;
            var result = ctx.result;
            if (!(result === null || result === void 0 ? void 0 : result.props)) return;
            var props = ctx.args[0];
            var channelId = (_ref = (_ref1 = props === null || props === void 0 ? void 0 : (_props_channel = props.channel) === null || _props_channel === void 0 ? void 0 : _props_channel.id) !== null && _ref1 !== void 0 ? _ref1 : props === null || props === void 0 ? void 0 : props.channelId) !== null && _ref !== void 0 ? _ref : selectedChannel === null || selectedChannel === void 0 ? void 0 : (_selectedChannel_getChannelId = selectedChannel.getChannelId) === null || _selectedChannel_getChannelId === void 0 ? void 0 : _selectedChannel_getChannelId.call(selectedChannel);
            if (!channelId) return;
            var React1 = window.unbound.metro.common.React;
            var overlay = React1.createElement(CounterOverlay, {
                key: 'character-counter',
                channelId: String(channelId)
            });
            var children = stripCounterOverlays(result.props.children, React1);
            return React1.cloneElement(result, {}, React1.createElement(React1.Fragment, null, children, overlay));
        } catch (unused) {}
    });
    return true;
}
function initialize() {
    if (!started) return false;
    if (unpatch) return true;
    chatInputs = window.unbound.metro.findByProps('getBestActiveInputForChannelId');
    users = window.unbound.metro.findByProps('getCurrentUser');
    selectedChannel = window.unbound.metro.findByProps('getChannelId');
    var module = window.unbound.metro.findByFilePath(COMPOSER_CONTAINER_PATH, {
        interop: false
    });
    if (typeof (chatInputs === null || chatInputs === void 0 ? void 0 : chatInputs.getBestActiveInputForChannelId) !== 'function' || typeof (users === null || users === void 0 ? void 0 : users.getCurrentUser) !== 'function') {
        return false;
    }
    return patchComposer(module);
}
function waitForComposer() {
    if (initialize()) return;
    removeModuleListener = window.unbound.metro.addListener(function() {
        if (!initialize()) return;
        removeModuleListener === null || removeModuleListener === void 0 ? void 0 : removeModuleListener();
        removeModuleListener = null;
    });
}
function CharacterCounterSettings() {
    var state = STORE.useSettingsStore();
    return /*#__PURE__*/ React.createElement(SettingsScrollView, null, /*#__PURE__*/ React.createElement(SettingsSection, {
        title: "Appearance"
    }, /*#__PURE__*/ React.createElement(SettingsSwitchRow, {
        label: "Color thresholds",
        description: "Warn as the message approaches Discord’s character limit.",
        value: state.get('colorEffects', true),
        onValueChange: function onValueChange(value) {
            return state.set('colorEffects', value);
        }
    })));
}
var index = {
    start: function start() {
        if (started) return;
        started = true;
        waitForComposer();
    },
    stop: function stop() {
        started = false;
        unpatch === null || unpatch === void 0 ? void 0 : unpatch();
        unpatch = null;
        removeModuleListener === null || removeModuleListener === void 0 ? void 0 : removeModuleListener();
        removeModuleListener = null;
        chatInputs = null;
        users = null;
        selectedChannel = null;
    },
    getSettingsPanel: function getSettingsPanel() {
        return /*#__PURE__*/ React.createElement(CharacterCounterSettings, null);
    }
};
return {
  characterLimit: characterLimit,
  counterOverlayStyle: counterOverlayStyle,
  counterSurface: counterSurface,
  counterTone: counterTone,
  default: index
};
})();return this.__plugin;},start(){const plugin=this.__load()?.default??this.__load();if(plugin&&typeof plugin.start==='function')return plugin.start();},stop(){const plugin=this.__load()?.default??this.__load();if(plugin&&typeof plugin.stop==='function')return plugin.stop();},getSettingsPanel(){const plugin=this.__load()?.default??this.__load();return plugin&&typeof plugin.getSettingsPanel==='function'?plugin.getSettingsPanel():null;}})