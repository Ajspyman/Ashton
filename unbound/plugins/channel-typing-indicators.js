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
function _assert_this_initialized(self) {
    if (self === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return self;
}
function _call_super(_this, derived, args) {
    derived = _get_prototype_of(derived);
    return _possible_constructor_return(_this, _is_native_reflect_construct() ? Reflect.construct(derived, args || [], _get_prototype_of(_this).constructor) : derived.apply(_this, args));
}
function _class_call_check(instance, Constructor) {
    if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
}
function _defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function _create_class(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
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
function _get_prototype_of(o) {
    _get_prototype_of = Object.setPrototypeOf ? Object.getPrototypeOf : function getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _get_prototype_of(o);
}
function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            writable: true,
            configurable: true
        }
    });
    if (superClass) _set_prototype_of(subClass, superClass);
}
function _is_native_reflect_construct() {
    try {
        var result = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
    } catch (_) {}
    return (_is_native_reflect_construct = function() {
        return !!result;
    })();
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
function _possible_constructor_return(self, call) {
    if (call && (_type_of(call) === "object" || typeof call === "function")) return call;
    return _assert_this_initialized(self);
}
function _set_prototype_of(o, p) {
    _set_prototype_of = Object.setPrototypeOf || function setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
    };
    return _set_prototype_of(o, p);
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
var _registryHost_INDICATOR_REGISTRY_KEY;
var ADDON_ID = 'unbound.channel-typing-indicators';
var TEXT_CHANNEL_PATH = 'modules/channel_list_v2/native/items/TextChannel.tsx';
var THREAD_CHANNEL_PATH = 'modules/channel_list_v2/native/items/ThreadChannel.tsx';
var STORE = window.unbound.storage.getStore(ADDON_ID);
var MAX_AVATARS = 3;
var DOTS = 1;
var AVATARS = 2;
var TYPING_MESSAGE_IDS = [
    'lJ9sZX',
    'rB0CUa',
    'StKThj',
    'uVDhqZ'
];
var INDICATOR_REGISTRY_KEY = Symbol.for('unbound.channel-typing-indicators.indicators');
var registryHost = globalThis;
var indicatorRegistry = (_registryHost_INDICATOR_REGISTRY_KEY = registryHost[INDICATOR_REGISTRY_KEY]) !== null && _registryHost_INDICATOR_REGISTRY_KEY !== void 0 ? _registryHost_INDICATOR_REGISTRY_KEY : {
    enabled: false,
    indicators: new Set()
};
registryHost[INDICATOR_REGISTRY_KEY] = indicatorRegistry;
var typingStore = null;
var userStore = null;
var relationshipStore = null;
var selectedChannelStore = null;
var guildSettingsStore = null;
var memberStore = null;
var userSummaryItem = null;
var userIcon = null;
var tooltipComponents = null;
var profileSheet = null;
var actionSheets = null;
var themeStore = null;
var unpatchText = null;
var unpatchThread = null;
var unpatchThreadRenderer = null;
var threadRenderer = null;
var threadRendererHost = null;
var removeModuleListener = null;
var started = false;
var activeIndicators = indicatorRegistry.indicators;
var IndicatorBoundary = /*#__PURE__*/ function(_metro_common_React_Component) {
    _inherits(IndicatorBoundary, _metro_common_React_Component);
    function IndicatorBoundary() {
        _class_call_check(this, IndicatorBoundary);
        var _this;
        _this = _call_super(this, IndicatorBoundary, arguments), _define_property(_this, "state", {
            failed: false
        });
        return _this;
    }
    _create_class(IndicatorBoundary, [
        {
            key: "componentDidCatch",
            value: function componentDidCatch(error) {
                console.error('Channel typing indicator failed:', error);
            }
        },
        {
            key: "render",
            value: function render() {
                return this.state.failed ? null : this.props.children;
            }
        }
    ], [
        {
            key: "getDerivedStateFromError",
            value: function getDerivedStateFromError() {
                return {
                    failed: true
                };
            }
        }
    ]);
    return IndicatorBoundary;
}(window.unbound.metro.common.React.Component);
function visibleTypingIds(typingUsers, currentUserId, isBlocked, includeBlockedUsers) {
    var isIgnored = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : function() {
        return false;
    }, includeIgnoredUsers = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : false;
    if (!typingUsers) return [];
    return Object.keys(typingUsers).filter(function(id) {
        return id !== currentUserId && (includeBlockedUsers || !isBlocked(id)) && (includeIgnoredUsers || !isIgnored(id));
    });
}
function sameIds(first, second) {
    return first.length === second.length && first.every(function(id, index) {
        return id === second[index];
    });
}
function typingLabel(names) {
    var _i18n_t;
    if (!names.length) return '';
    var fallback = 'Several people are typing...';
    if (names.length === 1) fallback = "".concat(names[0], " is typing...");
    if (names.length === 2) fallback = "".concat(names[0], " and ").concat(names[1], " are typing...");
    if (names.length === 3) fallback = "".concat(names[0], ", ").concat(names[1], ", and ").concat(names[2], " are typing...");
    var messageId = TYPING_MESSAGE_IDS[Math.min(names.length, 4) - 1];
    var i18n = window.unbound.metro.common.i18n;
    var message = i18n === null || i18n === void 0 ? void 0 : (_i18n_t = i18n.t) === null || _i18n_t === void 0 ? void 0 : _i18n_t[messageId];
    if (typeof message !== 'function') return fallback;
    try {
        var _i18n_intl_formatToPlainString, _i18n_intl;
        var localized = (_i18n_intl = i18n.intl) === null || _i18n_intl === void 0 ? void 0 : (_i18n_intl_formatToPlainString = _i18n_intl.formatToPlainString) === null || _i18n_intl_formatToPlainString === void 0 ? void 0 : _i18n_intl_formatToPlainString.call(_i18n_intl, message, {
            a: names[0],
            b: names[1],
            c: names[2]
        });
        return typeof localized === 'string' && localized ? localized : fallback;
    } catch (unused) {
        return fallback;
    }
}
function tooltipPlacement(anchor, labelLength, viewportWidth) {
    var width = Math.min(viewportWidth - 16, Math.max(120, Math.min(260, labelLength * 6 + 28)));
    var left = Math.max(8, Math.min(anchor.x + anchor.width / 2 - width / 2, viewportWidth - width - 8));
    var height = Math.min(100, Math.max(42, Math.ceil(labelLength / 38) * 18 + 22));
    var below = anchor.y - height - 6 < 28;
    return {
        arrowDirection: below ? 'UP' : 'DOWN',
        arrowOffset: anchor.x + anchor.width / 2 - left - 8,
        left: left,
        top: below ? anchor.y + anchor.height + 6 : anchor.y - height - 6,
        width: width
    };
}
function displayName(user, guildId) {
    var _ref, _ref1, _ref2;
    var _memberStore_getNick;
    return (_ref = (_ref1 = (_ref2 = guildId ? memberStore === null || memberStore === void 0 ? void 0 : (_memberStore_getNick = memberStore.getNick) === null || _memberStore_getNick === void 0 ? void 0 : _memberStore_getNick.call(memberStore, guildId, user.id) : undefined) !== null && _ref2 !== void 0 ? _ref2 : user.globalName) !== null && _ref1 !== void 0 ? _ref1 : user.username) !== null && _ref !== void 0 ? _ref : user.id;
}
function readTypingIds(channel, muted, includeMuted, includeBlocked, includeIgnored, includeCurrent) {
    var _selectedChannelStore_getChannelId, _guildSettingsStore_isChannelMuted, _userStore_getCurrentUser;
    if (!includeCurrent && (selectedChannelStore === null || selectedChannelStore === void 0 ? void 0 : (_selectedChannelStore_getChannelId = selectedChannelStore.getChannelId) === null || _selectedChannelStore_getChannelId === void 0 ? void 0 : _selectedChannelStore_getChannelId.call(selectedChannelStore)) === channel.id) return [];
    if (!includeMuted && (muted || (guildSettingsStore === null || guildSettingsStore === void 0 ? void 0 : (_guildSettingsStore_isChannelMuted = guildSettingsStore.isChannelMuted) === null || _guildSettingsStore_isChannelMuted === void 0 ? void 0 : _guildSettingsStore_isChannelMuted.call(guildSettingsStore, channel.guild_id, channel.id)))) return [];
    return visibleTypingIds(typingStore === null || typingStore === void 0 ? void 0 : typingStore.getTypingUsers(channel.id), userStore === null || userStore === void 0 ? void 0 : (_userStore_getCurrentUser = userStore.getCurrentUser()) === null || _userStore_getCurrentUser === void 0 ? void 0 : _userStore_getCurrentUser.id, function(id) {
        var _ref;
        return (_ref = relationshipStore === null || relationshipStore === void 0 ? void 0 : relationshipStore.isBlocked(id)) !== null && _ref !== void 0 ? _ref : false;
    }, includeBlocked, function(id) {
        var _ref;
        var _relationshipStore_isIgnored;
        return (_ref = relationshipStore === null || relationshipStore === void 0 ? void 0 : (_relationshipStore_isIgnored = relationshipStore.isIgnored) === null || _relationshipStore_isIgnored === void 0 ? void 0 : _relationshipStore_isIgnored.call(relationshipStore, id)) !== null && _ref !== void 0 ? _ref : false;
    }, includeIgnored);
}
function TypingDots() {
    var _ref;
    var _metro_common = window.unbound.metro.common, _$React = _metro_common.React, ReactNative = _metro_common.ReactNative;
    var Animated = ReactNative.Animated;
    var theme = window.unbound.metro.common.Theme;
    var _React_useState = _sliced_to_array(_$React.useState((_ref = themeStore === null || themeStore === void 0 ? void 0 : themeStore.theme) !== null && _ref !== void 0 ? _ref : theme.themes.DARK), 2), appearance = _React_useState[0], setAppearance = _React_useState[1];
    var dotColor = theme.internal.resolveSemanticColor(appearance, theme.colors.TEXT_MUTED);
    var phase = _$React.useRef(new Animated.Value(2.8)).current;
    var waves = _$React.useRef([
        0,
        1,
        2
    ].map(function(index) {
        return Animated.modulo(Animated.add(phase, index === 0 ? 0 : -index * 0.25), 2);
    })).current;
    var inputRange = [
        0,
        0.4,
        0.8,
        1,
        1.2,
        1.6,
        2
    ];
    _$React.useEffect(function() {
        var _currentStore_addChangeListener;
        var currentStore = themeStore;
        function refresh() {
            var _ref;
            setAppearance((_ref = currentStore === null || currentStore === void 0 ? void 0 : currentStore.theme) !== null && _ref !== void 0 ? _ref : theme.themes.DARK);
        }
        currentStore === null || currentStore === void 0 ? void 0 : (_currentStore_addChangeListener = currentStore.addChangeListener) === null || _currentStore_addChangeListener === void 0 ? void 0 : _currentStore_addChangeListener.call(currentStore, refresh);
        return function() {
            var _currentStore_removeChangeListener;
            return currentStore === null || currentStore === void 0 ? void 0 : (_currentStore_removeChangeListener = currentStore.removeChangeListener) === null || _currentStore_removeChangeListener === void 0 ? void 0 : _currentStore_removeChangeListener.call(currentStore, refresh);
        };
    }, [
        theme
    ]);
    _$React.useEffect(function() {
        var animation = Animated.loop(Animated.timing(phase, {
            toValue: 6.8,
            duration: 2400,
            easing: ReactNative.Easing.linear,
            useNativeDriver: true
        }));
        animation.start();
        return function() {
            return animation.stop();
        };
    }, [
        Animated,
        phase,
        ReactNative.Easing
    ]);
    return /*#__PURE__*/ React.createElement(ReactNative.View, {
        style: {
            alignItems: 'center',
            flexDirection: 'row',
            height: 16,
            marginLeft: 6
        }
    }, waves.map(function(wave, index) {
        return /*#__PURE__*/ React.createElement(Animated.View, {
            key: index,
            style: {
                backgroundColor: dotColor,
                borderRadius: 3,
                height: 6,
                marginRight: index < 2 ? 1.5 : 0,
                opacity: wave.interpolate({
                    inputRange: inputRange,
                    outputRange: [
                        0.3,
                        0.3,
                        1,
                        1,
                        1,
                        0.3,
                        0.3
                    ]
                }),
                transform: [
                    {
                        scale: wave.interpolate({
                            inputRange: inputRange,
                            outputRange: [
                                0.8,
                                0.8,
                                1,
                                1,
                                1,
                                0.8,
                                0.8
                            ]
                        })
                    }
                ],
                width: 6
            }
        });
    }));
}
function openProfile(userId, channelId) {
    var _metro_find;
    profileSheet !== null && profileSheet !== void 0 ? profileSheet : profileSheet = (_metro_find = window.unbound.metro.find(function(module) {
        var _module_default_type, _module_default;
        return (module === null || module === void 0 ? void 0 : (_module_default = module.default) === null || _module_default === void 0 ? void 0 : (_module_default_type = _module_default.type) === null || _module_default_type === void 0 ? void 0 : _module_default_type.name) === 'UserProfileActionSheet';
    }, {
        interop: false
    })) === null || _metro_find === void 0 ? void 0 : _metro_find.default;
    actionSheets !== null && actionSheets !== void 0 ? actionSheets : actionSheets = window.unbound.metro.findByProps('openLazy', 'hideActionSheet');
    if (!profileSheet || !(actionSheets === null || actionSheets === void 0 ? void 0 : actionSheets.openLazy)) return;
    actionSheets.openLazy(Promise.resolve({
        default: profileSheet
    }), "UserProfile".concat(userId), {
        userId: userId,
        channelId: channelId,
        sourceAnalyticsLocations: [
            'avatar'
        ],
        openedAt: Date.now()
    });
}
function TypingAvatars(param) {
    var users = param.users, guildId = param.guildId, channelId = param.channelId, containerRef = param.containerRef, onLongPress = param.onLongPress;
    var _ref;
    var ReactNative = window.unbound.metro.common.ReactNative;
    var Component = userSummaryItem;
    var UserIcon = userIcon;
    if (!Component) return null;
    var theme = window.unbound.metro.common.Theme;
    var appearance = (_ref = themeStore === null || themeStore === void 0 ? void 0 : themeStore.theme) !== null && _ref !== void 0 ? _ref : theme.themes.DARK;
    var background = theme.internal.resolveSemanticColor(appearance, theme.colors.BACKGROUND_ACCENT);
    var foreground = theme.internal.resolveSemanticColor(appearance, theme.colors.TEXT_DEFAULT);
    var visible = users.slice(0, MAX_AVATARS);
    var overflow = users.length - visible.length;
    function showAvatarsTooltip(event) {
        event.stopPropagation();
        onLongPress();
    }
    return /*#__PURE__*/ React.createElement(ReactNative.View, {
        ref: containerRef,
        style: {
            alignItems: 'center',
            flexDirection: 'row',
            marginLeft: 6
        }
    }, visible.map(function(user, index) {
        var _ref;
        return /*#__PURE__*/ React.createElement(ReactNative.View, {
            key: (_ref = user === null || user === void 0 ? void 0 : user.id) !== null && _ref !== void 0 ? _ref : "unknown-".concat(index),
            style: {
                marginLeft: index ? -6 : 0,
                zIndex: visible.length - index
            }
        }, user ? /*#__PURE__*/ React.createElement(ReactNative.Pressable, {
            onPress: function onPress(event) {
                event.stopPropagation();
                openProfile(user.id, channelId);
            },
            onLongPress: showAvatarsTooltip
        }, /*#__PURE__*/ React.createElement(Component, {
            users: [
                user
            ],
            guildId: guildId,
            renderIcon: false,
            max: 1,
            size: 16,
            showDefaultAvatarsForNullUsers: true,
            showUserPopout: true
        })) : /*#__PURE__*/ React.createElement(ReactNative.Pressable, {
            onPress: showAvatarsTooltip,
            onLongPress: showAvatarsTooltip
        }, /*#__PURE__*/ React.createElement(ReactNative.View, {
            style: {
                alignItems: 'center',
                backgroundColor: background,
                borderRadius: 8,
                height: 16,
                justifyContent: 'center',
                width: 16
            }
        }, UserIcon ? /*#__PURE__*/ React.createElement(UserIcon, {
            color: foreground,
            style: {
                transform: [
                    {
                        scale: 0.5
                    }
                ]
            }
        }) : null)));
    }), overflow > 0 ? /*#__PURE__*/ React.createElement(ReactNative.Pressable, {
        onPress: showAvatarsTooltip,
        onLongPress: showAvatarsTooltip,
        style: {
            marginLeft: -6,
            zIndex: MAX_AVATARS + 1
        }
    }, /*#__PURE__*/ React.createElement(ReactNative.View, {
        style: {
            alignItems: 'center',
            backgroundColor: '#000',
            borderRadius: 8,
            height: 16,
            justifyContent: 'center',
            width: 16
        }
    }, /*#__PURE__*/ React.createElement(ReactNative.Text, {
        style: {
            color: '#fff',
            fontSize: 8,
            fontWeight: '600'
        }
    }, "+".concat(overflow)))) : null);
}
function ChannelTypingIndicator(param) {
    var channel = param.channel, muted = param.muted;
    var _ref;
    var _metro_common = window.unbound.metro.common, _$React = _metro_common.React, ReactNative = _metro_common.ReactNative;
    var avatarsRef = _$React.useRef(null);
    var dotsRef = _$React.useRef(null);
    var _React_useState = _sliced_to_array(_$React.useState(null), 2), tooltipAnchor = _React_useState[0], setTooltipAnchor = _React_useState[1];
    var settings = STORE.useSettingsStore();
    var includeMuted = settings.get('includeMutedChannels', false);
    var includeBlocked = settings.get('includeBlockedUsers', false);
    var includeIgnored = settings.get('includeIgnoredUsers', false);
    var includeCurrent = settings.get('includeCurrentChannel', true);
    var indicatorMode = settings.get('indicatorMode', DOTS | AVATARS);
    var _React_useState1 = _sliced_to_array(_$React.useState(function() {
        return readTypingIds(channel, muted, includeMuted, includeBlocked, includeIgnored, includeCurrent);
    }), 2), typingIds = _React_useState1[0], setTypingIds = _React_useState1[1];
    _$React.useEffect(function() {
        var subscribed = false;
        var currentTypingStore = null;
        var currentRelationshipStore = null;
        var currentGuildSettingsStore = null;
        var currentSelectedChannelStore = null;
        function refresh() {
            var next = readTypingIds(channel, muted, includeMuted, includeBlocked, includeIgnored, includeCurrent);
            setTypingIds(function(current) {
                return sameIds(current, next) ? current : next;
            });
        }
        function unsubscribe() {
            var _currentRelationshipStore_removeChangeListener, _currentGuildSettingsStore_removeChangeListener, _currentSelectedChannelStore_removeChangeListener;
            if (!subscribed) return;
            subscribed = false;
            currentTypingStore === null || currentTypingStore === void 0 ? void 0 : currentTypingStore.removeChangeListener(refresh);
            currentRelationshipStore === null || currentRelationshipStore === void 0 ? void 0 : (_currentRelationshipStore_removeChangeListener = currentRelationshipStore.removeChangeListener) === null || _currentRelationshipStore_removeChangeListener === void 0 ? void 0 : _currentRelationshipStore_removeChangeListener.call(currentRelationshipStore, refresh);
            currentGuildSettingsStore === null || currentGuildSettingsStore === void 0 ? void 0 : (_currentGuildSettingsStore_removeChangeListener = currentGuildSettingsStore.removeChangeListener) === null || _currentGuildSettingsStore_removeChangeListener === void 0 ? void 0 : _currentGuildSettingsStore_removeChangeListener.call(currentGuildSettingsStore, refresh);
            currentSelectedChannelStore === null || currentSelectedChannelStore === void 0 ? void 0 : (_currentSelectedChannelStore_removeChangeListener = currentSelectedChannelStore.removeChangeListener) === null || _currentSelectedChannelStore_removeChangeListener === void 0 ? void 0 : _currentSelectedChannelStore_removeChangeListener.call(currentSelectedChannelStore, refresh);
            currentTypingStore = null;
            currentRelationshipStore = null;
            currentGuildSettingsStore = null;
            currentSelectedChannelStore = null;
        }
        function pause() {
            unsubscribe();
            setTypingIds([]);
            setTooltipAnchor(null);
        }
        function resume() {
            var _currentRelationshipStore_addChangeListener, _currentGuildSettingsStore_addChangeListener, _currentSelectedChannelStore_addChangeListener;
            if (subscribed || !indicatorRegistry.enabled || !(typingStore === null || typingStore === void 0 ? void 0 : typingStore.getTypingUsers) || !(userStore === null || userStore === void 0 ? void 0 : userStore.getUser)) return;
            currentTypingStore = typingStore;
            currentRelationshipStore = relationshipStore;
            currentGuildSettingsStore = guildSettingsStore;
            currentSelectedChannelStore = selectedChannelStore;
            subscribed = true;
            refresh();
            currentTypingStore.addChangeListener(refresh);
            currentRelationshipStore === null || currentRelationshipStore === void 0 ? void 0 : (_currentRelationshipStore_addChangeListener = currentRelationshipStore.addChangeListener) === null || _currentRelationshipStore_addChangeListener === void 0 ? void 0 : _currentRelationshipStore_addChangeListener.call(currentRelationshipStore, refresh);
            currentGuildSettingsStore === null || currentGuildSettingsStore === void 0 ? void 0 : (_currentGuildSettingsStore_addChangeListener = currentGuildSettingsStore.addChangeListener) === null || _currentGuildSettingsStore_addChangeListener === void 0 ? void 0 : _currentGuildSettingsStore_addChangeListener.call(currentGuildSettingsStore, refresh);
            currentSelectedChannelStore === null || currentSelectedChannelStore === void 0 ? void 0 : (_currentSelectedChannelStore_addChangeListener = currentSelectedChannelStore.addChangeListener) === null || _currentSelectedChannelStore_addChangeListener === void 0 ? void 0 : _currentSelectedChannelStore_addChangeListener.call(currentSelectedChannelStore, refresh);
        }
        var indicator = {
            pause: pause,
            resume: resume
        };
        activeIndicators.add(indicator);
        resume();
        return function() {
            unsubscribe();
            activeIndicators.delete(indicator);
        };
    }, [
        channel.id,
        channel.guild_id,
        muted,
        includeMuted,
        includeBlocked,
        includeIgnored,
        includeCurrent
    ]);
    if (!typingIds.length) return null;
    var typingUsers = typingIds.map(function(id) {
        var _ref;
        return (_ref = userStore === null || userStore === void 0 ? void 0 : userStore.getUser(id)) !== null && _ref !== void 0 ? _ref : null;
    });
    var names = typingUsers.map(function(user) {
        return user ? displayName(user, channel.guild_id) : 'Someone';
    });
    var label = typingLabel(names);
    var theme = window.unbound.metro.common.Theme;
    var appearance = (_ref = themeStore === null || themeStore === void 0 ? void 0 : themeStore.theme) !== null && _ref !== void 0 ? _ref : theme.themes.DARK;
    var background = theme.internal.resolveSemanticColor(appearance, theme.colors.BACKGROUND_SURFACE_HIGHEST);
    var foreground = theme.internal.resolveSemanticColor(appearance, theme.colors.TEXT_DEFAULT);
    var placement = tooltipAnchor ? tooltipPlacement(tooltipAnchor, label.length, ReactNative.Dimensions.get('window').width) : null;
    function showTooltip(targetRef) {
        var _targetRef_current_measureInWindow, _targetRef_current;
        (_targetRef_current = targetRef.current) === null || _targetRef_current === void 0 ? void 0 : (_targetRef_current_measureInWindow = _targetRef_current.measureInWindow) === null || _targetRef_current_measureInWindow === void 0 ? void 0 : _targetRef_current_measureInWindow.call(_targetRef_current, function(x, y, width, height) {
            if (![
                x,
                y,
                width,
                height
            ].every(Number.isFinite)) return;
            setTooltipAnchor({
                x: x,
                y: y,
                width: width,
                height: height
            });
        });
    }
    return /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement(ReactNative.View, {
        style: {
            alignItems: 'center',
            flexDirection: 'row',
            flexShrink: 0
        }
    }, indicatorMode & AVATARS ? /*#__PURE__*/ React.createElement(TypingAvatars, {
        users: typingUsers,
        guildId: channel.guild_id,
        channelId: channel.id,
        containerRef: avatarsRef,
        onLongPress: function onLongPress() {
            return showTooltip(avatarsRef);
        }
    }) : null, indicatorMode & DOTS ? /*#__PURE__*/ React.createElement(ReactNative.Pressable, {
        ref: dotsRef,
        accessibilityLabel: label,
        onPress: function onPress(event) {
            event.stopPropagation();
            showTooltip(dotsRef);
        }
    }, /*#__PURE__*/ React.createElement(TypingDots, null)) : null), placement && (tooltipComponents === null || tooltipComponents === void 0 ? void 0 : tooltipComponents.Tooltip) ? /*#__PURE__*/ React.createElement(ReactNative.Modal, {
        visible: true,
        transparent: true,
        statusBarTranslucent: true,
        onRequestClose: function onRequestClose() {
            return setTooltipAnchor(null);
        }
    }, /*#__PURE__*/ React.createElement(ReactNative.View, {
        style: {
            flex: 1
        }
    }, /*#__PURE__*/ React.createElement(ReactNative.Pressable, {
        onPress: function onPress() {
            return setTooltipAnchor(null);
        },
        style: {
            bottom: 0,
            left: 0,
            position: 'absolute',
            right: 0,
            top: 0
        }
    }), /*#__PURE__*/ React.createElement(ReactNative.View, {
        pointerEvents: "none",
        style: {
            left: placement.left,
            position: 'absolute',
            top: placement.top
        }
    }, /*#__PURE__*/ React.createElement(tooltipComponents.Tooltip, {
        arrowDirection: placement.arrowDirection,
        arrowOffset: placement.arrowOffset,
        arrowPosition: tooltipComponents.TooltipArrowPositions.LEFT,
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
            width: placement.width
        }
    })))) : null);
}
function isIndicatorBoundary(element) {
    var _element_props;
    return (element === null || element === void 0 ? void 0 : element.type) === IndicatorBoundary || (element === null || element === void 0 ? void 0 : element.key) === ADDON_ID || (element === null || element === void 0 ? void 0 : (_element_props = element.props) === null || _element_props === void 0 ? void 0 : _element_props.key) === ADDON_ID;
}
function insertTypingIndicator(result, channel, muted) {
    var _result_props, _row_props;
    var _$React = window.unbound.metro.common.React;
    var outerChildren = result === null || result === void 0 ? void 0 : (_result_props = result.props) === null || _result_props === void 0 ? void 0 : _result_props.children;
    if (!Array.isArray(outerChildren)) return result;
    var row = outerChildren.find(function(child) {
        var _child_props;
        return (child === null || child === void 0 ? void 0 : (_child_props = child.props) === null || _child_props === void 0 ? void 0 : _child_props.accessibilityRole) === 'button';
    });
    var rowChildren = row === null || row === void 0 ? void 0 : (_row_props = row.props) === null || _row_props === void 0 ? void 0 : _row_props.children;
    if (!Array.isArray(rowChildren)) return result;
    var content = rowChildren.find(function(child) {
        var _child_props;
        return Array.isArray(child === null || child === void 0 ? void 0 : (_child_props = child.props) === null || _child_props === void 0 ? void 0 : _child_props.children) && child.props.children.some(function(part) {
            var _part_props_channel, _part_props;
            return (part === null || part === void 0 ? void 0 : (_part_props = part.props) === null || _part_props === void 0 ? void 0 : (_part_props_channel = _part_props.channel) === null || _part_props_channel === void 0 ? void 0 : _part_props_channel.id) === channel.id;
        });
    });
    if (!content) return result;
    var contentChildren = content.props.children;
    if (contentChildren.some(isIndicatorBoundary)) return result;
    var infoIndex = contentChildren.findIndex(function(part) {
        var _part_props_channel, _part_props;
        return (part === null || part === void 0 ? void 0 : (_part_props = part.props) === null || _part_props === void 0 ? void 0 : (_part_props_channel = _part_props.channel) === null || _part_props_channel === void 0 ? void 0 : _part_props_channel.id) === channel.id;
    });
    if (infoIndex < 0) return result;
    var indicator = /*#__PURE__*/ React.createElement(IndicatorBoundary, {
        key: ADDON_ID
    }, /*#__PURE__*/ React.createElement(ChannelTypingIndicator, {
        channel: channel,
        muted: muted
    }));
    var nextContent = _$React.cloneElement(content, {}, _to_consumable_array(contentChildren.slice(0, infoIndex)).concat([
        indicator
    ], _to_consumable_array(contentChildren.slice(infoIndex))));
    var nextRow = _$React.cloneElement(row, {}, rowChildren.map(function(child) {
        return child === content ? nextContent : child;
    }));
    return _$React.cloneElement(result, {}, outerChildren.map(function(child) {
        return child === row ? nextRow : child;
    }));
}
function insertThreadTypingIndicator(result, channel, muted) {
    var _result_props;
    var _metro_common = window.unbound.metro.common, _$React = _metro_common.React, ReactNative = _metro_common.ReactNative;
    var outerChildren = result === null || result === void 0 ? void 0 : (_result_props = result.props) === null || _result_props === void 0 ? void 0 : _result_props.children;
    if (!Array.isArray(outerChildren)) return result;
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
    try {
        var _loop = function() {
            var container = _step.value;
            var _container_props, _currentInfo_props_children, _currentInfo_props;
            var children = container === null || container === void 0 ? void 0 : (_container_props = container.props) === null || _container_props === void 0 ? void 0 : _container_props.children;
            if (!Array.isArray(children)) return "continue";
            var row = children.find(function(child) {
                var _child_props_channel, _child_props;
                return (child === null || child === void 0 ? void 0 : (_child_props = child.props) === null || _child_props === void 0 ? void 0 : (_child_props_channel = _child_props.channel) === null || _child_props_channel === void 0 ? void 0 : _child_props_channel.id) === channel.id && child.props.accessibilityRole === 'button';
            });
            if (!row) return "continue";
            var currentInfo = row.props.channelInfo;
            if (isIndicatorBoundary(currentInfo) || isIndicatorBoundary(currentInfo === null || currentInfo === void 0 ? void 0 : (_currentInfo_props = currentInfo.props) === null || _currentInfo_props === void 0 ? void 0 : (_currentInfo_props_children = _currentInfo_props.children) === null || _currentInfo_props_children === void 0 ? void 0 : _currentInfo_props_children[1])) return {
                v: result
            };
            var indicator = /*#__PURE__*/ React.createElement(IndicatorBoundary, {
                key: ADDON_ID
            }, /*#__PURE__*/ React.createElement(ChannelTypingIndicator, {
                channel: channel,
                muted: muted
            }));
            var channelInfo = currentInfo ? /*#__PURE__*/ React.createElement(ReactNative.View, {
                style: {
                    alignItems: 'center',
                    flexDirection: 'row'
                }
            }, currentInfo, indicator) : indicator;
            var nextRow = _$React.cloneElement(row, {
                channelInfo: channelInfo
            });
            var nextContainer = _$React.cloneElement(container, {}, children.map(function(child) {
                return child === row ? nextRow : child;
            }));
            return {
                v: _$React.cloneElement(result, {}, outerChildren.map(function(child) {
                    return child === container ? nextContainer : child;
                }))
            };
        };
        for(var _iterator = outerChildren[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
            var _ret = _loop();
            if (_type_of(_ret) === "object") return _ret.v;
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
    return result;
}
function patchTextChannel(module) {
    var target = module === null || module === void 0 ? void 0 : module.default;
    if (unpatchText || typeof (target === null || target === void 0 ? void 0 : target.type) !== 'function') return Boolean(unpatchText);
    unpatchText = window.unbound.patcher.after(target, 'type', function(param) {
        var args = param.args, result = param.result;
        var _args_;
        var _ref = (_args_ = args[0]) !== null && _args_ !== void 0 ? _args_ : {}, channel = _ref.channel, muted = _ref.muted;
        if (!(channel === null || channel === void 0 ? void 0 : channel.id)) return result;
        return insertTypingIndicator(result, channel, Boolean(muted));
    });
    return true;
}
function patchThreadChannel(module) {
    if (unpatchThread || typeof (module === null || module === void 0 ? void 0 : module.default) !== 'function') return Boolean(unpatchThread);
    unpatchThread = window.unbound.patcher.after(module, 'default', function(param) {
        var result = param.result;
        if (typeof (result === null || result === void 0 ? void 0 : result.type) !== 'function') return result;
        if (threadRenderer !== result.type) {
            unpatchThreadRenderer === null || unpatchThreadRenderer === void 0 ? void 0 : unpatchThreadRenderer();
            threadRenderer = result.type;
            threadRendererHost = {
                render: result.type
            };
            unpatchThreadRenderer = window.unbound.patcher.after(threadRendererHost, 'render', function(param) {
                var args = param.args, result = param.result;
                var _args_;
                var _ref = (_args_ = args[0]) !== null && _args_ !== void 0 ? _args_ : {}, channel = _ref.channel, muted = _ref.muted;
                if (!(channel === null || channel === void 0 ? void 0 : channel.id)) return result;
                return insertThreadTypingIndicator(result, channel, Boolean(muted));
            });
        }
        var React1 = window.unbound.metro.common.React;
        return React1.createElement(threadRendererHost.render, _object_spread_props(_object_spread({}, result.props), {
            key: result.key
        }));
    });
    return true;
}
function patchAvailableChannelModules() {
    typingStore !== null && typingStore !== void 0 ? typingStore : typingStore = window.unbound.metro.findByProps('getTypingUsers');
    userStore !== null && userStore !== void 0 ? userStore : userStore = window.unbound.metro.findByProps('getCurrentUser', 'getUser');
    if (!(typingStore === null || typingStore === void 0 ? void 0 : typingStore.getTypingUsers) || !(userStore === null || userStore === void 0 ? void 0 : userStore.getUser)) return false;
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
    try {
        for(var _iterator = activeIndicators[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
            var indicator = _step.value;
            indicator.resume();
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
    var textReady = patchTextChannel(window.unbound.metro.findByFilePath(TEXT_CHANNEL_PATH, {
        interop: false
    }));
    var threadReady = patchThreadChannel(window.unbound.metro.findByFilePath(THREAD_CHANNEL_PATH, {
        interop: false
    }));
    return textReady && threadReady;
}
function waitForChannelModules() {
    if (patchAvailableChannelModules()) return;
    removeModuleListener = window.unbound.metro.addListener(function() {
        if (!patchAvailableChannelModules()) return;
        removeModuleListener === null || removeModuleListener === void 0 ? void 0 : removeModuleListener();
        removeModuleListener = null;
    });
}
function ChannelTypingSettings() {
    var settings = STORE.useSettingsStore();
    var indicatorMode = settings.get('indicatorMode', DOTS | AVATARS);
    return /*#__PURE__*/ React.createElement(SettingsScrollView, null, /*#__PURE__*/ React.createElement(SettingsSection, {
        title: "Channel typing indicators"
    }, /*#__PURE__*/ React.createElement(SettingsSwitchRow, {
        label: "Include current channel",
        description: "Show typing activity in the selected channel.",
        value: settings.get('includeCurrentChannel', true),
        onValueChange: function onValueChange(value) {
            return settings.set('includeCurrentChannel', value);
        }
    }), /*#__PURE__*/ React.createElement(SettingsSwitchRow, {
        label: "Include muted channels",
        description: "Show typing activity in muted channels.",
        value: settings.get('includeMutedChannels', false),
        onValueChange: function onValueChange(value) {
            return settings.set('includeMutedChannels', value);
        }
    }), /*#__PURE__*/ React.createElement(SettingsSwitchRow, {
        label: "Include ignored users",
        description: "Show typing activity from ignored users.",
        value: settings.get('includeIgnoredUsers', false),
        onValueChange: function onValueChange(value) {
            return settings.set('includeIgnoredUsers', value);
        }
    }), /*#__PURE__*/ React.createElement(SettingsSwitchRow, {
        label: "Include blocked users",
        description: "Show typing activity from blocked users.",
        value: settings.get('includeBlockedUsers', false),
        onValueChange: function onValueChange(value) {
            return settings.set('includeBlockedUsers', value);
        }
    })), /*#__PURE__*/ React.createElement(SettingsSection, {
        title: "Appearance"
    }, /*#__PURE__*/ React.createElement(SettingsRow, {
        label: "Avatars and animated dots",
        trailing: indicatorMode === (DOTS | AVATARS) ? '✓' : undefined,
        onPress: function onPress() {
            return settings.set('indicatorMode', DOTS | AVATARS);
        }
    }), /*#__PURE__*/ React.createElement(SettingsRow, {
        label: "Animated dots",
        trailing: indicatorMode === DOTS ? '✓' : undefined,
        onPress: function onPress() {
            return settings.set('indicatorMode', DOTS);
        }
    }), /*#__PURE__*/ React.createElement(SettingsRow, {
        label: "Avatars",
        trailing: indicatorMode === AVATARS ? '✓' : undefined,
        onPress: function onPress() {
            return settings.set('indicatorMode', AVATARS);
        }
    })));
}
var index = {
    start: function start() {
        var _metro_findByProps;
        if (started) return;
        started = true;
        indicatorRegistry.enabled = true;
        typingStore = window.unbound.metro.findByProps('getTypingUsers');
        userStore = window.unbound.metro.findByProps('getCurrentUser', 'getUser');
        relationshipStore = window.unbound.metro.findByProps('isBlocked');
        selectedChannelStore = window.unbound.metro.findByProps('getChannelId');
        guildSettingsStore = window.unbound.metro.findByProps('isChannelMuted');
        memberStore = window.unbound.metro.findByProps('getNick');
        userSummaryItem = window.unbound.metro.findByName('UserSummaryItem');
        userIcon = (_metro_findByProps = window.unbound.metro.findByProps('UserIcon')) === null || _metro_findByProps === void 0 ? void 0 : _metro_findByProps.UserIcon;
        tooltipComponents = window.unbound.metro.findByProps('TooltipArrowDirections', 'TooltipArrowPositions');
        var theme = window.unbound.metro.common.Theme;
        themeStore = window.unbound.metro.find(function(module) {
            var appearance = module === null || module === void 0 ? void 0 : module.theme;
            return typeof appearance === 'string' && Object.values(theme.themes).includes(appearance);
        });
        waitForChannelModules();
    },
    stop: function stop() {
        started = false;
        indicatorRegistry.enabled = false;
        var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
        try {
            for(var _iterator = activeIndicators[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                var indicator = _step.value;
                indicator.pause();
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
        unpatchText === null || unpatchText === void 0 ? void 0 : unpatchText();
        unpatchText = null;
        unpatchThread === null || unpatchThread === void 0 ? void 0 : unpatchThread();
        unpatchThread = null;
        unpatchThreadRenderer === null || unpatchThreadRenderer === void 0 ? void 0 : unpatchThreadRenderer();
        unpatchThreadRenderer = null;
        threadRenderer = null;
        threadRendererHost = null;
        removeModuleListener === null || removeModuleListener === void 0 ? void 0 : removeModuleListener();
        removeModuleListener = null;
    },
    getSettingsPanel: function getSettingsPanel() {
        return /*#__PURE__*/ React.createElement(ChannelTypingSettings, null);
    }
};
return {
  default: index,
  insertThreadTypingIndicator: insertThreadTypingIndicator,
  insertTypingIndicator: insertTypingIndicator,
  sameIds: sameIds,
  tooltipPlacement: tooltipPlacement,
  typingLabel: typingLabel,
  visibleTypingIds: visibleTypingIds
};
})();return this.__plugin;},start(context){const module=this.__load();const plugin=module?.default??module;if(plugin&&typeof plugin.start==='function')return plugin.start(context);},stop(){const module=this.__load();const plugin=module?.default??module;if(plugin&&typeof plugin.stop==='function')return plugin.stop();},getSettingsPanel(...args){const module=this.__load();const plugin=module?.default??module;const settingsPanel=plugin?.getSettingsPanel??module?.getSettingsPanel;if(typeof settingsPanel==='function')return settingsPanel.apply(plugin,args);return null;}})