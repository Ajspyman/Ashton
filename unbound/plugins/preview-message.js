({__plugin:null,__load(){if(this.__plugin)return this.__plugin;this.__plugin=(function () {
'use strict';
function _array_like_to_array$2(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _array_without_holes$2(arr) {
    if (Array.isArray(arr)) return _array_like_to_array$2(arr);
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
function _type_of$1(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
function _unsupported_iterable_to_array$2(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _array_like_to_array$2(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _array_like_to_array$2(o, minLen);
}
var EMBED_KEYS = [
    'type',
    'title',
    'description'
];
var URL_PATTERN = /https?:\/\/[^\s<>()"']+/gi;
var META_TAG_PATTERN = /<meta\b[^>]*>/gi;
var ATTRIBUTE_PATTERN = /([:\w-]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/gi;
var TITLE_PATTERN = /<title\b[^>]*>([\s\S]*?)<\/title>/i;
function decodeHtml(value) {
    return value.replace(/&amp;/gi, '&').replace(/&quot;/gi, '"').replace(/&#39;|&apos;/gi, "'").replace(/&lt;/gi, '<').replace(/&gt;/gi, '>').replace(/&#(\d+);/g, function(_match, code) {
        return String.fromCodePoint(Number(code));
    }).replace(/&#x([\da-f]+);/gi, function(_match, code) {
        return String.fromCodePoint(Number.parseInt(code, 16));
    });
}
function cleanValue(value) {
    var cleaned = value ? decodeHtml(value).replace(/\s+/g, ' ').trim() : '';
    return cleaned || undefined;
}
function parseAttributes(tag) {
    var attributes = {};
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
    try {
        for(var _iterator = tag.matchAll(ATTRIBUTE_PATTERN)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
            var match = _step.value;
            var _ref, _match_;
            var value = (_ref = (_match_ = match[2]) !== null && _match_ !== void 0 ? _match_ : match[3]) !== null && _ref !== void 0 ? _ref : match[4];
            if (value !== undefined) attributes[match[1].toLowerCase()] = decodeHtml(value);
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
    return attributes;
}
function readNumber(value) {
    if (!value) return undefined;
    var parsed = Number.parseInt(value, 10);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : undefined;
}
function resolveUrl(value, sourceUrl) {
    if (!value) return undefined;
    try {
        return new URL(value, sourceUrl).toString();
    } catch (unused) {
        return undefined;
    }
}
function normalizeMedia(value) {
    if (!value || (typeof value === "undefined" ? "undefined" : _type_of$1(value)) !== 'object' || Array.isArray(value)) return undefined;
    var media = value;
    var normalized = {};
    if (typeof media.url === 'string') normalized.url = media.url;
    if (typeof media.proxy_url === 'string') normalized.proxy_url = media.proxy_url;
    if (typeof media.width === 'number' && Number.isFinite(media.width)) normalized.width = media.width;
    if (typeof media.height === 'number' && Number.isFinite(media.height)) normalized.height = media.height;
    return Object.keys(normalized).length ? normalized : undefined;
}
function extractUrls(content) {
    var urls = new Set();
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
    try {
        for(var _iterator = content.matchAll(URL_PATTERN)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
            var match = _step.value;
            var _match_index, _ref, _ref1;
            var _url_match, _url_match1;
            var start = (_match_index = match.index) !== null && _match_index !== void 0 ? _match_index : 0;
            var end = start + match[0].length;
            if (content[start - 1] === '<' && content[end] === '>') continue;
            var url = match[0].replace(/[.,!;:?]+$/, '');
            while(url.endsWith(')') && ((_ref = (_url_match = url.match(/\(/g)) === null || _url_match === void 0 ? void 0 : _url_match.length) !== null && _ref !== void 0 ? _ref : 0) < ((_ref1 = (_url_match1 = url.match(/\)/g)) === null || _url_match1 === void 0 ? void 0 : _url_match1.length) !== null && _ref1 !== void 0 ? _ref1 : 0))url = url.slice(0, -1);
            if (url) urls.add(url);
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
    return _to_consumable_array$2(urls);
}
function parseOpenGraph(html, sourceUrl) {
    var _metadata_title;
    var _html_match;
    var metadata = {};
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
    try {
        for(var _iterator = html.matchAll(META_TAG_PATTERN)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
            var tag = _step.value;
            var _ref, _attributes_property;
            var attributes = parseAttributes(tag[0]);
            var key = ((_ref = (_attributes_property = attributes.property) !== null && _attributes_property !== void 0 ? _attributes_property : attributes.name) !== null && _ref !== void 0 ? _ref : '').toLowerCase();
            var value = cleanValue(attributes.content);
            if (!key || !value) continue;
            switch(key){
                case 'og:title':
                case 'twitter:title':
                    var _metadata, _title;
                    (_title = (_metadata = metadata).title) !== null && _title !== void 0 ? _title : _metadata.title = value;
                    break;
                case 'og:description':
                case 'twitter:description':
                    var _metadata1, _description;
                    (_description = (_metadata1 = metadata).description) !== null && _description !== void 0 ? _description : _metadata1.description = value;
                    break;
                case 'og:site_name':
                    var _metadata2, _siteName;
                    (_siteName = (_metadata2 = metadata).siteName) !== null && _siteName !== void 0 ? _siteName : _metadata2.siteName = value;
                    break;
                case 'og:type':
                    var _metadata3, _type;
                    (_type = (_metadata3 = metadata).type) !== null && _type !== void 0 ? _type : _metadata3.type = value;
                    break;
                case 'og:image':
                case 'og:image:url':
                case 'og:image:secure_url':
                case 'twitter:image':
                    var _metadata4, _image;
                    (_image = (_metadata4 = metadata).image) !== null && _image !== void 0 ? _image : _metadata4.image = value;
                    break;
                case 'og:image:width':
                case 'twitter:image:width':
                    var _metadata5, _imageWidth;
                    (_imageWidth = (_metadata5 = metadata).imageWidth) !== null && _imageWidth !== void 0 ? _imageWidth : _metadata5.imageWidth = readNumber(value);
                    break;
                case 'og:image:height':
                case 'twitter:image:height':
                    var _metadata6, _imageHeight;
                    (_imageHeight = (_metadata6 = metadata).imageHeight) !== null && _imageHeight !== void 0 ? _imageHeight : _metadata6.imageHeight = readNumber(value);
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
    var title = (_metadata_title = metadata.title) !== null && _metadata_title !== void 0 ? _metadata_title : cleanValue((_html_match = html.match(TITLE_PATTERN)) === null || _html_match === void 0 ? void 0 : _html_match[1]);
    var image = resolveUrl(metadata.image, sourceUrl);
    if (!title && !metadata.description && !image) return null;
    var embed = {
        type: metadata.type === 'image' && image && !title && !metadata.description ? 'image' : 'article',
        url: sourceUrl
    };
    if (title) embed.title = title;
    if (metadata.description) embed.description = metadata.description;
    if (metadata.siteName) embed.provider = {
        name: metadata.siteName,
        url: sourceUrl
    };
    if (image) embed.image = {
        url: image,
        width: metadata.imageWidth,
        height: metadata.imageHeight
    };
    return embed;
}
function normalizeDiscordEmbed(value, url) {
    if (!value || (typeof value === "undefined" ? "undefined" : _type_of$1(value)) !== 'object' || Array.isArray(value)) return null;
    var embed = value;
    if (typeof embed.type !== 'string' && typeof embed.title !== 'string' && typeof embed.description !== 'string' && !embed.image && !embed.thumbnail && !embed.video) return null;
    var normalized = {
        url: typeof embed.url === 'string' ? embed.url : url
    };
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
    try {
        for(var _iterator = EMBED_KEYS[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
            var key = _step.value;
            if (!(key in embed) || key === 'image' || key === 'thumbnail' || key === 'video') continue;
            normalized[key] = embed[key];
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
    for(var _i = 0, _iter = [
        'image',
        'thumbnail',
        'video'
    ]; _i < _iter.length; _i++){
        var key1 = _iter[_i];
        var media = normalizeMedia(embed[key1]);
        if (media) normalized[key1] = media;
    }
    return normalized;
}
function fetchLinkEmbed(url, request) {
    return _async_to_generator(function() {
        var _result_body_embeds, _result_body, result, response, html;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    if (!(typeof (request === null || request === void 0 ? void 0 : request.post) === 'function')) return [
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
                        request.post({
                            url: '/unfurler/embed-urls',
                            body: {
                                urls: [
                                    url
                                ]
                            }
                        })
                    ];
                case 2:
                    result = _state.sent();
                    return [
                        2,
                        normalizeDiscordEmbed(result === null || result === void 0 ? void 0 : (_result_body = result.body) === null || _result_body === void 0 ? void 0 : (_result_body_embeds = _result_body.embeds) === null || _result_body_embeds === void 0 ? void 0 : _result_body_embeds[0], url)
                    ];
                case 3:
                    _state.sent();
                    return [
                        3,
                        4
                    ];
                case 4:
                    _state.trys.push([
                        4,
                        7,
                        ,
                        8
                    ]);
                    return [
                        4,
                        fetch(url, {
                            headers: {
                                Accept: 'text/html,application/xhtml+xml'
                            }
                        })
                    ];
                case 5:
                    response = _state.sent();
                    if (!response.ok) return [
                        2,
                        null
                    ];
                    return [
                        4,
                        response.text()
                    ];
                case 6:
                    html = _state.sent();
                    return [
                        2,
                        parseOpenGraph(html, url)
                    ];
                case 7:
                    _state.sent();
                    return [
                        2,
                        null
                    ];
                case 8:
                    return [
                        2
                    ];
            }
        });
    })();
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
var RIGHT_ACTIONS_PATH = 'modules/chat_input/native/action_buttons/ChatInputRightActions.tsx';
var CHAT_ITEM_PATH = 'components_native/chat/ChatItem.tsx';
var HAPTICS_PATH = 'modules/haptics/HapticUtils.native.tsx';
var CHANNEL_MESSAGE_DRAFT_TYPE = 0;
var MESSAGE_ROW_TYPE = 1;
var BUTTON_SIZE = 32;
var ICON_SIZE = 22;
var ICON_TINT = '#b5bac1';
var ICON_MIN_SCALE = 0.6;
var PRESS_OPACITY = 0.5;
var PRESS_SCALE = 0.86;
var SHOW_DELAY_MS = 60;
var MAX_PREVIEW_URLS = 4;
var SHOW_MS = 70;
var HIDE_MS = 25;
var FADE_IN_MS = 160;
var FADE_OUT_MS = 120;
var KEYBOARD_DISMISS_DELAY_MS = 350;
var EMPTY_STICKERS = [];
var unpatch = null;
var drafts = null;
var selectedChannel = null;
var users = null;
var chatItem = null;
var messageRecord = null;
var rowManager = null;
var haptics = null;
var restApi = null;
var chatInputs = null;
var eyeIcon = null;
var stickerPreviews = null;
var removeModuleListener = null;
var textReplaceStore = window.unbound.storage.getStore('unbound.text-replace');
function applyTextReplace(content) {
    var _plugins_getEntity;
    var textReplace = (_plugins_getEntity = window.unbound.plugins.getEntity) === null || _plugins_getEntity === void 0 ? void 0 : _plugins_getEntity.call(window.unbound.plugins, 'unbound.text-replace');
    if (!(textReplace === null || textReplace === void 0 ? void 0 : textReplace.started)) return content;
    return applyRules(content, normalizeRules(textReplaceStore.get('stringRules', [])), normalizeRules(textReplaceStore.get('regexRules', [])));
}
function unwrapComponent(mod) {
    var holder = mod;
    var prop = 'default';
    var current = mod === null || mod === void 0 ? void 0 : mod.default;
    var depth = 0;
    while(current && (typeof current === "undefined" ? "undefined" : _type_of(current)) === 'object' && depth < 5){
        var next = current.type !== undefined ? 'type' : current.render !== undefined ? 'render' : null;
        if (!next) break;
        holder = current;
        prop = next;
        current = current[next];
        depth++;
    }
    return typeof current === 'function' ? {
        holder: holder,
        prop: prop
    } : null;
}
function modulePath(id) {
    var _globalThis_window_modules_get, _globalThis_window_modules, _globalThis_window;
    return (_globalThis_window = globalThis.window) === null || _globalThis_window === void 0 ? void 0 : (_globalThis_window_modules = _globalThis_window.modules) === null || _globalThis_window_modules === void 0 ? void 0 : (_globalThis_window_modules_get = _globalThis_window_modules.get(id)) === null || _globalThis_window_modules_get === void 0 ? void 0 : _globalThis_window_modules_get.__filePath;
}
function patchRightActions(mod) {
    if (unpatch) return true;
    var target = unwrapComponent(mod);
    if (!target) return false;
    unpatch = window.unbound.patcher.after(target.holder, target.prop, function(ctx) {
        try {
            var _React;
            var _ref;
            var _ctx_args__channel, _ctx_args_;
            var result = ctx.result;
            if (!(result === null || result === void 0 ? void 0 : result.props)) return;
            var channelId = (_ref = (_ctx_args_ = ctx.args[0]) === null || _ctx_args_ === void 0 ? void 0 : (_ctx_args__channel = _ctx_args_.channel) === null || _ctx_args__channel === void 0 ? void 0 : _ctx_args__channel.id) !== null && _ref !== void 0 ? _ref : selectedChannel.getChannelId();
            if (!channelId) return;
            var _$React = window.unbound.metro.common.React;
            var children = _$React.Children.toArray(result.props.children);
            children.unshift(/*#__PURE__*/ React.createElement(PreviewButton, {
                key: "unbound-preview-message",
                channelId: channelId
            }));
            return (_React = _$React).cloneElement.apply(_React, [
                result,
                null
            ].concat(_to_consumable_array(children)));
        } catch (unused) {}
    });
    return true;
}
function waitForRightActions() {
    var existing = window.unbound.metro.findByFilePath(RIGHT_ACTIONS_PATH, {
        interop: false
    });
    if (patchRightActions(existing)) return;
    removeModuleListener = window.unbound.metro.addListener(function(module, id) {
        if (modulePath(id) !== RIGHT_ACTIONS_PATH || !patchRightActions(module)) return;
        removeModuleListener === null || removeModuleListener === void 0 ? void 0 : removeModuleListener();
        removeModuleListener = null;
    });
}
function buildRecord(channelId, content, stickers, embeds) {
    return new messageRecord({
        id: '0',
        type: 0,
        channel_id: channelId,
        content: content,
        author: users.getCurrentUser(),
        attachments: [],
        embeds: embeds,
        mentions: [],
        mention_roles: [],
        timestamp: new Date(),
        edited_timestamp: null,
        pinned: false,
        mention_everyone: false,
        tts: false,
        flags: 0,
        components: [],
        reactions: [],
        sticker_items: stickers,
        stickers: stickers,
        state: 'SENT',
        nonce: null
    });
}
function PreviewOverlay(param) {
    var channelId = param.channelId, content = param.content, stickers = param.stickers, onClose = param.onClose;
    var _metro_common = window.unbound.metro.common, _$React = _metro_common.React, ReactNative = _metro_common.ReactNative;
    var ChatItem = chatItem;
    var renderedContent = applyTextReplace(content);
    var opacity = _$React.useRef(new ReactNative.Animated.Value(0)).current;
    var _React_useState = _sliced_to_array(_$React.useState([]), 2), embeds = _React_useState[0], setEmbeds = _React_useState[1];
    _$React.useEffect(function() {
        var active = true;
        setEmbeds([]);
        var urls = extractUrls(renderedContent).slice(0, MAX_PREVIEW_URLS);
        if (!urls.length) return function() {
            active = false;
        };
        void Promise.all(urls.map(function(url) {
            return fetchLinkEmbed(url, restApi);
        })).then(function(resolved) {
            if (active) setEmbeds(resolved.filter(function(embed) {
                return embed !== null;
            }));
        });
        return function() {
            active = false;
        };
    }, [
        renderedContent
    ]);
    _$React.useEffect(function() {
        var _haptics_triggerHapticFeedback;
        haptics === null || haptics === void 0 ? void 0 : (_haptics_triggerHapticFeedback = haptics.triggerHapticFeedback) === null || _haptics_triggerHapticFeedback === void 0 ? void 0 : _haptics_triggerHapticFeedback.call(haptics, haptics.HapticFeedbackTypes.IMPACT_MEDIUM);
        ReactNative.Animated.timing(opacity, {
            toValue: 1,
            duration: FADE_IN_MS,
            useNativeDriver: true
        }).start();
    }, [
        opacity
    ]);
    var dismiss = function dismiss() {
        ReactNative.Animated.timing(opacity, {
            toValue: 0,
            duration: FADE_OUT_MS,
            useNativeDriver: true
        }).start(onClose);
    };
    var body;
    try {
        var record = buildRecord(channelId, renderedContent, stickers, embeds);
        var generator = new rowManager();
        generator.generate({
            rowType: MESSAGE_ROW_TYPE,
            message: record
        });
        body = /*#__PURE__*/ React.createElement(ChatItem, {
            rowGenerator: generator,
            message: record
        });
    } catch (error) {
        body = /*#__PURE__*/ React.createElement(ReactNative.Text, {
            style: {
                color: '#ff7b72',
                paddingHorizontal: 14
            }
        }, "Preview failed: ".concat(error === null || error === void 0 ? void 0 : error.message));
    }
    return /*#__PURE__*/ React.createElement(ReactNative.Animated.View, {
        style: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.65)',
            justifyContent: 'center',
            padding: 18,
            opacity: opacity
        }
    }, /*#__PURE__*/ React.createElement(ReactNative.Pressable, {
        onPress: dismiss,
        style: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
        }
    }), /*#__PURE__*/ React.createElement(ReactNative.KeyboardAvoidingView, {
        behavior: "padding",
        keyboardVerticalOffset: 0,
        style: {
            flex: 1,
            justifyContent: 'center'
        }
    }, /*#__PURE__*/ React.createElement(ReactNative.View, {
        style: {
            backgroundColor: '#2b2d31',
            borderRadius: 14,
            paddingVertical: 12,
            maxHeight: '70%'
        }
    }, /*#__PURE__*/ React.createElement(ReactNative.Text, {
        style: {
            color: '#f2f3f5',
            fontWeight: '600',
            paddingHorizontal: 14,
            paddingBottom: 10
        }
    }, "Message Preview"), body)));
}
function PreviewButton(param) {
    var channelId = param.channelId;
    var _metro_common = window.unbound.metro.common, _$React = _metro_common.React, ReactNative = _metro_common.ReactNative;
    var Portal = window.unbound.metro.components.Portal.Portal;
    var _React_useState = _sliced_to_array(_$React.useState(false), 2), open = _React_useState[0], setOpen = _React_useState[1];
    var _React_useState1 = _sliced_to_array(_$React.useState(false), 2), slotVisible = _React_useState1[0], setSlotVisible = _React_useState1[1];
    var keyboardTimer = _$React.useRef(null);
    var visibilityTimer = _$React.useRef(null);
    var slotVisibleRef = _$React.useRef(false);
    var updateSlotVisible = function updateSlotVisible(next) {
        slotVisibleRef.current = next;
        setSlotVisible(next);
    };
    _$React.useEffect(function() {
        return function() {
            if (keyboardTimer.current) clearTimeout(keyboardTimer.current);
            if (visibilityTimer.current) clearTimeout(visibilityTimer.current);
        };
    }, []);
    var draft = _$React.useSyncExternalStore(function(onChange) {
        drafts.addChangeListener(onChange);
        return function() {
            return drafts.removeChangeListener(onChange);
        };
    }, function() {
        var _drafts_getDraft;
        return (_drafts_getDraft = drafts.getDraft(channelId, CHANNEL_MESSAGE_DRAFT_TYPE)) !== null && _drafts_getDraft !== void 0 ? _drafts_getDraft : '';
    });
    var stickers = _$React.useSyncExternalStore(function(onChange) {
        var _stickerPreviews_addChangeListener;
        stickerPreviews === null || stickerPreviews === void 0 ? void 0 : (_stickerPreviews_addChangeListener = stickerPreviews.addChangeListener) === null || _stickerPreviews_addChangeListener === void 0 ? void 0 : _stickerPreviews_addChangeListener.call(stickerPreviews, onChange);
        return function() {
            var _stickerPreviews_removeChangeListener;
            return stickerPreviews === null || stickerPreviews === void 0 ? void 0 : (_stickerPreviews_removeChangeListener = stickerPreviews.removeChangeListener) === null || _stickerPreviews_removeChangeListener === void 0 ? void 0 : _stickerPreviews_removeChangeListener.call(stickerPreviews, onChange);
        };
    }, function() {
        var _ref;
        var _stickerPreviews_getStickerPreview;
        return (_ref = stickerPreviews === null || stickerPreviews === void 0 ? void 0 : (_stickerPreviews_getStickerPreview = stickerPreviews.getStickerPreview) === null || _stickerPreviews_getStickerPreview === void 0 ? void 0 : _stickerPreviews_getStickerPreview.call(stickerPreviews, channelId, false)) !== null && _ref !== void 0 ? _ref : EMPTY_STICKERS;
    });
    var visible = Boolean(draft.trim() || stickers.length);
    var progress = _$React.useRef(new ReactNative.Animated.Value(visible ? 1 : 0)).current;
    var openPreview = function openPreview() {
        var _chatInputs_dismissKeyboard, _chatInputs_getBestActiveInputForChannelId_closeCustomKeyboard, _chatInputs_getBestActiveInputForChannelId, _chatInputs_getBestActiveInputForChannelId1, _ReactNative_TextInput, _textInputState_currentlyFocusedInput, _textInputState_blurTextInput;
        var keyboard = ReactNative.Keyboard;
        chatInputs === null || chatInputs === void 0 ? void 0 : (_chatInputs_dismissKeyboard = chatInputs.dismissKeyboard) === null || _chatInputs_dismissKeyboard === void 0 ? void 0 : _chatInputs_dismissKeyboard.call(chatInputs);
        chatInputs === null || chatInputs === void 0 ? void 0 : (_chatInputs_getBestActiveInputForChannelId1 = chatInputs.getBestActiveInputForChannelId) === null || _chatInputs_getBestActiveInputForChannelId1 === void 0 ? void 0 : (_chatInputs_getBestActiveInputForChannelId = _chatInputs_getBestActiveInputForChannelId1.call(chatInputs, channelId)) === null || _chatInputs_getBestActiveInputForChannelId === void 0 ? void 0 : (_chatInputs_getBestActiveInputForChannelId_closeCustomKeyboard = _chatInputs_getBestActiveInputForChannelId.closeCustomKeyboard) === null || _chatInputs_getBestActiveInputForChannelId_closeCustomKeyboard === void 0 ? void 0 : _chatInputs_getBestActiveInputForChannelId_closeCustomKeyboard.call(_chatInputs_getBestActiveInputForChannelId);
        if (!keyboard || typeof keyboard.dismiss !== 'function') {
            setOpen(true);
            return;
        }
        var textInputState = (_ReactNative_TextInput = ReactNative.TextInput) === null || _ReactNative_TextInput === void 0 ? void 0 : _ReactNative_TextInput.State;
        var focusedInput = textInputState === null || textInputState === void 0 ? void 0 : (_textInputState_currentlyFocusedInput = textInputState.currentlyFocusedInput) === null || _textInputState_currentlyFocusedInput === void 0 ? void 0 : _textInputState_currentlyFocusedInput.call(textInputState);
        if (focusedInput) textInputState === null || textInputState === void 0 ? void 0 : (_textInputState_blurTextInput = textInputState.blurTextInput) === null || _textInputState_blurTextInput === void 0 ? void 0 : _textInputState_blurTextInput.call(textInputState, focusedInput);
        var opened = false;
        var subscription = null;
        var open = function open() {
            if (opened) return;
            opened = true;
            subscription === null || subscription === void 0 ? void 0 : subscription.remove();
            if (keyboardTimer.current) clearTimeout(keyboardTimer.current);
            keyboardTimer.current = null;
            setOpen(true);
        };
        if (typeof keyboard.addListener === 'function') subscription = keyboard.addListener('keyboardDidHide', open);
        keyboard.dismiss();
        keyboardTimer.current = setTimeout(open, KEYBOARD_DISMISS_DELAY_MS);
    };
    _$React.useEffect(function() {
        if (visibilityTimer.current) clearTimeout(visibilityTimer.current);
        progress.stopAnimation();
        progress.setValue(0);
        if (visible) {
            var show = function show() {
                visibilityTimer.current = null;
                updateSlotVisible(true);
                ReactNative.Animated.timing(progress, {
                    toValue: 1,
                    duration: SHOW_MS,
                    useNativeDriver: false
                }).start();
            };
            if (slotVisibleRef.current) show();
            else visibilityTimer.current = setTimeout(show, SHOW_DELAY_MS);
            return;
        }
        if (!slotVisibleRef.current) return;
        visibilityTimer.current = setTimeout(function() {
            visibilityTimer.current = null;
            updateSlotVisible(false);
        }, HIDE_MS);
    }, [
        visible,
        progress
    ]);
    return /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement(ReactNative.Animated.View, {
        style: {
            width: slotVisible ? BUTTON_SIZE : 0,
            marginRight: slotVisible ? 0 : -8,
            height: BUTTON_SIZE,
            opacity: visible ? progress : 0,
            overflow: 'hidden',
            alignItems: 'center',
            justifyContent: 'center'
        }
    }, /*#__PURE__*/ React.createElement(ReactNative.Pressable, {
        onPress: openPreview,
        onPressIn: function onPressIn() {
            var _haptics_triggerHapticFeedback;
            return haptics === null || haptics === void 0 ? void 0 : (_haptics_triggerHapticFeedback = haptics.triggerHapticFeedback) === null || _haptics_triggerHapticFeedback === void 0 ? void 0 : _haptics_triggerHapticFeedback.call(haptics, haptics.HapticFeedbackTypes.IMPACT_LIGHT);
        },
        hitSlop: 8,
        style: function style(param) {
            var pressed = param.pressed;
            return {
                width: BUTTON_SIZE,
                height: BUTTON_SIZE,
                alignItems: 'center',
                justifyContent: 'center',
                opacity: pressed ? PRESS_OPACITY : 1,
                transform: [
                    {
                        scale: pressed ? PRESS_SCALE : 1
                    }
                ]
            };
        }
    }, /*#__PURE__*/ React.createElement(ReactNative.Animated.Image, {
        source: eyeIcon,
        style: {
            width: ICON_SIZE,
            height: ICON_SIZE,
            tintColor: ICON_TINT,
            transform: [
                {
                    scale: progress.interpolate({
                        inputRange: [
                            0,
                            1
                        ],
                        outputRange: [
                            ICON_MIN_SCALE,
                            1
                        ]
                    })
                }
            ]
        }
    }))), open ? /*#__PURE__*/ React.createElement(Portal, null, /*#__PURE__*/ React.createElement(PreviewOverlay, {
        channelId: channelId,
        content: draft,
        stickers: stickers,
        onClose: function onClose() {
            return setOpen(false);
        }
    })) : null);
}
var index = {
    start: function start() {
        var _metro_findByProps;
        var _metro_findByFilePath;
        drafts = window.unbound.metro.findByProps('getDraft');
        stickerPreviews = window.unbound.metro.findByProps('getStickerPreview');
        chatInputs = window.unbound.metro.findByProps('getBestActiveInputForChannelId');
        selectedChannel = window.unbound.metro.findByProps('getLastSelectedChannelId', 'getChannelId');
        users = window.unbound.metro.findByProps('getCurrentUser', 'getUser');
        chatItem = (_metro_findByFilePath = window.unbound.metro.findByFilePath(CHAT_ITEM_PATH)) === null || _metro_findByFilePath === void 0 ? void 0 : _metro_findByFilePath.default;
        messageRecord = window.unbound.metro.findByName('MessageRecord');
        rowManager = window.unbound.metro.findByName('RowManager');
        haptics = window.unbound.metro.findByFilePath(HAPTICS_PATH);
        restApi = (_metro_findByProps = window.unbound.metro.findByProps('get', 'post', 'put', 'patch', 'del')) !== null && _metro_findByProps !== void 0 ? _metro_findByProps : window.unbound.metro.findByProps('get', 'post');
        eyeIcon = window.unbound.assets.getIDByName('EyeIcon');
        if (!(drafts === null || drafts === void 0 ? void 0 : drafts.getDraft) || !(stickerPreviews === null || stickerPreviews === void 0 ? void 0 : stickerPreviews.getStickerPreview) || !(users === null || users === void 0 ? void 0 : users.getCurrentUser) || !chatItem || !messageRecord) return;
        if (!rowManager || !selectedChannel || eyeIcon == null) return;
        waitForRightActions();
    },
    stop: function stop() {
        unpatch === null || unpatch === void 0 ? void 0 : unpatch();
        unpatch = null;
        removeModuleListener === null || removeModuleListener === void 0 ? void 0 : removeModuleListener();
        removeModuleListener = null;
        drafts = null;
        selectedChannel = null;
        users = null;
        chatItem = null;
        messageRecord = null;
        rowManager = null;
        haptics = null;
        restApi = null;
        chatInputs = null;
        eyeIcon = null;
        stickerPreviews = null;
    }
};
return index;
})();return this.__plugin;},start(context){const module=this.__load();const plugin=module?.default??module;if(plugin&&typeof plugin.start==='function')return plugin.start(context);},stop(){const module=this.__load();const plugin=module?.default??module;if(plugin&&typeof plugin.stop==='function')return plugin.stop();}})