({__plugin:null,__load(){if(this.__plugin)return this.__plugin;this.__plugin=(function () {
'use strict';
function validHexColor(color) {
    return typeof color === 'string' && /^#[\da-f]{6}$/i.test(color);
}
function getRoleColorStops(colors, fallbackColor) {
    var includeEnhanced = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : true;
    var primary = validHexColor(colors === null || colors === void 0 ? void 0 : colors.primaryColor) ? colors.primaryColor : fallbackColor;
    if (!validHexColor(primary)) return [];
    if (!includeEnhanced) return [
        primary
    ];
    return [
        primary,
        colors === null || colors === void 0 ? void 0 : colors.secondaryColor,
        colors === null || colors === void 0 ? void 0 : colors.tertiaryColor
    ].filter(function(color, index, stops) {
        return validHexColor(color) && stops.indexOf(color) === index;
    });
}
function getRoleColorAppearance(colors, fallbackColor) {
    var includeEnhanced = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : true;
    var stops = getRoleColorStops(colors, fallbackColor, includeEnhanced);
    var style = stops.length < 2 ? 'solid' : includeEnhanced && stops.length >= 3 && validHexColor(colors === null || colors === void 0 ? void 0 : colors.secondaryColor) && validHexColor(colors === null || colors === void 0 ? void 0 : colors.tertiaryColor) ? 'holographic' : 'gradient';
    return {
        colors: stops,
        style: style
    };
}
function roleColorAt(colors, position) {
    if (colors.length === 0 || colors.some(function(color) {
        return !validHexColor(color);
    })) return null;
    if (colors.length === 1) return colors[0];
    var clamped = Math.min(1, Math.max(0, position));
    var scaled = clamped * (colors.length - 1);
    var index = Math.min(colors.length - 2, Math.floor(scaled));
    var fraction = scaled - index;
    var first = Number.parseInt(colors[index].slice(1), 16);
    var second = Number.parseInt(colors[index + 1].slice(1), 16);
    var channels = [
        16,
        8,
        0
    ].map(function(shift) {
        return Math.round((first >> shift & 0xff) * (1 - fraction) + (second >> shift & 0xff) * fraction);
    });
    return "#".concat(channels.map(function(channel) {
        return channel.toString(16).padStart(2, '0');
    }).join(''));
}function _array_like_to_array$6(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _array_without_holes$6(arr) {
    if (Array.isArray(arr)) return _array_like_to_array$6(arr);
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
function _iterable_to_array$6(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) {
        return Array.from(iter);
    }
}
function _non_iterable_spread$6() {
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
function _to_consumable_array$6(arr) {
    return _array_without_holes$6(arr) || _iterable_to_array$6(arr) || _unsupported_iterable_to_array$6(arr) || _non_iterable_spread$6();
}
function _type_of(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
function _unsupported_iterable_to_array$6(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _array_like_to_array$6(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _array_like_to_array$6(o, minLen);
}
var messageColors = new WeakMap();
function hexToArgb(hex) {
    if (!/^#[\da-f]{6}$/i.test(hex)) return null;
    return (0xff000000 | Number.parseInt(hex.slice(1), 16)) >>> 0;
}
function toLinear(channel) {
    var value = channel / 255;
    return value <= 0.04045 ? value / 12.92 : Math.pow((value + 0.055) / 1.055, 2.4);
}
function fromLinear(value) {
    var clamped = Math.min(1, Math.max(0, value));
    var encoded = clamped <= 0.0031308 ? clamped * 12.92 : 1.055 * Math.pow(clamped, 1 / 2.4) - 0.055;
    return Math.round(encoded * 255);
}
function toOklab(color) {
    var red = toLinear(color >>> 16 & 0xff);
    var green = toLinear(color >>> 8 & 0xff);
    var blue = toLinear(color & 0xff);
    var light = Math.cbrt(0.4122214708 * red + 0.5363325363 * green + 0.0514459929 * blue);
    var medium = Math.cbrt(0.2119034982 * red + 0.6806995451 * green + 0.1073969566 * blue);
    var short = Math.cbrt(0.0883024619 * red + 0.2817188376 * green + 0.6299787005 * blue);
    return [
        0.2104542553 * light + 0.793617785 * medium - 0.0040720468 * short,
        1.9779984951 * light - 2.428592205 * medium + 0.4505937099 * short,
        0.0259040371 * light + 0.7827717662 * medium - 0.808675766 * short
    ];
}
function fromOklab(color, alpha) {
    var light = Math.pow(color[0] + 0.3963377774 * color[1] + 0.2158037573 * color[2], 3);
    var medium = Math.pow(color[0] - 0.1055613458 * color[1] - 0.0638541728 * color[2], 3);
    var short = Math.pow(color[0] - 0.0894841775 * color[1] - 1.291485548 * color[2], 3);
    var red = fromLinear(4.0767416621 * light - 3.3077115913 * medium + 0.2309699292 * short);
    var green = fromLinear(-1.2684380046 * light + 2.6097574011 * medium - 0.3413193965 * short);
    var blue = fromLinear(-0.0041960863 * light - 0.7034186147 * medium + 1.707614701 * short);
    return (alpha & 0xff000000 | red << 16 | green << 8 | blue) >>> 0;
}
function blendArgb(base, role, saturation) {
    var ratio = Math.min(100, Math.max(0, saturation)) / 100;
    if (ratio === 0) return base >>> 0;
    if (ratio === 1) return (base & 0xff000000 | role & 0x00ffffff) >>> 0;
    var original = toOklab(base);
    var tint = toOklab(role);
    return fromOklab(original.map(function(value, index) {
        return value * (1 - ratio) + tint[index] * ratio;
    }), base);
}
function memberColorNumbers(member) {
    if (!member) return [];
    return getRoleColorAppearance(member.colorStrings, member.colorString).colors.map(hexToArgb).filter(function(value) {
        return value !== null;
    });
}
function applyMentionColors(content, members, defaultGuildId) {
    if (!Array.isArray(content)) return;
    var pending = _to_consumable_array$6(content);
    var visited = new Set();
    var count = 0;
    while(pending.length > 0 && count < 400){
        var _pending, _pending1;
        var value = pending.pop();
        if (!value || (typeof value === "undefined" ? "undefined" : _type_of(value)) !== 'object' || visited.has(value)) continue;
        visited.add(value);
        count++;
        var node = value;
        if (node.type === 'mention' && typeof node.userId === 'string') {
            var _node_guildId;
            var guildId = (_node_guildId = node.guildId) !== null && _node_guildId !== void 0 ? _node_guildId : defaultGuildId;
            var colors = guildId ? memberColorNumbers(members.getMember(guildId, node.userId)) : [];
            if (colors.length > 0) {
                node.roleColor = colors[0];
                node.color = colors[0];
                node.colorString = "#".concat((colors[0] & 0xffffff).toString(16).padStart(6, '0'));
                node.roleColors = _object_spread({
                    primaryColor: colors[0]
                }, colors[1] != null ? {
                    secondaryColor: colors[1]
                } : {}, colors[2] != null ? {
                    tertiaryColor: colors[2]
                } : {});
            }
        }
        if (Array.isArray(node.content)) (_pending = pending).push.apply(_pending, _to_consumable_array$6(node.content));
        if (Array.isArray(node.items)) (_pending1 = pending).push.apply(_pending1, _to_consumable_array$6(node.items));
    }
}
function applyMessageColors(message, members, options) {
    if (typeof message.textColor !== 'number') return;
    var previous = messageColors.get(message);
    var base = (previous === null || previous === void 0 ? void 0 : previous.applied) === message.textColor ? previous.base : message.textColor;
    var color = options.colorChatMessages && options.messageSaturation > 0 && message.guildId && message.authorId && message.state !== 'SEND_FAILED' ? memberColorNumbers(members.getMember(message.guildId, message.authorId))[0] : undefined;
    if (color === undefined) {
        message.textColor = base;
        messageColors.delete(message);
        return;
    }
    if ((previous === null || previous === void 0 ? void 0 : previous.applied) === message.textColor && previous.role === color && previous.saturation === options.messageSaturation) return;
    var applied = blendArgb(base, color, options.messageSaturation);
    message.textColor = applied;
    messageColors.set(message, {
        base: base,
        applied: applied,
        role: color,
        saturation: options.messageSaturation
    });
}
function applyChatRoleColors(row, members, options) {
    var message = row.message;
    if (!message) return;
    if (options.chatMentions) {
        var _message_embeds;
        var _message_referencedMessage;
        applyMentionColors(message.content, members, message.guildId);
        var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
        try {
            for(var _iterator = ((_message_embeds = message.embeds) !== null && _message_embeds !== void 0 ? _message_embeds : [])[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                var embed = _step.value;
                applyMentionColors(embed.description, members, message.guildId);
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
        var referenced = (_message_referencedMessage = message.referencedMessage) === null || _message_referencedMessage === void 0 ? void 0 : _message_referencedMessage.message;
        if (referenced) applyMentionColors(referenced.content, members, referenced.guildId);
    }
    applyMessageColors(message, members, options);
}function _array_like_to_array$5(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _array_without_holes$5(arr) {
    if (Array.isArray(arr)) return _array_like_to_array$5(arr);
}
function _iterable_to_array$5(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) {
        return Array.from(iter);
    }
}
function _non_iterable_spread$5() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _to_consumable_array$5(arr) {
    return _array_without_holes$5(arr) || _iterable_to_array$5(arr) || _unsupported_iterable_to_array$5(arr) || _non_iterable_spread$5();
}
function _unsupported_iterable_to_array$5(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _array_like_to_array$5(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _array_like_to_array$5(o, minLen);
}
var USER_LIST_PATH = 'modules/main_tabs_v2/native/shared_components/user_list/UsersFastList.tsx';
function roleHeaderAppearance(props, section, roles, members) {
    var _props_getSectionProps_props, _props_getSectionProps, _props_getSectionProps1, _props_getItemProps, _props_getItemProps1, _first_user, _members_getMember;
    var title = (_props_getSectionProps1 = props.getSectionProps) === null || _props_getSectionProps1 === void 0 ? void 0 : (_props_getSectionProps = _props_getSectionProps1.call(props, section)) === null || _props_getSectionProps === void 0 ? void 0 : (_props_getSectionProps_props = _props_getSectionProps.props) === null || _props_getSectionProps_props === void 0 ? void 0 : _props_getSectionProps_props.title;
    var first = (_props_getItemProps1 = props.getItemProps) === null || _props_getItemProps1 === void 0 ? void 0 : (_props_getItemProps = _props_getItemProps1.call(props, section, 0)) === null || _props_getItemProps === void 0 ? void 0 : _props_getItemProps.props;
    var guildId = first === null || first === void 0 ? void 0 : first.guildId;
    var userId = first === null || first === void 0 ? void 0 : (_first_user = first.user) === null || _first_user === void 0 ? void 0 : _first_user.id;
    if (typeof title !== 'string' || !guildId || !userId) return null;
    var roleId = (_members_getMember = members.getMember(guildId, userId)) === null || _members_getMember === void 0 ? void 0 : _members_getMember.hoistRoleId;
    if (!roleId) return null;
    var role = roles.getRole(guildId, roleId);
    if (!(role === null || role === void 0 ? void 0 : role.name) || !title.includes(role.name)) return null;
    var appearance = getRoleColorAppearance(role.colorStrings, role.colorString);
    return appearance.colors.length ? appearance : null;
}
function installMemberListColors(roles, members, enabled) {
    var listModule = window.unbound.metro.findByFilePath(USER_LIST_PATH, {
        interop: false
    });
    var list = listModule === null || listModule === void 0 ? void 0 : listModule.UsersFastList;
    if (typeof (list === null || list === void 0 ? void 0 : list.render) !== 'function') return function() {};
    return window.unbound.patcher.after(list, 'render', function(param) {
        var args = param.args, result = param.result;
        var _result_props;
        if (!enabled()) return;
        var props = args[0];
        var renderHeader = result === null || result === void 0 ? void 0 : (_result_props = result.props) === null || _result_props === void 0 ? void 0 : _result_props.renderSectionHeader;
        if (typeof renderHeader !== 'function' || !props.getSectionProps || !props.getItemProps) return;
        var _metro_common = window.unbound.metro.common, React1 = _metro_common.React, ReactNative = _metro_common.ReactNative;
        return React1.cloneElement(result, {
            renderSectionHeader: function renderSectionHeader(section) {
                for(var _len = arguments.length, rest = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++){
                    rest[_key - 1] = arguments[_key];
                }
                var _header_props;
                var header = renderHeader.apply(void 0, [
                    section
                ].concat(_to_consumable_array$5(rest)));
                var appearance = roleHeaderAppearance(props, section, roles, members);
                if (!appearance || typeof (header === null || header === void 0 ? void 0 : (_header_props = header.props) === null || _header_props === void 0 ? void 0 : _header_props.title) !== 'string') return header;
                var title = header.props.title;
                var characters = Array.from(title);
                var content = appearance.colors.length === 1 ? title : characters.map(function(character, index) {
                    var _roleColorAt;
                    return /*#__PURE__*/ React.createElement(ReactNative.Text, {
                        key: index,
                        style: {
                            color: (_roleColorAt = roleColorAt(appearance.colors, characters.length === 1 ? 0 : index / (characters.length - 1))) !== null && _roleColorAt !== void 0 ? _roleColorAt : appearance.colors[0]
                        }
                    }, character);
                });
                return React1.cloneElement(header, {
                    title: /*#__PURE__*/ React.createElement(ReactNative.Text, {
                        style: {
                            color: appearance.colors[0]
                        }
                    }, content)
                });
            }
        });
    });
}function paintRoleTextTree(node, appearances, runtime) {
    var depth = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 0;
    var _element_props;
    if (depth > 12 || !node) return node;
    var React = runtime.React, Text = runtime.Text;
    if (Array.isArray(node)) {
        var next = node.map(function(child) {
            return paintRoleTextTree(child, appearances, runtime, depth + 1);
        });
        return next.some(function(child, index) {
            return child !== node[index];
        }) ? next : node;
    }
    if (!React.isValidElement(node)) return node;
    var element = node;
    var children = (_element_props = element.props) === null || _element_props === void 0 ? void 0 : _element_props.children;
    var name = typeof children === 'string' ? children : Array.isArray(children) && children.length === 1 && typeof children[0] === 'string' ? children[0] : null;
    var appearance = name ? appearances.get(name) : null;
    if ((appearance === null || appearance === void 0 ? void 0 : appearance.colors.length) === 1) return React.cloneElement(element, {
        style: [
            element.props.style,
            {
                color: appearance.colors[0]
            }
        ]
    });
    if (appearance && name) {
        var characters = Array.from(name);
        var colored = characters.map(function(character, index) {
            var _roleColorAt;
            return React.createElement(Text, {
                key: index,
                style: {
                    color: (_roleColorAt = roleColorAt(appearance.colors, characters.length === 1 ? 0 : index / (characters.length - 1))) !== null && _roleColorAt !== void 0 ? _roleColorAt : appearance.colors[0]
                }
            }, character);
        });
        return React.cloneElement(element, {
            children: colored
        });
    }
    var next1 = paintRoleTextTree(children, appearances, runtime, depth + 1);
    return next1 === children ? node : React.cloneElement(element, {
        children: next1
    });
}var POLL_VOTES_PATH = 'modules/polls/native/PollVotesActionSheet.tsx';
function ColoredVotersList(param) {
    var original = param.original, properties = param.properties, guildId = param.guildId, members = param.members;
    var _result_props, _list_props;
    var result = original(properties);
    var list = result === null || result === void 0 ? void 0 : (_result_props = result.props) === null || _result_props === void 0 ? void 0 : _result_props.children;
    var renderItem = list === null || list === void 0 ? void 0 : (_list_props = list.props) === null || _list_props === void 0 ? void 0 : _list_props.renderItem;
    if (typeof renderItem !== 'function') return result;
    var _metro_common = window.unbound.metro.common, React = _metro_common.React, ReactNative = _metro_common.ReactNative;
    return React.cloneElement(result, {
        children: React.cloneElement(list, {
            renderItem: function renderItem1(args) {
                var _args_item, _row_props;
                var row = renderItem(args);
                var userId = args === null || args === void 0 ? void 0 : (_args_item = args.item) === null || _args_item === void 0 ? void 0 : _args_item.id;
                var label = row === null || row === void 0 ? void 0 : (_row_props = row.props) === null || _row_props === void 0 ? void 0 : _row_props.label;
                if (!userId || typeof label !== 'string') return row;
                var member = members.getMember(guildId, userId);
                var appearance = getRoleColorAppearance(member === null || member === void 0 ? void 0 : member.colorStrings, member === null || member === void 0 ? void 0 : member.colorString);
                if (!appearance.colors.length) return row;
                var text = React.createElement(ReactNative.Text, null, label);
                var colored = paintRoleTextTree(text, new Map([
                    [
                        label,
                        appearance
                    ]
                ]), {
                    React: React,
                    Text: ReactNative.Text
                });
                return React.cloneElement(row, {
                    label: colored
                });
            }
        })
    });
}
function installPollVoterColors(members, enabled) {
    var module = window.unbound.metro.findByFilePath(POLL_VOTES_PATH, {
        interop: false
    });
    var channels = window.unbound.metro.findStore('Channel');
    if (typeof (module === null || module === void 0 ? void 0 : module.default) !== 'function' || !channels) return function() {};
    var sheetModule = module;
    return window.unbound.patcher.after(sheetModule, 'default', function(param) {
        var args = param.args, result = param.result;
        var _args_, _channels_getChannel, _result_props, _sheet_props;
        if (!enabled()) return;
        var channelId = (_args_ = args[0]) === null || _args_ === void 0 ? void 0 : _args_.channelId;
        var guildId = channelId ? (_channels_getChannel = channels.getChannel(channelId)) === null || _channels_getChannel === void 0 ? void 0 : _channels_getChannel.guild_id : undefined;
        if (!guildId) return;
        var sheet = result === null || result === void 0 ? void 0 : (_result_props = result.props) === null || _result_props === void 0 ? void 0 : _result_props.children;
        var children = sheet === null || sheet === void 0 ? void 0 : (_sheet_props = sheet.props) === null || _sheet_props === void 0 ? void 0 : _sheet_props.children;
        if (!Array.isArray(children)) return;
        var voters = children.find(function(child) {
            return typeof (child === null || child === void 0 ? void 0 : child.type) === 'function' && child.type.name === 'VotersList';
        });
        if (!voters) return;
        var React = window.unbound.metro.common.React;
        var colored = React.createElement(ColoredVotersList, {
            original: voters.type,
            properties: voters.props,
            guildId: guildId,
            members: members
        });
        return React.cloneElement(result, {
            children: React.cloneElement(sheet, {
                children: children.map(function(child) {
                    return child === voters ? colored : child;
                })
            })
        });
    });
}function _array_like_to_array$4(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _array_without_holes$4(arr) {
    if (Array.isArray(arr)) return _array_like_to_array$4(arr);
}
function _iterable_to_array$4(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) {
        return Array.from(iter);
    }
}
function _non_iterable_spread$4() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _to_consumable_array$4(arr) {
    return _array_without_holes$4(arr) || _iterable_to_array$4(arr) || _unsupported_iterable_to_array$4(arr) || _non_iterable_spread$4();
}
function _unsupported_iterable_to_array$4(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _array_like_to_array$4(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _array_like_to_array$4(o, minLen);
}
var REACTIONS_PATH = 'modules/reactions/native/MessageReactionsContent.tsx';
function ColoredReactionLabel(param) {
    var label = param.label, appearance = param.appearance;
    var _label_props_user, _label_props_user1;
    if (typeof label.type !== 'function') return label;
    var names = [
        label.props.nick,
        (_label_props_user = label.props.user) === null || _label_props_user === void 0 ? void 0 : _label_props_user.globalName,
        (_label_props_user1 = label.props.user) === null || _label_props_user1 === void 0 ? void 0 : _label_props_user1.username
    ].filter(function(name) {
        return typeof name === 'string' && name.length > 0;
    });
    var appearances = new Map(names.map(function(name) {
        return [
            name,
            appearance
        ];
    }));
    var render = label.type;
    var result = render(label.props);
    return paintRoleTextTree(result, appearances, {
        React: window.unbound.metro.common.React,
        Text: window.unbound.metro.common.ReactNative.Text
    });
}
function installReactionUserColors(members, enabled) {
    var module = window.unbound.metro.findByFilePath(REACTIONS_PATH, {
        interop: false
    });
    var channels = window.unbound.metro.findStore('Channel');
    if (typeof (module === null || module === void 0 ? void 0 : module.MessageReactionsContent) !== 'function' || !channels) return function() {};
    var content = module;
    return window.unbound.patcher.after(content, 'MessageReactionsContent', function(param) {
        var args = param.args, result = param.result;
        var _args_, _channels_getChannel, _result_props, _list_props;
        if (!enabled()) return;
        var channelId = (_args_ = args[0]) === null || _args_ === void 0 ? void 0 : _args_.channelId;
        var guildId = channelId ? (_channels_getChannel = channels.getChannel(channelId)) === null || _channels_getChannel === void 0 ? void 0 : _channels_getChannel.guild_id : undefined;
        if (!guildId) return;
        var list = result === null || result === void 0 ? void 0 : (_result_props = result.props) === null || _result_props === void 0 ? void 0 : _result_props.children;
        var renderItem = list === null || list === void 0 ? void 0 : (_list_props = list.props) === null || _list_props === void 0 ? void 0 : _list_props.renderItem;
        if (typeof renderItem !== 'function') return;
        var React = window.unbound.metro.common.React;
        return React.cloneElement(result, {
            children: React.cloneElement(list, {
                renderItem: function renderItem1(section, index) {
                    var _row_props, _item_props, _label_props_user, _label_props;
                    var row = renderItem(section, index);
                    var children = row === null || row === void 0 ? void 0 : (_row_props = row.props) === null || _row_props === void 0 ? void 0 : _row_props.children;
                    if (!Array.isArray(children)) return row;
                    var item = children[0];
                    var label = item === null || item === void 0 ? void 0 : (_item_props = item.props) === null || _item_props === void 0 ? void 0 : _item_props.label;
                    var userId = label === null || label === void 0 ? void 0 : (_label_props = label.props) === null || _label_props === void 0 ? void 0 : (_label_props_user = _label_props.user) === null || _label_props_user === void 0 ? void 0 : _label_props_user.id;
                    if (!userId) return row;
                    var member = members.getMember(guildId, userId);
                    var appearance = getRoleColorAppearance(member === null || member === void 0 ? void 0 : member.colorStrings, member === null || member === void 0 ? void 0 : member.colorString);
                    if (!appearance.colors.length) return row;
                    var coloredLabel = React.createElement(ColoredReactionLabel, {
                        label: label,
                        appearance: appearance
                    });
                    return React.cloneElement(row, {
                        children: [
                            React.cloneElement(item, {
                                label: coloredLabel
                            })
                        ].concat(_to_consumable_array$4(children.slice(1)))
                    });
                }
            })
        });
    });
}function _array_like_to_array$3(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _array_without_holes$3(arr) {
    if (Array.isArray(arr)) return _array_like_to_array$3(arr);
}
function _iterable_to_array$3(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) {
        return Array.from(iter);
    }
}
function _non_iterable_spread$3() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _to_consumable_array$3(arr) {
    return _array_without_holes$3(arr) || _iterable_to_array$3(arr) || _unsupported_iterable_to_array$3(arr) || _non_iterable_spread$3();
}
function _unsupported_iterable_to_array$3(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _array_like_to_array$3(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _array_like_to_array$3(o, minLen);
}
var MAX_SCAN_NODES$1 = 1600;
var MAX_SCAN_DEPTH = 40;
var MAX_TEXT_VIEWS = 80;
function selectMentionLabel(text, labels) {
    var at = text.indexOf('@');
    if (at < 0) return;
    return _to_consumable_array$3(labels).sort(function(a, b) {
        return b.length - a.length;
    }).find(function(label) {
        var prefix = "@".concat(label);
        if (!text.slice(at).startsWith(prefix)) return false;
        var next = text[at + prefix.length];
        return !next || next === '\u2068' || next === '\u2069' || RegExp("\\s", "u").test(next);
    });
}
function hexChannels(hex) {
    if (!/^#[\da-f]{6}$/i.test(hex)) return null;
    return [
        Number.parseInt(hex.slice(1, 3), 16) / 255,
        Number.parseInt(hex.slice(3, 5), 16) / 255,
        Number.parseInt(hex.slice(5, 7), 16) / 255
    ];
}
function installNativeMentionColors(bridge, members, enabled) {
    var _selected_addChangeListener;
    var messageStore = window.unbound.metro.findStore('Message');
    var channelStore = window.unbound.metro.findStore('Channel');
    var userStore = window.unbound.metro.findStore('User');
    var selectedStore = window.unbound.metro.findByProps('getChannelId', 'getLastSelectedChannelId');
    if (!messageStore || !channelStore || !userStore || !selectedStore) return function() {};
    var messages = messageStore;
    var channels = channelStore;
    var users = userStore;
    var selected = selectedStore;
    var hooks = [];
    var textViews = new Map();
    var pendingCells = new Set();
    var timers = new Set();
    var colors = new Map();
    var currentChannelId = selected.getChannelId();
    var stopped = false;
    function call(handle, selector) {
        for(var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++){
            args[_key - 2] = arguments[_key];
        }
        if (!handle) return null;
        try {
            return bridge.invoke(handle, selector, args, {
                thread: 'main'
            });
        } catch (unused) {
            return null;
        }
    }
    function keyFor(handle) {
        var name = bridge.className(handle);
        var hash = call(handle, 'hash');
        return name && hash != null ? "".concat(name, ":").concat(String(hash)) : undefined;
    }
    function messageIdForCell(cell) {
        var viewModel = bridge.getIvar(cell, 'viewModel');
        var message = call(viewModel, 'message');
        var identifier = call(message, 'id');
        if (typeof identifier === 'string') return identifier;
        var description = call(identifier, 'description');
        return typeof description === 'string' ? description : undefined;
    }
    function mentionsFor(message, guildId) {
        if (typeof message.content !== 'string') return [];
        var result = [];
        var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
        try {
            for(var _iterator = message.content.matchAll(/<@!?([0-9]+)>/g)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                var match = _step.value;
                var userId = match[1];
                var member = members.getMember(guildId, userId);
                var appearance = getRoleColorAppearance(member === null || member === void 0 ? void 0 : member.colorStrings, member === null || member === void 0 ? void 0 : member.colorString);
                if (!appearance.colors.length) continue;
                var user = users.getUser(userId);
                var labels = [
                    member === null || member === void 0 ? void 0 : member.nick,
                    user === null || user === void 0 ? void 0 : user.globalName,
                    user === null || user === void 0 ? void 0 : user.username
                ].filter(function(value) {
                    return typeof value === 'string' && value.length > 0;
                });
                if (labels.length) result.push({
                    colors: appearance.colors,
                    labels: labels,
                    userId: userId
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
        return result;
    }
    function colorFor(hex) {
        var cached = colors.get(hex);
        if (cached) return cached;
        var channels = hexChannels(hex);
        if (!channels) return null;
        var color = call.apply(void 0, [
            bridge.getClass('UIColor'),
            'colorWithRed:green:blue:alpha:'
        ].concat(_to_consumable_array$3(channels), [
            1
        ]));
        if (colors.size >= 256) colors.clear();
        if (color) colors.set(hex, color);
        return color;
    }
    function colorMention(attributed, text, location, colors) {
        var characters = colors.length === 1 ? [
            text
        ] : Array.from(text);
        var position = location;
        for(var index = 0; index < characters.length; index++){
            var character = characters[index];
            var hex = roleColorAt(colors, characters.length === 1 ? 0 : index / (characters.length - 1));
            var color = hex ? colorFor(hex) : null;
            if (color) call(attributed, 'addAttribute:value:range:', 'NSColor', color, bridge.struct('NSRange', {
                location: position,
                length: character.length
            }));
            position += character.length;
        }
    }
    function childViews(root) {
        var queue = [
            root
        ];
        var result = [];
        for(var index = 0; index < queue.length && index < MAX_TEXT_VIEWS; index++){
            var view = queue[index];
            if (bridge.respondsTo(view, 'attributedText') && bridge.respondsTo(view, 'setAttributedText:')) {
                result.push(view);
            }
            var children = call(view, 'subviews');
            if (!children) continue;
            try {
                var _queue;
                (_queue = queue).push.apply(_queue, _to_consumable_array$3(Array.isArray(children) ? children : bridge.array(children)));
            } catch (unused) {
                continue;
            }
        }
        return result;
    }
    function restoreView(key) {
        var state = textViews.get(key);
        if (!state) return;
        var current = call(state.view, 'attributedText');
        if (call(current, 'isEqual:', state.applied)) {
            call(state.view, 'setAttributedText:', state.original);
        }
        textViews.delete(key);
    }
    function updateView(view, messageId, mentions) {
        var key = keyFor(view);
        if (!key) return;
        var current = call(view, 'attributedText');
        if (!current) return;
        var state = textViews.get(key);
        if ((state === null || state === void 0 ? void 0 : state.messageId) === messageId && call(current, 'isEqual:', state.applied)) return;
        if (state) textViews.delete(key);
        var text = call(current, 'string');
        if (typeof text !== 'string' || !text.includes('@')) return;
        var updated = bridge.alloc('NSMutableAttributedString');
        if (!call(updated, 'initWithAttributedString:', current)) return;
        var offset = 0;
        var changed = false;
        var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
        try {
            for(var _iterator = mentions[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                var mention = _step.value;
                for(var at = text.indexOf('@', offset); at >= 0; at = text.indexOf('@', at + 1)){
                    var label = selectMentionLabel(text.slice(at), mention.labels);
                    if (!label) continue;
                    var attributes = call(current, 'attributesAtIndex:effectiveRange:', at, null);
                    if (!(attributes === null || attributes === void 0 ? void 0 : attributes.YYTextHighlight)) continue;
                    var length = label.length + 1;
                    colorMention(updated, text.slice(at, at + length), at, mention.colors);
                    offset = at + length;
                    changed = true;
                    break;
                }
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
        if (!changed) return;
        textViews.set(key, {
            applied: updated,
            messageId: messageId,
            original: current,
            view: view
        });
        call(view, 'setAttributedText:', updated);
    }
    function renderCell(cell) {
        var _message_guildId;
        var _channels_getChannel;
        if (stopped || !enabled() || !currentChannelId) return;
        var messageId = messageIdForCell(cell);
        if (!messageId) return;
        var message = messages.getMessage(currentChannelId, messageId);
        if (!message) return;
        var guildId = (_message_guildId = message.guildId) !== null && _message_guildId !== void 0 ? _message_guildId : (_channels_getChannel = channels.getChannel(currentChannelId)) === null || _channels_getChannel === void 0 ? void 0 : _channels_getChannel.guild_id;
        if (!guildId) return;
        var mentions = mentionsFor(message, guildId);
        if (!mentions.length) return;
        var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
        try {
            for(var _iterator = childViews(cell)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                var view = _step.value;
                updateView(view, messageId, mentions);
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
    function scheduleCell(cell) {
        if (stopped || !enabled()) return;
        var key = keyFor(cell);
        if (!key || pendingCells.has(key)) return;
        pendingCells.add(key);
        var timer = setTimeout(function() {
            timers.delete(timer);
            pendingCells.delete(key);
            if (stopped) return;
            try {
                renderCell(cell);
            } catch (error) {
                console.error('Role Color Everywhere native mention rendering failed:', error);
            }
        }, 0);
        timers.add(timer);
    }
    function forgetCell(cell) {
        var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
        try {
            for(var _iterator = childViews(cell)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                var view = _step.value;
                var viewKey = keyFor(view);
                if (viewKey) textViews.delete(viewKey);
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
    function scanVisible() {
        if (stopped || !enabled()) return;
        var application = call(bridge.getClass('UIApplication'), 'sharedApplication');
        var windows = call(application, 'windows');
        if (!windows) return;
        var roots = Array.isArray(windows) ? windows : bridge.array(windows);
        var queue = roots.map(function(view) {
            return {
                depth: 0,
                view: view
            };
        });
        for(var index = 0; index < queue.length && index < MAX_SCAN_NODES$1; index++){
            var _bridge_className;
            var _queue_index = queue[index], depth = _queue_index.depth, view = _queue_index.view;
            if (((_bridge_className = bridge.className(view)) !== null && _bridge_className !== void 0 ? _bridge_className : '').includes('DCDMessageTableViewCell')) {
                if (call(view, 'window')) scheduleCell(view);
                continue;
            }
            if (depth >= MAX_SCAN_DEPTH) continue;
            var children = call(view, 'subviews');
            if (!children) continue;
            try {
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = (Array.isArray(children) ? children : bridge.array(children))[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var child = _step.value;
                        queue.push({
                            depth: depth + 1,
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
            } catch (unused) {
                continue;
            }
        }
    }
    function scheduleScan(delay) {
        var timer = setTimeout(function() {
            timers.delete(timer);
            try {
                scanVisible();
            } catch (error) {
                console.error('Role Color Everywhere visible-cell scan failed:', error);
            }
        }, delay);
        timers.add(timer);
    }
    function onChannelChange() {
        var nextChannelId = selected.getChannelId();
        if (!nextChannelId || nextChannelId === currentChannelId) return;
        currentChannelId = nextChannelId;
        pendingCells.clear();
        textViews.clear();
        for(var _i = 0, _iter = [
            0,
            100,
            500
        ]; _i < _iter.length; _i++){
            var delay = _iter[_i];
            scheduleScan(delay);
        }
    }
    hooks.push(bridge.hook('DCDMessageTableViewCell', 'didMoveToWindow', {
        after: function after(param) {
            var self = param.self;
            if (call(self, 'window')) scheduleCell(self);
            else forgetCell(self);
        }
    }), bridge.hook('DCDMessageTableViewCell', 'layoutSubviews', {
        after: function after(param) {
            var self = param.self;
            return scheduleCell(self);
        }
    }), bridge.hook('DCDMessageTableViewCell', 'prepareForReuse', {
        after: function after(param) {
            var self = param.self;
            return forgetCell(self);
        }
    }));
    (_selected_addChangeListener = selected.addChangeListener) === null || _selected_addChangeListener === void 0 ? void 0 : _selected_addChangeListener.call(selected, onChannelChange);
    for(var _i = 0, _iter = [
        0,
        100,
        500
    ]; _i < _iter.length; _i++){
        var delay = _iter[_i];
        scheduleScan(delay);
    }
    return function() {
        var _selected_removeChangeListener;
        stopped = true;
        (_selected_removeChangeListener = selected.removeChangeListener) === null || _selected_removeChangeListener === void 0 ? void 0 : _selected_removeChangeListener.call(selected, onChannelChange);
        var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
        try {
            for(var _iterator = hooks[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
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
        var _iteratorNormalCompletion1 = true, _didIteratorError1 = false, _iteratorError1 = undefined;
        try {
            for(var _iterator1 = timers[Symbol.iterator](), _step1; !(_iteratorNormalCompletion1 = (_step1 = _iterator1.next()).done); _iteratorNormalCompletion1 = true){
                var timer = _step1.value;
                clearTimeout(timer);
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
        var _iteratorNormalCompletion2 = true, _didIteratorError2 = false, _iteratorError2 = undefined;
        try {
            for(var _iterator2 = _to_consumable_array$3(textViews.keys())[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true){
                var key = _step2.value;
                restoreView(key);
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
        pendingCells.clear();
        colors.clear();
    };
}function _array_like_to_array$2(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _array_without_holes$2(arr) {
    if (Array.isArray(arr)) return _array_like_to_array$2(arr);
}
function _iterable_to_array$2(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) {
        return Array.from(iter);
    }
}
function _non_iterable_spread$2() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _to_consumable_array$2(arr) {
    return _array_without_holes$2(arr) || _iterable_to_array$2(arr) || _unsupported_iterable_to_array$2(arr) || _non_iterable_spread$2();
}
function _unsupported_iterable_to_array$2(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _array_like_to_array$2(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _array_like_to_array$2(o, minLen);
}
var MAX_SCAN_NODES = 1600;
var MAX_MEMBERS = 5000;
function installComposerMentionColors(bridge, members, enabled) {
    var users = window.unbound.metro.findStore('User');
    var channels = window.unbound.metro.findStore('Channel');
    var selected = window.unbound.metro.findByProps('getChannelId', 'getLastSelectedChannelId');
    if (!users || !channels || !selected) return function() {};
    var userStore = users;
    var channelStore = channels;
    var selectedStore = selected;
    var hooks = [];
    var states = new Map();
    var pending = new Map();
    var updating = new Set();
    var colors = new Map();
    var aliases = new Map();
    var stopped = false;
    function call(handle, selector) {
        for(var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++){
            args[_key - 2] = arguments[_key];
        }
        if (!handle) return null;
        try {
            return bridge.invoke(handle, selector, args, {
                thread: 'main'
            });
        } catch (unused) {
            return null;
        }
    }
    function keyFor(handle) {
        var hash = call(handle, 'hash');
        return hash == null ? null : "".concat(bridge.className(handle), ":").concat(String(hash));
    }
    function aliasesFor(guildId) {
        var _members_getMembers;
        var cached = aliases.get(guildId);
        if (cached) return cached;
        var result = new Map();
        var ambiguous = new Set();
        var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
        try {
            for(var _iterator = ((_members_getMembers = members.getMembers(guildId)) !== null && _members_getMembers !== void 0 ? _members_getMembers : []).slice(0, MAX_MEMBERS)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                var member = _step.value;
                var user = userStore.getUser(member.userId);
                var names = new Set([
                    member.nick,
                    user === null || user === void 0 ? void 0 : user.globalName,
                    user === null || user === void 0 ? void 0 : user.username,
                    (user === null || user === void 0 ? void 0 : user.username) && user.discriminator && user.discriminator !== '0' ? "".concat(user.username, "#").concat(user.discriminator) : null
                ].filter(function(value) {
                    return typeof value === 'string' && value.length > 0;
                }));
                var _iteratorNormalCompletion1 = true, _didIteratorError1 = false, _iteratorError1 = undefined;
                try {
                    for(var _iterator1 = names[Symbol.iterator](), _step1; !(_iteratorNormalCompletion1 = (_step1 = _iterator1.next()).done); _iteratorNormalCompletion1 = true){
                        var name = _step1.value;
                        var token = "@".concat(name);
                        if (ambiguous.has(token)) continue;
                        if (result.has(token) && result.get(token) !== member.userId) {
                            result.delete(token);
                            ambiguous.add(token);
                        } else result.set(token, member.userId);
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
        aliases.set(guildId, result);
        return result;
    }
    function nativeColor(hex) {
        var cached = colors.get(hex);
        if (cached) return cached;
        if (!/^#[\da-f]{6}$/i.test(hex)) return null;
        var value = Number.parseInt(hex.slice(1), 16);
        var color = call(bridge.getClass('UIColor'), 'colorWithRed:green:blue:alpha:', (value >> 16 & 0xff) / 255, (value >> 8 & 0xff) / 255, (value & 0xff) / 255, 1);
        if (colors.size >= 256) colors.clear();
        if (color) colors.set(hex, color);
        return color;
    }
    function colorToken(attributed, text, location, stops) {
        var characters = stops.length === 1 ? [
            text
        ] : Array.from(text);
        var position = location;
        for(var index = 0; index < characters.length; index++){
            var character = characters[index];
            var color = roleColorAt(stops, characters.length === 1 ? 0 : index / (characters.length - 1));
            var native = color ? nativeColor(color) : null;
            if (native) call(attributed, 'addAttribute:value:range:', 'NSColor', native, bridge.struct('NSRange', {
                location: position,
                length: character.length
            }));
            position += character.length;
        }
    }
    function update(view) {
        var _loop = function(at1) {
            var matchingToken = function matchingToken() {
                return ordered.find(function(alias) {
                    return text.startsWith(alias, at1) && (!text[at1 + alias.length] || RegExp("[\\s,.!?;:]", "u").test(text[at1 + alias.length]));
                });
            };
            var attributes = call(original, 'attributesAtIndex:effectiveRange:', at1, null);
            var font = attributes === null || attributes === void 0 ? void 0 : attributes.NSFont;
            var fontName = call(font, 'fontName');
            if (typeof fontName !== 'string' || !/bold|semibold/i.test(fontName)) return at = at1, "continue";
            var token = matchingToken();
            if (!token && !refreshed) {
                aliases.delete(guildId);
                allAliases = aliasesFor(guildId);
                ordered = _to_consumable_array$2(allAliases.keys()).sort(function(a, b) {
                    return b.length - a.length;
                });
                refreshed = true;
                token = matchingToken();
            }
            if (!token) return at = at1, "continue";
            var userId = allAliases.get(token);
            var member = userId ? members.getMember(guildId, userId) : null;
            var appearance = getRoleColorAppearance(member === null || member === void 0 ? void 0 : member.colorStrings, member === null || member === void 0 ? void 0 : member.colorString);
            if (!appearance.colors.length) return at = at1, "continue";
            colorToken(colored, token, at1, appearance.colors);
            at1 += token.length - 1;
            changed = true;
            at = at1;
        };
        var _channelStore_getChannel;
        if (stopped || !enabled()) return;
        var key = keyFor(view);
        if (!key || updating.has(key)) return;
        var channelId = selectedStore.getChannelId();
        var guildId = channelId ? (_channelStore_getChannel = channelStore.getChannel(channelId)) === null || _channelStore_getChannel === void 0 ? void 0 : _channelStore_getChannel.guild_id : undefined;
        if (!guildId) return;
        var original = call(view, 'attributedText');
        if (!original) return;
        var state = states.get(key);
        if (state && call(original, 'isEqual:', state.applied)) return;
        if (state) states.delete(key);
        var text = call(original, 'string');
        if (typeof text !== 'string' || !text.includes('@')) return;
        var allAliases = aliasesFor(guildId);
        var ordered = _to_consumable_array$2(allAliases.keys()).sort(function(a, b) {
            return b.length - a.length;
        });
        var refreshed = false;
        var colored = bridge.alloc('NSMutableAttributedString');
        if (!call(colored, 'initWithAttributedString:', original)) return;
        var changed = false;
        for(var at = text.indexOf('@'); at >= 0; at = text.indexOf('@', at + 1))_loop(at);
        if (!changed) return;
        var selection = call(view, 'selectedRange');
        updating.add(key);
        try {
            call(view, 'setAttributedText:', colored);
            if (selection) call(view, 'setSelectedRange:', selection);
            states.set(key, {
                applied: colored,
                original: original,
                view: view
            });
        } finally{
            updating.delete(key);
        }
    }
    function schedule(view) {
        if (stopped || !enabled()) return;
        var key = keyFor(view);
        if (!key || pending.has(key)) return;
        var timer = setTimeout(function() {
            pending.delete(key);
            try {
                update(view);
            } catch (error) {
                console.error('Role Color Everywhere composer rendering failed:', error);
            }
        }, 0);
        pending.set(key, timer);
    }
    function scanVisible() {
        var application = call(bridge.getClass('UIApplication'), 'sharedApplication');
        var windows = call(application, 'windows');
        if (!windows) return;
        var queue = Array.isArray(windows) ? _to_consumable_array$2(windows) : bridge.array(windows);
        for(var index = 0; index < queue.length && index < MAX_SCAN_NODES; index++){
            var view = queue[index];
            if (bridge.className(view) === 'DCDChatInputComponentView') schedule(view);
            var children = call(view, 'subviews');
            if (!children) continue;
            try {
                var _queue;
                (_queue = queue).push.apply(_queue, _to_consumable_array$2(Array.isArray(children) ? children : bridge.array(children)));
            } catch (unused) {
                continue;
            }
        }
    }
    function restore(key) {
        var state = states.get(key);
        if (!state) return;
        var current = call(state.view, 'attributedText');
        if (call(current, 'isEqual:', state.applied)) {
            var selection = call(state.view, 'selectedRange');
            updating.add(key);
            try {
                call(state.view, 'setAttributedText:', state.original);
                if (selection) call(state.view, 'setSelectedRange:', selection);
            } finally{
                updating.delete(key);
            }
        }
        states.delete(key);
    }
    try {
        hooks.push(bridge.hook('DCDChatInputComponentView', 'setAttributedText:', {
            after: function after(param) {
                var self = param.self;
                return schedule(self);
            }
        }), bridge.hook('DCDChatInputComponentView', 'setText:', {
            after: function after(param) {
                var self = param.self;
                return schedule(self);
            }
        }), bridge.hook('DCDChatInputComponentView', 'layoutSubviews', {
            after: function after(param) {
                var self = param.self;
                return schedule(self);
            }
        }), bridge.hook('DCDChatInputComponentView', 'didMoveToWindow', {
            after: function after(param) {
                var self = param.self;
                if (call(self, 'window')) schedule(self);
            }
        }));
        scanVisible();
    } catch (error) {
        console.error('Role Color Everywhere composer hook failed:', error);
        var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
        try {
            for(var _iterator = hooks[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
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
        return function() {};
    }
    return function() {
        stopped = true;
        var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
        try {
            for(var _iterator = hooks[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
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
        var _iteratorNormalCompletion1 = true, _didIteratorError1 = false, _iteratorError1 = undefined;
        try {
            for(var _iterator1 = pending.values()[Symbol.iterator](), _step1; !(_iteratorNormalCompletion1 = (_step1 = _iterator1.next()).done); _iteratorNormalCompletion1 = true){
                var timer = _step1.value;
                clearTimeout(timer);
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
        var _iteratorNormalCompletion2 = true, _didIteratorError2 = false, _iteratorError2 = undefined;
        try {
            for(var _iterator2 = _to_consumable_array$2(states.keys())[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true){
                var key = _step2.value;
                restore(key);
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
        pending.clear();
        aliases.clear();
        colors.clear();
    };
}function _array_like_to_array$1(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _array_without_holes$1(arr) {
    if (Array.isArray(arr)) return _array_like_to_array$1(arr);
}
function _iterable_to_array$1(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) {
        return Array.from(iter);
    }
}
function _non_iterable_spread$1() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _to_consumable_array$1(arr) {
    return _array_without_holes$1(arr) || _iterable_to_array$1(arr) || _unsupported_iterable_to_array$1(arr) || _non_iterable_spread$1();
}
function _unsupported_iterable_to_array$1(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _array_like_to_array$1(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _array_like_to_array$1(o, minLen);
}
var TYPING_INDICATOR_PATH = 'modules/chat/native/TypingIndicator.tsx';
function TypingNameRenderer(param) {
    var original = param.original, properties = param.properties, appearances = param.appearances;
    var result = original(properties);
    return paintRoleTextTree(result, appearances, {
        React: window.unbound.metro.common.React,
        Text: window.unbound.metro.common.ReactNative.Text
    });
}
function installTypingNameColors(members, enabled) {
    var _module_default;
    var module = window.unbound.metro.findByFilePath(TYPING_INDICATOR_PATH, {
        interop: false
    });
    var typing = window.unbound.metro.findStore('Typing');
    var users = window.unbound.metro.findStore('User');
    var channels = window.unbound.metro.findStore('Channel');
    var relationships = window.unbound.metro.findStore('Relationship');
    var selected = window.unbound.metro.findByProps('getChannelId', 'getLastSelectedChannelId');
    if (typeof (module === null || module === void 0 ? void 0 : (_module_default = module.default) === null || _module_default === void 0 ? void 0 : _module_default.type) !== 'function' || !typing || !users || !channels || !selected) return function() {};
    var stopped = false;
    function appearancesForTypingUsers() {
        var _typing_getTypingUsers;
        var _channels_getChannel;
        var appearances = new Map();
        if (stopped || !enabled()) return appearances;
        var channelId = selected.getChannelId();
        var guildId = channelId ? (_channels_getChannel = channels.getChannel(channelId)) === null || _channels_getChannel === void 0 ? void 0 : _channels_getChannel.guild_id : undefined;
        if (!guildId || !channelId) return appearances;
        var ambiguous = new Set();
        var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
        try {
            for(var _iterator = Object.keys((_typing_getTypingUsers = typing.getTypingUsers(channelId)) !== null && _typing_getTypingUsers !== void 0 ? _typing_getTypingUsers : {}).slice(0, 8)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                var userId = _step.value;
                var member = members.getMember(guildId, userId);
                var appearance = getRoleColorAppearance(member === null || member === void 0 ? void 0 : member.colorStrings, member === null || member === void 0 ? void 0 : member.colorString);
                if (!appearance.colors.length) continue;
                var user = users.getUser(userId);
                var names = new Set([
                    member === null || member === void 0 ? void 0 : member.nick,
                    relationships === null || relationships === void 0 ? void 0 : relationships.getNickname(userId),
                    user === null || user === void 0 ? void 0 : user.globalName,
                    user === null || user === void 0 ? void 0 : user.username
                ].filter(function(value) {
                    return typeof value === 'string' && value.length > 0;
                }));
                var _iteratorNormalCompletion1 = true, _didIteratorError1 = false, _iteratorError1 = undefined;
                try {
                    for(var _iterator1 = names[Symbol.iterator](), _step1; !(_iteratorNormalCompletion1 = (_step1 = _iterator1.next()).done); _iteratorNormalCompletion1 = true){
                        var name = _step1.value;
                        if (ambiguous.has(name)) continue;
                        if (appearances.has(name)) {
                            appearances.delete(name);
                            ambiguous.add(name);
                        } else appearances.set(name, appearance);
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
        return appearances;
    }
    var holder = module.default;
    var unpatch = window.unbound.patcher.after(holder, 'type', function(param) {
        var result = param.result;
        var _result_props;
        var renderItem = result === null || result === void 0 ? void 0 : (_result_props = result.props) === null || _result_props === void 0 ? void 0 : _result_props.renderItem;
        if (typeof renderItem !== 'function') return;
        var React = window.unbound.metro.common.React;
        return React.cloneElement(result, {
            renderItem: function renderItem1() {
                for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
                    args[_key] = arguments[_key];
                }
                var item = renderItem.apply(void 0, _to_consumable_array$1(args));
                if (typeof (item === null || item === void 0 ? void 0 : item.type) !== 'function') return item;
                return React.createElement(TypingNameRenderer, {
                    appearances: appearancesForTypingUsers(),
                    key: item.key,
                    original: item.type,
                    properties: item.props
                });
            }
        });
    });
    return function() {
        stopped = true;
        unpatch();
    };
}function _array_like_to_array(arr, len) {
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
var VOICE_NAME_PATH = 'modules/guild_sidebar/native/VoiceUserNameItem.tsx';
function installVoiceUserColors(members, enabled) {
    var module = window.unbound.metro.findByFilePath(VOICE_NAME_PATH, {
        interop: false
    });
    if (typeof (module === null || module === void 0 ? void 0 : module.default) !== 'function') return function() {};
    var names = module;
    return window.unbound.patcher.after(names, 'default', function(param) {
        var args = param.args, result = param.result;
        var _args_;
        var _result_props, _nameElement_props;
        if (!enabled()) return;
        var _ref = (_args_ = args[0]) !== null && _args_ !== void 0 ? _args_ : {}, guildId = _ref.guildId, user = _ref.user, member = _ref.member;
        if (!guildId || !(user === null || user === void 0 ? void 0 : user.id)) return;
        var resolvedMember = member !== null && member !== void 0 ? member : members.getMember(guildId, user.id);
        var appearance = getRoleColorAppearance(resolvedMember === null || resolvedMember === void 0 ? void 0 : resolvedMember.colorStrings, resolvedMember === null || resolvedMember === void 0 ? void 0 : resolvedMember.colorString);
        if (!appearance.colors.length) return;
        var children = result === null || result === void 0 ? void 0 : (_result_props = result.props) === null || _result_props === void 0 ? void 0 : _result_props.children;
        if (!Array.isArray(children)) return;
        var nameElement = children[0];
        var nameChildren = nameElement === null || nameElement === void 0 ? void 0 : (_nameElement_props = nameElement.props) === null || _nameElement_props === void 0 ? void 0 : _nameElement_props.children;
        var name = Array.isArray(nameChildren) ? nameChildren[0] : nameChildren;
        if (typeof name !== 'string') return;
        var _metro_common = window.unbound.metro.common, React = _metro_common.React, ReactNative = _metro_common.ReactNative;
        var text = React.createElement(ReactNative.Text, null, name);
        var colored = paintRoleTextTree(text, new Map([
            [
                name,
                appearance
            ]
        ]), {
            React: React,
            Text: ReactNative.Text
        });
        var styledName = React.cloneElement(nameElement, {
            children: Array.isArray(nameChildren) ? [
                colored
            ].concat(_to_consumable_array(nameChildren.slice(1))) : colored
        });
        return React.cloneElement(result, {
            children: [
                styledName
            ].concat(_to_consumable_array(children.slice(1)))
        });
    });
}var SETTINGS_SPACING = {
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
}var ADDON_ID = 'unbound.role-color-everywhere';
var STORE = window.unbound.storage.getStore(ADDON_ID);
var members = null;
var nativeObjC = null;
var unpatchRows = null;
var unpatchMemberList = null;
var unpatchNativeMentions = null;
var unpatchComposerMentions = null;
var unpatchTypingNames = null;
var unpatchReactionUsers = null;
var unpatchPollVoters = null;
var unpatchVoiceUsers = null;
var removeModuleListener = null;
function chatOptions() {
    return {
        chatMentions: STORE.get('chatMentions', true),
        colorChatMessages: STORE.get('colorChatMessages', false),
        messageSaturation: STORE.get('messageSaturation', 30)
    };
}
function patchRows() {
    var _RowManager_prototype;
    if (unpatchRows) return true;
    var RowManager = window.unbound.metro.findByName('RowManager');
    if (typeof (RowManager === null || RowManager === void 0 ? void 0 : (_RowManager_prototype = RowManager.prototype) === null || _RowManager_prototype === void 0 ? void 0 : _RowManager_prototype.generate) !== 'function' || !members) return false;
    unpatchRows = window.unbound.patcher.after(RowManager.prototype, 'generate', function(param) {
        var result = param.result;
        try {
            if (members) applyChatRoleColors(result, members, chatOptions());
        } catch (error) {
            console.error('Role Color Everywhere chat styling failed:', error);
        }
    });
    return true;
}
function setNativeMentions(enabled) {
    unpatchNativeMentions === null || unpatchNativeMentions === void 0 ? void 0 : unpatchNativeMentions();
    unpatchNativeMentions = null;
    unpatchComposerMentions === null || unpatchComposerMentions === void 0 ? void 0 : unpatchComposerMentions();
    unpatchComposerMentions = null;
    if (!enabled || !nativeObjC || !members) return;
    unpatchNativeMentions = installNativeMentionColors(nativeObjC, members, function() {
        return STORE.get('chatMentions', true);
    });
    unpatchComposerMentions = installComposerMentionColors(nativeObjC, members, function() {
        return STORE.get('chatMentions', true);
    });
}
function RoleColorSettings() {
    var _metro_findByProps;
    var settings = STORE.useSettingsStore();
    var Slider = (_metro_findByProps = window.unbound.metro.findByProps('Slider')) === null || _metro_findByProps === void 0 ? void 0 : _metro_findByProps.Slider;
    var colors = getSettingsColors();
    var saturation = settings.get('messageSaturation', 30);
    return /*#__PURE__*/ React.createElement(SettingsScrollView, null, /*#__PURE__*/ React.createElement(SettingsSection, {
        title: "Chat"
    }, /*#__PURE__*/ React.createElement(SettingsSwitchRow, {
        label: "Color Mentions",
        description: "Show the mentioned member’s role colors in chat and the composer",
        value: settings.get('chatMentions', true),
        onValueChange: function onValueChange(value) {
            settings.set('chatMentions', value);
            setNativeMentions(value);
        }
    }), /*#__PURE__*/ React.createElement(SettingsSwitchRow, {
        label: "Color Message Content",
        description: "Tint message text with the author’s role color",
        value: settings.get('colorChatMessages', false),
        onValueChange: function onValueChange(value) {
            return settings.set('colorChatMessages', value);
        }
    }), Slider ? /*#__PURE__*/ React.createElement(SettingsCard, null, /*#__PURE__*/ React.createElement(window.unbound.metro.common.ReactNative.View, {
        style: {
            gap: 10
        }
    }, /*#__PURE__*/ React.createElement(window.unbound.metro.common.ReactNative.Text, {
        style: {
            color: colors.text,
            fontSize: 16,
            fontWeight: '700'
        }
    }, "Message color intensity \xb7 ", saturation, "%"), /*#__PURE__*/ React.createElement(Slider, {
        minimumValue: 0,
        maximumValue: 100,
        value: saturation,
        onValueChange: function onValueChange(value) {
            return settings.set('messageSaturation', Math.round(value / 10) * 10);
        }
    }))) : null), /*#__PURE__*/ React.createElement(SettingsSection, {
        title: "People and Roles"
    }, /*#__PURE__*/ React.createElement(SettingsSwitchRow, {
        label: "Typing Names",
        description: "Color names in the channel typing indicator",
        value: settings.get('typingUsers', true),
        onValueChange: function onValueChange(value) {
            return settings.set('typingUsers', value);
        }
    }), /*#__PURE__*/ React.createElement(SettingsSwitchRow, {
        label: "Member List Role Headers",
        description: "Color role section titles in the member list",
        value: settings.get('memberList', true),
        onValueChange: function onValueChange(value) {
            return settings.set('memberList', value);
        }
    }), /*#__PURE__*/ React.createElement(SettingsSwitchRow, {
        label: "Reaction Users",
        description: "Color names in the reaction details list",
        value: settings.get('reactorsList', true),
        onValueChange: function onValueChange(value) {
            return settings.set('reactorsList', value);
        }
    }), /*#__PURE__*/ React.createElement(SettingsSwitchRow, {
        label: "Poll Voters",
        description: "Color names in poll result details",
        value: settings.get('pollResults', true),
        onValueChange: function onValueChange(value) {
            return settings.set('pollResults', value);
        }
    }), /*#__PURE__*/ React.createElement(SettingsSwitchRow, {
        label: "Voice Users",
        description: "Color members’ names in voice user lists",
        value: settings.get('voiceUsers', true),
        onValueChange: function onValueChange(value) {
            return settings.set('voiceUsers', value);
        }
    })));
}
var index = {
    start: function start(context) {
        var _ref;
        members = window.unbound.metro.findStore('GuildMember');
        if (members) unpatchTypingNames = installTypingNameColors(members, function() {
            return STORE.get('typingUsers', true);
        });
        if (members) unpatchReactionUsers = installReactionUserColors(members, function() {
            return STORE.get('reactorsList', true);
        });
        if (members) unpatchPollVoters = installPollVoterColors(members, function() {
            return STORE.get('pollResults', true);
        });
        if (members) unpatchVoiceUsers = installVoiceUserColors(members, function() {
            return STORE.get('voiceUsers', true);
        });
        nativeObjC = (_ref = context === null || context === void 0 ? void 0 : context.native.objc) !== null && _ref !== void 0 ? _ref : null;
        setNativeMentions(STORE.get('chatMentions', true));
        var roles = window.unbound.metro.findStore('GuildRole');
        if (roles && members) unpatchMemberList = installMemberListColors(roles, members, function() {
            return STORE.get('memberList', true);
        });
        if (patchRows()) return;
        removeModuleListener = window.unbound.metro.addListener(function() {
            if (!patchRows()) return;
            removeModuleListener === null || removeModuleListener === void 0 ? void 0 : removeModuleListener();
            removeModuleListener = null;
        });
    },
    stop: function stop() {
        unpatchComposerMentions === null || unpatchComposerMentions === void 0 ? void 0 : unpatchComposerMentions();
        unpatchComposerMentions = null;
        unpatchTypingNames === null || unpatchTypingNames === void 0 ? void 0 : unpatchTypingNames();
        unpatchTypingNames = null;
        unpatchReactionUsers === null || unpatchReactionUsers === void 0 ? void 0 : unpatchReactionUsers();
        unpatchReactionUsers = null;
        unpatchPollVoters === null || unpatchPollVoters === void 0 ? void 0 : unpatchPollVoters();
        unpatchPollVoters = null;
        unpatchVoiceUsers === null || unpatchVoiceUsers === void 0 ? void 0 : unpatchVoiceUsers();
        unpatchVoiceUsers = null;
        unpatchNativeMentions === null || unpatchNativeMentions === void 0 ? void 0 : unpatchNativeMentions();
        unpatchNativeMentions = null;
        unpatchMemberList === null || unpatchMemberList === void 0 ? void 0 : unpatchMemberList();
        unpatchMemberList = null;
        unpatchRows === null || unpatchRows === void 0 ? void 0 : unpatchRows();
        unpatchRows = null;
        removeModuleListener === null || removeModuleListener === void 0 ? void 0 : removeModuleListener();
        removeModuleListener = null;
        nativeObjC = null;
        members = null;
    },
    getSettingsPanel: function getSettingsPanel() {
        return /*#__PURE__*/ React.createElement(RoleColorSettings, null);
    }
};
return index;
})();return this.__plugin;},start(context){const module=this.__load();const plugin=module?.default??module;if(plugin&&typeof plugin.start==='function')return plugin.start(context);},stop(){const module=this.__load();const plugin=module?.default??module;if(plugin&&typeof plugin.stop==='function')return plugin.stop();},getSettingsPanel(...args){const module=this.__load();const plugin=module?.default??module;const settingsPanel=plugin?.getSettingsPanel??module?.getSettingsPanel;if(typeof settingsPanel==='function')return settingsPanel.apply(plugin,args);return null;}})