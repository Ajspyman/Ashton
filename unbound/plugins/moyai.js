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
var ADDON_ID = 'unbound.moyai';
var SOUND_URL = 'https://raw.githubusercontent.com/MeguminSama/VencordPlugins/0814f506c4d7ca261644cc12eac996d4f2ee0155/plugins/moyai/moyai.mp3';
var SOUND_ID = 6969;
var DEFAULT_DURATION = 1000;
var MESSAGE_INTERVAL = 350;
var REACTION_DEBOUNCE = 500;
var MESSAGE_PATTERN = /🗿|<a?:.*?moy?ai.*?:\d+>/gi;
var REACTION_PATTERN = /moy?ai/i;
var STORE = window.unbound.storage.getStore(ADDON_ID);
var started = false;
var lifecycle = 0;
var playing = false;
var prepared = false;
var preparing = false;
var playSequence = 0;
var soundDuration = DEFAULT_DURATION;
var soundManager = null;
var dispatcher = null;
var selectedChannelStore = null;
var playbackTimeout = null;
var messageTimeouts = new Set();
var recentReactions = new Map();
function countMoyai(content) {
    var _ref;
    var _content_match;
    return typeof content === 'string' ? (_ref = (_content_match = content.match(MESSAGE_PATTERN)) === null || _content_match === void 0 ? void 0 : _content_match.length) !== null && _ref !== void 0 ? _ref : 0 : 0;
}
function isMoyaiReaction(name) {
    return typeof name === 'string' && (name === '🗿' || REACTION_PATTERN.test(name));
}
function eventChannelId(event) {
    var _event_channelId;
    var _event_message;
    var channelId = (_event_channelId = event.channelId) !== null && _event_channelId !== void 0 ? _event_channelId : event.channel_id;
    if (typeof channelId === 'string') return channelId;
    if ('message' in event && typeof ((_event_message = event.message) === null || _event_message === void 0 ? void 0 : _event_message.channel_id) === 'string') {
        return event.message.channel_id;
    }
    return null;
}
function inSelectedChannel(event) {
    var channelId = eventChannelId(event);
    return channelId !== null && channelId === (selectedChannelStore === null || selectedChannelStore === void 0 ? void 0 : selectedChannelStore.getChannelId());
}
function prepareSound() {
    if (!soundManager || prepared || preparing) return;
    preparing = true;
    var generation = lifecycle;
    try {
        soundManager.prepare(SOUND_URL, 'media', SOUND_ID, function(error, metadata) {
            if (!started || generation !== lifecycle) return;
            preparing = false;
            if (error) {
                console.error('Moyai sound preparation failed:', error);
                return;
            }
            var duration = metadata === null || metadata === void 0 ? void 0 : metadata.duration;
            soundDuration = typeof duration === 'number' && Number.isFinite(duration) && duration > 0 ? duration * 1000 : DEFAULT_DURATION;
            prepared = true;
        });
    } catch (error) {
        preparing = false;
        console.error('Moyai sound preparation failed:', error);
    }
}
function playSound() {
    return _async_to_generator(function() {
        var sequence, error;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    if (!started || !soundManager) return [
                        2
                    ];
                    if (!prepared) {
                        prepareSound();
                        return [
                            2
                        ];
                    }
                    sequence = ++playSequence;
                    if (playbackTimeout) clearTimeout(playbackTimeout);
                    playbackTimeout = null;
                    _state.label = 1;
                case 1:
                    _state.trys.push([
                        1,
                        3,
                        ,
                        4
                    ]);
                    if (playing) soundManager.stop(SOUND_ID);
                    playing = true;
                    return [
                        4,
                        soundManager.play(SOUND_ID)
                    ];
                case 2:
                    _state.sent();
                    if (!started || sequence !== playSequence) return [
                        2
                    ];
                    playbackTimeout = setTimeout(function() {
                        if (sequence !== playSequence) return;
                        playing = false;
                        playbackTimeout = null;
                        soundManager === null || soundManager === void 0 ? void 0 : soundManager.stop(SOUND_ID);
                    }, soundDuration);
                    return [
                        3,
                        4
                    ];
                case 3:
                    error = _state.sent();
                    if (sequence === playSequence) playing = false;
                    console.error('Moyai sound playback failed:', error);
                    return [
                        3,
                        4
                    ];
                case 4:
                    return [
                        2
                    ];
            }
        });
    })();
}
function onMessage(event) {
    var _loop = function(index) {
        var timeout = setTimeout(function() {
            messageTimeouts.delete(timeout);
            void playSound();
        }, index * MESSAGE_INTERVAL);
        messageTimeouts.add(timeout);
    };
    var _event_message, _event_message1;
    if (!inSelectedChannel(event) || ((_event_message = event.message) === null || _event_message === void 0 ? void 0 : _event_message.state)) return;
    var count = countMoyai((_event_message1 = event.message) === null || _event_message1 === void 0 ? void 0 : _event_message1.content);
    for(var index = 0; index < count; index++)_loop(index);
}
function onReaction(event) {
    var _event_messageId;
    var _event_emoji;
    if (!STORE.get('allowReactions', true) || !inSelectedChannel(event)) return;
    var name = (_event_emoji = event.emoji) === null || _event_emoji === void 0 ? void 0 : _event_emoji.name;
    if (!isMoyaiReaction(name)) return;
    var messageId = (_event_messageId = event.messageId) !== null && _event_messageId !== void 0 ? _event_messageId : event.message_id;
    var key = "".concat(String(messageId), ":").concat(name);
    if (recentReactions.has(key)) return;
    var timeout = setTimeout(function() {
        return recentReactions.delete(key);
    }, REACTION_DEBOUNCE);
    recentReactions.set(key, timeout);
    void playSound();
}
function start() {
    if (started) return;
    started = true;
    lifecycle++;
    var nativeModules = window.unbound.metro.common.ReactNative.NativeModules;
    var candidate = nativeModules.DCDSoundManager;
    if (candidate && typeof candidate.prepare === 'function' && typeof candidate.play === 'function' && typeof candidate.stop === 'function') {
        soundManager = candidate;
        prepareSound();
    } else {
        console.error('Moyai sound manager is unavailable.');
    }
    selectedChannelStore = window.unbound.metro.findByProps('getChannelId');
    dispatcher = window.unbound.metro.findByProps('dispatch', 'subscribe');
    dispatcher === null || dispatcher === void 0 ? void 0 : dispatcher.subscribe('MESSAGE_CREATE', onMessage);
    dispatcher === null || dispatcher === void 0 ? void 0 : dispatcher.subscribe('MESSAGE_REACTION_ADD', onReaction);
}
function stop() {
    var _dispatcher_unsubscribe, _dispatcher_unsubscribe1;
    if (!started) return;
    started = false;
    lifecycle++;
    playSequence++;
    dispatcher === null || dispatcher === void 0 ? void 0 : (_dispatcher_unsubscribe = dispatcher.unsubscribe) === null || _dispatcher_unsubscribe === void 0 ? void 0 : _dispatcher_unsubscribe.call(dispatcher, 'MESSAGE_CREATE', onMessage);
    dispatcher === null || dispatcher === void 0 ? void 0 : (_dispatcher_unsubscribe1 = dispatcher.unsubscribe) === null || _dispatcher_unsubscribe1 === void 0 ? void 0 : _dispatcher_unsubscribe1.call(dispatcher, 'MESSAGE_REACTION_ADD', onReaction);
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
    try {
        for(var _iterator = messageTimeouts[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
            var timeout = _step.value;
            clearTimeout(timeout);
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
        for(var _iterator1 = recentReactions.values()[Symbol.iterator](), _step1; !(_iteratorNormalCompletion1 = (_step1 = _iterator1.next()).done); _iteratorNormalCompletion1 = true){
            var timeout1 = _step1.value;
            clearTimeout(timeout1);
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
    if (playbackTimeout) clearTimeout(playbackTimeout);
    messageTimeouts.clear();
    recentReactions.clear();
    playbackTimeout = null;
    if (playing) soundManager === null || soundManager === void 0 ? void 0 : soundManager.stop(SOUND_ID);
    playing = false;
    preparing = false;
    soundManager = null;
    dispatcher = null;
    selectedChannelStore = null;
}
function MoyaiSettings() {
    var settings = STORE.useSettingsStore();
    return /*#__PURE__*/ React.createElement(SettingsScrollView, null, /*#__PURE__*/ React.createElement(SettingsSection, {
        title: "General"
    }, /*#__PURE__*/ React.createElement(SettingsSwitchRow, {
        label: "Play on reactions",
        description: "Play the sound when someone reacts with Moyai.",
        value: settings.get('allowReactions', true),
        onValueChange: function onValueChange(value) {
            return settings.set('allowReactions', value);
        }
    })));
}
var index = {
    start: start,
    stop: stop,
    getSettingsPanel: function getSettingsPanel() {
        return /*#__PURE__*/ React.createElement(MoyaiSettings, null);
    }
};
return {
  countMoyai: countMoyai,
  default: index,
  isMoyaiReaction: isMoyaiReaction
};
})();return this.__plugin;},start(context){const module=this.__load();const plugin=module?.default??module;if(plugin&&typeof plugin.start==='function')return plugin.start(context);},stop(){const module=this.__load();const plugin=module?.default??module;if(plugin&&typeof plugin.stop==='function')return plugin.stop();},getSettingsPanel(...args){const module=this.__load();const plugin=module?.default??module;const settingsPanel=plugin?.getSettingsPanel??module?.getSettingsPanel;if(typeof settingsPanel==='function')return settingsPanel.apply(plugin,args);return null;}})