({__plugin:null,__load(){if(this.__plugin)return this.__plugin;this.__plugin=(function () {
'use strict';
function _array_like_to_array$1(arr, len) {
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
function _type_of$1(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
function _unsupported_iterable_to_array$1(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _array_like_to_array$1(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _array_like_to_array$1(o, minLen);
}
var TEXT_REPLACE_RULES_CHANNEL_ID = '1102784112584040479';
var RULESET_VERSION = 1;
var ruleIndex = 0;
function createRule() {
    ruleIndex++;
    return {
        find: '',
        replace: '',
        onlyIfIncludes: '',
        id: "".concat(Date.now(), "-").concat(ruleIndex, "-").concat(Math.random().toString(36).slice(2))
    };
}
function normalizeRules(value) {
    if (!Array.isArray(value) || value.length === 0) return [
        createRule()
    ];
    return value.map(function(rule) {
        return {
            find: typeof (rule === null || rule === void 0 ? void 0 : rule.find) === 'string' ? rule.find : '',
            replace: typeof (rule === null || rule === void 0 ? void 0 : rule.replace) === 'string' ? rule.replace : '',
            onlyIfIncludes: typeof (rule === null || rule === void 0 ? void 0 : rule.onlyIfIncludes) === 'string' ? rule.onlyIfIncludes : '',
            id: typeof (rule === null || rule === void 0 ? void 0 : rule.id) === 'string' && rule.id ? rule.id : createRule().id
        };
    });
}
function hasRuleContent(rule) {
    return Boolean(rule.find || rule.replace || rule.onlyIfIncludes);
}
function exportRules(rules) {
    return rules.filter(hasRuleContent).map(function(rule) {
        return {
            find: rule.find,
            replace: rule.replace,
            onlyIfIncludes: rule.onlyIfIncludes
        };
    });
}
function serializeRuleset(stringRules, regexRules) {
    return JSON.stringify({
        version: RULESET_VERSION,
        stringRules: exportRules(stringRules),
        regexRules: exportRules(regexRules)
    }, null, 2);
}
function parseRuleset(value) {
    var parsed;
    try {
        parsed = typeof value === 'string' ? JSON.parse(value) : value;
    } catch (unused) {
        throw new Error('This is not valid JSON.');
    }
    if (!parsed || (typeof parsed === "undefined" ? "undefined" : _type_of$1(parsed)) !== 'object') throw new Error('This is not a Text Replace ruleset.');
    var ruleset = parsed;
    if (ruleset.version !== RULESET_VERSION || !Array.isArray(ruleset.stringRules) || !Array.isArray(ruleset.regexRules)) {
        throw new Error('This Text Replace ruleset is unsupported.');
    }
    return {
        stringRules: normalizeRules(ruleset.stringRules).filter(hasRuleContent),
        regexRules: normalizeRules(ruleset.regexRules).filter(hasRuleContent)
    };
}
function stringToRegex(value) {
    var match = value.match(/^(\/)?(.+?)(?:\/([gimsuyv]*))?$/);
    var flags = (match === null || match === void 0 ? void 0 : match[3]) ? _to_consumable_array$1(new Set(match[3])).join('') : 'g';
    return new RegExp(match ? match[2] : value, flags);
}
function applies(rule, content) {
    return Boolean(rule.find) && (!rule.onlyIfIncludes || content.includes(rule.onlyIfIncludes));
}
function replaceNewlines(value) {
    return value.replaceAll('\\n', '\n');
}
function applyRules(content, stringRules, regexRules) {
    if (!content) return content;
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
    try {
        for(var _iterator = stringRules[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
            var rule = _step.value;
            if (!applies(rule, content)) continue;
            content = " ".concat(content, " ").replaceAll(rule.find, replaceNewlines(rule.replace)).replace(/^\s|\s$/g, '');
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
        for(var _iterator1 = regexRules[Symbol.iterator](), _step1; !(_iteratorNormalCompletion1 = (_step1 = _iterator1.next()).done); _iteratorNormalCompletion1 = true){
            var rule1 = _step1.value;
            if (!applies(rule1, content)) continue;
            try {
                content = content.replace(stringToRegex(rule1.find), replaceNewlines(rule1.replace));
            } catch (unused) {}
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
    return content.trim();
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
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
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
function _instanceof(left, right) {
    "@swc/helpers - instanceof";
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
        return !!right[Symbol.hasInstance](left);
    } else return left instanceof right;
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
function _unsupported_iterable_to_array(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _array_like_to_array(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _array_like_to_array(o, minLen);
}
var STORE$1 = window.unbound.storage.getStore('unbound.text-replace');
function getRules$1(kind) {
    return normalizeRules(STORE$1.get(kind, [])).filter(function(rule) {
        return rule.find || rule.replace || rule.onlyIfIncludes;
    });
}
function saveRules(kind, rules) {
    STORE$1.set(kind, rules.length ? rules : [
        createRule()
    ]);
}
function parseRgb(value) {
    var hex = value.match(/^#([\da-f]{3}|[\da-f]{6})$/i);
    if (hex) {
        var normalized = hex[1].length === 3 ? hex[1].replace(/./g, function(part) {
            return "".concat(part).concat(part);
        }) : hex[1];
        return [
            0,
            2,
            4
        ].map(function(index) {
            return Number.parseInt(normalized.slice(index, index + 2), 16);
        });
    }
    var rgb = value.match(/^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i);
    if (!rgb) return null;
    return [
        Number(rgb[1]),
        Number(rgb[2]),
        Number(rgb[3])
    ];
}
function getLuminance(value) {
    var rgb = parseRgb(value);
    if (!rgb) return null;
    var channels = rgb.map(function(channel) {
        var normalized = channel / 255;
        return normalized <= 0.03928 ? normalized / 12.92 : Math.pow((normalized + 0.055) / 1.055, 2.4);
    });
    return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
}
function getReadableText(background) {
    var light = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : '#f2f3f5', dark = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : '#1f2329';
    var luminance = getLuminance(background);
    return luminance !== null && luminance > 0.52 ? dark : light;
}
function getThemeColor(colors, key, fallback) {
    var value = colors[key];
    return typeof value === 'string' && value.trim() ? value : fallback;
}
function getColors() {
    var _ref;
    var _metro_common_Theme;
    var colors = (_ref = (_metro_common_Theme = window.unbound.metro.common.Theme) === null || _metro_common_Theme === void 0 ? void 0 : _metro_common_Theme.colors) !== null && _ref !== void 0 ? _ref : {};
    var page = getThemeColor(colors, 'BACKGROUND_MOBILE_PRIMARY', getThemeColor(colors, 'BACKGROUND_PRIMARY', '#111214'));
    var surface = getThemeColor(colors, 'BACKGROUND_SECONDARY', '#1e1f22');
    var surfaceAlt = getThemeColor(colors, 'BACKGROUND_SECONDARY_ALT', '#232428');
    var input = getThemeColor(colors, 'BACKGROUND_TERTIARY', getThemeColor(colors, 'BACKGROUND_PRIMARY', '#111214'));
    var accent = getThemeColor(colors, 'BUTTON_FILLED_BRAND_BACKGROUND', getThemeColor(colors, 'BRAND_500', '#5865f2'));
    return {
        page: page,
        surface: surface,
        surfaceAlt: surfaceAlt,
        input: input,
        border: getThemeColor(colors, 'BACKGROUND_MODIFIER_ACCENT', '#4e5058'),
        text: getReadableText(page),
        muted: getReadableText(surface, '#c8cad0', '#4f5660'),
        accent: accent,
        accentText: getReadableText(accent),
        danger: getThemeColor(colors, 'BUTTON_DANGER_BACKGROUND', '#ed4245'),
        link: getThemeColor(colors, 'TEXT_LINK', '#00a8fc')
    };
}
function getClipboard() {
    var _metro_common_Clipboard;
    return (_metro_common_Clipboard = window.unbound.metro.common.Clipboard) !== null && _metro_common_Clipboard !== void 0 ? _metro_common_Clipboard : null;
}
function getShare() {
    var _ref, _ref1;
    var ReactNative = window.unbound.metro.common.ReactNative;
    return (_ref = (_ref1 = ReactNative === null || ReactNative === void 0 ? void 0 : ReactNative.Share) !== null && _ref1 !== void 0 ? _ref1 : window.unbound.metro.common.Share) !== null && _ref !== void 0 ? _ref : null;
}
function exportRuleset(stringRules, regexRules) {
    return _async_to_generator(function() {
        var value, clipboard, copied, share;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    value = serializeRuleset(stringRules, regexRules);
                    clipboard = getClipboard();
                    copied = false;
                    if (!(typeof (clipboard === null || clipboard === void 0 ? void 0 : clipboard.setString) === 'function')) return [
                        3,
                        4
                    ];
                    _state.label = 1;
                case 1:
                    _state.trys.push([
                        1,
                        3,
                        ,
                        4
                    ]);
                    return [
                        4,
                        clipboard.setString(value)
                    ];
                case 2:
                    _state.sent();
                    copied = true;
                    return [
                        3,
                        4
                    ];
                case 3:
                    _state.sent();
                    return [
                        3,
                        4
                    ];
                case 4:
                    share = getShare();
                    if (!(typeof (share === null || share === void 0 ? void 0 : share.share) === 'function')) return [
                        3,
                        8
                    ];
                    _state.label = 5;
                case 5:
                    _state.trys.push([
                        5,
                        7,
                        ,
                        8
                    ]);
                    return [
                        4,
                        share.share({
                            message: value
                        })
                    ];
                case 6:
                    _state.sent();
                    window.unbound.toasts.showToast({
                        title: 'Text Replace',
                        content: copied ? 'Ruleset copied and ready to share.' : 'Ruleset shared.'
                    });
                    return [
                        2
                    ];
                case 7:
                    _state.sent();
                    return [
                        3,
                        8
                    ];
                case 8:
                    window.unbound.toasts.showToast({
                        title: 'Text Replace',
                        content: copied ? 'Ruleset copied to your clipboard.' : 'Sharing is unavailable on this client build.'
                    });
                    return [
                        2
                    ];
            }
        });
    })();
}
function readClipboard() {
    return _async_to_generator(function() {
        var clipboard, value;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    clipboard = getClipboard();
                    if (typeof (clipboard === null || clipboard === void 0 ? void 0 : clipboard.getString) !== 'function') return [
                        2,
                        null
                    ];
                    _state.label = 1;
                case 1:
                    _state.trys.push([
                        1,
                        3,
                        ,
                        4
                    ]);
                    return [
                        4,
                        clipboard.getString()
                    ];
                case 2:
                    value = _state.sent();
                    return [
                        2,
                        typeof value === 'string' ? value : null
                    ];
                case 3:
                    _state.sent();
                    return [
                        2,
                        null
                    ];
                case 4:
                    return [
                        2
                    ];
            }
        });
    })();
}
function RuleInput(param) {
    var label = param.label, value = param.value, placeholder = param.placeholder, multiline = param.multiline, compact = param.compact, onChange = param.onChange;
    var ReactNative = window.unbound.metro.common.ReactNative;
    var colors = getColors();
    return /*#__PURE__*/ React.createElement(ReactNative.View, {
        style: {
            gap: 8
        }
    }, /*#__PURE__*/ React.createElement(ReactNative.Text, {
        style: {
            color: colors.text,
            fontSize: 15,
            fontWeight: '700'
        }
    }, label), /*#__PURE__*/ React.createElement(ReactNative.TextInput, {
        autoCapitalize: "none",
        autoCorrect: false,
        multiline: multiline,
        placeholder: placeholder,
        placeholderTextColor: colors.muted,
        style: {
            backgroundColor: colors.input,
            borderColor: colors.border,
            borderRadius: 12,
            borderWidth: 1,
            color: getReadableText(colors.input),
            fontSize: compact ? 14 : 16,
            minHeight: compact ? multiline ? 64 : 40 : multiline ? 96 : 48,
            paddingHorizontal: 14,
            paddingVertical: compact ? 8 : 12,
            textAlignVertical: multiline ? 'top' : 'center'
        },
        value: value,
        onChangeText: onChange
    }));
}
function Button(param) {
    var label = param.label, onPress = param.onPress, disabled = param.disabled, danger = param.danger, secondary = param.secondary, compact = param.compact;
    var ReactNative = window.unbound.metro.common.ReactNative;
    var colors = getColors();
    var backgroundColor = danger ? colors.danger : secondary ? colors.surface : colors.accent;
    return /*#__PURE__*/ React.createElement(ReactNative.Pressable, {
        disabled: disabled,
        onPress: onPress,
        style: function style(param) {
            var pressed = param.pressed;
            return {
                alignItems: 'center',
                backgroundColor: backgroundColor,
                borderColor: secondary ? colors.border : backgroundColor,
                borderRadius: 12,
                borderWidth: 1,
                opacity: disabled || pressed ? 0.5 : 1,
                flex: compact ? 1 : undefined,
                paddingHorizontal: compact ? 10 : 16,
                paddingVertical: compact ? 10 : 14
            };
        }
    }, /*#__PURE__*/ React.createElement(ReactNative.Text, {
        style: {
            color: secondary ? colors.text : colors.accentText,
            fontSize: compact ? 14 : 16,
            fontWeight: '800'
        }
    }, label));
}
function RuleEditor(param) {
    var editing = param.editing, onClose = param.onClose, onSave = param.onSave, onDelete = param.onDelete;
    var ReactNative = window.unbound.metro.common.ReactNative;
    var colors = getColors();
    var _useState = _sliced_to_array(window.React.useState(editing.rule), 2), draft = _useState[0], setDraft = _useState[1];
    var isRegex = editing.kind === 'regexRules';
    window.React.useEffect(function() {
        return setDraft(editing.rule);
    }, [
        editing.rule
    ]);
    function update(field, value) {
        setDraft(function(rule) {
            return _object_spread_props(_object_spread({}, rule), _define_property({}, field, value));
        });
    }
    return /*#__PURE__*/ React.createElement(ReactNative.ScrollView, {
        contentContainerStyle: {
            backgroundColor: colors.page,
            gap: 20,
            padding: 16,
            paddingBottom: 32
        }
    }, /*#__PURE__*/ React.createElement(ReactNative.View, {
        style: {
            gap: 8
        }
    }, /*#__PURE__*/ React.createElement(ReactNative.Pressable, {
        onPress: onClose,
        hitSlop: 8,
        style: {
            alignSelf: 'flex-start',
            paddingVertical: 4
        }
    }, /*#__PURE__*/ React.createElement(ReactNative.Text, {
        style: {
            color: colors.link,
            fontSize: 16,
            fontWeight: '700'
        }
    }, "‹ Back to rules")), /*#__PURE__*/ React.createElement(ReactNative.Text, {
        style: {
            color: colors.text,
            fontSize: 24,
            fontWeight: '800'
        }
    }, editing.isNew ? "New ".concat(isRegex ? 'regex' : 'text', " rule") : 'Edit rule'), /*#__PURE__*/ React.createElement(ReactNative.Text, {
        style: {
            color: colors.muted,
            fontSize: 15,
            lineHeight: 21
        }
    }, isRegex ? 'Use a JavaScript pattern such as /hello/gi. Invalid patterns are skipped when sending.' : 'This replaces every matching piece of text before the message is sent.')), /*#__PURE__*/ React.createElement(RuleInput, {
        label: isRegex ? 'Pattern' : 'Find text',
        placeholder: isRegex ? '/pattern/gi' : 'What should change?',
        value: draft.find,
        onChange: function onChange(value) {
            return update('find', value);
        }
    }), /*#__PURE__*/ React.createElement(RuleInput, {
        label: "Replace with",
        multiline: true,
        placeholder: "What should it become? Use \\\\n for a new line.",
        value: draft.replace,
        onChange: function onChange(value) {
            return update('replace', value);
        }
    }), /*#__PURE__*/ React.createElement(ReactNative.View, {
        style: {
            gap: 6
        }
    }, /*#__PURE__*/ React.createElement(RuleInput, {
        label: "Only when the message contains",
        placeholder: "Optional condition",
        value: draft.onlyIfIncludes,
        onChange: function onChange(value) {
            return update('onlyIfIncludes', value);
        }
    }), /*#__PURE__*/ React.createElement(ReactNative.Text, {
        style: {
            color: colors.muted,
            fontSize: 13,
            lineHeight: 18
        }
    }, "Leave this blank to apply the rule everywhere.")), /*#__PURE__*/ React.createElement(Button, {
        disabled: !draft.find.trim(),
        label: "Save rule",
        onPress: function onPress() {
            return onSave(draft);
        }
    }), !editing.isNew ? /*#__PURE__*/ React.createElement(Button, {
        danger: true,
        label: "Delete rule",
        onPress: onDelete
    }) : null);
}
function RuleRow(param) {
    var rule = param.rule, isRegex = param.isRegex, onPress = param.onPress;
    var ReactNative = window.unbound.metro.common.ReactNative;
    var colors = getColors();
    var condition = rule.onlyIfIncludes ? "Only when it includes “".concat(rule.onlyIfIncludes, "”") : 'Applies to every message';
    return /*#__PURE__*/ React.createElement(ReactNative.Pressable, {
        onPress: onPress,
        style: function style(param) {
            var pressed = param.pressed;
            return {
                backgroundColor: colors.surfaceAlt,
                borderColor: colors.border,
                borderRadius: 14,
                borderWidth: 1,
                opacity: pressed ? 0.72 : 1,
                padding: 14
            };
        }
    }, /*#__PURE__*/ React.createElement(ReactNative.View, {
        style: {
            alignItems: 'center',
            flexDirection: 'row',
            gap: 12
        }
    }, /*#__PURE__*/ React.createElement(ReactNative.View, {
        style: {
            flex: 1,
            gap: 4
        }
    }, /*#__PURE__*/ React.createElement(ReactNative.Text, {
        numberOfLines: 1,
        style: {
            color: colors.text,
            fontSize: 16,
            fontWeight: '800'
        }
    }, rule.find), /*#__PURE__*/ React.createElement(ReactNative.Text, {
        numberOfLines: 1,
        style: {
            color: colors.text,
            fontSize: 14
        }
    }, "→ ", rule.replace || 'Remove it'), /*#__PURE__*/ React.createElement(ReactNative.Text, {
        numberOfLines: 1,
        style: {
            color: colors.muted,
            fontSize: 13
        }
    }, isRegex ? 'Regex · ' : '', condition)), /*#__PURE__*/ React.createElement(ReactNative.Text, {
        style: {
            color: colors.muted,
            fontSize: 24
        }
    }, "›")));
}
function RuleTester(param) {
    var stringRules = param.stringRules, regexRules = param.regexRules;
    var ReactNative = window.unbound.metro.common.ReactNative;
    var colors = getColors();
    var _useState = _sliced_to_array(window.React.useState(''), 2), example = _useState[0], setExample = _useState[1];
    var output = applyRules(example, stringRules, regexRules);
    return /*#__PURE__*/ React.createElement(ReactNative.View, {
        style: {
            gap: 12
        }
    }, /*#__PURE__*/ React.createElement(ReactNative.Text, {
        style: {
            color: colors.text,
            fontSize: 18,
            fontWeight: '800'
        }
    }, "Try your rules"), /*#__PURE__*/ React.createElement(RuleInput, {
        label: "Example message",
        multiline: true,
        placeholder: "Type a message to test",
        value: example,
        onChange: setExample
    }), /*#__PURE__*/ React.createElement(ReactNative.View, {
        style: {
            backgroundColor: colors.surfaceAlt,
            borderColor: colors.border,
            borderRadius: 14,
            borderWidth: 1,
            gap: 6,
            padding: 14
        }
    }, /*#__PURE__*/ React.createElement(ReactNative.Text, {
        style: {
            color: colors.muted,
            fontSize: 13,
            fontWeight: '700'
        }
    }, "RESULT"), /*#__PURE__*/ React.createElement(ReactNative.Text, {
        style: {
            color: colors.text,
            fontSize: 16,
            lineHeight: 22
        }
    }, output || 'Your transformed message will appear here.')));
}
function RulesetTransfer(param) {
    var stringRules = param.stringRules, regexRules = param.regexRules, onImported = param.onImported;
    var ReactNative = window.unbound.metro.common.ReactNative;
    var colors = getColors();
    var _useState = _sliced_to_array(window.React.useState(''), 2), importText = _useState[0], setImportText = _useState[1];
    function importValue(value) {
        try {
            onImported(parseRuleset(value));
            setImportText('');
        } catch (error) {
            window.unbound.toasts.showToast({
                title: 'Text Replace',
                content: _instanceof(error, Error) ? error.message : 'Could not import ruleset.'
            });
        }
    }
    function importClipboard() {
        return _async_to_generator(function() {
            var value;
            return _ts_generator(this, function(_state) {
                switch(_state.label){
                    case 0:
                        return [
                            4,
                            readClipboard()
                        ];
                    case 1:
                        value = _state.sent();
                        if (!(value === null || value === void 0 ? void 0 : value.trim())) {
                            window.unbound.toasts.showToast({
                                title: 'Text Replace',
                                content: 'Your clipboard does not contain a ruleset.'
                            });
                            return [
                                2
                            ];
                        }
                        importValue(value);
                        return [
                            2
                        ];
                }
            });
        })();
    }
    return /*#__PURE__*/ React.createElement(ReactNative.View, {
        style: {
            backgroundColor: colors.surface,
            borderColor: colors.border,
            borderRadius: 12,
            borderWidth: 1,
            gap: 8,
            padding: 10
        }
    }, /*#__PURE__*/ React.createElement(ReactNative.View, {
        style: {
            gap: 5
        }
    }, /*#__PURE__*/ React.createElement(ReactNative.Text, {
        style: {
            color: colors.text,
            fontSize: 16,
            fontWeight: '800'
        }
    }, "Share rules"), /*#__PURE__*/ React.createElement(ReactNative.Text, {
        style: {
            color: colors.muted,
            fontSize: 13,
            lineHeight: 18
        }
    }, "Export or import both rule lists as portable JSON.")), /*#__PURE__*/ React.createElement(ReactNative.View, {
        style: {
            flexDirection: 'row',
            gap: 8
        }
    }, /*#__PURE__*/ React.createElement(Button, {
        compact: true,
        label: "Export & share",
        onPress: function onPress() {
            return void exportRuleset(stringRules, regexRules);
        }
    }), /*#__PURE__*/ React.createElement(Button, {
        compact: true,
        label: "Import clipboard",
        onPress: function onPress() {
            return void importClipboard();
        },
        secondary: true
    })), /*#__PURE__*/ React.createElement(RuleInput, {
        compact: true,
        label: "Paste JSON",
        multiline: true,
        placeholder: "Paste exported Text Replace JSON here",
        value: importText,
        onChange: setImportText
    }), /*#__PURE__*/ React.createElement(Button, {
        compact: true,
        disabled: !importText.trim(),
        label: "Import pasted",
        onPress: function onPress() {
            return importValue(importText);
        },
        secondary: true
    }));
}
function TextReplaceSettingsScreen() {
    var ReactNative = window.unbound.metro.common.ReactNative;
    var colors = getColors();
    var _useState = _sliced_to_array(window.React.useState(0), 2), setRevision = _useState[1];
    var _useState1 = _sliced_to_array(window.React.useState('stringRules'), 2), kind = _useState1[0], setKind = _useState1[1];
    var _useState2 = _sliced_to_array(window.React.useState(null), 2), editing = _useState2[0], setEditing = _useState2[1];
    var _useState3 = _sliced_to_array(window.React.useState(true), 2), showTester = _useState3[0], setShowTester = _useState3[1];
    var stringRules = getRules$1('stringRules');
    var regexRules = getRules$1('regexRules');
    var rules = kind === 'stringRules' ? stringRules : regexRules;
    var isRegex = kind === 'regexRules';
    var subtitle = window.React.useMemo(function() {
        return isRegex ? 'Powerful pattern replacements for advanced rules.' : 'Simple text replacements that work as you type.';
    }, [
        isRegex
    ]);
    function refresh() {
        setRevision(function(value) {
            return value + 1;
        });
    }
    function saveEditedRule(rule) {
        var currentRules = getRules$1(editing.kind);
        var nextRules = editing.isNew ? _to_consumable_array(currentRules).concat([
            rule
        ]) : currentRules.map(function(current) {
            return current.id === rule.id ? rule : current;
        });
        saveRules(editing.kind, nextRules);
        setEditing(null);
        refresh();
    }
    function deleteEditedRule() {
        if (!editing) return;
        saveRules(editing.kind, getRules$1(editing.kind).filter(function(rule) {
            return rule.id !== editing.rule.id;
        }));
        setEditing(null);
        refresh();
    }
    function importRuleset(ruleset) {
        saveRules('stringRules', ruleset.stringRules);
        saveRules('regexRules', ruleset.regexRules);
        refresh();
        window.unbound.toasts.showToast({
            title: 'Text Replace',
            content: 'Ruleset imported.'
        });
    }
    if (editing) {
        return /*#__PURE__*/ React.createElement(RuleEditor, {
            editing: editing,
            onClose: function onClose() {
                return setEditing(null);
            },
            onDelete: deleteEditedRule,
            onSave: saveEditedRule
        });
    }
    return /*#__PURE__*/ React.createElement(ReactNative.ScrollView, {
        contentContainerStyle: {
            backgroundColor: colors.page,
            gap: 20,
            padding: 16,
            paddingBottom: 32
        }
    }, /*#__PURE__*/ React.createElement(ReactNative.View, {
        style: {
            gap: 8
        }
    }, /*#__PURE__*/ React.createElement(ReactNative.Text, {
        style: {
            color: colors.text,
            fontSize: 24,
            fontWeight: '800'
        }
    }, "Text Replace"), /*#__PURE__*/ React.createElement(ReactNative.Text, {
        style: {
            color: colors.muted,
            fontSize: 15,
            lineHeight: 21
        }
    }, "Automatically rewrite messages before you send them.")), /*#__PURE__*/ React.createElement(ReactNative.View, {
        style: {
            gap: 10
        }
    }, /*#__PURE__*/ React.createElement(ReactNative.Pressable, {
        onPress: function onPress() {
            return setShowTester(function(value) {
                return !value;
            });
        },
        style: function style(param) {
            var pressed = param.pressed;
            return {
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between',
                opacity: pressed ? 0.7 : 1,
                paddingVertical: 4
            };
        }
    }, /*#__PURE__*/ React.createElement(ReactNative.Text, {
        style: {
            color: colors.link,
            fontSize: 16,
            fontWeight: '800'
        }
    }, "Test your rules"), /*#__PURE__*/ React.createElement(ReactNative.Text, {
        style: {
            color: colors.link,
            fontSize: 20
        }
    }, showTester ? '⌃' : '⌄')), showTester ? /*#__PURE__*/ React.createElement(RuleTester, {
        regexRules: regexRules,
        stringRules: stringRules
    }) : null), /*#__PURE__*/ React.createElement(RulesetTransfer, {
        regexRules: regexRules,
        stringRules: stringRules,
        onImported: importRuleset
    }), /*#__PURE__*/ React.createElement(ReactNative.View, {
        style: {
            backgroundColor: colors.surface,
            borderColor: colors.border,
            borderRadius: 14,
            borderWidth: 1,
            flexDirection: 'row',
            gap: 6,
            padding: 5
        }
    }, [
        [
            'stringRules',
            'Text'
        ],
        [
            'regexRules',
            'Regex'
        ]
    ].map(function(param) {
        var _param = _sliced_to_array(param, 2), candidate = _param[0], label = _param[1];
        return /*#__PURE__*/ React.createElement(ReactNative.Pressable, {
            key: candidate,
            onPress: function onPress() {
                return setKind(candidate);
            },
            style: function style(param) {
                var pressed = param.pressed;
                return {
                    alignItems: 'center',
                    backgroundColor: kind === candidate ? colors.surfaceAlt : 'transparent',
                    borderRadius: 10,
                    flex: 1,
                    opacity: pressed ? 0.7 : 1,
                    paddingVertical: 10
                };
            }
        }, /*#__PURE__*/ React.createElement(ReactNative.Text, {
            style: {
                color: colors.text,
                fontSize: 15,
                fontWeight: '800'
            }
        }, label));
    })), /*#__PURE__*/ React.createElement(ReactNative.View, {
        style: {
            gap: 8
        }
    }, /*#__PURE__*/ React.createElement(ReactNative.Text, {
        style: {
            color: colors.text,
            fontSize: 18,
            fontWeight: '800'
        }
    }, isRegex ? 'Regex rules' : 'Text rules', " \xb7 ", rules.length), /*#__PURE__*/ React.createElement(ReactNative.Text, {
        style: {
            color: colors.muted,
            fontSize: 14,
            lineHeight: 20
        }
    }, subtitle)), rules.length ? /*#__PURE__*/ React.createElement(ReactNative.View, {
        style: {
            gap: 10
        }
    }, rules.map(function(rule) {
        return /*#__PURE__*/ React.createElement(RuleRow, {
            key: rule.id,
            isRegex: isRegex,
            rule: rule,
            onPress: function onPress() {
                return setEditing({
                    kind: kind,
                    rule: rule,
                    isNew: false
                });
            }
        });
    })) : /*#__PURE__*/ React.createElement(ReactNative.View, {
        style: {
            alignItems: 'center',
            backgroundColor: colors.surfaceAlt,
            borderColor: colors.border,
            borderRadius: 14,
            borderWidth: 1,
            gap: 6,
            padding: 20
        }
    }, /*#__PURE__*/ React.createElement(ReactNative.Text, {
        style: {
            color: colors.text,
            fontSize: 16,
            fontWeight: '800'
        }
    }, "No rules yet"), /*#__PURE__*/ React.createElement(ReactNative.Text, {
        style: {
            color: colors.muted,
            fontSize: 14,
            textAlign: 'center'
        }
    }, "Add one when you are ready.")), /*#__PURE__*/ React.createElement(Button, {
        label: "Add ".concat(isRegex ? 'regex' : 'text', " rule"),
        onPress: function onPress() {
            return setEditing({
                kind: kind,
                rule: createRule(),
                isNew: true
            });
        }
    }));
}function _type_of(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
var STORE = window.unbound.storage.getStore('unbound.text-replace');
var unpatches = [];
function getRules(kind) {
    return normalizeRules(STORE.get(kind, []));
}
function findMessageArg(args) {
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
    try {
        for(var _iterator = args[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
            var arg = _step.value;
            if (arg && (typeof arg === "undefined" ? "undefined" : _type_of(arg)) === 'object' && typeof arg.content === 'string') {
                return arg;
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
    return null;
}
function findChannelId(args) {
    return typeof args[0] === 'string' ? args[0] : null;
}
function transformMessage(ctx) {
    if (findChannelId(ctx.args) === TEXT_REPLACE_RULES_CHANNEL_ID) return;
    var message = findMessageArg(ctx.args);
    if (!(message === null || message === void 0 ? void 0 : message.content)) return;
    message.content = applyRules(message.content, getRules('stringRules'), getRules('regexRules'));
}
var index = {
    start: function start() {
        STORE.set('stringRules', getRules('stringRules'));
        STORE.set('regexRules', getRules('regexRules'));
        var messageActions = window.unbound.metro.findByProps('sendMessage', 'editMessage');
        if (typeof (messageActions === null || messageActions === void 0 ? void 0 : messageActions.sendMessage) !== 'function') return;
        unpatches.push(window.unbound.patcher.before(messageActions, 'sendMessage', transformMessage));
    },
    stop: function stop() {
        while(unpatches.length)unpatches.pop()();
    },
    getSettingsPanel: function getSettingsPanel() {
        return /*#__PURE__*/ React.createElement(TextReplaceSettingsScreen, null);
    }
};
return index;
})();return this.__plugin;},start(context){const module=this.__load();const plugin=module?.default??module;if(plugin&&typeof plugin.start==='function')return plugin.start(context);},stop(){const module=this.__load();const plugin=module?.default??module;if(plugin&&typeof plugin.stop==='function')return plugin.stop();},getSettingsPanel(...args){const module=this.__load();const plugin=module?.default??module;const settingsPanel=plugin?.getSettingsPanel??module?.getSettingsPanel;if(typeof settingsPanel==='function')return settingsPanel.apply(plugin,args);return null;}})