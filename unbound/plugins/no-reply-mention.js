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
}function _array_like_to_array$1(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _array_without_holes(arr) {
    if (Array.isArray(arr)) return _array_like_to_array$1(arr);
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
    return _array_without_holes(arr) || _iterable_to_array(arr) || _unsupported_iterable_to_array$1(arr) || _non_iterable_spread();
}
function _unsupported_iterable_to_array$1(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _array_like_to_array$1(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _array_like_to_array$1(o, minLen);
}
function parseUserList(value) {
    if (typeof value !== 'string') return [];
    return _to_consumable_array(new Set(value.split(/[\s,]+/).map(function(entry) {
        return entry.trim();
    }).filter(Boolean)));
}
function isUserId(value) {
    return /^\d{15,25}$/.test(value.trim());
}
function serializeUserList(userIds) {
    return _to_consumable_array(new Set(userIds.map(function(id) {
        return id.trim();
    }).filter(Boolean))).join('\n');
}
function addUserId(value, userId) {
    return serializeUserList(_to_consumable_array(parseUserList(value)).concat([
        userId
    ]));
}
function editUserId(value, currentUserId, nextUserId) {
    return serializeUserList(parseUserList(value).map(function(id) {
        return id === currentUserId ? nextUserId : id;
    }));
}
function removeUserId(value, userId) {
    return serializeUserList(parseUserList(value).filter(function(id) {
        return id !== userId;
    }));
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
function _unsupported_iterable_to_array(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _array_like_to_array(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _array_like_to_array(o, minLen);
}
var ADDON_ID = 'unbound.no-reply-mention';
var STORE = window.unbound.storage.getStore(ADDON_ID);
var unpatch = null;
function shouldMention(authorId) {
    if (!authorId) return false;
    var listed = parseUserList().includes(authorId);
    return STORE.get('shouldPingListed', false) && listed;
}
function UserIdEditor(param) {
    var initialValue = param.initialValue, onCancel = param.onCancel, onSave = param.onSave;
    var ReactNative = window.unbound.metro.common.ReactNative;
    var colors = getSettingsColors();
    var _useState = _sliced_to_array(window.React.useState(initialValue), 2), value = _useState[0], setValue = _useState[1];
    return /*#__PURE__*/ React.createElement(SettingsCard, null, /*#__PURE__*/ React.createElement(ReactNative.View, {
        style: {
            gap: 12
        }
    }, /*#__PURE__*/ React.createElement(ReactNative.Text, {
        style: {
            color: colors.text,
            fontSize: 15,
            fontWeight: '700'
        }
    }, initialValue ? 'Edit user ID' : 'Add user ID'), /*#__PURE__*/ React.createElement(ReactNative.TextInput, {
        autoCapitalize: "none",
        autoCorrect: false,
        keyboardType: "number-pad",
        placeholder: "Discord user ID",
        placeholderTextColor: colors.muted,
        style: {
            backgroundColor: colors.input,
            borderColor: colors.border,
            borderRadius: 8,
            borderWidth: 1,
            color: colors.text,
            paddingHorizontal: 12,
            paddingVertical: 10
        },
        value: value,
        onChangeText: setValue
    }), /*#__PURE__*/ React.createElement(ReactNative.View, {
        style: {
            flexDirection: 'row',
            gap: 12
        }
    }, /*#__PURE__*/ React.createElement(ReactNative.Pressable, {
        onPress: onCancel,
        style: {
            alignItems: 'center',
            borderColor: colors.border,
            borderRadius: 10,
            borderWidth: 1,
            flex: 1,
            minHeight: 48,
            justifyContent: 'center',
            paddingHorizontal: 12
        }
    }, /*#__PURE__*/ React.createElement(ReactNative.Text, {
        style: {
            color: colors.text,
            fontWeight: '700'
        }
    }, "Cancel")), /*#__PURE__*/ React.createElement(ReactNative.Pressable, {
        onPress: function onPress() {
            return onSave(value);
        },
        style: {
            alignItems: 'center',
            backgroundColor: colors.accent,
            borderRadius: 10,
            flex: 1,
            minHeight: 48,
            justifyContent: 'center',
            paddingHorizontal: 12
        }
    }, /*#__PURE__*/ React.createElement(ReactNative.Text, {
        style: {
            color: '#fff',
            fontWeight: '700'
        }
    }, "Save")))));
}
function UserIdRow(param) {
    var userId = param.userId, onEdit = param.onEdit, onDelete = param.onDelete;
    var ReactNative = window.unbound.metro.common.ReactNative;
    var colors = getSettingsColors();
    return /*#__PURE__*/ React.createElement(SettingsCard, null, /*#__PURE__*/ React.createElement(ReactNative.View, {
        style: {
            alignItems: 'center',
            flexDirection: 'row',
            gap: 12,
            minHeight: 48
        }
    }, /*#__PURE__*/ React.createElement(ReactNative.Pressable, {
        onPress: onEdit,
        style: {
            flex: 1,
            paddingVertical: 4
        }
    }, /*#__PURE__*/ React.createElement(ReactNative.Text, {
        style: {
            color: colors.text,
            fontSize: 16,
            fontWeight: '700'
        }
    }, userId), /*#__PURE__*/ React.createElement(ReactNative.Text, {
        style: {
            color: colors.muted,
            fontSize: 14,
            lineHeight: 19,
            marginTop: 3
        }
    }, "Tap to edit")), /*#__PURE__*/ React.createElement(ReactNative.Pressable, {
        hitSlop: 8,
        onPress: onEdit,
        style: {
            minHeight: 48,
            justifyContent: 'center',
            paddingHorizontal: 8
        }
    }, /*#__PURE__*/ React.createElement(ReactNative.Text, {
        style: {
            color: colors.accent,
            fontWeight: '700'
        }
    }, "Edit")), /*#__PURE__*/ React.createElement(ReactNative.Pressable, {
        hitSlop: 8,
        onPress: onDelete,
        style: {
            minHeight: 48,
            justifyContent: 'center',
            paddingHorizontal: 8
        }
    }, /*#__PURE__*/ React.createElement(ReactNative.Text, {
        style: {
            color: colors.danger,
            fontWeight: '700'
        }
    }, "Delete"))));
}
function NoReplyMentionSettings() {
    var ReactNative = window.unbound.metro.common.ReactNative;
    var state = STORE.useSettingsStore();
    var _useState = _sliced_to_array(window.React.useState(null), 2), editor = _useState[0], setEditor = _useState[1];
    var pingListed = state.get('shouldPingListed', false);
    var userIds = parseUserList(state.get('userList', ''));
    var colors = getSettingsColors();
    function saveUserId(value) {
        var userId = value.trim();
        if (!isUserId(userId)) {
            window.unbound.toasts.showToast({
                title: 'No Reply Mention',
                content: 'Enter a numeric Discord user ID.'
            });
            return;
        }
        var current = state.get('userList', '');
        state.set('userList', (editor === null || editor === void 0 ? void 0 : editor.mode) === 'edit' && editor.original ? editUserId(current, editor.original, userId) : addUserId(current, userId));
        setEditor(null);
    }
    function deleteUserId(userId) {
        state.set('userList', removeUserId(state.get('userList', ''), userId));
    }
    return /*#__PURE__*/ React.createElement(SettingsScrollView, null, /*#__PURE__*/ React.createElement(SettingsSection, {
        title: "Exceptions"
    }, /*#__PURE__*/ React.createElement(SettingsRow, {
        label: "Add user ID",
        description: "Replies can mention these users when the exception is enabled",
        arrow: true,
        onPress: function onPress() {
            return setEditor({
                mode: 'add'
            });
        }
    }), (editor === null || editor === void 0 ? void 0 : editor.mode) === 'add' ? /*#__PURE__*/ React.createElement(UserIdEditor, {
        initialValue: "",
        onCancel: function onCancel() {
            return setEditor(null);
        },
        onSave: saveUserId
    }) : null, userIds.length ? /*#__PURE__*/ React.createElement(ReactNative.View, {
        style: {
            gap: 12
        }
    }, userIds.map(function(userId) {
        return /*#__PURE__*/ React.createElement(ReactNative.View, {
            key: userId
        }, (editor === null || editor === void 0 ? void 0 : editor.mode) === 'edit' && editor.original === userId ? /*#__PURE__*/ React.createElement(UserIdEditor, {
            initialValue: userId,
            onCancel: function onCancel() {
                return setEditor(null);
            },
            onSave: saveUserId
        }) : /*#__PURE__*/ React.createElement(UserIdRow, {
            userId: userId,
            onDelete: function onDelete() {
                return deleteUserId(userId);
            },
            onEdit: function onEdit() {
                return setEditor({
                    mode: 'edit',
                    original: userId
                });
            }
        }));
    })) : /*#__PURE__*/ React.createElement(SettingsCard, null, /*#__PURE__*/ React.createElement(ReactNative.Text, {
        style: {
            color: colors.muted,
            fontSize: 14,
            lineHeight: 19
        }
    }, "No users added yet.")), /*#__PURE__*/ React.createElement(SettingsSwitchRow, {
        label: "Only Ping Listed Users",
        description: pingListed ? 'Replies mention only the users listed above' : 'Replies do not mention anyone by default',
        value: pingListed,
        onValueChange: function onValueChange(value) {
            return state.set('shouldPingListed', value);
        }
    })));
}
var index = {
    start: function start() {
        var actions = window.unbound.metro.findByProps('createPendingReply');
        if (typeof (actions === null || actions === void 0 ? void 0 : actions.createPendingReply) !== 'function') return;
        unpatch = window.unbound.patcher.before(actions, 'createPendingReply', function(ctx) {
            var _reply_message_author, _reply_message;
            var reply = ctx.args[0];
            if (!reply) return;
            reply.shouldMention = shouldMention((_reply_message = reply.message) === null || _reply_message === void 0 ? void 0 : (_reply_message_author = _reply_message.author) === null || _reply_message_author === void 0 ? void 0 : _reply_message_author.id);
        });
    },
    stop: function stop() {
        unpatch === null || unpatch === void 0 ? void 0 : unpatch();
        unpatch = null;
    },
    getSettingsPanel: function getSettingsPanel() {
        return /*#__PURE__*/ React.createElement(NoReplyMentionSettings, null);
    }
};
return index;
})();return this.__plugin;},start(context){const module=this.__load();const plugin=module?.default??module;if(plugin&&typeof plugin.start==='function')return plugin.start(context);},stop(){const module=this.__load();const plugin=module?.default??module;if(plugin&&typeof plugin.stop==='function')return plugin.stop();},getSettingsPanel(...args){const module=this.__load();const plugin=module?.default??module;const settingsPanel=plugin?.getSettingsPanel??module?.getSettingsPanel;if(typeof settingsPanel==='function')return settingsPanel.apply(plugin,args);return null;}})