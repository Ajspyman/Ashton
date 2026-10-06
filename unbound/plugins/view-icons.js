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
var PATCHER = window.unbound.patcher.createPatcher('unbound.view-icons');
var DEFAULT_AVATAR_SIZE = 512;
var DEFAULT_BANNER_WIDTH = 1024;
var DEFAULT_BANNER_HEIGHT = 256;
var IMAGE_SIZE = 4096;
var profileUserId = null;
var profileGuildId = null;
var actionSheetGuild = null;
var contextMenuTimer = null;
var contextMenuPatched = false;
var profileSheetPatched = false;
var patchedSheetInstances = new WeakSet();
var patchedSheetComponents = new WeakSet();
var patchedSheetElements = new WeakSet();
function getUrlBuilder() {
    return window.unbound.metro.findByProps('getUserAvatarURL', 'getGuildIconURL');
}
function getStore(name) {
    return window.unbound.metro.findStore(name);
}
function makeTarget(label, url, width, height) {
    return url ? {
        label: label,
        url: url,
        width: width,
        height: height
    } : null;
}
function getUserTargets(userId, guildId) {
    var _ref;
    var _users_getUser, _profiles_getGuildMemberProfile, _profiles_getUserProfile, _profiles_getUserProfile1, _builder_getUserAvatarURL, _builder_getUserBannerURL, _members_getMember, _members_getMember1, _builder_getGuildMemberAvatarURLSimple;
    var users = getStore('User');
    var members = getStore('GuildMember');
    var user = users === null || users === void 0 ? void 0 : (_users_getUser = users.getUser) === null || _users_getUser === void 0 ? void 0 : _users_getUser.call(users, userId);
    var profiles = getStore('UserProfile');
    var builder = getUrlBuilder();
    if (!user || !builder) return [];
    var profile = guildId ? (_ref = profiles === null || profiles === void 0 ? void 0 : (_profiles_getGuildMemberProfile = profiles.getGuildMemberProfile) === null || _profiles_getGuildMemberProfile === void 0 ? void 0 : _profiles_getGuildMemberProfile.call(profiles, userId, guildId)) !== null && _ref !== void 0 ? _ref : profiles === null || profiles === void 0 ? void 0 : (_profiles_getUserProfile = profiles.getUserProfile) === null || _profiles_getUserProfile === void 0 ? void 0 : _profiles_getUserProfile.call(profiles, userId) : profiles === null || profiles === void 0 ? void 0 : (_profiles_getUserProfile1 = profiles.getUserProfile) === null || _profiles_getUserProfile1 === void 0 ? void 0 : _profiles_getUserProfile1.call(profiles, userId);
    var targetUser = profile ? _object_spread({}, user, profile) : user;
    var targets = [];
    var avatar = (_builder_getUserAvatarURL = builder.getUserAvatarURL) === null || _builder_getUserAvatarURL === void 0 ? void 0 : _builder_getUserAvatarURL.call(builder, targetUser, true);
    var banner = (_builder_getUserBannerURL = builder.getUserBannerURL) === null || _builder_getUserBannerURL === void 0 ? void 0 : _builder_getUserBannerURL.call(builder, targetUser, true);
    var memberAvatar = guildId ? members === null || members === void 0 ? void 0 : (_members_getMember1 = members.getMember) === null || _members_getMember1 === void 0 ? void 0 : (_members_getMember = _members_getMember1.call(members, guildId, userId)) === null || _members_getMember === void 0 ? void 0 : _members_getMember.avatar : null;
    var serverAvatar = guildId && memberAvatar ? (_builder_getGuildMemberAvatarURLSimple = builder.getGuildMemberAvatarURLSimple) === null || _builder_getGuildMemberAvatarURLSimple === void 0 ? void 0 : _builder_getGuildMemberAvatarURLSimple.call(builder, {
        userId: userId,
        avatar: memberAvatar,
        guildId: guildId,
        canAnimate: true
    }) : null;
    var userAvatarTarget = makeTarget('Avatar', avatar, DEFAULT_AVATAR_SIZE, DEFAULT_AVATAR_SIZE);
    var userBannerTarget = makeTarget('Banner', banner, DEFAULT_BANNER_WIDTH, DEFAULT_BANNER_HEIGHT);
    var serverAvatarTarget = makeTarget('Server Avatar', serverAvatar, DEFAULT_AVATAR_SIZE, DEFAULT_AVATAR_SIZE);
    if (userAvatarTarget) targets.push(userAvatarTarget);
    if (userBannerTarget) targets.push(userBannerTarget);
    if (serverAvatarTarget) targets.push(serverAvatarTarget);
    return targets;
}
function getGuildTargets(guild) {
    var _builder_getGuildIconURL, _builder_getGuildBannerURL;
    var builder = getUrlBuilder();
    if (!builder) return [];
    var icon = guild.icon ? (_builder_getGuildIconURL = builder.getGuildIconURL) === null || _builder_getGuildIconURL === void 0 ? void 0 : _builder_getGuildIconURL.call(builder, {
        id: guild.id,
        icon: guild.icon,
        canAnimate: true
    }) : null;
    var banner = guild.banner ? (_builder_getGuildBannerURL = builder.getGuildBannerURL) === null || _builder_getGuildBannerURL === void 0 ? void 0 : _builder_getGuildBannerURL.call(builder, guild, true) : null;
    var targets = [];
    var iconTarget = makeTarget('Server Icon', icon, DEFAULT_AVATAR_SIZE, DEFAULT_AVATAR_SIZE);
    var bannerTarget = makeTarget('Server Banner', banner, DEFAULT_BANNER_WIDTH, DEFAULT_BANNER_HEIGHT);
    if (iconTarget) targets.push(iconTarget);
    if (bannerTarget) targets.push(bannerTarget);
    return targets;
}
function getChannelTargets(channel) {
    var _builder_getChannelIconURL;
    var builder = getUrlBuilder();
    var icon = channel.icon && (builder === null || builder === void 0 ? void 0 : (_builder_getChannelIconURL = builder.getChannelIconURL) === null || _builder_getChannelIconURL === void 0 ? void 0 : _builder_getChannelIconURL.call(builder, channel));
    var target = makeTarget('Group DM Icon', icon, DEFAULT_AVATAR_SIZE, DEFAULT_AVATAR_SIZE);
    return target ? [
        target
    ] : [];
}
function normalizeImageUrl(source, size) {
    if (source.startsWith('data:')) return source;
    var url = new URL(source, 'https://discord.com');
    var animated = url.searchParams.get('animated') === 'true' || /\/a_[^/]+\.(?:png|jpe?g|webp|gif)$/i.test(url.pathname);
    var format = animated ? 'gif' : 'webp';
    url.searchParams.set('size', String(size));
    url.pathname = url.pathname.replace(/\.(?:png|jpe?g|webp|gif)$/i, ".".concat(format));
    return url.toString();
}
function showMessage(content) {
    window.unbound.toasts.showToast({
        title: 'View Icons',
        content: content
    });
}
function ViewIcon() {
    var SVG = window.unbound.metro.common.SVG;
    return /*#__PURE__*/ React.createElement(SVG.Svg, {
        width: 20,
        height: 20,
        viewBox: "0 0 24 24"
    }, /*#__PURE__*/ React.createElement(SVG.Path, {
        fill: "#f2f3f5",
        d: "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2Zm0 16H5V5h14v14ZM8.5 13.5 11 16.51 14.5 12 19 18H5l3.5-4.5ZM8 10.5A1.5 1.5 0 1 0 8 7.5a1.5 1.5 0 0 0 0 3Z"
    }));
}
function openImage(target) {
    var media = window.unbound.metro.findByProps('openMediaModal');
    if (typeof (media === null || media === void 0 ? void 0 : media.openMediaModal) !== 'function') {
        showMessage('The image viewer is unavailable.');
        return;
    }
    var uri = normalizeImageUrl(target.url, IMAGE_SIZE);
    var open = function open(width, height) {
        try {
            var _media_openMediaModal;
            (_media_openMediaModal = media.openMediaModal) === null || _media_openMediaModal === void 0 ? void 0 : _media_openMediaModal.call(media, {
                initialIndex: 0,
                initialSources: [
                    {
                        uri: uri,
                        sourceURI: uri,
                        width: width,
                        height: height
                    }
                ]
            });
        } catch (unused) {
            showMessage("Unable to open ".concat(target.label.toLowerCase(), "."));
        }
    };
    var image = window.unbound.metro.common.ReactNative.Image;
    if (typeof (image === null || image === void 0 ? void 0 : image.getSize) !== 'function') {
        open(target.width, target.height);
        return;
    }
    try {
        image.getSize(uri, open, function() {
            return open(target.width, target.height);
        });
    } catch (unused) {
        open(target.width, target.height);
    }
}
function addTargetActions(menu, target, hide) {
    if (!Array.isArray(menu.items)) return;
    var viewLabel = "View ".concat(target.label);
    if (!menu.items.some(function(item) {
        return item.label === viewLabel;
    })) {
        menu.items.push({
            label: viewLabel,
            IconComponent: ViewIcon,
            action: function action() {
                hide();
                openImage(target);
            }
        });
    }
}
function stringValue(value) {
    return typeof value === 'string' && value ? value : undefined;
}
function typeName(element) {
    var _type_displayName, _ref, _ref1, _ref2, _ref3, _ref4;
    var _type_render, _type_render1, _type_type, _type_type1;
    if (typeof (element === null || element === void 0 ? void 0 : element.type) === 'string') return element.type;
    var type = element === null || element === void 0 ? void 0 : element.type;
    if (typeof type === 'function') return (_type_displayName = type.displayName) !== null && _type_displayName !== void 0 ? _type_displayName : type.name;
    return (_ref = (_ref1 = (_ref2 = (_ref3 = (_ref4 = type === null || type === void 0 ? void 0 : type.displayName) !== null && _ref4 !== void 0 ? _ref4 : type === null || type === void 0 ? void 0 : type.name) !== null && _ref3 !== void 0 ? _ref3 : type === null || type === void 0 ? void 0 : (_type_render = type.render) === null || _type_render === void 0 ? void 0 : _type_render.displayName) !== null && _ref2 !== void 0 ? _ref2 : type === null || type === void 0 ? void 0 : (_type_render1 = type.render) === null || _type_render1 === void 0 ? void 0 : _type_render1.name) !== null && _ref1 !== void 0 ? _ref1 : type === null || type === void 0 ? void 0 : (_type_type = type.type) === null || _type_type === void 0 ? void 0 : _type_type.displayName) !== null && _ref !== void 0 ? _ref : type === null || type === void 0 ? void 0 : (_type_type1 = type.type) === null || _type_type1 === void 0 ? void 0 : _type_type1.name;
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
    return findElement((_element_props = element.props) === null || _element_props === void 0 ? void 0 : _element_props.children, predicate, depth + 1);
}
function resolveContextTargets(menu) {
    var _menu_context, _ref, _stringValue, _stringValue1, _menu_guild, _ref1, _ref2, _menu_user, _ref3, _menu_channel, _ref4;
    var _getStore_getGuild, _getStore, _getStore_getUser, _getStore1, _getStore_getUser1, _getStore2, _getStore_getChannel, _getStore3, _menu_items, _menu_items1;
    var context = (_menu_context = menu.context) !== null && _menu_context !== void 0 ? _menu_context : {};
    var key = stringValue(menu.key);
    var guildId = (_ref = (_stringValue = stringValue(menu.guildId)) !== null && _stringValue !== void 0 ? _stringValue : stringValue(context.guildId)) !== null && _ref !== void 0 ? _ref : profileGuildId;
    var explicitUserId = (_stringValue1 = stringValue(menu.userId)) !== null && _stringValue1 !== void 0 ? _stringValue1 : stringValue(context.userId);
    var guild = (_menu_guild = menu.guild) !== null && _menu_guild !== void 0 ? _menu_guild : key ? (_ref1 = (_getStore = getStore('Guild')) === null || _getStore === void 0 ? void 0 : (_getStore_getGuild = _getStore.getGuild) === null || _getStore_getGuild === void 0 ? void 0 : _getStore_getGuild.call(_getStore, key)) !== null && _ref1 !== void 0 ? _ref1 : undefined : undefined;
    if (guild) return getGuildTargets(guild);
    var user = (_ref2 = (_menu_user = menu.user) !== null && _menu_user !== void 0 ? _menu_user : explicitUserId ? (_getStore1 = getStore('User')) === null || _getStore1 === void 0 ? void 0 : (_getStore_getUser = _getStore1.getUser) === null || _getStore_getUser === void 0 ? void 0 : _getStore_getUser.call(_getStore1, explicitUserId) : undefined) !== null && _ref2 !== void 0 ? _ref2 : key ? (_ref3 = (_getStore2 = getStore('User')) === null || _getStore2 === void 0 ? void 0 : (_getStore_getUser1 = _getStore2.getUser) === null || _getStore_getUser1 === void 0 ? void 0 : _getStore_getUser1.call(_getStore2, key)) !== null && _ref3 !== void 0 ? _ref3 : undefined : undefined;
    if (user) return getUserTargets(user.id, guildId !== null && guildId !== void 0 ? guildId : undefined);
    var channel = (_menu_channel = menu.channel) !== null && _menu_channel !== void 0 ? _menu_channel : key ? (_ref4 = (_getStore3 = getStore('Channel')) === null || _getStore3 === void 0 ? void 0 : (_getStore_getChannel = _getStore3.getChannel) === null || _getStore_getChannel === void 0 ? void 0 : _getStore_getChannel.call(_getStore3, key)) !== null && _ref4 !== void 0 ? _ref4 : undefined : undefined;
    if (channel === null || channel === void 0 ? void 0 : channel.icon) return getChannelTargets(channel);
    var isProfileMenu = (_menu_items = menu.items) === null || _menu_items === void 0 ? void 0 : _menu_items.some(function(item) {
        var _item_label;
        return /^(View (?:Main )?Profile|Message)$/.test((_item_label = item.label) !== null && _item_label !== void 0 ? _item_label : '');
    });
    var isUserActionMenu = (_menu_items1 = menu.items) === null || _menu_items1 === void 0 ? void 0 : _menu_items1.some(function(item) {
        var _item_label;
        return /^(Change Friend Nickname|Copy Username|Copy User ID|Report User Profile)$/.test((_item_label = item.label) !== null && _item_label !== void 0 ? _item_label : '');
    });
    if (profileUserId && (isProfileMenu || isUserActionMenu)) return getUserTargets(profileUserId, guildId !== null && guildId !== void 0 ? guildId : undefined);
    return [];
}
function patchContextMenus() {
    if (contextMenuPatched) return true;
    var contextMenus = window.unbound.metro.findByProps('showContextMenu', 'hideContextMenu');
    if (typeof (contextMenus === null || contextMenus === void 0 ? void 0 : contextMenus.showContextMenu) !== 'function') return false;
    PATCHER.before(contextMenus, 'showContextMenu', function(ctx) {
        var menu = ctx.args[0];
        if (!menu || !Array.isArray(menu.items)) return;
        try {
            var targets = resolveContextTargets(menu);
            var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
            try {
                for(var _iterator = targets[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                    var target = _step.value;
                    addTargetActions(menu, target, function() {
                        var _contextMenus_hideContextMenu;
                        return (_contextMenus_hideContextMenu = contextMenus.hideContextMenu) === null || _contextMenus_hideContextMenu === void 0 ? void 0 : _contextMenus_hideContextMenu.call(contextMenus);
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
        } catch (unused) {}
    });
    contextMenuPatched = true;
    return true;
}
function getActionSheetTargets() {
    if (actionSheetGuild) return getGuildTargets(actionSheetGuild);
    if (profileUserId) return getUserTargets(profileUserId, profileGuildId !== null && profileGuildId !== void 0 ? profileGuildId : undefined);
    return [];
}
function addActionSheetRows(result, sheets, ActionSheetRow, sheetKey) {
    var _rows;
    var _group_props;
    var group = findElement(result, function(element) {
        return typeName(element) === 'ActionSheetRowGroup';
    });
    var rows = group === null || group === void 0 ? void 0 : (_group_props = group.props) === null || _group_props === void 0 ? void 0 : _group_props.children;
    if (!(group === null || group === void 0 ? void 0 : group.props) || !Array.isArray(rows)) return result;
    var targets = getActionSheetTargets();
    var iconId = window.unbound.assets.getIDByName('ImageIcon');
    var rowsToAdd = [];
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
    try {
        var _loop = function() {
            var target = _step.value;
            var label = "View ".concat(target.label);
            var key = "unbound-view-icons-".concat(label.toLowerCase().replace(/[^a-z0-9]+/g, '-'));
            if (rows.some(function(row) {
                return (row === null || row === void 0 ? void 0 : row.key) === key;
            })) return "continue";
            rowsToAdd.push(window.unbound.metro.common.React.createElement(ActionSheetRow, {
                key: key,
                label: label,
                icon: iconId != null && typeof ActionSheetRow.Icon === 'function' ? window.unbound.metro.common.React.createElement(ActionSheetRow.Icon, {
                    source: iconId
                }) : undefined,
                onPress: function onPress() {
                    var _sheets_hideActionSheet;
                    (_sheets_hideActionSheet = sheets.hideActionSheet) === null || _sheets_hideActionSheet === void 0 ? void 0 : _sheets_hideActionSheet.call(sheets, sheetKey);
                    openImage(target);
                }
            }));
        };
        for(var _iterator = targets[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true)_loop();
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
    if (rowsToAdd.length) (_rows = rows).splice.apply(_rows, [
        1,
        0
    ].concat(_to_consumable_array(rowsToAdd)));
    return result;
}
function patchNestedActionSheetComponents(node, sheets, ActionSheetRow, sheetKey, depth) {
    var _element_props;
    if (depth >= 15 || !node || (typeof node === "undefined" ? "undefined" : _type_of(node)) !== 'object') return;
    if (Array.isArray(node)) {
        var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
        try {
            for(var _iterator = node[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                var child = _step.value;
                patchNestedActionSheetComponents(child, sheets, ActionSheetRow, sheetKey, depth + 1);
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
        return;
    }
    var element = node;
    var component = element.type;
    var componentLabel = typeName(element);
    var shouldPatch = componentLabel === 'GuildActionSheetSecondaryActions' || componentLabel === 'UserProfileActionSheetActions';
    if (shouldPatch && typeof component === 'function') {
        if (!patchedSheetElements.has(element)) {
            patchedSheetElements.add(element);
            element.type = function() {
                for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
                    args[_key] = arguments[_key];
                }
                return patchActionSheetComponent(component.apply(void 0, _to_consumable_array(args)), sheets, ActionSheetRow, sheetKey, depth + 1);
            };
        }
    } else if (shouldPatch && component && (typeof component === "undefined" ? "undefined" : _type_of(component)) === 'object') {
        var componentObject = component;
        var wrappedType = typeof componentObject.type === 'function' ? {
            holder: componentObject,
            method: 'type'
        } : null;
        var renderHolder = typeof componentObject.render === 'function' ? {
            holder: componentObject,
            method: 'render'
        } : null;
        var target = wrappedType !== null && wrappedType !== void 0 ? wrappedType : renderHolder;
        if (target && !patchedSheetComponents.has(target.holder)) {
            patchedSheetComponents.add(target.holder);
            PATCHER.after(target.holder, target.method, function(param) {
                var result = param.result;
                return patchActionSheetComponent(result, sheets, ActionSheetRow, sheetKey, depth + 1);
            });
        }
    }
    patchNestedActionSheetComponents((_element_props = element.props) === null || _element_props === void 0 ? void 0 : _element_props.children, sheets, ActionSheetRow, sheetKey, depth + 1);
}
function patchActionSheetComponent(result, sheets, ActionSheetRow, sheetKey) {
    var depth = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : 0;
    var patchedResult = addActionSheetRows(result, sheets, ActionSheetRow, sheetKey);
    patchNestedActionSheetComponents(patchedResult, sheets, ActionSheetRow, sheetKey, depth);
    return patchedResult;
}
function patchActionSheets() {
    var _metro_findByProps;
    if (profileSheetPatched) return true;
    var sheets = window.unbound.metro.findByProps('openLazy', 'hideActionSheet');
    var ActionSheetRow = (_metro_findByProps = window.unbound.metro.findByProps('ActionSheetRow')) === null || _metro_findByProps === void 0 ? void 0 : _metro_findByProps.ActionSheetRow;
    if (typeof (sheets === null || sheets === void 0 ? void 0 : sheets.openLazy) !== 'function' || !ActionSheetRow) return false;
    PATCHER.before(sheets, 'openLazy', function(ctx) {
        var _stringValue, _stringValue1;
        var _ctx_args = _sliced_to_array(ctx.args, 3), componentPromise = _ctx_args[0], key = _ctx_args[1], props = _ctx_args[2];
        if (typeof key !== 'string' || !(componentPromise === null || componentPromise === void 0 ? void 0 : componentPromise.then) || !props) return;
        var isProfileSheet = /^UserProfile/i.test(key) && Boolean(props.userId);
        var isGuildSheet = /^GuildActionSheet:/i.test(key) && props.guild && _type_of(props.guild) === 'object';
        if (!isProfileSheet && !isGuildSheet) return;
        profileUserId = isProfileSheet ? (_stringValue = stringValue(props.userId)) !== null && _stringValue !== void 0 ? _stringValue : null : null;
        profileGuildId = isProfileSheet ? (_stringValue1 = stringValue(props.guildId)) !== null && _stringValue1 !== void 0 ? _stringValue1 : null : null;
        actionSheetGuild = isGuildSheet ? props.guild : null;
        componentPromise.then(function(instance) {
            if (!instance || patchedSheetInstances.has(instance)) return;
            patchedSheetInstances.add(instance);
            var defaultExport = instance.default;
            if (typeof defaultExport === 'function') {
                PATCHER.after(instance, 'default', function(param) {
                    var result = param.result;
                    return patchActionSheetComponent(result, sheets, ActionSheetRow, key);
                });
                return;
            }
            if (defaultExport && (typeof defaultExport === "undefined" ? "undefined" : _type_of(defaultExport)) === 'object' && typeof defaultExport.type === 'function') {
                PATCHER.after(defaultExport, 'type', function(param) {
                    var result = param.result;
                    return patchActionSheetComponent(result, sheets, ActionSheetRow, key);
                });
                return;
            }
            if (defaultExport && (typeof defaultExport === "undefined" ? "undefined" : _type_of(defaultExport)) === 'object' && typeof defaultExport.render === 'function') {
                PATCHER.after(defaultExport, 'render', function(param) {
                    var result = param.result;
                    return patchActionSheetComponent(result, sheets, ActionSheetRow, key);
                });
            }
        }).catch(function() {
            return undefined;
        });
    });
    profileSheetPatched = true;
    return true;
}
var index = {
    start: function start() {
        if (!patchContextMenus() || !patchActionSheets()) {
            contextMenuTimer = setInterval(function() {
                if (!patchContextMenus() || !patchActionSheets() || !contextMenuTimer) return;
                clearInterval(contextMenuTimer);
                contextMenuTimer = null;
            }, 1000);
        }
    },
    stop: function stop() {
        PATCHER.unpatchAll();
        if (contextMenuTimer) clearInterval(contextMenuTimer);
        contextMenuTimer = null;
        contextMenuPatched = false;
        profileSheetPatched = false;
        profileUserId = null;
        profileGuildId = null;
        actionSheetGuild = null;
        patchedSheetInstances = new WeakSet();
        patchedSheetComponents = new WeakSet();
        patchedSheetElements = new WeakSet();
    }
};
return index;
})();return this.__plugin;},start(context){const module=this.__load();const plugin=module?.default??module;if(plugin&&typeof plugin.start==='function')return plugin.start(context);},stop(){const module=this.__load();const plugin=module?.default??module;if(plugin&&typeof plugin.stop==='function')return plugin.stop();}})