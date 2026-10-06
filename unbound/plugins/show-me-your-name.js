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
}var ADDON_ID = 'unbound.show-me-your-name';
var STORE = window.unbound.storage.getStore(ADDON_ID);
var unpatch = null;
var users = null;
var relationships = null;
function isAutomodMessage(message) {
    var type = message === null || message === void 0 ? void 0 : message.type;
    return (typeof type === 'number' ? type : Number(type)) === 24 || type === 'AUTOMOD_ACTION' || type === 'AUTO_MODERATION_ACTION' || (message === null || message === void 0 ? void 0 : message.isAutomod) === true || (message === null || message === void 0 ? void 0 : message.isAutoModAction) === true;
}
var MODES = [
    {
        key: 'nick-user',
        label: 'Display name then username',
        subLabel: 'Display Name (@username)'
    },
    {
        key: 'user-nick',
        label: 'Username then display name',
        subLabel: '@username (Display Name)'
    },
    {
        key: 'user',
        label: 'Username only',
        subLabel: '@username'
    }
];
function buildLabel(author, displayed) {
    var _author_username;
    var _relationships_getNickname;
    if (!author || typeof displayed !== 'string') return null;
    var mode = STORE.get('mode', 'nick-user');
    var useDisplayNames = STORE.get('displayNames', false);
    var username = (_author_username = author.username) !== null && _author_username !== void 0 ? _author_username : '';
    if (useDisplayNames && author.globalName) username = author.globalName;
    if (!username) return null;
    var prefix = displayed.startsWith('@') ? '@' : '';
    var friendNickname = STORE.get('friendNicknames', true) && author.id ? relationships === null || relationships === void 0 ? void 0 : (_relationships_getNickname = relationships.getNickname) === null || _relationships_getNickname === void 0 ? void 0 : _relationships_getNickname.call(relationships, author.id) : null;
    var nick = friendNickname !== null && friendNickname !== void 0 ? friendNickname : prefix ? displayed.slice(1) : displayed;
    var tag = "@".concat(username);
    if (username === nick) return displayed;
    if (mode === 'user') return tag;
    if (mode === 'user-nick') return "".concat(tag, " (").concat(nick, ")");
    return "".concat(prefix).concat(nick, " (").concat(tag, ")");
}
function rewriteUsername(rowMessage, author) {
    var _users_getUser;
    if (!rowMessage) return;
    var resolved = author !== null && author !== void 0 ? author : rowMessage.authorId ? users === null || users === void 0 ? void 0 : (_users_getUser = users.getUser) === null || _users_getUser === void 0 ? void 0 : _users_getUser.call(users, rowMessage.authorId) : undefined;
    var label = buildLabel(resolved, rowMessage.username);
    if (label != null) rowMessage.username = label;
}
function ReactNativeSettingsScreen() {
    var state = STORE.useSettingsStore();
    var mode = state.get('mode', 'nick-user');
    return /*#__PURE__*/ React.createElement(SettingsScrollView, null, /*#__PURE__*/ React.createElement(SettingsSection, {
        title: "Display Mode"
    }, MODES.map(function(param) {
        var key = param.key, label = param.label, subLabel = param.subLabel;
        return /*#__PURE__*/ React.createElement(SettingsRow, {
            key: key,
            label: label,
            description: subLabel,
            trailing: mode === key ? '✓' : null,
            onPress: function onPress() {
                return state.set('mode', key);
            }
        });
    })), /*#__PURE__*/ React.createElement(SettingsSection, {
        title: "Preferences"
    }, /*#__PURE__*/ React.createElement(SettingsSwitchRow, {
        label: "Show Friend Nicknames",
        description: "Prefer a friend's nickname wherever it applies",
        value: state.get('friendNicknames', true),
        onValueChange: function onValueChange(value) {
            return state.set('friendNicknames', value);
        }
    }), /*#__PURE__*/ React.createElement(SettingsSwitchRow, {
        label: "Use Global Names",
        description: "Show the account's global name instead of its username",
        value: state.get('displayNames', false),
        onValueChange: function onValueChange(value) {
            return state.set('displayNames', value);
        }
    }), /*#__PURE__*/ React.createElement(SettingsSwitchRow, {
        label: "Apply To Replies",
        description: "Also apply to reply previews",
        value: state.get('inReplies', false),
        onValueChange: function onValueChange(value) {
            return state.set('inReplies', value);
        }
    })));
}
var index = {
    start: function start() {
        var target = window.unbound.metro.findByProps('generateMessageRowData');
        if (typeof (target === null || target === void 0 ? void 0 : target.generateMessageRowData) !== 'function') return;
        users = window.unbound.metro.findByProps('getCurrentUser', 'getUser');
        relationships = window.unbound.metro.findStore('RelationshipStore', {
            short: false
        });
        unpatch = window.unbound.patcher.after(target, 'generateMessageRowData', function(ctx) {
            try {
                var _ref;
                var _ctx_result, _ctx_args_, _message_referencedMessage;
                var row = (_ctx_result = ctx.result) === null || _ctx_result === void 0 ? void 0 : _ctx_result.message;
                if (!row) return;
                var message = (_ctx_args_ = ctx.args[0]) === null || _ctx_args_ === void 0 ? void 0 : _ctx_args_.message;
                if (isAutomodMessage(message)) return;
                rewriteUsername(row, message === null || message === void 0 ? void 0 : message.author);
                var referencedMessage = (_ref = message === null || message === void 0 ? void 0 : (_message_referencedMessage = message.referencedMessage) === null || _message_referencedMessage === void 0 ? void 0 : _message_referencedMessage.message) !== null && _ref !== void 0 ? _ref : message === null || message === void 0 ? void 0 : message.referenced_message;
                if (STORE.get('inReplies', false) && !isAutomodMessage(referencedMessage)) {
                    var _row_referencedMessage;
                    rewriteUsername((_row_referencedMessage = row.referencedMessage) === null || _row_referencedMessage === void 0 ? void 0 : _row_referencedMessage.message, referencedMessage === null || referencedMessage === void 0 ? void 0 : referencedMessage.author);
                }
            } catch (unused) {}
        });
    },
    stop: function stop() {
        unpatch === null || unpatch === void 0 ? void 0 : unpatch();
        unpatch = null;
        users = null;
        relationships = null;
    },
    getSettingsPanel: function getSettingsPanel() {
        return /*#__PURE__*/ React.createElement(ReactNativeSettingsScreen, null);
    }
};
return index;
})();return this.__plugin;},start(context){const module=this.__load();const plugin=module?.default??module;if(plugin&&typeof plugin.start==='function')return plugin.start(context);},stop(){const module=this.__load();const plugin=module?.default??module;if(plugin&&typeof plugin.stop==='function')return plugin.stop();},getSettingsPanel(...args){const module=this.__load();const plugin=module?.default??module;const settingsPanel=plugin?.getSettingsPanel??module?.getSettingsPanel;if(typeof settingsPanel==='function')return settingsPanel.apply(plugin,args);return null;}})