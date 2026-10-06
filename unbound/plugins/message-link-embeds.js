({__plugin:null,__load(){if(this.__plugin)return this.__plugin;this.__plugin=(function () {
'use strict';
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
            _define_property$2(target, key, source[key]);
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
function _type_of$3(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
var FAST_IMAGE_PATH = 'components_native/common/FastImage.tsx';
var LOTTIE_VIEW_PATH = 'components_native/common/LottieAnimationView.tsx';
var STICKER_LOTTIE_PATH = 'modules/stickers/native/NativeLottieView.tsx';
var ANIMATED_COMPONENT_PATHS = new Set([
    FAST_IMAGE_PATH,
    LOTTIE_VIEW_PATH,
    STICKER_LOTTIE_PATH
]);
function isAnimatedMediaSource(source) {
    if (Array.isArray(source)) return source.some(isAnimatedMediaSource);
    var uri = sourceUri(source);
    if (!uri) return false;
    if (/^data:image\/gif/i.test(uri) || /\.gif(?:$|[?#])/i.test(uri)) return true;
    try {
        var url = new URL(uri);
        return url.searchParams.get('animated') === 'true' || /^\/stickers\/\d+\.(?:png|webp)$/.test(url.pathname);
    } catch (unused) {
        return /[?&]animated=true(?:&|$)/i.test(uri);
    }
}
function animatedImageProps(props) {
    if (!isAnimatedMediaSource(props.source)) return props;
    return _object_spread_props$1(_object_spread$1({}, props), {
        enableAnimation: true,
        manualPlayback: false,
        paused: false
    });
}
function animatedLottieProps(props) {
    return _object_spread_props$1(_object_spread$1({}, props), {
        autoPlay: true,
        loop: true
    });
}
function enableAnimatedEmojiSources(content) {
    var updated = 0;
    var visited = new WeakSet();
    function visit(value) {
        if (!value || (typeof value === "undefined" ? "undefined" : _type_of$3(value)) !== 'object' || visited.has(value)) return;
        visited.add(value);
        if (Array.isArray(value)) {
            var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
            try {
                for(var _iterator = value[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                    var child = _step.value;
                    visit(child);
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
        var entry = value;
        if (entry.type === 'customEmoji' && typeof entry.src === 'string') {
            var source = animatedGifSource(entry.src);
            if (source) {
                entry.src = source;
                if (typeof entry.frozenSrc === 'string') entry.frozenSrc = source;
                updated++;
            }
        }
        var _iteratorNormalCompletion1 = true, _didIteratorError1 = false, _iteratorError1 = undefined;
        try {
            for(var _iterator1 = Object.values(entry)[Symbol.iterator](), _step1; !(_iteratorNormalCompletion1 = (_step1 = _iterator1.next()).done); _iteratorNormalCompletion1 = true){
                var child1 = _step1.value;
                visit(child1);
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
    visit(content);
    return updated;
}
function installEmbeddedAnimationSupport(React, metro, modulePath) {
    var _metro_addListener;
    var context = React.createContext(false);
    var restores = [];
    var patchedFastImages = new WeakSet();
    var patchedLottieModules = new WeakSet();
    var disposed = false;
    function patchFastImage() {
        var fastImageModule = metro.findByFilePath(FAST_IMAGE_PATH, {
            interop: false
        });
        var fastImage = fastImageModule === null || fastImageModule === void 0 ? void 0 : fastImageModule.default;
        var originalFastImage = fastImage === null || fastImage === void 0 ? void 0 : fastImage.type;
        if (!fastImage || !originalFastImage || patchedFastImages.has(fastImage)) return;
        var wrappedFastImage = function wrappedFastImage(props) {
            var embedded = React.useContext(context) === true;
            var nextProps = embedded ? animatedImageProps(props) : props;
            return React.createElement(originalFastImage, nextProps);
        };
        fastImage.type = wrappedFastImage;
        patchedFastImages.add(fastImage);
        restores.push(function() {
            if (fastImage.type === wrappedFastImage) fastImage.type = originalFastImage;
        });
    }
    function patchLottie(path) {
        var _originalLottie_displayName;
        var lottieModule = metro.findByFilePath(path, {
            interop: false
        });
        if (!lottieModule || patchedLottieModules.has(lottieModule)) return;
        var originalLottie = lottieModule.default;
        if (!originalLottie) return;
        var wrappedLottie = function wrappedLottie(props) {
            var embedded = React.useContext(context) === true;
            var nextProps = embedded ? animatedLottieProps(props) : props;
            return React.createElement(originalLottie, nextProps);
        };
        wrappedLottie.defaultProps = originalLottie.defaultProps;
        wrappedLottie.displayName = (_originalLottie_displayName = originalLottie.displayName) !== null && _originalLottie_displayName !== void 0 ? _originalLottie_displayName : originalLottie.name;
        lottieModule.default = wrappedLottie;
        patchedLottieModules.add(lottieModule);
        restores.push(function() {
            if (lottieModule.default === wrappedLottie) lottieModule.default = originalLottie;
        });
    }
    function patchLoadedComponents(path) {
        if (!path || path === FAST_IMAGE_PATH) patchFastImage();
        if (!path || path === LOTTIE_VIEW_PATH) patchLottie(LOTTIE_VIEW_PATH);
        if (!path || path === STICKER_LOTTIE_PATH) patchLottie(STICKER_LOTTIE_PATH);
    }
    patchLoadedComponents();
    var removeListener = (_metro_addListener = metro.addListener) === null || _metro_addListener === void 0 ? void 0 : _metro_addListener.call(metro, function(_module, id) {
        var path = modulePath(id);
        if (ANIMATED_COMPONENT_PATHS.has(path !== null && path !== void 0 ? path : '')) patchLoadedComponents(path);
    });
    return {
        context: context,
        dispose: function dispose() {
            if (disposed) return;
            disposed = true;
            removeListener === null || removeListener === void 0 ? void 0 : removeListener();
            var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
            try {
                for(var _iterator = restores.reverse()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                    var restore = _step.value;
                    restore();
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
    };
}
function sourceUri(source) {
    if (typeof source === 'string') return source;
    if (!source || (typeof source === "undefined" ? "undefined" : _type_of$3(source)) !== 'object') return;
    var uri = source.uri;
    return typeof uri === 'string' ? uri : undefined;
}
function animatedGifSource(source) {
    try {
        var url = new URL(source);
        if (url.hostname !== 'cdn.discordapp.com' || !/^\/emojis\/\d+\.webp$/.test(url.pathname) || url.searchParams.get('animated') !== 'true') {
            return;
        }
        url.pathname = url.pathname.replace(/\.webp$/, '.gif');
        url.searchParams.delete('animated');
        return url.toString();
    } catch (unused) {
        return;
    }
}function _type_of$2(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
var MESSAGE_LINK_REGEX = /https?:\/\/(?:\w+\.)?discord(?:app)?\.com\/channels\/(?:(?:\d{17,20}|@me)\/)?(\d{17,20})\/(\d{17,20})/g;
function nativeUsernameColor(value) {
    if (typeof value !== 'string') return;
    var match = /^#?([0-9a-f]{6})$/i.exec(value.trim());
    if (!match) return;
    return Number.parseInt("ff".concat(match[1]), 16);
}
function contentText(value) {
    if (typeof value === 'string') return value;
    if (Array.isArray(value)) return value.map(contentText).join('');
    if (!value || (typeof value === "undefined" ? "undefined" : _type_of$2(value)) !== 'object') return '';
    var record = value;
    return "".concat(contentText(record.content)).concat(typeof record.originalLink === 'string' ? record.originalLink : '').concat(typeof record.text === 'string' ? record.text : '');
}
function linkedTargets(message) {
    var text = contentText(message.content);
    if (!text) return [];
    var targets = [];
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
    try {
        var _loop = function() {
            var match = _step.value;
            var target = {
                channelId: match[1],
                messageId: match[2]
            };
            if (!target.channelId || !target.messageId) return "continue";
            if (!targets.some(function(item) {
                return item.channelId === target.channelId && item.messageId === target.messageId;
            })) targets.push(target);
        };
        for(var _iterator = text.matchAll(MESSAGE_LINK_REGEX)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true)_loop();
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
    return targets;
}
function findRenderedLinkRange(text, channelName) {
    if (!channelName) return;
    var searchFrom = 0;
    while(searchFrom < text.length){
        var location = text.indexOf(channelName, searchFrom);
        if (location === -1) return;
        var start = location;
        var end = location + channelName.length;
        while(start > 0 && '\uFFFC\u2068'.includes(text[start - 1]))start--;
        while(end < text.length && '\uFFFC\u2068\u2069'.includes(text[end]))end++;
        var renderedLink = text.slice(start, end);
        if (renderedLink.includes('\uFFFC') && start < location && end > location + channelName.length) {
            return {
                location: start,
                length: end - start
            };
        }
        searchFrom = location + channelName.length;
    }
}function _type_of$1(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
function stripMessageReactions(message) {
    Object.assign(message, {
        reactions: []
    });
    return message;
}
function reactionSnapshot(value) {
    if (!Array.isArray(value)) return '[]';
    return JSON.stringify(value.map(function(reaction) {
        var _entry_burst_colors, _entry_me_burst;
        if (!reaction || (typeof reaction === "undefined" ? "undefined" : _type_of$1(reaction)) !== 'object') return reaction;
        var entry = reaction;
        var emoji = entry.emoji;
        var countDetails = entry.count_details;
        return {
            burstColors: (_entry_burst_colors = entry.burst_colors) !== null && _entry_burst_colors !== void 0 ? _entry_burst_colors : entry.burstColors,
            count: entry.count,
            countDetails: countDetails ? {
                burst: countDetails.burst,
                normal: countDetails.normal
            } : undefined,
            emojiId: emoji === null || emoji === void 0 ? void 0 : emoji.id,
            emojiName: emoji === null || emoji === void 0 ? void 0 : emoji.name,
            me: entry.me,
            meBurst: (_entry_me_burst = entry.me_burst) !== null && _entry_me_burst !== void 0 ? _entry_me_burst : entry.meBurst
        };
    }));
}function _class_call_check(instance, Constructor) {
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
    return Constructor;
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
var BottomAnchorTracker = /*#__PURE__*/ function() {
    function BottomAnchorTracker() {
        _class_call_check(this, BottomAnchorTracker);
        _define_property$1(this, "anchor", void 0);
    }
    _create_class(BottomAnchorTracker, [
        {
            key: "pending",
            get: function get() {
                return this.anchor !== undefined;
            }
        },
        {
            key: "capture",
            value: function capture(anchor) {
                if (!(anchor === null || anchor === void 0 ? void 0 : anchor.atBottom) || this.anchor) return;
                this.anchor = anchor;
            }
        },
        {
            key: "correction",
            value: function correction(metrics, userIsScrolling) {
                if (!this.anchor) return;
                if (userIsScrolling) {
                    this.clear();
                    return;
                }
                var correction = bottomOffsetCorrection(this.anchor, metrics, false);
                if (correction) this.clear();
                return correction;
            }
        },
        {
            key: "clear",
            value: function clear() {
                this.anchor = undefined;
            }
        }
    ]);
    return BottomAnchorTracker;
}();
function readBottomAnchor(metrics) {
    var tolerance = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 36;
    var targetOffset = bottomOffset(metrics);
    var atBottom = Number.isFinite(targetOffset) && Number.isFinite(metrics.offsetY) && Math.abs(targetOffset - metrics.offsetY) <= Math.max(tolerance, metrics.topInset + metrics.bottomInset);
    return {
        atBottom: atBottom,
        inverted: metrics.inverted,
        x: Number.isFinite(metrics.offsetX) ? metrics.offsetX : 0,
        y: Number.isFinite(metrics.offsetY) ? metrics.offsetY : 0
    };
}
function readSurfaceAnchor(metrics, followsLatestMessage) {
    var tolerance = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 36;
    var anchor = readBottomAnchor(metrics, tolerance);
    if (followsLatestMessage) anchor.atBottom = true;
    return anchor;
}
function bottomOffsetCorrection(anchor, metrics, userIsScrolling) {
    if (!anchor.atBottom || userIsScrolling) return;
    var targetOffset = bottomOffset(metrics);
    if (!Number.isFinite(targetOffset) || !Number.isFinite(metrics.offsetY)) return;
    if (Math.abs(targetOffset - metrics.offsetY) <= 1) return;
    return {
        x: anchor.x,
        y: targetOffset
    };
}
function surfaceHeightCacheKey(channelId, messageId, width) {
    return "".concat(channelId, ":").concat(messageId, ":").concat(Math.round(width));
}
function shouldRefreshSurfaceRow(force, lastInvalidatedHeight, height) {
    return force || lastInvalidatedHeight !== height;
}
var SurfaceHeightCache = /*#__PURE__*/ function() {
    function SurfaceHeightCache() {
        var limit = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 128;
        _class_call_check(this, SurfaceHeightCache);
        _define_property$1(this, "limit", void 0);
        _define_property$1(this, "values", void 0);
        this.limit = limit;
        this.values = new Map();
    }
    _create_class(SurfaceHeightCache, [
        {
            key: "get",
            value: function get(key, fallback) {
                var height = this.values.get(key);
                if (height === undefined) return fallback;
                this.values.delete(key);
                this.values.set(key, height);
                return height;
            }
        },
        {
            key: "set",
            value: function set(key, height) {
                if (!Number.isFinite(height) || height <= 0) return;
                this.values.delete(key);
                this.values.set(key, height);
                if (this.values.size > this.limit) {
                    var oldest = this.values.keys().next().value;
                    if (oldest !== undefined) this.values.delete(oldest);
                }
            }
        },
        {
            key: "clear",
            value: function clear() {
                this.values.clear();
            }
        }
    ]);
    return SurfaceHeightCache;
}();
function bottomOffset(metrics) {
    var maximumOffset = metrics.contentHeight - metrics.viewportHeight + metrics.bottomInset;
    return metrics.inverted ? -metrics.topInset : Math.max(-metrics.topInset, maximumOffset);
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
var CHAT_ITEM_PATH = 'components_native/chat/ChatItem.tsx';
var SURFACE_MODULE_PREFIX = 'MessageLinkEmbedSurface';
var MIN_SURFACE_HEIGHT = 72;
var INITIAL_SURFACE_HEIGHT = MIN_SURFACE_HEIGHT;
var MAX_SURFACE_HEIGHT = 520;
var SURFACE_LAYOUT_SETTLE_DELAY = 80;
var SURFACE_BOTTOM_TRIM = 5;
var SURFACE_SPACER_FONT_SIZE = 8;
var EMBED_BACKGROUND = '#2b2d31';
var MAX_NATIVE_VIEW_DEPTH = 10;
var objc = null;
var fabric = null;
var messages = null;
var messageActions = null;
var channelStore = null;
var selectedChannel = null;
var messageRecord = null;
var rowManager = null;
var chatItem = null;
var embeddedAnimationSupport = null;
var moduleListenerCleanup = null;
var messageStoreListener = null;
var messageSyncTimer = null;
var initialScanTimer = null;
var hooks = [];
var lifecycle = 0;
var surfaceModuleName = '';
var cachedMessages = new Map();
var pendingMessages = new Set();
var activeCells = new Map();
var pendingCells = new Set();
var completedCells = new Set();
var retryCounts = new Map();
var retryTimers = new Map();
var waitingCells = new Map();
var cellStates = new Map();
var surfaces = new Map();
var surfaceHeights = new SurfaceHeightCache();
var cellLabelHooks = new Map();
var surfaceRebindTimers = new Map();
function nativeCall(handle, selector) {
    for(var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++){
        args[_key - 2] = arguments[_key];
    }
    if (!objc) return null;
    try {
        return objc.invoke(handle, selector, args, {
            thread: 'main'
        });
    } catch (unused) {
        return null;
    }
}
function syncMessageReactions() {
    messageSyncTimer = null;
    if (!messages || !fabric) return;
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
    try {
        for(var _iterator = cellStates.values()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
            var state = _step.value;
            var _messages_getMessage;
            var source = (_messages_getMessage = messages.getMessage) === null || _messages_getMessage === void 0 ? void 0 : _messages_getMessage.call(messages, state.selectedTarget.channelId, state.messageId);
            var sourceReactionSnapshot = source ? reactionSnapshot(source.reactions) : state.sourceReactionSnapshot;
            var sourceChanged = sourceReactionSnapshot !== state.sourceReactionSnapshot;
            if (!sourceChanged) {
                reconcileSurfaceText(state);
                continue;
            }
            var table = tableForCell(state.cell);
            if (table) captureSurfaceBottomAnchor(state, table);
            reconcileSurfaceText(state);
            if (cellStates.get(state.cellKey) !== state) continue;
            state.sourceReactionSnapshot = sourceReactionSnapshot;
            scheduleReactionScrollCorrection(state, SURFACE_LAYOUT_SETTLE_DELAY);
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
function reconcileSurfaceText(state) {
    if (!messages || !objc) return;
    var attributedText = currentAttributedText(state.label);
    var text = attributedText ? textForView(state.label) : undefined;
    if (!attributedText || text === undefined || text === state.renderedText) return;
    var range = findRenderedLinkRange(text, state.channelName);
    if (range) updateExistingSurface(state, attributedText, range);
}
function scheduleMessageSync() {
    if (messageSyncTimer) return;
    var token = lifecycle;
    messageSyncTimer = setTimeout(function() {
        messageSyncTimer = null;
        if (token === lifecycle) syncMessageReactions();
    }, 0);
}
function handleMessageStoreChange() {
    if (messages) {
        var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
        try {
            for(var _iterator = cellStates.values()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                var state = _step.value;
                var _messages_getMessage;
                var source = (_messages_getMessage = messages.getMessage) === null || _messages_getMessage === void 0 ? void 0 : _messages_getMessage.call(messages, state.selectedTarget.channelId, state.messageId);
                var sourceChanged = source && reactionSnapshot(source.reactions) !== state.sourceReactionSnapshot;
                if (!sourceChanged) continue;
                var table = tableForCell(state.cell);
                if (table) captureSurfaceBottomAnchor(state, table);
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
    scheduleMessageSync();
}
function installMessageStoreListener() {
    if (messageStoreListener || !(messages === null || messages === void 0 ? void 0 : messages.addChangeListener)) return;
    messageStoreListener = handleMessageStoreChange;
    messages.addChangeListener(messageStoreListener);
}
function removeMessageStoreListener() {
    var _messages_removeChangeListener;
    if (messageStoreListener) messages === null || messages === void 0 ? void 0 : (_messages_removeChangeListener = messages.removeChangeListener) === null || _messages_removeChangeListener === void 0 ? void 0 : _messages_removeChangeListener.call(messages, messageStoreListener);
    messageStoreListener = null;
    if (messageSyncTimer) clearTimeout(messageSyncTimer);
    messageSyncTimer = null;
}
function nativeRange(location, length) {
    var _ref;
    return (_ref = objc === null || objc === void 0 ? void 0 : objc.struct('NSRange', {
        location: location,
        length: length
    })) !== null && _ref !== void 0 ? _ref : null;
}
function nativeChildren(handle) {
    if (!objc) return [];
    var subviews = nativeCall(handle, 'subviews');
    if (Array.isArray(subviews)) return subviews;
    if (!subviews || (typeof subviews === "undefined" ? "undefined" : _type_of(subviews)) !== 'object') return [];
    try {
        return objc.array(subviews);
    } catch (unused) {
        return [];
    }
}
function messageKey(channelId, messageId) {
    return "".concat(channelId, ":").concat(messageId);
}
function currentChannelId() {
    var _ref;
    var _selectedChannel_getChannelId, _selectedChannel_getLastSelectedChannelId;
    return (_ref = selectedChannel === null || selectedChannel === void 0 ? void 0 : (_selectedChannel_getChannelId = selectedChannel.getChannelId) === null || _selectedChannel_getChannelId === void 0 ? void 0 : _selectedChannel_getChannelId.call(selectedChannel)) !== null && _ref !== void 0 ? _ref : selectedChannel === null || selectedChannel === void 0 ? void 0 : (_selectedChannel_getLastSelectedChannelId = selectedChannel.getLastSelectedChannelId) === null || _selectedChannel_getLastSelectedChannelId === void 0 ? void 0 : _selectedChannel_getLastSelectedChannelId.call(selectedChannel);
}
function stringFromNative(value) {
    if (typeof value === 'string') return value;
    if (!objc || !value || (typeof value === "undefined" ? "undefined" : _type_of(value)) !== 'object') return;
    var handle = value;
    if (!objc.respondsTo(handle, 'description')) return;
    var description = nativeCall(handle, 'description');
    return typeof description === 'string' ? description : undefined;
}
function messageInfoForCell(cell) {
    if (!objc) return;
    try {
        var _ref, _stringFromNative;
        var viewModel = objc.getIvar(cell, 'viewModel');
        if (!viewModel || !objc.respondsTo(viewModel, 'message')) return;
        var message = nativeCall(viewModel, 'message');
        if (!message) return;
        var messageId = stringFromNative(nativeCall(message, 'id'));
        if (!messageId) return;
        var channel = nativeCall(message, 'channel');
        var channelId = (_ref = (_stringFromNative = stringFromNative(nativeCall(message, 'channelId'))) !== null && _stringFromNative !== void 0 ? _stringFromNative : stringFromNative(nativeCall(message, 'channel_id'))) !== null && _ref !== void 0 ? _ref : channel && (typeof channel === "undefined" ? "undefined" : _type_of(channel)) === 'object' ? stringFromNative(nativeCall(channel, 'id')) : undefined;
        return {
            channelId: channelId,
            messageId: messageId
        };
    } catch (unused) {
        return;
    }
}
function cellKey(cell) {
    var hash = nativeCall(cell, 'hash');
    if (hash !== null && hash !== undefined) return String(hash);
    var description = nativeCall(cell, 'description');
    return typeof description === 'string' ? description : undefined;
}
function textViewsInView(view) {
    var depth = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, result = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : [];
    if (!objc || depth > MAX_NATIVE_VIEW_DEPTH || result.length >= 32) return result;
    if (objc.respondsTo(view, 'attributedText') && objc.respondsTo(view, 'setAttributedText:')) {
        result.push(view);
    }
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
    try {
        for(var _iterator = nativeChildren(view)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
            var child = _step.value;
            textViewsInView(child, depth + 1, result);
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
function visibleMessageCellsInCell(cell) {
    var _objc_className;
    if (!objc) return [];
    var table = nativeCall(cell, 'superview');
    for(var depth = 0; table && depth < MAX_NATIVE_VIEW_DEPTH; depth++){
        var _objc_className1;
        if (((_objc_className1 = objc.className(table)) !== null && _objc_className1 !== void 0 ? _objc_className1 : '').includes('DCDTableView')) break;
        table = nativeCall(table, 'superview');
    }
    if (!table || !((_objc_className = objc.className(table)) !== null && _objc_className !== void 0 ? _objc_className : '').includes('DCDTableView')) return [];
    var visibleCells = nativeCall(table, 'visibleCells');
    try {
        var cells = Array.isArray(visibleCells) ? visibleCells : visibleCells && (typeof visibleCells === "undefined" ? "undefined" : _type_of(visibleCells)) === 'object' ? objc.array(visibleCells) : [];
        return cells.filter(function(value) {
            var _objc_className;
            return ((_objc_className = objc.className(value)) !== null && _objc_className !== void 0 ? _objc_className : '').includes('DCDMessageTableViewCell');
        });
    } catch (unused) {
        return [];
    }
}
function visibleMessageCells() {
    if (!objc) return [];
    var application = objc.getClass('UIApplication');
    if (!application) return [];
    var shared = nativeCall(application, 'sharedApplication');
    var window = shared ? nativeCall(shared, 'keyWindow') : null;
    if (!window) return [];
    var pending = [
        window
    ];
    var inspected = 0;
    while(pending.length && inspected < 800){
        var _pending;
        var _objc_className;
        var view = pending.pop();
        if (!view) continue;
        inspected++;
        if (((_objc_className = objc.className(view)) !== null && _objc_className !== void 0 ? _objc_className : '').includes('DCDMessageTableViewCell')) {
            return visibleMessageCellsInCell(view);
        }
        (_pending = pending).push.apply(_pending, _to_consumable_array(nativeChildren(view)));
    }
    return [];
}
function textForView(view) {
    var attributedText = nativeCall(view, 'attributedText');
    var text = attributedText ? nativeCall(attributedText, 'string') : null;
    return typeof text === 'string' ? text : undefined;
}
function channelNameFor(target, targetMessage) {
    var _targetMessage_channelName;
    var _channelStore_getChannel;
    var channel = channelStore === null || channelStore === void 0 ? void 0 : (_channelStore_getChannel = channelStore.getChannel) === null || _channelStore_getChannel === void 0 ? void 0 : _channelStore_getChannel.call(channelStore, target.channelId);
    var fromStore = channel === null || channel === void 0 ? void 0 : channel.name;
    if (typeof fromStore === 'string' && fromStore.length > 0) return fromStore;
    var fromMessage = (_targetMessage_channelName = targetMessage.channelName) !== null && _targetMessage_channelName !== void 0 ? _targetMessage_channelName : targetMessage.channel_name;
    return typeof fromMessage === 'string' && fromMessage.length > 0 ? fromMessage : undefined;
}
function linkFont(attributedText, range) {
    var invoke = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : nativeCall;
    var _stringFromNative;
    if (!objc) return null;
    var text = (_stringFromNative = stringFromNative(invoke(attributedText, 'string'))) !== null && _stringFromNative !== void 0 ? _stringFromNative : '';
    var end = range.location + range.length;
    for(var index = range.location; index < end; index++){
        var _attributes_NSFont;
        if (text[index] !== '\uFFFC') continue;
        var values = invoke(attributedText, 'attributesAtIndex:effectiveRange:', index, null);
        if (!values || (typeof values === "undefined" ? "undefined" : _type_of(values)) !== 'object') continue;
        var attributes = values;
        if (!attributes.YYTextAttachment) continue;
        return (_attributes_NSFont = attributes.NSFont) !== null && _attributes_NSFont !== void 0 ? _attributes_NSFont : null;
    }
    return null;
}
function messagePayload(message) {
    for(var _i = 0, _iter = [
        'message',
        'message_snapshot',
        'messageSnapshot'
    ]; _i < _iter.length; _i++){
        var key = _iter[_i];
        var nested = message[key];
        if (nested && typeof nested.id === 'string' && nested.id !== message.id) return nested;
    }
    for(var _i1 = 0, _iter1 = [
        'message_snapshots',
        'messageSnapshots'
    ]; _i1 < _iter1.length; _i1++){
        var key1 = _iter1[_i1];
        var snapshots = message[key1];
        if (!Array.isArray(snapshots)) continue;
        var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
        try {
            for(var _iterator = snapshots[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                var snapshot = _step.value;
                if (snapshot && typeof snapshot.id === 'string' && snapshot.id !== message.id) {
                    return snapshot;
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
    }
    return message;
}
function buildRecord(target, channelId) {
    var _payload_timestamp, _ref, _payload_guild_id, _ref1, _payload_guildId, _payload_attachments, _payload_embeds, _payload_mentions, _payload_mention_roles, _ref2, _payload_mentionRoles, _payload_edited_timestamp, _ref3, _payload_editedTimestamp, _payload_mentionEveryone, _payload_flags, _payload_components, _payload_reactions, _ref4, _payload_sticker_items, _ref5, _payload_stickers, _ref6, _payload_message_reference, _ref7, _payload_messageReference, _ref8, _payload_message_snapshots, _ref9, _payload_messageSnapshots, _payload_state, _payload_nonce;
    if (!messageRecord) throw new Error('MessageRecord is unavailable');
    var payload = messagePayload(target);
    var timestamp = _instanceof(payload.timestamp, Date) ? payload.timestamp : new Date((_payload_timestamp = payload.timestamp) !== null && _payload_timestamp !== void 0 ? _payload_timestamp : Date.now());
    return Reflect.construct(messageRecord, [
        _object_spread_props(_object_spread({}, payload), {
            id: payload.id,
            type: 0,
            channel_id: channelId,
            channelId: channelId,
            guild_id: (_ref = (_payload_guild_id = payload.guild_id) !== null && _payload_guild_id !== void 0 ? _payload_guild_id : payload.guildId) !== null && _ref !== void 0 ? _ref : null,
            guildId: (_ref1 = (_payload_guildId = payload.guildId) !== null && _payload_guildId !== void 0 ? _payload_guildId : payload.guild_id) !== null && _ref1 !== void 0 ? _ref1 : null,
            content: contentText(payload.content),
            author: payload.author,
            attachments: (_payload_attachments = payload.attachments) !== null && _payload_attachments !== void 0 ? _payload_attachments : [],
            embeds: (_payload_embeds = payload.embeds) !== null && _payload_embeds !== void 0 ? _payload_embeds : [],
            mentions: (_payload_mentions = payload.mentions) !== null && _payload_mentions !== void 0 ? _payload_mentions : [],
            mention_roles: (_payload_mention_roles = payload.mention_roles) !== null && _payload_mention_roles !== void 0 ? _payload_mention_roles : [],
            mentionRoles: (_ref2 = (_payload_mentionRoles = payload.mentionRoles) !== null && _payload_mentionRoles !== void 0 ? _payload_mentionRoles : payload.mention_roles) !== null && _ref2 !== void 0 ? _ref2 : [],
            timestamp: timestamp,
            edited_timestamp: (_payload_edited_timestamp = payload.edited_timestamp) !== null && _payload_edited_timestamp !== void 0 ? _payload_edited_timestamp : null,
            editedTimestamp: (_ref3 = (_payload_editedTimestamp = payload.editedTimestamp) !== null && _payload_editedTimestamp !== void 0 ? _payload_editedTimestamp : payload.edited_timestamp) !== null && _ref3 !== void 0 ? _ref3 : null,
            pinned: Boolean(payload.pinned),
            mention_everyone: Boolean(payload.mention_everyone),
            mentionEveryone: Boolean((_payload_mentionEveryone = payload.mentionEveryone) !== null && _payload_mentionEveryone !== void 0 ? _payload_mentionEveryone : payload.mention_everyone),
            tts: Boolean(payload.tts),
            flags: (_payload_flags = payload.flags) !== null && _payload_flags !== void 0 ? _payload_flags : 0,
            components: (_payload_components = payload.components) !== null && _payload_components !== void 0 ? _payload_components : [],
            reactions: (_payload_reactions = payload.reactions) !== null && _payload_reactions !== void 0 ? _payload_reactions : [],
            sticker_items: (_ref4 = (_payload_sticker_items = payload.sticker_items) !== null && _payload_sticker_items !== void 0 ? _payload_sticker_items : payload.stickerItems) !== null && _ref4 !== void 0 ? _ref4 : [],
            stickers: (_ref5 = (_payload_stickers = payload.stickers) !== null && _payload_stickers !== void 0 ? _payload_stickers : payload.sticker_items) !== null && _ref5 !== void 0 ? _ref5 : [],
            message_reference: (_ref6 = (_payload_message_reference = payload.message_reference) !== null && _payload_message_reference !== void 0 ? _payload_message_reference : payload.messageReference) !== null && _ref6 !== void 0 ? _ref6 : null,
            messageReference: (_ref7 = (_payload_messageReference = payload.messageReference) !== null && _payload_messageReference !== void 0 ? _payload_messageReference : payload.message_reference) !== null && _ref7 !== void 0 ? _ref7 : null,
            message_snapshots: (_ref8 = (_payload_message_snapshots = payload.message_snapshots) !== null && _payload_message_snapshots !== void 0 ? _payload_message_snapshots : payload.messageSnapshots) !== null && _ref8 !== void 0 ? _ref8 : [],
            messageSnapshots: (_ref9 = (_payload_messageSnapshots = payload.messageSnapshots) !== null && _payload_messageSnapshots !== void 0 ? _payload_messageSnapshots : payload.message_snapshots) !== null && _ref9 !== void 0 ? _ref9 : [],
            state: (_payload_state = payload.state) !== null && _payload_state !== void 0 ? _payload_state : 'SENT',
            nonce: (_payload_nonce = payload.nonce) !== null && _payload_nonce !== void 0 ? _payload_nonce : null
        })
    ]);
}
function buildSurfaceRecord(target, channelId) {
    var record = buildRecord(target, channelId);
    stripMessageReactions(record);
    record.animateEmoji = true;
    var usernameColor = nativeUsernameColor(record.colorString);
    if (usernameColor !== undefined) record.usernameColor = usernameColor;
    return record;
}
function buildEmbeddedContent(target, channelId) {
    if (!messageRecord || !rowManager) return;
    try {
        var _generator_setOptions;
        var record = buildSurfaceRecord(target, channelId);
        var usernameColor = nativeUsernameColor(record.colorString);
        var generator = Reflect.construct(rowManager, []);
        (_generator_setOptions = generator.setOptions) === null || _generator_setOptions === void 0 ? void 0 : _generator_setOptions.call(generator, {
            animateEmoji: true,
            animatingStickerMessageId: record.id,
            gifAutoPlay: true
        });
        var generate = generator.generate.bind(generator);
        generator.generate = function(input) {
            var row = generate(input);
            var renderedMessage = row === null || row === void 0 ? void 0 : row.message;
            if (renderedMessage) {
                renderedMessage.type = 0;
                renderedMessage.renderContentOnly = false;
                renderedMessage.animateEmoji = true;
                renderedMessage.gifAutoPlay = true;
                enableAnimatedEmojiSources(renderedMessage.content);
                if (usernameColor !== undefined) {
                    renderedMessage.colorString = usernameColor;
                    renderedMessage.usernameColor = usernameColor;
                }
            }
            return row;
        };
        var row = generator.generate({
            rowType: 1,
            changeType: 0,
            isFirst: false,
            canAddNewReactions: false,
            canShowImages: true,
            message: record
        });
        if (!row) return;
        row.renderContentOnly = false;
        row.separatorBefore = false;
        return {
            generator: generator,
            record: record
        };
    } catch (unused) {
        return;
    }
}
function linkedMessage(target) {
    var _ref;
    var _messages_getMessage;
    var key = messageKey(target.channelId, target.messageId);
    var cached = cachedMessages.get(key);
    if (cached) return cached;
    var message = (_ref = messages === null || messages === void 0 ? void 0 : (_messages_getMessage = messages.getMessage) === null || _messages_getMessage === void 0 ? void 0 : _messages_getMessage.call(messages, target.channelId, target.messageId)) !== null && _ref !== void 0 ? _ref : null;
    if (message) cachedMessages.set(key, message);
    return message;
}
function wakeTargetCells(targetKey) {
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
    try {
        for(var _iterator = waitingCells[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
            var _step_value = _sliced_to_array(_step.value, 2), key = _step_value[0], waitingTarget = _step_value[1];
            if (waitingTarget !== targetKey) continue;
            waitingCells.delete(key);
            completedCells.delete(key);
            retryCounts.delete(key);
            var cell = activeCells.get(key);
            if (cell) scheduleCell(cell);
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
function fetchLinkedMessage(target) {
    var key = messageKey(target.channelId, target.messageId);
    if (pendingMessages.has(key) || linkedMessage(target)) return;
    pendingMessages.add(key);
    var token = lifecycle;
    var request;
    try {
        var _messageActions_fetchMessage;
        request = messageActions === null || messageActions === void 0 ? void 0 : (_messageActions_fetchMessage = messageActions.fetchMessage) === null || _messageActions_fetchMessage === void 0 ? void 0 : _messageActions_fetchMessage.call(messageActions, target);
    } catch (unused) {
        pendingMessages.delete(key);
        return;
    }
    if (!(request === null || request === void 0 ? void 0 : request.then)) {
        pendingMessages.delete(key);
        return;
    }
    void request.then(function(result) {
        var _ref;
        var _messages_getMessage;
        if (token !== lifecycle) return;
        var resolved = (_ref = messages === null || messages === void 0 ? void 0 : (_messages_getMessage = messages.getMessage) === null || _messages_getMessage === void 0 ? void 0 : _messages_getMessage.call(messages, target.channelId, target.messageId)) !== null && _ref !== void 0 ? _ref : result;
        if (resolved) cachedMessages.set(key, resolved);
    }).catch(function() {
        return undefined;
    }).finally(function() {
        pendingMessages.delete(key);
        if (token === lifecycle) wakeTargetCells(key);
    });
}
function nativeFrame(width, height) {
    var _ref;
    return (_ref = objc === null || objc === void 0 ? void 0 : objc.struct('CGRect', {
        origin: {
            x: 0,
            y: 0
        },
        size: {
            width: width,
            height: height
        }
    })) !== null && _ref !== void 0 ? _ref : null;
}
function availableMessageWidth(cell, label) {
    if (!fabric) return 0;
    var labelWidth = fabric.measure(label).width;
    var cellWidth = fabric.measure(cell).width;
    if (!Number.isFinite(labelWidth) || !Number.isFinite(cellWidth)) return labelWidth;
    var targetKey = cellKey(cell);
    var view = label;
    var left = 0;
    for(var depth = 0; depth < MAX_NATIVE_VIEW_DEPTH; depth++){
        var frame = fabric.measure(view);
        left += frame.x;
        var parent = nativeCall(view, 'superview');
        if (!parent || cellKey(parent) === targetKey) break;
        view = parent;
    }
    var availableWidth = cellWidth - left - 12;
    if (!Number.isFinite(availableWidth) || availableWidth < 80) return labelWidth;
    return Math.max(labelWidth, Math.min(cellWidth, availableWidth));
}
function createHost(width, height) {
    if (!objc) return null;
    try {
        var view = objc.alloc('UIView');
        objc.invoke(view, 'setFrame:', [
            nativeFrame(width, height)
        ], {
            thread: 'main'
        });
        return view;
    } catch (unused) {
        return null;
    }
}
function attributedSurfaceInsertion(state) {
    var invoke = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : nativeCall;
    var _stringFromNative;
    if (!objc) return null;
    var attachmentClass = objc.getClass('YYTextAttachment');
    if (!attachmentClass) return null;
    var attachment = objc.alloc(attachmentClass);
    invoke(attachment, 'setValue:forKey:', state.host, 'content');
    invoke(attachment, 'setValue:forKey:', 1, 'contentMode');
    var sourceText = (_stringFromNative = stringFromNative(invoke(state.original, 'string'))) !== null && _stringFromNative !== void 0 ? _stringFromNative : '';
    var insertionLocation = state.range.location + state.range.length;
    var trailingText = sourceText.slice(insertionLocation);
    var leadingNewline = sourceText[insertionLocation - 1] === '\n' ? '' : '\n';
    var trailingNewline = trailingText.trim().length > 0 ? '\n' : '';
    var spacerText = '\u200B\n';
    var spacerLocation = leadingNewline.length;
    var attachmentLocation = spacerLocation + spacerText.length;
    var insertionText = "".concat(leadingNewline).concat(spacerText, "￼").concat(trailingNewline);
    var attributes = state.font ? {
        NSFont: state.font
    } : {};
    var insertion = objc.alloc('NSMutableAttributedString');
    invoke(insertion, 'initWithString:attributes:', insertionText, attributes);
    var spacerFont = state.font ? invoke(state.font, 'fontWithSize:', SURFACE_SPACER_FONT_SIZE) : null;
    if (spacerFont) {
        invoke(insertion, 'addAttribute:value:range:', 'NSFont', spacerFont, nativeRange(spacerLocation, spacerText.length));
    }
    invoke(insertion, 'addAttribute:value:range:', 'YYTextAttachment', attachment, nativeRange(attachmentLocation, 1));
    var delegateClass = objc.getClass('YYTextRunDelegate');
    if (delegateClass) {
        var delegate = objc.alloc(delegateClass);
        invoke(delegate, 'setValue:forKey:', state.height, 'ascent');
        invoke(delegate, 'setValue:forKey:', 0, 'descent');
        invoke(delegate, 'setValue:forKey:', state.width, 'width');
        var coreDelegate = invoke(delegate, 'CTRunDelegate');
        if (coreDelegate) {
            invoke(insertion, 'addAttribute:value:range:', 'CTRunDelegate', coreDelegate, nativeRange(attachmentLocation, 1));
        }
    }
    return insertion;
}
function structFields(value) {
    if (!value || (typeof value === "undefined" ? "undefined" : _type_of(value)) !== 'object') return {};
    var fields = value.value;
    return fields && (typeof fields === "undefined" ? "undefined" : _type_of(fields)) === 'object' ? fields : {};
}
function tableForCell(cell) {
    if (!objc) return null;
    var current = cell;
    for(var depth = 0; depth < 14 && current; depth++){
        if (objc.respondsTo(current, 'beginUpdates') && objc.respondsTo(current, 'endUpdates')) {
            return current;
        }
        current = nativeCall(current, 'superview');
    }
    return null;
}
function tableLayoutMetrics(table) {
    var _contentInset_top, _contentInset_bottom;
    var contentSize = structFields(nativeCall(table, 'contentSize'));
    var contentOffset = structFields(nativeCall(table, 'contentOffset'));
    var bounds = structFields(nativeCall(table, 'bounds'));
    var boundsSize = bounds.size;
    var transform = structFields(nativeCall(table, 'transform'));
    var contentInset = structFields(nativeCall(table, 'adjustedContentInset'));
    var contentHeight = Number(contentSize.height);
    var viewportHeight = Number(boundsSize === null || boundsSize === void 0 ? void 0 : boundsSize.height);
    var offsetY = Number(contentOffset.y);
    var topInset = Number((_contentInset_top = contentInset.top) !== null && _contentInset_top !== void 0 ? _contentInset_top : 0);
    var bottomInset = Number((_contentInset_bottom = contentInset.bottom) !== null && _contentInset_bottom !== void 0 ? _contentInset_bottom : 0);
    var x = Number(contentOffset.x);
    return {
        bottomInset: bottomInset,
        contentHeight: contentHeight,
        inverted: Number(transform.d) < 0,
        offsetX: x,
        offsetY: offsetY,
        topInset: topInset,
        viewportHeight: viewportHeight
    };
}
function captureSurfaceBottomAnchor(state, table) {
    var _messages_getLastMessage;
    var latestMessage = messages === null || messages === void 0 ? void 0 : (_messages_getLastMessage = messages.getLastMessage) === null || _messages_getLastMessage === void 0 ? void 0 : _messages_getLastMessage.call(messages, state.selectedTarget.channelId);
    var anchor = readSurfaceAnchor(tableLayoutMetrics(table), (latestMessage === null || latestMessage === void 0 ? void 0 : latestMessage.id) === state.messageId);
    state.bottomAnchor.capture(anchor);
}
function tableIsScrolling(table) {
    return Boolean(nativeCall(table, 'isTracking') || nativeCall(table, 'isDragging') || nativeCall(table, 'isDecelerating'));
}
function scheduleBottomScrollCorrection(state, table) {
    if (!state.bottomAnchor.pending) return;
    if (state.bottomScrollTimer) return;
    var attempts = 0;
    var correct = function correct1() {
        state.bottomScrollTimer = null;
        if (cellStates.get(state.cellKey) !== state || !objc) {
            state.bottomAnchor.clear();
            return;
        }
        nativeCall(state.label, 'layoutIfNeeded');
        nativeCall(state.cell, 'layoutIfNeeded');
        nativeCall(table, 'layoutIfNeeded');
        var metrics = tableLayoutMetrics(table);
        var userIsScrolling = tableIsScrolling(table);
        var correction = state.bottomAnchor.correction(metrics, userIsScrolling);
        if (correction) {
            nativeCall(table, 'setContentOffset:animated:', objc.struct('CGPoint', {
                x: correction.x,
                y: correction.y
            }), false);
            return;
        }
        if (state.bottomAnchor.pending && attempts < 12) {
            attempts++;
            state.bottomScrollTimer = setTimeout(correct, 16);
            return;
        }
        state.bottomAnchor.clear();
    };
    state.bottomScrollTimer = setTimeout(correct, 16);
}
function scheduleReactionScrollCorrection(state, delay) {
    if (state.reactionLayoutTimer) clearTimeout(state.reactionLayoutTimer);
    state.reactionLayoutTimer = setTimeout(function() {
        state.reactionLayoutTimer = null;
        if (cellStates.get(state.cellKey) !== state) return;
        var table = tableForCell(state.cell);
        if (table) scheduleBottomScrollCorrection(state, table);
    }, delay);
}
function refreshRowSize(state) {
    var force = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
    if (!objc || !shouldRefreshSurfaceRow(force, state.lastInvalidatedHeight, state.height)) return;
    state.lastInvalidatedHeight = state.height;
    nativeCall(state.label, 'invalidateIntrinsicContentSize');
    nativeCall(state.label, 'setNeedsLayout');
    nativeCall(state.cell, 'setNeedsUpdateConstraints');
    nativeCall(state.cell, 'setNeedsLayout');
    var table = tableForCell(state.cell);
    if (!table) {
        state.bottomAnchor.clear();
        return;
    }
    captureSurfaceBottomAnchor(state, table);
    nativeCall(table, 'beginUpdates');
    nativeCall(table, 'endUpdates');
    scheduleBottomScrollCorrection(state, table);
}
function applyAttachment(state) {
    var forceRefresh = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
    if (!objc) return false;
    if (state.applying) return false;
    state.applying = true;
    try {
        var attachment = attributedSurfaceInsertion(state);
        if (!attachment) return false;
        var updated = nativeCall(state.original, 'mutableCopy');
        if (!updated) return false;
        nativeCall(updated, 'insertAttributedString:atIndex:', attachment, state.range.location + state.range.length);
        var text = stringFromNative(nativeCall(updated, 'string'));
        if (typeof text !== 'string') return false;
        state.rendered = updated;
        state.renderedText = text;
        nativeCall(state.label, 'setAttributedText:', updated);
        nativeCall(state.label, 'setNeedsLayout');
        refreshRowSize(state, forceRefresh);
        return true;
    } finally{
        state.applying = false;
    }
}
function clearSurfaceTimers(state) {
    if (state.layoutTimer) clearTimeout(state.layoutTimer);
    if (state.reactionLayoutTimer) clearTimeout(state.reactionLayoutTimer);
    if (state.bottomScrollTimer) clearTimeout(state.bottomScrollTimer);
    state.layoutTimer = null;
    state.reactionLayoutTimer = null;
    state.bottomScrollTimer = null;
    state.pendingHeight = null;
    state.bottomAnchor.clear();
}
function reportSurfaceLayout(surfaceId, height) {
    var _state_pendingHeight;
    var state = surfaces.get(surfaceId);
    if (!state || !Number.isFinite(height) || height <= 0 || height > MAX_SURFACE_HEIGHT) return;
    var fittedHeight = Math.max(MIN_SURFACE_HEIGHT, height - SURFACE_BOTTOM_TRIM);
    var currentHeight = (_state_pendingHeight = state.pendingHeight) !== null && _state_pendingHeight !== void 0 ? _state_pendingHeight : state.height;
    if (Math.abs(currentHeight - fittedHeight) < 2) return;
    state.pendingHeight = fittedHeight;
    if (state.layoutTimer) clearTimeout(state.layoutTimer);
    state.layoutTimer = setTimeout(function() {
        state.layoutTimer = null;
        var settledHeight = state.pendingHeight;
        state.pendingHeight = null;
        if (settledHeight === null || surfaces.get(state.surfaceId) !== state || Math.abs(state.height - settledHeight) < 2) return;
        var table = tableForCell(state.cell);
        if (table) captureSurfaceBottomAnchor(state, table);
        state.height = settledHeight;
        surfaceHeights.set(state.heightCacheKey, settledHeight);
        if (state.reactionLayoutTimer) clearTimeout(state.reactionLayoutTimer);
        state.reactionLayoutTimer = null;
        nativeCall(state.host, 'setFrame:', nativeFrame(state.width, settledHeight));
        applyAttachment(state, true);
    }, SURFACE_LAYOUT_SETTLE_DELAY);
}
function MessageSurface(param) {
    var renderRevision = param.renderRevision, surfaceId = param.surfaceId;
    var state = surfaces.get(surfaceId);
    var _metro_common = window.unbound.metro.common, React = _metro_common.React, ReactNative = _metro_common.ReactNative;
    if (!state || !chatItem) return React.createElement(ReactNative.View, {
        style: {
            height: 1
        }
    });
    var embeddedMessage = React.createElement(chatItem, {
        key: surfaceId,
        message: state.record,
        renderRevision: renderRevision,
        rowGenerator: state.generator
    });
    var onLayout = function onLayout(event) {
        var _event_nativeEvent_layout, _event_nativeEvent;
        var height = Number(event === null || event === void 0 ? void 0 : (_event_nativeEvent = event.nativeEvent) === null || _event_nativeEvent === void 0 ? void 0 : (_event_nativeEvent_layout = _event_nativeEvent.layout) === null || _event_nativeEvent_layout === void 0 ? void 0 : _event_nativeEvent_layout.height);
        if (height > 0) reportSurfaceLayout(surfaceId, height);
    };
    var content = React.createElement(ReactNative.View, {
        onLayout: onLayout,
        style: {
            backgroundColor: EMBED_BACKGROUND,
            borderRadius: 8,
            overflow: 'hidden',
            minHeight: MIN_SURFACE_HEIGHT,
            paddingBottom: 0,
            paddingTop: 6,
            width: state.width
        }
    }, embeddedMessage);
    if (!embeddedAnimationSupport) return content;
    return React.createElement(embeddedAnimationSupport.context.Provider, {
        value: true
    }, content);
}
function resolveChatItem(value) {
    var depth = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
    var _ref, _wrapped_type;
    if (typeof value === 'function') return value;
    if (!value || (typeof value === "undefined" ? "undefined" : _type_of(value)) !== 'object' || depth >= 5) return null;
    var wrapped = value;
    return resolveChatItem((_ref = (_wrapped_type = wrapped.type) !== null && _wrapped_type !== void 0 ? _wrapped_type : wrapped.render) !== null && _ref !== void 0 ? _ref : wrapped.default, depth + 1);
}
function modulePath(id) {
    var _modules_get, _modules_get1;
    var window = globalThis.window;
    var modules = window === null || window === void 0 ? void 0 : window.modules;
    return modules === null || modules === void 0 ? void 0 : (_modules_get1 = modules.get) === null || _modules_get1 === void 0 ? void 0 : (_modules_get = _modules_get1.call(modules, Number(id))) === null || _modules_get === void 0 ? void 0 : _modules_get.__filePath;
}
function registerSurface() {
    var _ref, _metro_common_ReactNative_AppRegistry;
    if (surfaceModuleName) return true;
    var window = globalThis.window;
    var registry = (_ref = (_metro_common_ReactNative_AppRegistry = window.unbound.metro.common.ReactNative.AppRegistry) !== null && _metro_common_ReactNative_AppRegistry !== void 0 ? _metro_common_ReactNative_AppRegistry : window === null || window === void 0 ? void 0 : window.RN$AppRegistry) !== null && _ref !== void 0 ? _ref : window.unbound.metro.findByProps('registerComponent', 'runApplication');
    if (!registry || typeof registry.registerComponent !== 'function') return false;
    var registered = typeof registry.getAppKeys === 'function' ? registry.getAppKeys() : [];
    var surfaceIndex = lifecycle;
    while(registered.includes("".concat(SURFACE_MODULE_PREFIX).concat(surfaceIndex)))surfaceIndex++;
    surfaceModuleName = "".concat(SURFACE_MODULE_PREFIX).concat(surfaceIndex);
    try {
        registry.registerComponent(surfaceModuleName, function() {
            return MessageSurface;
        });
        return true;
    } catch (unused) {
        surfaceModuleName = '';
        return false;
    }
}
function createSurfaceState(cell, key, info, target, channelName, label, attributedText, range, source, content) {
    if (!objc || !fabric) return null;
    var width = availableMessageWidth(cell, label);
    if (!Number.isFinite(width) || width < 80) return null;
    var font = linkFont(attributedText, range);
    var heightCacheKey = surfaceHeightCacheKey(target.channelId, target.messageId, width);
    var initialHeight = surfaceHeights.get(heightCacheKey, INITIAL_SURFACE_HEIGHT);
    var host = createHost(width, initialHeight);
    if (!host) return null;
    var bottomAnchor = new BottomAnchorTracker();
    var surfaceId = "message-link-".concat(key, "-").concat(info.messageId, "-").concat(target.messageId);
    var state = {
        cell: cell,
        cellKey: key,
        channelName: channelName,
        baseGenerator: content.generator,
        font: font,
        generator: content.generator,
        host: host,
        label: label,
        labelHook: null,
        messageId: info.messageId,
        sourceReactionSnapshot: reactionSnapshot(source.reactions),
        original: attributedText,
        range: range,
        record: content.record,
        rendered: null,
        renderedText: null,
        selectedTarget: target,
        surface: null,
        surfaceId: surfaceId,
        width: width,
        height: initialHeight,
        heightCacheKey: heightCacheKey,
        lastInvalidatedHeight: -1,
        applying: false,
        layoutTimer: null,
        reactionLayoutTimer: null,
        bottomScrollTimer: null,
        pendingHeight: null,
        renderRevision: 0,
        bottomAnchor: bottomAnchor
    };
    var table = tableForCell(cell);
    if (table) captureSurfaceBottomAnchor(state, table);
    surfaces.set(surfaceId, state);
    try {
        state.labelHook = objc.hook('DCDReusableYYLabel', 'setAttributedText:', {
            after: function after() {
                if (state.applying) return;
                setTimeout(function() {
                    return reconcileSurfaceText(state);
                }, 0);
            }
        }, {
            instance: label
        });
        state.surface = fabric.mount(host, surfaceModuleName, {
            renderRevision: state.renderRevision,
            surfaceId: surfaceId
        });
        fabric.setSize(state.surface, {
            width: width,
            height: MIN_SURFACE_HEIGHT
        }, {
            width: width,
            height: MAX_SURFACE_HEIGHT
        });
        removeCellLabelHooks(key);
        cellStates.set(key, state);
        if (!applyAttachment(state)) throw new Error('Could not attach the Fabric message surface');
        return state;
    } catch (unused) {
        var _state_labelHook;
        cellStates.delete(key);
        clearSurfaceTimers(state);
        (_state_labelHook = state.labelHook) === null || _state_labelHook === void 0 ? void 0 : _state_labelHook.remove();
        try {
            if (state.surface) fabric.unmount(state.surface);
        } catch (unused) {
        }
        surfaces.delete(surfaceId);
        return null;
    }
}
function teardownSurface(key, restore) {
    var _state_labelHook;
    var state = cellStates.get(key);
    if (!state) return;
    clearSurfaceTimers(state);
    (_state_labelHook = state.labelHook) === null || _state_labelHook === void 0 ? void 0 : _state_labelHook.remove();
    if (restore && objc && state.rendered && state.renderedText !== null) {
        var current = nativeCall(state.label, 'attributedText');
        var currentText = current ? stringFromNative(nativeCall(current, 'string')) : undefined;
        if (current && (currentText === state.renderedText || current === state.rendered)) {
            nativeCall(state.label, 'setAttributedText:', state.original);
            nativeCall(state.label, 'setNeedsLayout');
        }
    }
    if (state.surface) {
        try {
            fabric === null || fabric === void 0 ? void 0 : fabric.unmount(state.surface);
        } catch (unused) {
        }
    }
    surfaces.delete(state.surfaceId);
    cellStates.delete(key);
    var rebindTimer = surfaceRebindTimers.get(key);
    if (rebindTimer) clearTimeout(rebindTimer);
    surfaceRebindTimers.delete(key);
}
function cachedContentFor(target, message) {
    return buildEmbeddedContent(message, target.channelId);
}
function currentAttributedText(view) {
    return nativeCall(view, 'attributedText');
}
function updateExistingSurface(state, attributedText, range) {
    var forceRefresh = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : true;
    state.original = attributedText;
    state.range = range;
    state.font = linkFont(attributedText, range);
    applyAttachment(state, forceRefresh);
}
function updateCell(cell) {
    var _info_channelId;
    var _messages_getMessage;
    if (!objc || !fabric) return 'done';
    var key = cellKey(cell);
    var info = messageInfoForCell(cell);
    if (!key || !info) return 'retry';
    var channelId = (_info_channelId = info.channelId) !== null && _info_channelId !== void 0 ? _info_channelId : currentChannelId();
    if (!channelId) return 'retry';
    var source = messages === null || messages === void 0 ? void 0 : (_messages_getMessage = messages.getMessage) === null || _messages_getMessage === void 0 ? void 0 : _messages_getMessage.call(messages, channelId, info.messageId);
    var targets = source ? linkedTargets(source) : [];
    if (!source || targets.length === 0) {
        var state = cellStates.get(key);
        if (state && state.messageId !== info.messageId) teardownSurface(key, true);
        return source ? 'done' : 'retry';
    }
    var target = targets[0];
    var targetMessage = linkedMessage(target);
    if (!targetMessage) {
        waitingCells.set(key, messageKey(target.channelId, target.messageId));
        fetchLinkedMessage(target);
        return 'waiting';
    }
    var channelName = channelNameFor(target, targetMessage);
    if (!channelName) return 'retry';
    var existing = cellStates.get(key);
    if (existing && existing.messageId === info.messageId && existing.selectedTarget.messageId === target.messageId) {
        var attributedText = currentAttributedText(existing.label);
        var text = attributedText ? textForView(existing.label) : undefined;
        if (!attributedText || text === undefined) return 'retry';
        if (text === existing.renderedText) return 'done';
        var range = findRenderedLinkRange(text, channelName);
        if (!range) return 'retry';
        updateExistingSurface(existing, attributedText, range);
        return 'done';
    }
    if (existing) teardownSurface(key, false);
    var content = nativeCall(cell, 'contentView');
    if (!content) return 'retry';
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
    try {
        for(var _iterator = textViewsInView(content)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
            var label = _step.value;
            var attributedText1 = currentAttributedText(label);
            var text1 = attributedText1 ? textForView(label) : undefined;
            if (!attributedText1 || text1 === undefined) continue;
            var range1 = findRenderedLinkRange(text1, channelName);
            if (!range1) continue;
            var built = cachedContentFor(target, targetMessage);
            if (!built) return 'retry';
            var state1 = createSurfaceState(cell, key, info, target, channelName, label, attributedText1, range1, source, built);
            return state1 ? 'done' : 'retry';
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
    return 'retry';
}
function scheduleCell(cell) {
    var key = cellKey(cell);
    if (!key) return;
    activeCells.set(key, cell);
    if (cellStates.has(key) || pendingCells.has(key) || completedCells.has(key) || waitingCells.has(key) || retryTimers.has(key)) return;
    pendingCells.add(key);
    var token = lifecycle;
    setTimeout(function() {
        pendingCells.delete(key);
        if (token !== lifecycle || !objc) return;
        try {
            var _retryCounts_get;
            var status = updateCell(cell);
            if (status === 'done') {
                completedCells.add(key);
                retryCounts.delete(key);
                return;
            }
            if (status === 'waiting') return;
            observeCellLabels(cell);
            var attempts = ((_retryCounts_get = retryCounts.get(key)) !== null && _retryCounts_get !== void 0 ? _retryCounts_get : 0) + 1;
            retryCounts.set(key, attempts);
            if (attempts > 8) {
                completedCells.add(key);
                return;
            }
            var timer = setTimeout(function() {
                retryTimers.delete(key);
                if (token === lifecycle) scheduleCell(cell);
            }, 120);
            retryTimers.set(key, timer);
        } catch (unused) {
            completedCells.add(key);
        }
    }, 0);
}
function clearCell(key) {
    activeCells.delete(key);
    pendingCells.delete(key);
    completedCells.delete(key);
    retryCounts.delete(key);
    waitingCells.delete(key);
    var rebindTimer = surfaceRebindTimers.get(key);
    if (rebindTimer) clearTimeout(rebindTimer);
    surfaceRebindTimers.delete(key);
    var retryTimer = retryTimers.get(key);
    if (retryTimer) clearTimeout(retryTimer);
    retryTimers.delete(key);
    removeCellLabelHooks(key);
    teardownSurface(key, true);
}
function removeCellLabelHooks(key) {
    var _cellLabelHooks_get;
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
    try {
        for(var _iterator = ((_cellLabelHooks_get = cellLabelHooks.get(key)) !== null && _cellLabelHooks_get !== void 0 ? _cellLabelHooks_get : [])[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
            var token = _step.value;
            token.remove();
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
    cellLabelHooks.delete(key);
}
function refreshCell(cell) {
    var key = cellKey(cell);
    if (!key || cellStates.has(key)) return;
    completedCells.delete(key);
    retryCounts.delete(key);
    waitingCells.delete(key);
    scheduleCell(cell);
}
function observeCellLabels(cell) {
    if (!objc) return;
    var key = cellKey(cell);
    if (!key || cellLabelHooks.has(key)) return;
    var content = nativeCall(cell, 'contentView');
    if (!content) return;
    var tokens = [];
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
    try {
        for(var _iterator = textViewsInView(content)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
            var label = _step.value;
            var _objc_className;
            if (!((_objc_className = objc.className(label)) !== null && _objc_className !== void 0 ? _objc_className : '').includes('DCDReusableYYLabel')) continue;
            try {
                tokens.push(objc.hook('DCDReusableYYLabel', 'setAttributedText:', {
                    after: function after() {
                        return refreshCell(cell);
                    }
                }, {
                    instance: label
                }));
            } catch (unused) {
                void 0;
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
    if (tokens.length > 0) cellLabelHooks.set(key, tokens);
}
function installNativeHooks() {
    if (!objc || hooks.length > 0) return;
    var initialScan;
    initialScan = objc.hook('DCDMessageTableViewCell', 'layoutSubviews', {
        after: function after(param) {
            var self = param.self;
            var cells = visibleMessageCellsInCell(self);
            if (cells.length === 0) return;
            initialScan.remove();
            var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
            try {
                for(var _iterator = cells[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                    var cell = _step.value;
                    scheduleCell(cell);
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
    });
    var visibility = objc.hook('DCDMessageTableViewCell', 'didMoveToWindow', {
        after: function after(param) {
            var self = param.self;
            var key = cellKey(self);
            if (!key) return;
            if (!nativeCall(self, 'window')) {
                clearCell(key);
                return;
            }
            scheduleCell(self);
        }
    });
    var reuse = objc.hook('DCDMessageTableViewCell', 'prepareForReuse', {
        after: function after(param) {
            var self = param.self;
            var key = cellKey(self);
            if (!key) return;
            clearCell(key);
            setTimeout(function() {
                return scheduleCell(self);
            }, 0);
        }
    });
    hooks = [
        initialScan,
        visibility,
        reuse
    ];
    initialScanTimer = setTimeout(function() {
        initialScanTimer = null;
        if (!objc || hooks.length === 0) return;
        var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
        try {
            for(var _iterator = visibleMessageCells()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                var cell = _step.value;
                scheduleCell(cell);
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
    }, 300);
}
function dependenciesReady() {
    return Boolean((messages === null || messages === void 0 ? void 0 : messages.getMessage) && (messageActions === null || messageActions === void 0 ? void 0 : messageActions.fetchMessage) && messageRecord && rowManager && chatItem);
}
function captureDependency(candidate) {
    if (!candidate || (typeof candidate === "undefined" ? "undefined" : _type_of(candidate)) !== 'object' && typeof candidate !== 'function') return;
    var value = candidate;
    if (!messages && value._dispatcher && typeof value.getName === 'function' && value.getName() === 'MessageStore' && typeof value.getMessage === 'function') {
        messages = value;
    }
    if (!messageActions && typeof value.fetchMessage === 'function') messageActions = value;
    if (!messageRecord && typeof candidate === 'function' && value.name === 'MessageRecord') {
        messageRecord = candidate;
    }
    if (!rowManager && typeof candidate === 'function' && value.name === 'RowManager') {
        rowManager = candidate;
    }
}
function activate() {
    if (!dependenciesReady() || !registerSurface()) return;
    clearModuleListener();
    installMessageStoreListener();
    installNativeHooks();
}
function captureLoadedModule(module, id) {
    if (!module || (typeof module === "undefined" ? "undefined" : _type_of(module)) !== 'object' && typeof module !== 'function') return;
    var exports = module;
    var isChatItemModule = typeof exports.DCDMessageView === 'function' && typeof exports.DCDSystemMessageView === 'function' && typeof exports.DCDAutoModerationSystemMessageView === 'function';
    if (!chatItem && (modulePath(id) === CHAT_ITEM_PATH || isChatItemModule)) {
        var _resolveChatItem;
        chatItem = (_resolveChatItem = resolveChatItem(exports.default)) !== null && _resolveChatItem !== void 0 ? _resolveChatItem : resolveChatItem(exports);
    }
    captureDependency(exports);
    captureDependency(exports.default);
    if (dependenciesReady()) activate();
}
function captureInitializedModules() {
    var window = globalThis.window;
    var modules = window === null || window === void 0 ? void 0 : window.modules;
    if (!modules) return;
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
    try {
        for(var _iterator = modules[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
            var _step_value = _sliced_to_array(_step.value, 2), id = _step_value[0], module = _step_value[1];
            var _module_publicModule;
            if (!module.isInitialized) continue;
            captureLoadedModule((_module_publicModule = module.publicModule) === null || _module_publicModule === void 0 ? void 0 : _module_publicModule.exports, id);
            if (dependenciesReady()) break;
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
function clearModuleListener() {
    moduleListenerCleanup === null || moduleListenerCleanup === void 0 ? void 0 : moduleListenerCleanup();
    moduleListenerCleanup = null;
}
function initialize() {
    if (!moduleListenerCleanup) {
        moduleListenerCleanup = window.unbound.metro.addListener(function(module, id) {
            return captureLoadedModule(module, id);
        });
    }
    captureInitializedModules();
    if (!chatItem) {
        var module = window.unbound.metro.findByFilePath(CHAT_ITEM_PATH, {
            cacheOnly: false,
            interop: false
        });
        if (module) {
            var _resolveChatItem;
            chatItem = (_resolveChatItem = resolveChatItem(module.default)) !== null && _resolveChatItem !== void 0 ? _resolveChatItem : resolveChatItem(module);
        }
    }
    if (dependenciesReady()) activate();
}
function start(context) {
    var _ref, _ref1;
    lifecycle++;
    objc = (_ref = context === null || context === void 0 ? void 0 : context.native.objc) !== null && _ref !== void 0 ? _ref : null;
    fabric = (_ref1 = context === null || context === void 0 ? void 0 : context.native.fabric) !== null && _ref1 !== void 0 ? _ref1 : null;
    embeddedAnimationSupport === null || embeddedAnimationSupport === void 0 ? void 0 : embeddedAnimationSupport.dispose();
    embeddedAnimationSupport = installEmbeddedAnimationSupport(window.unbound.metro.common.React, window.unbound.metro, modulePath);
    selectedChannel = window.unbound.metro.findByProps('getLastSelectedChannelId', 'getChannelId');
    channelStore = window.unbound.metro.findByProps('getChannel');
    initialize();
}
function stop() {
    lifecycle++;
    if (initialScanTimer) clearTimeout(initialScanTimer);
    initialScanTimer = null;
    removeMessageStoreListener();
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
    try {
        for(var _iterator = hooks[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
            var token = _step.value;
            token.remove();
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
    hooks = [];
    clearModuleListener();
    var _iteratorNormalCompletion1 = true, _didIteratorError1 = false, _iteratorError1 = undefined;
    try {
        for(var _iterator1 = _to_consumable_array(cellLabelHooks.keys())[Symbol.iterator](), _step1; !(_iteratorNormalCompletion1 = (_step1 = _iterator1.next()).done); _iteratorNormalCompletion1 = true){
            var key = _step1.value;
            removeCellLabelHooks(key);
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
        for(var _iterator2 = _to_consumable_array(cellStates.keys())[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true){
            var key1 = _step2.value;
            teardownSurface(key1, true);
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
    embeddedAnimationSupport === null || embeddedAnimationSupport === void 0 ? void 0 : embeddedAnimationSupport.dispose();
    embeddedAnimationSupport = null;
    activeCells.clear();
    pendingCells.clear();
    completedCells.clear();
    retryCounts.clear();
    var _iteratorNormalCompletion3 = true, _didIteratorError3 = false, _iteratorError3 = undefined;
    try {
        for(var _iterator3 = retryTimers.values()[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true){
            var timer = _step3.value;
            clearTimeout(timer);
        }
    } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
    } finally{
        try {
            if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
                _iterator3.return();
            }
        } finally{
            if (_didIteratorError3) {
                throw _iteratorError3;
            }
        }
    }
    retryTimers.clear();
    var _iteratorNormalCompletion4 = true, _didIteratorError4 = false, _iteratorError4 = undefined;
    try {
        for(var _iterator4 = surfaceRebindTimers.values()[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true){
            var timer1 = _step4.value;
            clearTimeout(timer1);
        }
    } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
    } finally{
        try {
            if (!_iteratorNormalCompletion4 && _iterator4.return != null) {
                _iterator4.return();
            }
        } finally{
            if (_didIteratorError4) {
                throw _iteratorError4;
            }
        }
    }
    surfaceRebindTimers.clear();
    waitingCells.clear();
    cachedMessages.clear();
    pendingMessages.clear();
    surfaceHeights.clear();
    messages = null;
    messageActions = null;
    channelStore = null;
    selectedChannel = null;
    messageRecord = null;
    rowManager = null;
    chatItem = null;
    objc = null;
    fabric = null;
    surfaceModuleName = '';
}
var index = {
    start: start,
    stop: stop
};
return index;
})();return this.__plugin;},start(context){const module=this.__load();const plugin=module?.default??module;if(plugin&&typeof plugin.start==='function')return plugin.start(context);},stop(){const module=this.__load();const plugin=module?.default??module;if(plugin&&typeof plugin.stop==='function')return plugin.stop();}})