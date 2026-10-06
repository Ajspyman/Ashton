({__plugin:null,__load(){if(this.__plugin)return this.__plugin;this.__plugin=(function () {
'use strict';
function _array_like_to_array(arr, len) {
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
var PATCHER = window.unbound.patcher.createPatcher('unbound.view-raw');
var ROW_KEY = 'unbound-view-raw';
var SHEET_PREFIX = 'unbound-view-raw-';
var patchedInstances = new WeakSet();
var patchedComponents = new WeakSet();
var unpatches = [];
var currentItem = null;
var currentSheetKey = null;
var currentProfileUserId = null;
var contextMenuPatched = false;
var contextMenuTimer = null;
var lifecycle = 0;
function typeName(element) {
    var _ref;
    var _element_type, _element_type1;
    if (typeof (element === null || element === void 0 ? void 0 : element.type) === 'string') return element.type;
    return (_ref = element === null || element === void 0 ? void 0 : (_element_type = element.type) === null || _element_type === void 0 ? void 0 : _element_type.displayName) !== null && _ref !== void 0 ? _ref : element === null || element === void 0 ? void 0 : (_element_type1 = element.type) === null || _element_type1 === void 0 ? void 0 : _element_type1.name;
}
function findElement(node, predicate) {
    var depth = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0;
    var _element_props;
    if (depth > 15 || !node || (typeof node === "undefined" ? "undefined" : _type_of(node)) !== 'object') return null;
    if (Array.isArray(node)) {
        var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
        try {
            for(var _iterator = node[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                var child = _step.value;
                var match = findElement(child, predicate, depth + 1);
                if (match) return match;
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
        return null;
    }
    var element = node;
    if (predicate(element)) return element;
    return findElement(element === null || element === void 0 ? void 0 : (_element_props = element.props) === null || _element_props === void 0 ? void 0 : _element_props.children, predicate, depth + 1);
}
function sortObject(value) {
    if (Array.isArray(value)) return value.map(sortObject);
    if (!value || (typeof value === "undefined" ? "undefined" : _type_of(value)) !== 'object') return value;
    return Object.fromEntries(Object.entries(value).sort(function(param, param1) {
        var _param = _sliced_to_array(param, 1), left = _param[0], _param1 = _sliced_to_array(param1, 1), right = _param1[0];
        return left.localeCompare(right);
    }).map(function(param) {
        var _param = _sliced_to_array(param, 2), key = _param[0], item = _param[1];
        return [
            key,
            sortObject(item)
        ];
    }));
}
function cleanMessage(message) {
    var _clone_attachments;
    var clone = JSON.parse(JSON.stringify(message));
    var author = clone.author;
    if (author) {
        delete author.email;
        delete author.phone;
        delete author.mfaEnabled;
        delete author.personalConnectionId;
    }
    delete clone.editHistory;
    delete clone.deleted;
    delete clone.firstEditTimestamp;
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
    try {
        for(var _iterator = ((_clone_attachments = clone.attachments) !== null && _clone_attachments !== void 0 ? _clone_attachments : [])[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
            var attachment = _step.value;
            delete attachment.deleted;
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
    return sortObject(clone);
}
function isRecord(value) {
    return Boolean(value) && (typeof value === "undefined" ? "undefined" : _type_of(value)) === 'object' && !Array.isArray(value);
}
function supportsRawSheet(key) {
    return /MessageLongPressActionSheet$/i.test(key) || /^UserProfile/i.test(key) || /^GuildActionSheet:/i.test(key) || /Channel(?:LongPress)?ActionSheet/i.test(key);
}
function getRawItem(key, props) {
    var _ref;
    var _channels_getChannel, _users_getUser, _profiles_getGuildMemberProfile, _profiles_getUserProfile;
    if (!supportsRawSheet(key)) return null;
    if (isRecord(props.message)) {
        var message = props.message;
        return {
            content: typeof message.content === 'string' ? message.content : '',
            data: cleanMessage(message),
            type: 'Message'
        };
    }
    if (isRecord(props.profile)) return {
        data: sortObject(props.profile),
        type: 'Profile'
    };
    if (isRecord(props.channel)) return {
        data: sortObject(props.channel),
        type: 'Channel'
    };
    if (isRecord(props.guild)) return {
        data: sortObject(props.guild),
        type: 'Guild'
    };
    var channelId = typeof props.channelId === 'string' ? props.channelId : undefined;
    var channels = window.unbound.metro.findStore('Channel');
    var channel = channelId ? channels === null || channels === void 0 ? void 0 : (_channels_getChannel = channels.getChannel) === null || _channels_getChannel === void 0 ? void 0 : _channels_getChannel.call(channels, channelId) : undefined;
    if (channel) return {
        data: sortObject(channel),
        type: 'Channel'
    };
    var guildId = typeof props.guildId === 'string' ? props.guildId : undefined;
    var users = window.unbound.metro.findStore('User');
    var userId = typeof props.userId === 'string' ? props.userId : isRecord(props.user) && typeof props.user.id === 'string' ? props.user.id : undefined;
    var user = isRecord(props.user) ? props.user : userId ? users === null || users === void 0 ? void 0 : (_users_getUser = users.getUser) === null || _users_getUser === void 0 ? void 0 : _users_getUser.call(users, userId) : undefined;
    if (!user) return null;
    if (!/profile/i.test(key)) return {
        data: sortObject(user),
        type: 'User'
    };
    var profiles = window.unbound.metro.findStore('UserProfile');
    var profile = userId ? (_ref = profiles === null || profiles === void 0 ? void 0 : (_profiles_getGuildMemberProfile = profiles.getGuildMemberProfile) === null || _profiles_getGuildMemberProfile === void 0 ? void 0 : _profiles_getGuildMemberProfile.call(profiles, userId, guildId)) !== null && _ref !== void 0 ? _ref : profiles === null || profiles === void 0 ? void 0 : (_profiles_getUserProfile = profiles.getUserProfile) === null || _profiles_getUserProfile === void 0 ? void 0 : _profiles_getUserProfile.call(profiles, userId) : undefined;
    return profile ? {
        data: sortObject(profile),
        type: 'Profile'
    } : {
        data: sortObject(user),
        type: 'User'
    };
}
function copy(value, label) {
    var clipboard = window.unbound.metro.common.Clipboard;
    if (typeof (clipboard === null || clipboard === void 0 ? void 0 : clipboard.setString) !== 'function') {
        window.unbound.toasts.showToast({
            title: 'View Raw',
            content: 'Clipboard access is unavailable.'
        });
        return;
    }
    void Promise.resolve(clipboard.setString(value)).then(function() {
        return window.unbound.toasts.showToast({
            title: 'View Raw',
            content: "".concat(label, " copied to clipboard.")
        });
    });
}
function RawIcon() {
    var SVG = window.unbound.metro.common.SVG;
    return /*#__PURE__*/ React.createElement(SVG.Svg, {
        width: 20,
        height: 20,
        viewBox: "0 0 20 20"
    }, /*#__PURE__*/ React.createElement(SVG.Path, {
        fill: "#f2f3f5",
        d: "M12.9297 3.25007C12.7343 3.05261 12.4154 3.05226 12.2196 3.24928L11.5746 3.89824C11.3811 4.09297 11.3808 4.40733 11.5739 4.60245L16.5685 9.64824C16.7614 9.84309 16.7614 10.1569 16.5685 10.3517L11.5739 15.3975C11.3808 15.5927 11.3811 15.907 11.5746 16.1017L12.2196 16.7507C12.4154 16.9477 12.7343 16.9474 12.9297 16.7499L19.2604 10.3517C19.4532 10.1568 19.4532 9.84314 19.2604 9.64832L12.9297 3.25007Z"
    }), /*#__PURE__*/ React.createElement(SVG.Path, {
        fill: "#f2f3f5",
        d: "M8.42616 4.60245C8.6193 4.40733 8.61898 4.09297 8.42545 3.89824L7.78047 3.24928C7.58466 3.05226 7.26578 3.05261 7.07041 3.25007L0.739669 9.64832C0.5469 9.84314 0.546901 10.1568 0.739669 10.3517L7.07041 16.7499C7.26578 16.9474 7.58465 16.9477 7.78047 16.7507L8.42545 16.1017C8.61898 15.907 8.6193 15.5927 8.42616 15.3975L3.43155 10.3517C3.23869 10.1569 3.23869 9.84309 3.43155 9.64824L8.42616 4.60245Z"
    }));
}
function RawSheet(param) {
    var content = param.content, json = param.json, onClose = param.onClose, type = param.type;
    var ReactNative = window.unbound.metro.common.ReactNative;
    var Discord = window.unbound.metro.findByProps('ActionSheet', 'Button', 'Text');
    if (!(Discord === null || Discord === void 0 ? void 0 : Discord.ActionSheet) || !(Discord === null || Discord === void 0 ? void 0 : Discord.Button) || !(Discord === null || Discord === void 0 ? void 0 : Discord.Text)) return /*#__PURE__*/ React.createElement(ReactNative.View, null);
    var action = function action(label, onPress) {
        return /*#__PURE__*/ React.createElement(ReactNative.Pressable, {
            onPress: onPress,
            style: function style(param) {
                var pressed = param.pressed;
                return {
                    alignItems: 'center',
                    backgroundColor: pressed ? '#4752c4' : '#5865f2',
                    borderRadius: 9,
                    flex: 1,
                    justifyContent: 'center',
                    minHeight: 34,
                    paddingHorizontal: 6
                };
            }
        }, /*#__PURE__*/ React.createElement(ReactNative.Text, {
            numberOfLines: 1,
            style: {
                color: '#f2f3f5',
                fontSize: 12,
                fontWeight: '700'
            }
        }, label));
    };
    return /*#__PURE__*/ React.createElement(Discord.ActionSheet, {
        startExpanded: true
    }, /*#__PURE__*/ React.createElement(ReactNative.View, {
        style: {
            maxHeight: '85%',
            paddingHorizontal: 16,
            paddingTop: 10,
            paddingBottom: 18
        }
    }, /*#__PURE__*/ React.createElement(Discord.Text, {
        variant: "text-lg/semibold"
    }, "Raw ".concat(type, " Data")), content ? /*#__PURE__*/ React.createElement(Discord.Text, {
        style: {
            marginTop: 16
        },
        variant: "text-sm/semibold"
    }, "Message Content") : null, content ? /*#__PURE__*/ React.createElement(ReactNative.TextInput, {
        multiline: true,
        scrollEnabled: true,
        selectTextOnFocus: true,
        showSoftInputOnFocus: false,
        style: {
            backgroundColor: '#1e1f22',
            borderRadius: 8,
            color: '#dbdee1',
            fontFamily: 'Menlo',
            fontSize: 13,
            height: 96,
            marginTop: 6,
            padding: 12,
            textAlignVertical: 'top'
        },
        value: content
    }) : null, content ? /*#__PURE__*/ React.createElement(Discord.Text, {
        style: {
            marginTop: 16
        },
        variant: "text-sm/semibold"
    }, "Message Data") : null, /*#__PURE__*/ React.createElement(ReactNative.TextInput, {
        multiline: true,
        scrollEnabled: true,
        selectTextOnFocus: true,
        showSoftInputOnFocus: false,
        style: {
            backgroundColor: '#1e1f22',
            borderRadius: 8,
            color: '#dbdee1',
            fontFamily: 'Menlo',
            fontSize: 12,
            marginTop: content ? 6 : 16,
            maxHeight: 480,
            padding: 12,
            textAlignVertical: 'top'
        },
        value: json
    }), /*#__PURE__*/ React.createElement(ReactNative.View, {
        style: {
            flexDirection: 'row',
            gap: 6,
            marginTop: 16
        }
    }, action('Copy data', function() {
        return copy(json, "".concat(type, " data"));
    }), content ? action('Copy content', function() {
        return copy(content, 'Raw content');
    }) : null, action('Close', onClose))));
}
function openRawSheet(item) {
    var sheets = window.unbound.metro.findByProps('openLazy', 'hideActionSheet');
    if (!(sheets === null || sheets === void 0 ? void 0 : sheets.openLazy)) return;
    var key = "".concat(SHEET_PREFIX).concat(Date.now());
    var json = JSON.stringify(item.data, null, 4);
    sheets.openLazy(Promise.resolve({
        default: function _default() {
            var _item_content;
            return /*#__PURE__*/ React.createElement(RawSheet, {
                content: (_item_content = item.content) !== null && _item_content !== void 0 ? _item_content : '',
                json: json,
                onClose: function onClose() {
                    var _sheets_hideActionSheet;
                    return (_sheets_hideActionSheet = sheets.hideActionSheet) === null || _sheets_hideActionSheet === void 0 ? void 0 : _sheets_hideActionSheet.call(sheets, key);
                },
                type: item.type
            });
        }
    }), key, {
        onClose: function onClose() {
            var _sheets_hideActionSheet;
            return (_sheets_hideActionSheet = sheets.hideActionSheet) === null || _sheets_hideActionSheet === void 0 ? void 0 : _sheets_hideActionSheet.call(sheets, key);
        }
    }, {
        initialSnapIndex: 1
    });
}
function addMessageRow(result, sheets, ActionSheetRow) {
    var _group_props;
    var item = currentItem;
    var key = currentSheetKey;
    if (!item || !key) return result;
    var group = findElement(result, function(element) {
        return typeName(element) === 'ActionSheetRowGroup';
    });
    var rows = group === null || group === void 0 ? void 0 : (_group_props = group.props) === null || _group_props === void 0 ? void 0 : _group_props.children;
    if (!(group === null || group === void 0 ? void 0 : group.props) || !Array.isArray(rows) || rows.some(function(row) {
        return (row === null || row === void 0 ? void 0 : row.key) === ROW_KEY;
    })) return result;
    var row = window.unbound.metro.common.React.createElement(ActionSheetRow, {
        key: ROW_KEY,
        label: 'View Raw',
        icon: /*#__PURE__*/ React.createElement(RawIcon, null),
        onPress: function onPress() {
            var _sheets_hideActionSheet;
            (_sheets_hideActionSheet = sheets.hideActionSheet) === null || _sheets_hideActionSheet === void 0 ? void 0 : _sheets_hideActionSheet.call(sheets, key);
            openRawSheet(item);
        }
    });
    rows.splice(1, 0, row);
    return result;
}
function addContextMenuItem(menu, item, close) {
    var showIcon = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : true;
    if (!Array.isArray(menu.items) || menu.items.some(function(entry) {
        return entry.label === 'View Raw';
    })) return;
    var entry = {
        label: 'View Raw',
        action: function action() {
            close();
            openRawSheet(item);
        }
    };
    if (showIcon) entry.IconComponent = RawIcon;
    menu.items.push(entry);
}
function patchSheetComponent(result, sheets, ActionSheetRow) {
    var depth = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 0, activeLifecycle = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : lifecycle;
    var _ref;
    var patchedResult = addMessageRow(result, sheets, ActionSheetRow);
    if (activeLifecycle !== lifecycle) return patchedResult;
    if (depth >= 15 || !isRecord(patchedResult)) return patchedResult;
    var directHolder = typeof patchedResult.type === 'function' ? {
        holder: patchedResult,
        method: 'type'
    } : null;
    var wrappedType = isRecord(patchedResult.type) ? patchedResult.type : null;
    var wrappedHolder = typeof (wrappedType === null || wrappedType === void 0 ? void 0 : wrappedType.type) === 'function' ? {
        holder: wrappedType,
        method: 'type'
    } : null;
    var renderHolder = typeof (wrappedType === null || wrappedType === void 0 ? void 0 : wrappedType.render) === 'function' ? {
        holder: wrappedType,
        method: 'render'
    } : null;
    var target = (_ref = directHolder !== null && directHolder !== void 0 ? directHolder : wrappedHolder) !== null && _ref !== void 0 ? _ref : renderHolder;
    if (!target || patchedComponents.has(target.holder)) return patchedResult;
    patchedComponents.add(target.holder);
    unpatches.push(PATCHER.after(target.holder, target.method, function(ctx) {
        if (activeLifecycle !== lifecycle) return ctx.result;
        return patchSheetComponent(ctx.result, sheets, ActionSheetRow, depth + 1, activeLifecycle);
    }));
    return patchedResult;
}
function patchContextMenus() {
    if (contextMenuPatched) return true;
    var contextMenus = window.unbound.metro.findByProps('showContextMenu', 'hideContextMenu');
    if (!(contextMenus === null || contextMenus === void 0 ? void 0 : contextMenus.showContextMenu)) return false;
    unpatches.push(PATCHER.before(contextMenus, 'showContextMenu', function(ctx) {
        var _guilds_getGuild, _menu_items;
        var menu = ctx.args[0];
        if (!menu) return;
        var guilds = window.unbound.metro.findByProps('getGuild');
        var guild = typeof menu.key === 'string' ? guilds === null || guilds === void 0 ? void 0 : (_guilds_getGuild = guilds.getGuild) === null || _guilds_getGuild === void 0 ? void 0 : _guilds_getGuild.call(guilds, menu.key) : undefined;
        if (guild) {
            addContextMenuItem(menu, {
                data: sortObject(guild),
                type: 'Guild'
            }, function() {
                var _contextMenus_hideContextMenu;
                return (_contextMenus_hideContextMenu = contextMenus.hideContextMenu) === null || _contextMenus_hideContextMenu === void 0 ? void 0 : _contextMenus_hideContextMenu.call(contextMenus);
            });
            return;
        }
        if (!((_menu_items = menu.items) === null || _menu_items === void 0 ? void 0 : _menu_items.some(function(item) {
            return item.label === 'View Main Profile';
        })) || !currentProfileUserId) return;
        var profile = getRawItem("UserProfile".concat(currentProfileUserId), {
            userId: currentProfileUserId
        });
        if (profile) addContextMenuItem(menu, profile, function() {
            var _contextMenus_hideContextMenu;
            return (_contextMenus_hideContextMenu = contextMenus.hideContextMenu) === null || _contextMenus_hideContextMenu === void 0 ? void 0 : _contextMenus_hideContextMenu.call(contextMenus);
        }, false);
    }));
    contextMenuPatched = true;
    return true;
}
function start() {
    var _metro_findByProps;
    var activeLifecycle = ++lifecycle;
    var sheets = window.unbound.metro.findByProps('openLazy', 'hideActionSheet');
    var ActionSheetRow = (_metro_findByProps = window.unbound.metro.findByProps('ActionSheetRow')) === null || _metro_findByProps === void 0 ? void 0 : _metro_findByProps.ActionSheetRow;
    if (!(sheets === null || sheets === void 0 ? void 0 : sheets.openLazy) || !ActionSheetRow) return;
    if (!patchContextMenus()) contextMenuTimer = setInterval(function() {
        if (activeLifecycle !== lifecycle) return;
        if (!patchContextMenus() || !contextMenuTimer) return;
        clearInterval(contextMenuTimer);
        contextMenuTimer = null;
    }, 1000);
    unpatches.push(PATCHER.before(sheets, 'openLazy', function(ctx) {
        var _ctx_args = _sliced_to_array(ctx.args, 3), componentPromise = _ctx_args[0], key = _ctx_args[1], props = _ctx_args[2];
        if (typeof key !== 'string' || !(componentPromise === null || componentPromise === void 0 ? void 0 : componentPromise.then) || !props) return;
        if (key.startsWith('UserProfile') && typeof props.userId === 'string') currentProfileUserId = props.userId;
        currentItem = null;
        currentSheetKey = null;
        var item = getRawItem(key, props);
        if (!item) return;
        currentItem = item;
        currentSheetKey = key;
        componentPromise.then(function(instance) {
            if (activeLifecycle !== lifecycle) return;
            if (!instance || patchedInstances.has(instance)) return;
            patchedInstances.add(instance);
            unpatches.push(PATCHER.after(instance, 'default', function(param) {
                var result = param.result;
                return patchSheetComponent(result, sheets, ActionSheetRow, 0, activeLifecycle);
            }));
        }).catch(function() {
            return undefined;
        });
    }));
}
var index = {
    start: start,
    stop: function stop() {
        lifecycle++;
        var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
        try {
            for(var _iterator = unpatches.splice(0)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                var unpatch = _step.value;
                try {
                    unpatch();
                } catch (unused) {}
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
        if (contextMenuTimer) clearInterval(contextMenuTimer);
        currentItem = null;
        currentSheetKey = null;
        currentProfileUserId = null;
        contextMenuPatched = false;
        contextMenuTimer = null;
        patchedInstances = new WeakSet();
        patchedComponents = new WeakSet();
    }
};
return index;
})();return this.__plugin;},start(context){const module=this.__load();const plugin=module?.default??module;if(plugin&&typeof plugin.start==='function')return plugin.start(context);},stop(){const module=this.__load();const plugin=module?.default??module;if(plugin&&typeof plugin.stop==='function')return plugin.stop();}})