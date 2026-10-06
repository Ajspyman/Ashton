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
var ADDON_ID = 'unbound.pronoundb';
var STORE = window.unbound.storage.getStore(ADDON_ID);
var API_URL = 'https://pronoundb.org/api/v2/lookup';
var REQUEST_BATCH_SIZE = 50;
var REQUEST_INTERVAL_MS = 2000;
var AUTO_MODERATION_ACTION = 24;
var pronounMapping = {
    any: 'Any pronouns',
    ask: 'Ask me my pronouns',
    avoid: 'Avoid pronouns, use my name',
    he: 'He/Him',
    it: 'It/Its',
    other: 'Other pronouns',
    she: 'She/Her',
    they: 'They/Them',
    unspecified: 'No pronouns specified.'
};
var cache = new Map();
var queue = new Set();
var touchedMessages = new Map();
var unpatch = null;
var profiles = null;
var users = null;
var channels = null;
var dispatcher = null;
var processing = false;
var scheduled = false;
var runId = 0;
function formatPronouns(codes) {
    var _pronounMapping_code;
    if (!(codes === null || codes === void 0 ? void 0 : codes.length)) return null;
    if (codes.length > 1) {
        var pronouns = codes.map(function(code) {
            var _code_;
            return ((_code_ = code[0]) === null || _code_ === void 0 ? void 0 : _code_.toUpperCase()) + code.slice(1);
        }).join('/');
        return STORE.get('format', 'lowercase') === 'lowercase' ? pronouns.toLowerCase() : pronouns;
    }
    var code = codes[0];
    var value = (_pronounMapping_code = pronounMapping[code]) !== null && _pronounMapping_code !== void 0 ? _pronounMapping_code : code;
    if (STORE.get('format', 'lowercase') === 'capitalized' || [
        'any',
        'ask',
        'avoid',
        'other',
        'unspecified'
    ].includes(code)) {
        return value;
    }
    return value.toLowerCase();
}
function discordPronouns(userId, channelId) {
    var _profiles_getUserProfile_pronouns, _profiles_getUserProfile, _profiles_getUserProfile1, _channels_getChannel, _channels_getChannel1, _profiles_getGuildMemberProfile_pronouns, _profiles_getGuildMemberProfile, _profiles_getGuildMemberProfile1;
    var global = profiles === null || profiles === void 0 ? void 0 : (_profiles_getUserProfile1 = profiles.getUserProfile) === null || _profiles_getUserProfile1 === void 0 ? void 0 : (_profiles_getUserProfile = _profiles_getUserProfile1.call(profiles, userId)) === null || _profiles_getUserProfile === void 0 ? void 0 : (_profiles_getUserProfile_pronouns = _profiles_getUserProfile.pronouns) === null || _profiles_getUserProfile_pronouns === void 0 ? void 0 : _profiles_getUserProfile_pronouns.trim().replace(/\n+/g, '');
    var guildId = channelId ? channels === null || channels === void 0 ? void 0 : (_channels_getChannel1 = channels.getChannel) === null || _channels_getChannel1 === void 0 ? void 0 : (_channels_getChannel = _channels_getChannel1.call(channels, channelId)) === null || _channels_getChannel === void 0 ? void 0 : _channels_getChannel.guild_id : undefined;
    return (profiles === null || profiles === void 0 ? void 0 : (_profiles_getGuildMemberProfile1 = profiles.getGuildMemberProfile) === null || _profiles_getGuildMemberProfile1 === void 0 ? void 0 : (_profiles_getGuildMemberProfile = _profiles_getGuildMemberProfile1.call(profiles, userId, guildId)) === null || _profiles_getGuildMemberProfile === void 0 ? void 0 : (_profiles_getGuildMemberProfile_pronouns = _profiles_getGuildMemberProfile.pronouns) === null || _profiles_getGuildMemberProfile_pronouns === void 0 ? void 0 : _profiles_getGuildMemberProfile_pronouns.trim().replace(/\n+/g, '')) || global || null;
}
function resolvePronouns(userId, channelId) {
    var _cache_get;
    var discord = discordPronouns(userId, channelId);
    var pronounDB = (_cache_get = cache.get(userId)) !== null && _cache_get !== void 0 ? _cache_get : null;
    var priority = STORE.get('priority', 'pronoundb');
    return priority === 'discord' ? discord || pronounDB : pronounDB || discord;
}
function refreshMessages() {
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
    try {
        for(var _iterator = touchedMessages.values()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
            var message = _step.value;
            var _dispatcher_dispatch;
            if (!message.id) continue;
            dispatcher === null || dispatcher === void 0 ? void 0 : (_dispatcher_dispatch = dispatcher.dispatch) === null || _dispatcher_dispatch === void 0 ? void 0 : _dispatcher_dispatch.call(dispatcher, {
                type: 'MESSAGE_UPDATE',
                message: _object_spread({}, message),
                log_edit: false
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
function requestPronouns(ids, currentRunId) {
    return _async_to_generator(function() {
        var query, _result_id_sets, _result_id, response, result, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, id, _iteratorNormalCompletion1, _didIteratorError1, _iteratorError1, _iterator1, _step1, id1;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    query = new URLSearchParams({
                        ids: ids.join(','),
                        platform: 'discord'
                    });
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
                        fetch("".concat(API_URL, "?").concat(query), {
                            headers: {
                                Accept: 'application/json',
                                'X-PronounDB-Source': 'Unbound/1.0.0'
                            }
                        })
                    ];
                case 2:
                    response = _state.sent();
                    if (!response.ok) throw new Error("PronounDB returned ".concat(response.status));
                    return [
                        4,
                        response.json()
                    ];
                case 3:
                    result = _state.sent();
                    if (runId !== currentRunId) return [
                        2
                    ];
                    _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                    try {
                        for(_iterator = ids[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                            id = _step.value;
                            cache.set(id, formatPronouns((_result_id = result[id]) === null || _result_id === void 0 ? void 0 : (_result_id_sets = _result_id.sets) === null || _result_id_sets === void 0 ? void 0 : _result_id_sets.en));
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
                    refreshMessages();
                    return [
                        3,
                        5
                    ];
                case 4:
                    _state.sent();
                    if (runId !== currentRunId) return [
                        2
                    ];
                    _iteratorNormalCompletion1 = true, _didIteratorError1 = false, _iteratorError1 = undefined;
                    try {
                        for(_iterator1 = ids[Symbol.iterator](); !(_iteratorNormalCompletion1 = (_step1 = _iterator1.next()).done); _iteratorNormalCompletion1 = true){
                            id1 = _step1.value;
                            cache.set(id1, null);
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
function processQueue(currentRunId) {
    return _async_to_generator(function() {
        var ids, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, id;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    if (processing) return [
                        2
                    ];
                    processing = true;
                    _state.label = 1;
                case 1:
                    if (!(queue.size > 0 && runId === currentRunId)) return [
                        3,
                        5
                    ];
                    ids = Array.from(queue).slice(0, REQUEST_BATCH_SIZE);
                    _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                    try {
                        for(_iterator = ids[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                            id = _step.value;
                            queue.delete(id);
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
                    return [
                        4,
                        requestPronouns(ids, currentRunId)
                    ];
                case 2:
                    _state.sent();
                    if (!(queue.size > 0 && runId === currentRunId)) return [
                        3,
                        4
                    ];
                    return [
                        4,
                        new Promise(function(resolve) {
                            return setTimeout(resolve, REQUEST_INTERVAL_MS);
                        })
                    ];
                case 3:
                    _state.sent();
                    _state.label = 4;
                case 4:
                    return [
                        3,
                        1
                    ];
                case 5:
                    processing = false;
                    return [
                        2
                    ];
            }
        });
    })();
}
function enqueue(userId) {
    if (cache.has(userId)) return;
    queue.add(userId);
    if (scheduled) return;
    scheduled = true;
    setTimeout(function() {
        scheduled = false;
        void processQueue(runId);
    }, 0);
}
function shouldShow(message) {
    var _users_getCurrentUser, _users_getCurrentUser1;
    if (!message) return false;
    var author = message.author;
    if (!(author === null || author === void 0 ? void 0 : author.id) || author.bot || author.system || message.type === AUTO_MODERATION_ACTION) return false;
    if (!STORE.get('showSelf', true) && author.id === (users === null || users === void 0 ? void 0 : (_users_getCurrentUser1 = users.getCurrentUser) === null || _users_getCurrentUser1 === void 0 ? void 0 : (_users_getCurrentUser = _users_getCurrentUser1.call(users)) === null || _users_getCurrentUser === void 0 ? void 0 : _users_getCurrentUser.id)) return false;
    return true;
}
function addPronouns(row, message) {
    var _message_id;
    var _message_author;
    if (!shouldShow(message) || !((_message_author = message.author) === null || _message_author === void 0 ? void 0 : _message_author.id)) return;
    touchedMessages.set((_message_id = message.id) !== null && _message_id !== void 0 ? _message_id : message.author.id, message);
    var pronouns = resolvePronouns(message.author.id, message.channel_id);
    if (!cache.has(message.author.id)) enqueue(message.author.id);
    if (!pronouns || typeof (row === null || row === void 0 ? void 0 : row.timestamp) !== 'string' || row.timestamp.includes("• ".concat(pronouns))) return;
    row.timestamp = "".concat(row.timestamp, " • ").concat(pronouns);
    if (typeof row.timestampAccessibilityLabel === 'string') {
        row.timestampAccessibilityLabel = "".concat(row.timestampAccessibilityLabel, " • ").concat(pronouns);
    }
}
function SettingsPanel() {
    var state = STORE.useSettingsStore();
    var format = state.get('format', 'lowercase');
    var priority = state.get('priority', 'pronoundb');
    return /*#__PURE__*/ React.createElement(SettingsScrollView, null, /*#__PURE__*/ React.createElement(SettingsSection, {
        title: "Pronouns"
    }, /*#__PURE__*/ React.createElement(SettingsRow, {
        label: "Lowercase",
        trailing: format === 'lowercase' ? '✓' : null,
        onPress: function onPress() {
            return state.set('format', 'lowercase');
        }
    }), /*#__PURE__*/ React.createElement(SettingsRow, {
        label: "Capitalized",
        trailing: format === 'capitalized' ? '✓' : null,
        onPress: function onPress() {
            return state.set('format', 'capitalized');
        }
    })), /*#__PURE__*/ React.createElement(SettingsSection, {
        title: "Source"
    }, /*#__PURE__*/ React.createElement(SettingsRow, {
        label: "Prefer PronounDB",
        description: "Fall back to Discord profile pronouns",
        trailing: priority === 'pronoundb' ? '✓' : null,
        onPress: function onPress() {
            return state.set('priority', 'pronoundb');
        }
    }), /*#__PURE__*/ React.createElement(SettingsRow, {
        label: "Prefer Discord",
        description: "Fall back to PronounDB",
        trailing: priority === 'discord' ? '✓' : null,
        onPress: function onPress() {
            return state.set('priority', 'discord');
        }
    })), /*#__PURE__*/ React.createElement(SettingsSection, {
        title: "Visibility"
    }, /*#__PURE__*/ React.createElement(SettingsSwitchRow, {
        label: "Show for Yourself",
        value: state.get('showSelf', true),
        onValueChange: function onValueChange(value) {
            return state.set('showSelf', value);
        }
    })));
}
var index = {
    start: function start() {
        runId++;
        profiles = window.unbound.metro.findStore('UserProfile');
        users = window.unbound.metro.findByProps('getCurrentUser');
        channels = window.unbound.metro.findByProps('getChannel');
        dispatcher = window.unbound.metro.findByProps('dispatch', 'subscribe');
        var target = window.unbound.metro.findByProps('generateMessageRowData');
        if (!profiles || !(users === null || users === void 0 ? void 0 : users.getCurrentUser) || !(target === null || target === void 0 ? void 0 : target.generateMessageRowData)) return;
        unpatch = window.unbound.patcher.after(target, 'generateMessageRowData', function(ctx) {
            var _ctx_result, _ctx_args_;
            addPronouns((_ctx_result = ctx.result) === null || _ctx_result === void 0 ? void 0 : _ctx_result.message, (_ctx_args_ = ctx.args[0]) === null || _ctx_args_ === void 0 ? void 0 : _ctx_args_.message);
        });
    },
    stop: function stop() {
        runId++;
        unpatch === null || unpatch === void 0 ? void 0 : unpatch();
        unpatch = null;
        cache.clear();
        queue.clear();
        touchedMessages.clear();
        profiles = null;
        users = null;
        channels = null;
        dispatcher = null;
        processing = false;
        scheduled = false;
    },
    getSettingsPanel: function getSettingsPanel() {
        return /*#__PURE__*/ React.createElement(SettingsPanel, null);
    }
};
return index;
})();return this.__plugin;},start(context){const module=this.__load();const plugin=module?.default??module;if(plugin&&typeof plugin.start==='function')return plugin.start(context);},stop(){const module=this.__load();const plugin=module?.default??module;if(plugin&&typeof plugin.stop==='function')return plugin.stop();},getSettingsPanel(...args){const module=this.__load();const plugin=module?.default??module;const settingsPanel=plugin?.getSettingsPanel??module?.getSettingsPanel;if(typeof settingsPanel==='function')return settingsPanel.apply(plugin,args);return null;}})