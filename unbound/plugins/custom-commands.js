({__plugin:null,__load(){if(this.__plugin)return this.__plugin;this.__plugin=(function () {
'use strict';
function asyncGeneratorStep$2(gen, resolve, reject, _next, _throw, key, arg) {
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
function _async_to_generator$2(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                asyncGeneratorStep$2(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                asyncGeneratorStep$2(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}
function _ts_generator$2(thisArg, body) {
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
function _type_of$1(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
var pluginContext = null;
function setMediaContext(context) {
    pluginContext = context;
}
function mediaUri(media) {
    return "file://".concat(window.unbound.fs.Documents, "/").concat(media.storedName);
}
function localPath(uri) {
    return uri.startsWith('file://') ? decodeURI(uri.slice('file://'.length)) : uri;
}
function resolvePickedMedia(asset) {
    var _asset_fileName, _fileName_match;
    var context = pluginContext;
    if (!context) throw new Error('Custom Commands is not running.');
    if (typeof asset.uri !== 'string' || !asset.uri.startsWith('file://')) throw new Error('The selected media is unavailable. Choose a local photo or video.');
    var path = localPath(asset.uri);
    var fileName = ((_asset_fileName = asset.fileName) === null || _asset_fileName === void 0 ? void 0 : _asset_fileName.trim()) || path.split('/').pop();
    if (!fileName) throw new Error('The selected media is unavailable. Choose a local photo or video.');
    var objc = context.native.objc;
    var fileManagerClass = objc.getClass('NSFileManager');
    var fileManager = fileManagerClass && objc.call(fileManagerClass, 'defaultManager');
    var attributes = fileManager && objc.call(fileManager, 'attributesOfItemAtPath:error:', path, null);
    var file = attributes;
    var fileSize = Number(file === null || file === void 0 ? void 0 : file.NSFileSize);
    if ((file === null || file === void 0 ? void 0 : file.NSFileType) !== 'NSFileTypeRegular' || !Number.isSafeInteger(fileSize) || fileSize < 0) throw new Error('The selected media is unavailable. Choose a local photo or video.');
    var extension = (_fileName_match = fileName.match(/\.([a-z0-9]+)$/i)) === null || _fileName_match === void 0 ? void 0 : _fileName_match[1];
    var uniformTypeClass = !asset.type && !asset.mimeType && extension && objc.getClass('UTType');
    var uniformType = uniformTypeClass && objc.call(uniformTypeClass, 'typeWithFilenameExtension:', extension);
    var inferredType = uniformType && objc.call(uniformType, 'preferredMIMEType');
    var type = asset.type || asset.mimeType || inferredType;
    if (typeof type !== 'string' || !type.startsWith('image/') && !type.startsWith('video/')) throw new Error('Choose an image or video attachment.');
    return {
        id: asset.id,
        uri: asset.uri,
        type: type,
        fileName: fileName,
        fileSize: fileSize,
        width: asset.width,
        height: asset.height,
        duration: asset.duration
    };
}
function pickMedia() {
    return _async_to_generator$2(function() {
        var _result_assets, picker, result;
        return _ts_generator$2(this, function(_state) {
            switch(_state.label){
                case 0:
                    picker = window.unbound.metro.findByProps('launchImageLibraryAsync');
                    if (typeof (picker === null || picker === void 0 ? void 0 : picker.launchImageLibraryAsync) !== 'function') throw new Error('The media picker is unavailable on this Discord build.');
                    return [
                        4,
                        picker.launchImageLibraryAsync({
                            includeBase64: false,
                            mediaType: 'mixed',
                            selectionLimit: 10
                        })
                    ];
                case 1:
                    result = _state.sent();
                    if (result.errorCode) throw new Error(result.errorMessage || result.errorCode);
                    return [
                        2,
                        ((_result_assets = result.assets) !== null && _result_assets !== void 0 ? _result_assets : []).map(resolvePickedMedia)
                    ];
            }
        });
    })();
}
function persistMedia(asset) {
    return _async_to_generator$2(function() {
        var _ref, _ref1, _asset_fileName_match, context, extension, storedName, sourcePath, destinationPath, copied, objc, fileManagerClass, fileManager, encoded;
        return _ts_generator$2(this, function(_state) {
            switch(_state.label){
                case 0:
                    context = pluginContext;
                    if (!context) throw new Error('Custom Commands is not running.');
                    extension = (_ref = (_ref1 = (_asset_fileName_match = asset.fileName.match(/\.([a-z0-9]+)$/i)) === null || _asset_fileName_match === void 0 ? void 0 : _asset_fileName_match[1]) !== null && _ref1 !== void 0 ? _ref1 : asset.type.split('/')[1]) !== null && _ref !== void 0 ? _ref : 'bin';
                    storedName = "custom-commands-".concat(Date.now(), "-").concat(Math.random().toString(36).slice(2, 10), ".").concat(extension.toLowerCase());
                    sourcePath = localPath(asset.uri);
                    destinationPath = "".concat(window.unbound.fs.Documents, "/").concat(storedName);
                    copied = false;
                    try {
                        objc = context.native.objc;
                        fileManagerClass = objc.getClass('NSFileManager');
                        if (fileManagerClass) {
                            fileManager = objc.call(fileManagerClass, 'defaultManager');
                            if (fileManager && (typeof fileManager === "undefined" ? "undefined" : _type_of$1(fileManager)) === 'object') {
                                copied = Boolean(objc.call(fileManager, 'copyItemAtPath:toPath:error:', sourcePath, destinationPath, null));
                            }
                        }
                    } catch (unused) {}
                    if (!!copied) return [
                        3,
                        3
                    ];
                    return [
                        4,
                        window.unbound.fs.read(sourcePath, 'base64', false)
                    ];
                case 1:
                    encoded = _state.sent();
                    return [
                        4,
                        window.unbound.fs.write(storedName, encoded, 'base64')
                    ];
                case 2:
                    _state.sent();
                    _state.label = 3;
                case 3:
                    return [
                        2,
                        {
                            storedName: storedName,
                            fileName: asset.fileName || storedName,
                            mimeType: asset.type,
                            fileSize: asset.fileSize,
                            width: asset.width,
                            height: asset.height,
                            duration: asset.duration
                        }
                    ];
            }
        });
    })();
}
function removeStoredMedia(media) {
    return _async_to_generator$2(function() {
        return _ts_generator$2(this, function(_state) {
            switch(_state.label){
                case 0:
                    return [
                        4,
                        window.unbound.fs.rm(media.storedName)
                    ];
                case 1:
                    _state.sent();
                    return [
                        2
                    ];
            }
        });
    })();
}function appendSavedCommands(args, result, getTags, createCommand) {
    if (!Array.isArray(args[0]) || !args[0].includes(1) || !Array.isArray(result)) return;
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
    try {
        var _loop = function() {
            var tag = _step.value;
            if (result.some(function(command) {
                return command.displayName === tag.name;
            })) return "continue";
            result.push(createCommand(tag));
        };
        for(var _iterator = getTags()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true)_loop();
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
}function _array_like_to_array$1(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _array_with_holes$1(arr) {
    if (Array.isArray(arr)) return arr;
}
function _array_without_holes$1(arr) {
    if (Array.isArray(arr)) return _array_like_to_array$1(arr);
}
function _define_property$2(obj, key, value) {
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
function _iterable_to_array$1(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) {
        return Array.from(iter);
    }
}
function _non_iterable_rest$1() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _non_iterable_spread$1() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _object_spread$2(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            _define_property$2(target, key, source[key]);
        });
    }
    return target;
}
function _to_array(arr) {
    return _array_with_holes$1(arr) || _iterable_to_array$1(arr) || _unsupported_iterable_to_array$1(arr) || _non_iterable_rest$1();
}
function _to_consumable_array$1(arr) {
    return _array_without_holes$1(arr) || _iterable_to_array$1(arr) || _unsupported_iterable_to_array$1(arr) || _non_iterable_spread$1();
}
function _type_of(obj) {
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
var ARGUMENT_PATTERN = /{{(.+?)}}/g;
var COMMAND_NAME_PATTERN = /^[a-z0-9_-]{1,32}$/;
function getTagDescription(tag) {
    var _tag_description;
    return ((_tag_description = tag.description) === null || _tag_description === void 0 ? void 0 : _tag_description.trim()) || "Send the ".concat(tag.name, " command");
}
function parseTagArguments(message) {
    var argumentsByName = new Map();
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
    try {
        for(var _iterator = message.matchAll(ARGUMENT_PATTERN)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
            var match = _step.value;
            var _match__split = _to_array(match[1].split('=')), rawName = _match__split[0], defaultParts = _match__split.slice(1);
            var name = rawName.trim().toLowerCase();
            if (!name || argumentsByName.has(name)) continue;
            argumentsByName.set(name, {
                name: name,
                defaultValue: defaultParts.length ? defaultParts.join('=').trim() : null
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
    return _to_consumable_array$1(argumentsByName.values());
}
function validateTag(tag, existing, originalName) {
    var mediaCount = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : tag.media.length;
    if (!COMMAND_NAME_PATTERN.test(tag.name)) return 'Use 1–32 lowercase letters, numbers, hyphens, or underscores for the command name.';
    if (tag.description && tag.description.trim().length > 100) return 'Use at most 100 characters for the command description.';
    if (!tag.message.trim() && !mediaCount) return 'Add a response or at least one image or video.';
    if (parseTagArguments(tag.message).some(function(argument) {
        return argument.name === 'ephemeral';
    })) return 'The argument name “ephemeral” is reserved.';
    if (mediaCount > 10) return 'A command can have at most 10 attachments.';
    if (existing.some(function(entry) {
        return entry.name === tag.name && entry.name !== originalName;
    })) return 'A command with this name already exists.';
    return null;
}
function normalizeTags(value) {
    if (!Array.isArray(value)) return [];
    var tags = [];
    var names = new Set();
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
    try {
        for(var _iterator = value[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
            var entry = _step.value;
            if (!entry || (typeof entry === "undefined" ? "undefined" : _type_of(entry)) !== 'object') continue;
            var record = entry;
            if (typeof record.name !== 'string' || typeof record.message !== 'string') continue;
            var media = Array.isArray(record.media) ? record.media.filter(function(item) {
                return item && (typeof item === "undefined" ? "undefined" : _type_of(item)) === 'object' && typeof item.storedName === 'string' && typeof item.fileName === 'string' && typeof item.mimeType === 'string' && /^custom-commands-[a-z0-9-]+\.[a-z0-9]+$/i.test(item.storedName);
            }) : [];
            var description = typeof record.description === 'string' && record.description.trim().length <= 100 ? record.description.trim() : '';
            var tag = _object_spread$2({
                name: record.name,
                message: record.message,
                media: media
            }, description ? {
                description: description
            } : {});
            if (names.has(tag.name) || validateTag(tag, []) !== null) continue;
            names.add(tag.name);
            tags.push(tag);
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
    return tags;
}
function getOptionValue(options, name) {
    if (Array.isArray(options)) {
        var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
        try {
            for(var _iterator = options[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                var option = _step.value;
                if (option.name === name) return option.value;
                if (option.options) {
                    var nested = getOptionValue(option.options, name);
                    if (nested !== undefined) return nested;
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
        return undefined;
    }
    return options[name];
}
function renderTagMessage(message, options) {
    return message.replace(ARGUMENT_PATTERN, function(fullMatch, value) {
        var _value_split = _to_array(value.split('=')), rawName = _value_split[0], defaultParts = _value_split.slice(1);
        var name = rawName.trim().toLowerCase();
        var option = getOptionValue(options, name);
        if (option !== undefined && option !== null) return String(option);
        return defaultParts.length ? defaultParts.join('=').trim() : fullMatch;
    }).replaceAll('\\n', '\n');
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
function SettingsButton(param) {
    var label = param.label, onPress = param.onPress, danger = param.danger;
    var ReactNative = window.unbound.metro.common.ReactNative;
    var colors = getSettingsColors();
    return /*#__PURE__*/ React.createElement(ReactNative.Pressable, {
        onPress: onPress,
        style: function style(param) {
            var pressed = param.pressed;
            return {
                alignItems: 'center',
                backgroundColor: danger ? colors.danger : colors.accent,
                borderRadius: 12,
                minHeight: SETTINGS_SPACING.touchTarget,
                opacity: pressed ? 0.7 : 1,
                justifyContent: 'center',
                paddingHorizontal: 16
            };
        }
    }, /*#__PURE__*/ React.createElement(ReactNative.Text, {
        style: {
            color: '#fff',
            fontSize: 16,
            fontWeight: '800'
        }
    }, label));
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
function asyncGeneratorStep$1(gen, resolve, reject, _next, _throw, key, arg) {
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
function _async_to_generator$1(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                asyncGeneratorStep$1(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                asyncGeneratorStep$1(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}
function _define_property$1(obj, key, value) {
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
function _instanceof$1(left, right) {
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
function _object_spread$1(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            _define_property$1(target, key, source[key]);
        });
    }
    return target;
}
function ownKeys$1(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        keys.push.apply(keys, symbols);
    }
    return keys;
}
function _object_spread_props$1(target, source) {
    source = source != null ? source : {};
    if (Object.getOwnPropertyDescriptors) Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    else {
        ownKeys$1(Object(source)).forEach(function(key) {
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
function _ts_generator$1(thisArg, body) {
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
var STORE$1 = window.unbound.storage.getStore('unbound.custom-commands');
function isStoredMedia(media) {
    return 'storedName' in media;
}
function showError(error) {
    window.unbound.toasts.showToast({
        title: 'Custom Commands',
        content: _instanceof$1(error, Error) ? error.message : 'The command could not be saved.'
    });
}
function FormField(param) {
    var label = param.label, value = param.value, placeholder = param.placeholder, onChange = param.onChange, _param_multiline = param.multiline, multiline = _param_multiline === void 0 ? false : _param_multiline, maxLength = param.maxLength;
    var ReactNative = window.unbound.metro.common.ReactNative;
    var colors = getSettingsColors();
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
        maxLength: maxLength,
        multiline: multiline,
        onChangeText: onChange,
        placeholder: placeholder,
        placeholderTextColor: colors.muted,
        style: {
            backgroundColor: colors.input,
            borderColor: colors.border,
            borderRadius: 12,
            borderWidth: 1,
            color: colors.text,
            fontSize: 16,
            minHeight: multiline ? 120 : 48,
            paddingHorizontal: 14,
            paddingVertical: 12,
            textAlignVertical: multiline ? 'top' : 'center'
        },
        value: value
    }));
}
function MediaRow(param) {
    var media = param.media, onRemove = param.onRemove;
    var ReactNative = window.unbound.metro.common.ReactNative;
    var colors = getSettingsColors();
    var mimeType = isStoredMedia(media) ? media.mimeType : media.type;
    var uri = isStoredMedia(media) ? mediaUri(media) : media.uri;
    var fileName = media.fileName;
    return /*#__PURE__*/ React.createElement(SettingsCard, null, /*#__PURE__*/ React.createElement(ReactNative.View, {
        style: {
            alignItems: 'center',
            flexDirection: 'row',
            gap: 12
        }
    }, mimeType.startsWith('image/') ? /*#__PURE__*/ React.createElement(ReactNative.Image, {
        source: {
            uri: uri
        },
        style: {
            borderRadius: 8,
            height: 48,
            width: 48
        }
    }) : /*#__PURE__*/ React.createElement(ReactNative.View, {
        style: {
            alignItems: 'center',
            backgroundColor: colors.input,
            borderRadius: 8,
            height: 48,
            justifyContent: 'center',
            width: 48
        }
    }, /*#__PURE__*/ React.createElement(ReactNative.Text, {
        style: {
            color: colors.text,
            fontSize: 24
        }
    }, "▶")), /*#__PURE__*/ React.createElement(ReactNative.View, {
        style: {
            flex: 1,
            gap: 3
        }
    }, /*#__PURE__*/ React.createElement(ReactNative.Text, {
        numberOfLines: 1,
        style: {
            color: colors.text,
            fontSize: 14,
            fontWeight: '700'
        }
    }, fileName), /*#__PURE__*/ React.createElement(ReactNative.Text, {
        style: {
            color: colors.muted,
            fontSize: 12
        }
    }, mimeType.startsWith('video/') ? 'Video' : 'Image', " \xb7", ' ', Math.round(media.fileSize / 1024), " KB")), /*#__PURE__*/ React.createElement(ReactNative.Pressable, {
        accessibilityLabel: "Remove ".concat(fileName),
        accessibilityRole: "button",
        hitSlop: 8,
        onPress: onRemove,
        style: {
            alignItems: 'center',
            height: 40,
            justifyContent: 'center',
            width: 40
        }
    }, /*#__PURE__*/ React.createElement(ReactNative.Text, {
        style: {
            color: colors.danger,
            fontSize: 27
        }
    }, "\xd7"))));
}
function CustomCommandsSettings() {
    var ReactNative = window.unbound.metro.common.ReactNative;
    var colors = getSettingsColors();
    var settings = STORE$1.useSettingsStore();
    var tags = normalizeTags(settings.get('tags', []));
    var _useState = _sliced_to_array(window.React.useState(null), 2), editing = _useState[0], setEditing = _useState[1];
    var _useState1 = _sliced_to_array(window.React.useState(false), 2), creating = _useState1[0], setCreating = _useState1[1];
    var _useState2 = _sliced_to_array(window.React.useState(''), 2), name = _useState2[0], setName = _useState2[1];
    var _useState3 = _sliced_to_array(window.React.useState(''), 2), description = _useState3[0], setDescription = _useState3[1];
    var _useState4 = _sliced_to_array(window.React.useState(''), 2), message = _useState4[0], setMessage = _useState4[1];
    var _useState5 = _sliced_to_array(window.React.useState([]), 2), media = _useState5[0], setMedia = _useState5[1];
    var _useState6 = _sliced_to_array(window.React.useState(false), 2), busy = _useState6[0], setBusy = _useState6[1];
    var _useState7 = _sliced_to_array(window.React.useState(false), 2), picking = _useState7[0], setPicking = _useState7[1];
    function dismissKeyboardOutsideInput(event) {
        var focusedInput = ReactNative.TextInput.State.currentlyFocusedInput();
        if (!focusedInput) return;
        var focusedField = ReactNative.TextInput.State.currentlyFocusedField();
        if (event.target === focusedInput || Number(event.target) === focusedField) return;
        ReactNative.Keyboard.dismiss();
    }
    function closeForm() {
        setCreating(false);
        setEditing(null);
        setName('');
        setDescription('');
        setMessage('');
        setMedia([]);
    }
    function openForm(tag) {
        var _ref, _ref1, _ref2, _ref3;
        setEditing(tag);
        setCreating(true);
        setName((_ref = tag === null || tag === void 0 ? void 0 : tag.name) !== null && _ref !== void 0 ? _ref : '');
        setDescription((_ref1 = tag === null || tag === void 0 ? void 0 : tag.description) !== null && _ref1 !== void 0 ? _ref1 : '');
        setMessage((_ref2 = tag === null || tag === void 0 ? void 0 : tag.message) !== null && _ref2 !== void 0 ? _ref2 : '');
        setMedia((_ref3 = tag === null || tag === void 0 ? void 0 : tag.media) !== null && _ref3 !== void 0 ? _ref3 : []);
    }
    function addMedia() {
        return _async_to_generator$1(function() {
            var picked, error;
            return _ts_generator$1(this, function(_state) {
                switch(_state.label){
                    case 0:
                        if (picking) return [
                            2
                        ];
                        setPicking(true);
                        _state.label = 1;
                    case 1:
                        _state.trys.push([
                            1,
                            3,
                            4,
                            5
                        ]);
                        return [
                            4,
                            pickMedia()
                        ];
                    case 2:
                        picked = _state.sent();
                        if (media.length + picked.length > 10) throw new Error('A command can have at most 10 attachments.');
                        setMedia(function(current) {
                            return _to_consumable_array(current).concat(_to_consumable_array(picked));
                        });
                        return [
                            3,
                            5
                        ];
                    case 3:
                        error = _state.sent();
                        showError(error);
                        return [
                            3,
                            5
                        ];
                    case 4:
                        setPicking(false);
                        return [
                            7
                        ];
                    case 5:
                        return [
                            2
                        ];
                }
            });
        })();
    }
    function saveTag() {
        return _async_to_generator$1(function() {
            var _ref, _metro_findByProps, normalizedName, normalizedDescription, draft, validation, builtIns, newlyStored, _ref1, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, item, _, err, nextTag, nextTags, retainedNames, _iteratorNormalCompletion1, _didIteratorError1, _iteratorError1, _iterator1, _step1, oldMedia, err, error;
            return _ts_generator$1(this, function(_state) {
                switch(_state.label){
                    case 0:
                        if (busy) return [
                            2
                        ];
                        normalizedName = name.trim().toLowerCase();
                        normalizedDescription = description.trim();
                        draft = {
                            name: normalizedName,
                            description: normalizedDescription,
                            message: message,
                            media: media.filter(isStoredMedia)
                        };
                        validation = validateTag(draft, tags, editing === null || editing === void 0 ? void 0 : editing.name, media.length);
                        if (validation) {
                            showError(new Error(validation));
                            return [
                                2
                            ];
                        }
                        builtIns = (_ref = (_metro_findByProps = window.unbound.metro.findByProps('getBuiltInCommands')) === null || _metro_findByProps === void 0 ? void 0 : _metro_findByProps.BUILT_IN_COMMANDS) !== null && _ref !== void 0 ? _ref : [];
                        if (builtIns.some(function(command) {
                            return command.displayName === normalizedName;
                        })) {
                            showError(new Error('This command name is already used by Discord.'));
                            return [
                                2
                            ];
                        }
                        setBusy(true);
                        newlyStored = [];
                        _state.label = 1;
                    case 1:
                        _state.trys.push([
                            1,
                            18,
                            20,
                            21
                        ]);
                        _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                        _state.label = 2;
                    case 2:
                        _state.trys.push([
                            2,
                            7,
                            8,
                            9
                        ]);
                        _iterator = media[Symbol.iterator]();
                        _state.label = 3;
                    case 3:
                        if (!!(_iteratorNormalCompletion = (_step = _iterator.next()).done)) return [
                            3,
                            6
                        ];
                        item = _step.value;
                        if (isStoredMedia(item)) return [
                            3,
                            5
                        ];
                        _ = newlyStored.push;
                        return [
                            4,
                            persistMedia(item)
                        ];
                    case 4:
                        _.apply(newlyStored, [
                            _state.sent()
                        ]);
                        _state.label = 5;
                    case 5:
                        _iteratorNormalCompletion = true;
                        return [
                            3,
                            3
                        ];
                    case 6:
                        return [
                            3,
                            9
                        ];
                    case 7:
                        err = _state.sent();
                        _didIteratorError = true;
                        _iteratorError = err;
                        return [
                            3,
                            9
                        ];
                    case 8:
                        try {
                            if (!_iteratorNormalCompletion && _iterator.return != null) {
                                _iterator.return();
                            }
                        } finally{
                            if (_didIteratorError) {
                                throw _iteratorError;
                            }
                        }
                        return [
                            7
                        ];
                    case 9:
                        nextTag = _object_spread_props$1(_object_spread$1({
                            name: normalizedName
                        }, normalizedDescription ? {
                            description: normalizedDescription
                        } : {}), {
                            message: message,
                            media: _to_consumable_array(media.filter(isStoredMedia)).concat(_to_consumable_array(newlyStored))
                        });
                        nextTags = tags.filter(function(tag) {
                            return tag.name !== (editing === null || editing === void 0 ? void 0 : editing.name);
                        });
                        nextTags.push(nextTag);
                        STORE$1.set('tags', nextTags);
                        retainedNames = new Set(nextTag.media.map(function(item) {
                            return item.storedName;
                        }));
                        _iteratorNormalCompletion1 = true, _didIteratorError1 = false, _iteratorError1 = undefined;
                        _state.label = 10;
                    case 10:
                        _state.trys.push([
                            10,
                            15,
                            16,
                            17
                        ]);
                        _iterator1 = ((_ref1 = editing === null || editing === void 0 ? void 0 : editing.media) !== null && _ref1 !== void 0 ? _ref1 : [])[Symbol.iterator]();
                        _state.label = 11;
                    case 11:
                        if (!!(_iteratorNormalCompletion1 = (_step1 = _iterator1.next()).done)) return [
                            3,
                            14
                        ];
                        oldMedia = _step1.value;
                        if (!!retainedNames.has(oldMedia.storedName)) return [
                            3,
                            13
                        ];
                        return [
                            4,
                            removeStoredMedia(oldMedia)
                        ];
                    case 12:
                        _state.sent();
                        _state.label = 13;
                    case 13:
                        _iteratorNormalCompletion1 = true;
                        return [
                            3,
                            11
                        ];
                    case 14:
                        return [
                            3,
                            17
                        ];
                    case 15:
                        err = _state.sent();
                        _didIteratorError1 = true;
                        _iteratorError1 = err;
                        return [
                            3,
                            17
                        ];
                    case 16:
                        try {
                            if (!_iteratorNormalCompletion1 && _iterator1.return != null) {
                                _iterator1.return();
                            }
                        } finally{
                            if (_didIteratorError1) {
                                throw _iteratorError1;
                            }
                        }
                        return [
                            7
                        ];
                    case 17:
                        closeForm();
                        window.unbound.toasts.showToast({
                            title: 'Custom Commands',
                            content: "Saved /".concat(normalizedName, ".")
                        });
                        return [
                            3,
                            21
                        ];
                    case 18:
                        error = _state.sent();
                        return [
                            4,
                            Promise.all(newlyStored.map(function(item) {
                                return removeStoredMedia(item).catch(function() {});
                            }))
                        ];
                    case 19:
                        _state.sent();
                        showError(error);
                        return [
                            3,
                            21
                        ];
                    case 20:
                        setBusy(false);
                        return [
                            7
                        ];
                    case 21:
                        return [
                            2
                        ];
                }
            });
        })();
    }
    function deleteTag(tag) {
        ReactNative.Alert.alert('Delete command', "Delete /".concat(tag.name, " and its saved attachments?"), [
            {
                text: 'Cancel',
                style: 'cancel'
            },
            {
                text: 'Delete',
                style: 'destructive',
                onPress: function onPress() {
                    STORE$1.set('tags', tags.filter(function(entry) {
                        return entry.name !== tag.name;
                    }));
                    void Promise.all(tag.media.map(function(item) {
                        return removeStoredMedia(item).catch(function() {});
                    }));
                }
            }
        ]);
    }
    var detectedArguments = parseTagArguments(message);
    return /*#__PURE__*/ React.createElement(SettingsScrollView, {
        onTouchStart: dismissKeyboardOutsideInput
    }, /*#__PURE__*/ React.createElement(ReactNative.Text, {
        style: {
            color: colors.muted,
            fontSize: 15,
            lineHeight: 21
        }
    }, "Create slash commands that send saved text, images, and videos."), creating ? /*#__PURE__*/ React.createElement(SettingsSection, {
        title: editing ? 'Edit command' : 'Create command'
    }, /*#__PURE__*/ React.createElement(FormField, {
        label: "Command name",
        onChange: setName,
        placeholder: "greet",
        value: name
    }), /*#__PURE__*/ React.createElement(FormField, {
        label: "Description (optional)",
        maxLength: 100,
        onChange: setDescription,
        placeholder: "Shown in the slash-command list",
        value: description
    }), /*#__PURE__*/ React.createElement(FormField, {
        label: "Response",
        multiline: true,
        onChange: setMessage,
        placeholder: "Hello {{user}}! I am feeling {{mood = great}}.",
        value: message
    }), /*#__PURE__*/ React.createElement(ReactNative.Text, {
        style: {
            color: colors.muted,
            fontSize: 13,
            lineHeight: 19
        }
    }, "Use ", '{{argument}}', " for required text or ", '{{argument = default}}', " for optional text. Type ", '\\n', " for a line break. Every command also has an optional ephemeral switch."), detectedArguments.length ? /*#__PURE__*/ React.createElement(ReactNative.Text, {
        style: {
            color: colors.muted,
            fontSize: 13,
            lineHeight: 19
        }
    }, "Arguments: ", detectedArguments.map(function(argument) {
        return argument.name;
    }).join(', ')) : null, media.map(function(item, index) {
        return /*#__PURE__*/ React.createElement(MediaRow, {
            key: isStoredMedia(item) ? item.storedName : "".concat(item.uri, "-").concat(index),
            media: item,
            onRemove: function onRemove() {
                return setMedia(function(current) {
                    return current.filter(function(_, position) {
                        return position !== index;
                    });
                });
            }
        });
    }), /*#__PURE__*/ React.createElement(SettingsButton, {
        label: picking ? 'Opening Photos…' : 'Attach media',
        onPress: function onPress() {
            return void addMedia();
        }
    }), /*#__PURE__*/ React.createElement(SettingsButton, {
        label: busy ? 'Saving…' : editing ? 'Save command' : 'Create command',
        onPress: function onPress() {
            return void saveTag();
        }
    }), /*#__PURE__*/ React.createElement(ReactNative.Pressable, {
        onPress: closeForm,
        style: {
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 48
        }
    }, /*#__PURE__*/ React.createElement(ReactNative.Text, {
        style: {
            color: colors.muted,
            fontSize: 16,
            fontWeight: '700'
        }
    }, "Cancel"))) : /*#__PURE__*/ React.createElement(SettingsSection, {
        title: "Registered commands"
    }, tags.length ? tags.map(function(tag) {
        return /*#__PURE__*/ React.createElement(SettingsCard, {
            key: tag.name
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
            style: {
                color: colors.text,
                fontSize: 16,
                fontWeight: '700'
            }
        }, "/", tag.name), /*#__PURE__*/ React.createElement(ReactNative.Text, {
            numberOfLines: 2,
            style: {
                color: colors.muted,
                fontSize: 13
            }
        }, tag.description || tag.message || "".concat(tag.media.length, " attachment").concat(tag.media.length === 1 ? '' : 's'))), /*#__PURE__*/ React.createElement(ReactNative.Pressable, {
            accessibilityLabel: "Edit ".concat(tag.name),
            onPress: function onPress() {
                return openForm(tag);
            }
        }, /*#__PURE__*/ React.createElement(ReactNative.Text, {
            style: {
                color: colors.accent,
                fontSize: 14,
                fontWeight: '700'
            }
        }, "Edit")), /*#__PURE__*/ React.createElement(ReactNative.Pressable, {
            accessibilityLabel: "Delete ".concat(tag.name),
            onPress: function onPress() {
                return deleteTag(tag);
            }
        }, /*#__PURE__*/ React.createElement(ReactNative.Text, {
            style: {
                color: colors.danger,
                fontSize: 14,
                fontWeight: '700'
            }
        }, "Delete"))));
    }) : /*#__PURE__*/ React.createElement(SettingsCard, null, /*#__PURE__*/ React.createElement(ReactNative.Text, {
        style: {
            color: colors.muted,
            fontSize: 15
        }
    }, "No custom commands yet.")), /*#__PURE__*/ React.createElement(SettingsButton, {
        label: "Create command",
        onPress: function onPress() {
            return openForm(null);
        }
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
function _instanceof(left, right) {
    "@swc/helpers - instanceof";
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
        return !!right[Symbol.hasInstance](left);
    } else return left instanceof right;
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
var STORE = window.unbound.storage.getStore('unbound.custom-commands');
var APPLICATION_ID = '-1';
var unpatch = null;
function getTags() {
    return normalizeTags(STORE.get('tags', []));
}
function getCommandId(name) {
    var hash = 0;
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
    try {
        for(var _iterator = name[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
            var character = _step.value;
            hash = Math.imul(hash, 31) + character.charCodeAt(0) >>> 0;
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
    return String(-9e9 - hash);
}
function createCommand(tag) {
    var description = getTagDescription(tag);
    var options = parseTagArguments(tag.message).map(function(argument) {
        return {
            name: argument.name,
            displayName: argument.name,
            type: 3,
            description: argument.name,
            displayDescription: argument.name,
            required: argument.defaultValue === null
        };
    });
    options.push({
        name: 'ephemeral',
        displayName: 'ephemeral',
        type: 5,
        description: 'Only show the response to you',
        displayDescription: 'Only show the response to you',
        required: false
    });
    return {
        id: getCommandId(tag.name),
        untranslatedName: tag.name,
        displayName: tag.name,
        type: 1,
        inputType: 1,
        applicationId: APPLICATION_ID,
        untranslatedDescription: description,
        displayDescription: description,
        options: options,
        execute: function execute(args, context) {
            return executeTag(tag.name, args, context);
        }
    };
}
function uploadMedia(tag, channelId) {
    return _async_to_generator(function() {
        var module, CloudUpload, uploads;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    if (!tag.media.length) return [
                        2,
                        []
                    ];
                    module = window.unbound.metro.findByProps('CloudUpload');
                    CloudUpload = module === null || module === void 0 ? void 0 : module.CloudUpload;
                    if (!CloudUpload) throw new Error('Discord file uploads are unavailable.');
                    uploads = tag.media.map(function(media, index) {
                        var _media_duration;
                        var uri = mediaUri(media);
                        var item = {
                            id: "custom-commands-".concat(Date.now(), "-").concat(index),
                            origin: 1,
                            uri: uri,
                            originalUri: uri,
                            mimeType: media.mimeType,
                            width: media.width,
                            height: media.height,
                            filename: media.fileName,
                            playableDuration: (_media_duration = media.duration) !== null && _media_duration !== void 0 ? _media_duration : null,
                            platform: 0,
                            createdUsingInAppCamera: false,
                            progress: 0
                        };
                        return new CloudUpload(item, channelId, index, true);
                    });
                    return [
                        4,
                        Promise.all(uploads.map(function(upload) {
                            return upload.upload();
                        }))
                    ];
                case 1:
                    _state.sent();
                    if (uploads.some(function(upload) {
                        return upload.status !== 'COMPLETED';
                    })) throw new Error('An attachment failed to upload.');
                    return [
                        2,
                        uploads
                    ];
            }
        });
    })();
}
function executeTag(name, options, context) {
    return _async_to_generator(function() {
        var _context_channel, tag, channelId, messageActions, ephemeral, content, _ref, _metro_findByProps_getPendingReply, _metro_findByProps, _messageActions_getSendMessageOptionsForReply, _messageActions_sendBotMessage, pendingReply, replyOptions, attachmentsToUpload, result, _metro_findByProps_dispatch, _metro_findByProps1, error;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    tag = getTags().find(function(entry) {
                        return entry.name === name;
                    });
                    channelId = context === null || context === void 0 ? void 0 : (_context_channel = context.channel) === null || _context_channel === void 0 ? void 0 : _context_channel.id;
                    if (!tag || !channelId) return [
                        2
                    ];
                    messageActions = window.unbound.metro.findByProps('_sendMessage');
                    if (!messageActions) throw new Error('Discord message actions are unavailable.');
                    ephemeral = getOptionValue(options, 'ephemeral') === true;
                    content = renderTagMessage(tag.message, options);
                    if (ephemeral && tag.media.length) {
                        window.unbound.toasts.showToast({
                            title: 'Custom Commands',
                            content: 'Commands with attachments cannot be sent ephemerally.'
                        });
                        return [
                            2
                        ];
                    }
                    _state.label = 1;
                case 1:
                    _state.trys.push([
                        1,
                        4,
                        ,
                        5
                    ]);
                    if (ephemeral) {
                        (_messageActions_sendBotMessage = messageActions.sendBotMessage) === null || _messageActions_sendBotMessage === void 0 ? void 0 : _messageActions_sendBotMessage.call(messageActions, channelId, {
                            content: content
                        });
                        return [
                            2
                        ];
                    }
                    pendingReply = (_metro_findByProps = window.unbound.metro.findByProps('getPendingReply')) === null || _metro_findByProps === void 0 ? void 0 : (_metro_findByProps_getPendingReply = _metro_findByProps.getPendingReply) === null || _metro_findByProps_getPendingReply === void 0 ? void 0 : _metro_findByProps_getPendingReply.call(_metro_findByProps, channelId);
                    replyOptions = (_ref = (_messageActions_getSendMessageOptionsForReply = messageActions.getSendMessageOptionsForReply) === null || _messageActions_getSendMessageOptionsForReply === void 0 ? void 0 : _messageActions_getSendMessageOptionsForReply.call(messageActions, pendingReply)) !== null && _ref !== void 0 ? _ref : {};
                    return [
                        4,
                        uploadMedia(tag, channelId)
                    ];
                case 2:
                    attachmentsToUpload = _state.sent();
                    return [
                        4,
                        messageActions._sendMessage(channelId, {
                            content: content,
                            tts: false,
                            invalidEmojis: [],
                            validNonShortcutEmojis: []
                        }, _object_spread_props(_object_spread({}, replyOptions), {
                            attachmentsToUpload: attachmentsToUpload
                        }))
                    ];
                case 3:
                    result = _state.sent();
                    if ((result === null || result === void 0 ? void 0 : result.ok) === false) throw new Error("Discord rejected the message (".concat(result.status, ")."));
                    if (pendingReply) {
                        (_metro_findByProps1 = window.unbound.metro.findByProps('dispatch', 'subscribe')) === null || _metro_findByProps1 === void 0 ? void 0 : (_metro_findByProps_dispatch = _metro_findByProps1.dispatch) === null || _metro_findByProps_dispatch === void 0 ? void 0 : _metro_findByProps_dispatch.call(_metro_findByProps1, {
                            type: 'DELETE_PENDING_REPLY',
                            channelId: channelId
                        });
                    }
                    return [
                        3,
                        5
                    ];
                case 4:
                    error = _state.sent();
                    window.unbound.toasts.showToast({
                        title: 'Custom Commands',
                        content: _instanceof(error, Error) ? error.message : 'The command could not be sent.'
                    });
                    throw error;
                case 5:
                    return [
                        2
                    ];
            }
        });
    })();
}
function start(context) {
    if (unpatch) return;
    setMediaContext(context);
    var commands = window.unbound.metro.findByProps('getBuiltInCommands');
    if (!commands) throw new Error('Discord built-in commands are unavailable.');
    unpatch = window.unbound.patcher.after(commands, 'getBuiltInCommands', function(patch) {
        appendSavedCommands(patch.args, patch.result, getTags, createCommand);
    });
}
function stop() {
    unpatch === null || unpatch === void 0 ? void 0 : unpatch();
    unpatch = null;
    setMediaContext(null);
}
var index = {
    start: start,
    stop: stop,
    getSettingsPanel: function getSettingsPanel() {
        return /*#__PURE__*/ React.createElement(CustomCommandsSettings, null);
    }
};
return index;
})();return this.__plugin;},start(context){const module=this.__load();const plugin=module?.default??module;if(plugin&&typeof plugin.start==='function')return plugin.start(context);},stop(){const module=this.__load();const plugin=module?.default??module;if(plugin&&typeof plugin.stop==='function')return plugin.stop();},getSettingsPanel(...args){const module=this.__load();const plugin=module?.default??module;const settingsPanel=plugin?.getSettingsPanel??module?.getSettingsPanel;if(typeof settingsPanel==='function')return settingsPanel.apply(plugin,args);return null;}})