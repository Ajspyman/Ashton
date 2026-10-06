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
function _class_call_check(instance, Constructor) {
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
var REACTION_AVATAR_LIMIT = 5;
var REACTION_AVATAR_SIZE = 18;
var REACTION_AVATAR_STEP = 5;
function hydrateReactorsInOrder(reactors, findUser) {
    return reactors.map(function(reactor) {
        var _findUser;
        return (_findUser = findUser(reactor.id)) !== null && _findUser !== void 0 ? _findUser : reactor;
    });
}
function isCurrentReactionRequest(requestKey, currentKey, requestGeneration, currentGeneration) {
    return requestKey === currentKey && requestGeneration === currentGeneration;
}
function shouldHandleChannelChange(previousChannelId, nextChannelId) {
    return Boolean(nextChannelId) && previousChannelId !== nextChannelId;
}
function reactionCellLifecycleAction(attached, reused) {
    if (reused) return 'dispose';
    return attached ? 'render' : 'preserve';
}
function reactionAvatarPresentation(users) {
    var totalCount = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : users.length;
    var count = Math.max(0, Math.floor(totalCount));
    var visibleUserCount = Math.min(users.length, REACTION_AVATAR_LIMIT, count);
    var overflowCount = Math.max(0, count - visibleUserCount);
    var hasOverflow = overflowCount > 0;
    return {
        overflowCount: overflowCount,
        slotCount: visibleUserCount + Number(hasOverflow),
        users: users
    };
}
function reactionAvatarReservedSlotCount(totalCount) {
    var count = Math.max(0, Math.floor(totalCount));
    return Math.min(count, REACTION_AVATAR_LIMIT) + Number(count > REACTION_AVATAR_LIMIT);
}
function reactionAvatarReservedExtraWidth(totalCount, leadingInset, trailingPadding) {
    var width = reactionAvatarStackWidth(reactionAvatarReservedSlotCount(totalCount));
    return reactionAvatarExtraWidth(width, leadingInset, trailingPadding, totalCount > 0);
}
function reactionAvatarStackWidth(slotCount) {
    return REACTION_AVATAR_SIZE + Math.max(0, slotCount - 1) * REACTION_AVATAR_STEP;
}
function reactionAvatarStackPositions(slotCount) {
    return Array.from({
        length: Math.max(0, Math.floor(slotCount))
    }, function(_, index) {
        return index * REACTION_AVATAR_STEP;
    });
}
function reactionAvatarExtraWidth(width, leadingInset, trailingPadding, measured) {
    if (!measured || !Number.isFinite(width) || width <= 0) return 0;
    return Math.max(0, Math.ceil(width + trailingPadding - leadingInset));
}
function shouldMeasureReactionAvatarWidth(measured, currentWidth, nextWidth) {
    return !measured && nextWidth >= currentWidth - 0.5;
}
function reactionAvatarSummaryProps(users, guildId) {
    var max = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : REACTION_AVATAR_LIMIT;
    return {
        guildId: guildId,
        max: max,
        renderIcon: false,
        showDefaultAvatarsForNullUsers: true,
        showUserPopout: true,
        users: users
    };
}
function shouldRenderReactionAvatars(reactionCount) {
    return reactionCount > 0;
}
function reactionCellWidth(baseWidth, extraWidth) {
    return baseWidth + Math.max(0, extraWidth);
}
function reactionLayoutNeedsInvalidation(current, target) {
    return Math.abs(current.contentHeight - target.contentHeight) >= 1 || Math.abs(current.frameHeight - target.frameHeight) >= 1;
}
function reactionLayoutIdentityChanged(current, target) {
    return current.messageKey !== target.messageKey || current.itemCount !== target.itemCount || current.ownerCellKey !== target.ownerCellKey;
}
function reactionLayoutFrameMatches(current, target) {
    return Boolean(current && Math.abs(current.x - target.x) < 0.5 && Math.abs(current.y - target.y) < 0.5 && Math.abs(current.width - target.width) < 0.5 && Math.abs(current.height - target.height) < 0.5);
}
function reflowReactionItems(items, containerWidth) {
    var _Math, _Math1;
    if (items.length === 0 || containerWidth <= 0) return [];
    var ordered = _to_consumable_array$2(items).sort(function(first, second) {
        return first.index - second.index;
    });
    var startX = (_Math = Math).min.apply(_Math, _to_consumable_array$2(ordered.map(function(item) {
        return item.x;
    })));
    var startY = (_Math1 = Math).min.apply(_Math1, _to_consumable_array$2(ordered.map(function(item) {
        return item.y;
    })));
    var horizontalGaps = ordered.flatMap(function(item, position) {
        var next = ordered[position + 1];
        if (!next || Math.abs(next.y - item.y) >= 1) return [];
        return [
            Math.max(0, next.x - item.x - item.width)
        ];
    });
    var horizontalGap = horizontalGaps.length ? horizontalGaps.reduce(function(total, gap) {
        return total + gap;
    }, 0) / horizontalGaps.length : 0;
    var rowTops = _to_consumable_array$2(new Set(ordered.map(function(item) {
        return item.y;
    }))).sort(function(first, second) {
        return first - second;
    });
    var verticalGaps = rowTops.flatMap(function(top, index) {
        var _Math;
        var nextTop = rowTops[index + 1];
        if (nextTop === undefined) return [];
        var rowBottom = (_Math = Math).max.apply(_Math, _to_consumable_array$2(ordered.filter(function(item) {
            return item.y === top;
        }).map(function(item) {
            return item.y + item.height;
        })));
        return [
            Math.max(0, nextTop - rowBottom)
        ];
    });
    var verticalGap = verticalGaps.length ? verticalGaps.reduce(function(total, gap) {
        return total + gap;
    }, 0) / verticalGaps.length : 0;
    var frames = [];
    var x = startX;
    var y = startY;
    var rowHeight = 0;
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
    try {
        for(var _iterator = ordered[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
            var item = _step.value;
            var _item_extraWidth;
            var width = reactionCellWidth(item.width, (_item_extraWidth = item.extraWidth) !== null && _item_extraWidth !== void 0 ? _item_extraWidth : 0);
            if (x > startX && x + width > startX + containerWidth) {
                x = startX;
                y += rowHeight + verticalGap;
                rowHeight = 0;
            }
            frames.push({
                height: item.height,
                index: item.index,
                width: width,
                x: x,
                y: y
            });
            x += width + horizontalGap;
            rowHeight = Math.max(rowHeight, item.height);
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
    return frames;
}
function reactionAvatarFrame(contentFrame, surfaceWidth) {
    var inset = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0;
    return {
        x: Math.max(0, contentFrame.x + contentFrame.width - inset),
        width: Math.max(0, surfaceWidth)
    };
}
var ReactionUserCache = /*#__PURE__*/ function() {
    function ReactionUserCache() {
        var maximumEntries = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 400, maximumConcurrentRequests = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 3, cacheLifetime = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 60000, emptyCacheLifetime = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 3000;
        _class_call_check(this, ReactionUserCache);
        _define_property$1(this, "maximumEntries", void 0);
        _define_property$1(this, "maximumConcurrentRequests", void 0);
        _define_property$1(this, "cacheLifetime", void 0);
        _define_property$1(this, "emptyCacheLifetime", void 0);
        _define_property$1(this, "entries", void 0);
        _define_property$1(this, "pending", void 0);
        _define_property$1(this, "queue", void 0);
        _define_property$1(this, "activeRequests", void 0);
        _define_property$1(this, "generation", void 0);
        this.maximumEntries = maximumEntries;
        this.maximumConcurrentRequests = maximumConcurrentRequests;
        this.cacheLifetime = cacheLifetime;
        this.emptyCacheLifetime = emptyCacheLifetime;
        this.entries = new Map();
        this.pending = new Map();
        this.queue = [];
        this.activeRequests = 0;
        this.generation = 0;
    }
    _create_class(ReactionUserCache, [
        {
            key: "get",
            value: function get(key) {
                var now = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Date.now();
                var entry = this.entries.get(key);
                if (!entry) return undefined;
                if (entry.expiresAt <= now) {
                    this.entries.delete(key);
                    return undefined;
                }
                this.entries.delete(key);
                this.entries.set(key, entry);
                return entry.users;
            }
        },
        {
            key: "load",
            value: function load(key, load) {
                var _this = this;
                var now = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : Date.now();
                var cached = this.get(key, now);
                if (cached) return Promise.resolve(cached);
                var pending = this.pending.get(key);
                if (pending) return pending;
                var generation = this.generation;
                var request = new Promise(function(resolve, reject) {
                    _this.queue.push({
                        generation: generation,
                        key: key,
                        load: load,
                        reject: reject,
                        resolve: resolve
                    });
                    _this.processQueue();
                }).then(function(users) {
                    if (generation !== _this.generation || _this.pending.get(key) !== request) return [];
                    _this.cache(key, users, Date.now());
                    return users;
                });
                this.pending.set(key, request);
                void request.then(function() {
                    if (_this.pending.get(key) === request) _this.pending.delete(key);
                }, function() {
                    if (_this.pending.get(key) === request) _this.pending.delete(key);
                });
                return request;
            }
        },
        {
            key: "invalidate",
            value: function invalidate(prefix) {
                this.invalidateMatching(function(key) {
                    return key.startsWith(prefix);
                });
            }
        },
        {
            key: "invalidateMessage",
            value: function invalidateMessage(messageId, channelId) {
                var channelPrefix = channelId ? reactionAvatarPrefix(channelId, messageId) : null;
                var encodedMessageId = encodeURIComponent(messageId);
                this.invalidateMatching(function(key) {
                    return channelPrefix ? key.startsWith(channelPrefix) : key.split(':')[1] === encodedMessageId;
                });
            }
        },
        {
            key: "cancelQueuedOutsideChannel",
            value: function cancelQueuedOutsideChannel(channelId) {
                var channelPrefix = channelId ? "".concat(encodeURIComponent(channelId), ":") : null;
                var remaining = [];
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = this.queue[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var request = _step.value;
                        if (channelPrefix && request.key.startsWith(channelPrefix)) {
                            remaining.push(request);
                            continue;
                        }
                        if (this.pending.has(request.key)) this.pending.delete(request.key);
                        request.resolve([]);
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
                this.queue = remaining;
            }
        },
        {
            key: "clear",
            value: function clear() {
                this.generation++;
                this.entries.clear();
                this.pending.clear();
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = this.queue[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var request = _step.value;
                        request.resolve([]);
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
                this.queue = [];
            }
        },
        {
            key: "invalidateMatching",
            value: function invalidateMatching(matches) {
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = new Set(_to_consumable_array$2(this.entries.keys()).concat(_to_consumable_array$2(this.pending.keys())))[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var key = _step.value;
                        if (!matches(key)) continue;
                        this.entries.delete(key);
                        this.pending.delete(key);
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
                var remaining = [];
                var _iteratorNormalCompletion1 = true, _didIteratorError1 = false, _iteratorError1 = undefined;
                try {
                    for(var _iterator1 = this.queue[Symbol.iterator](), _step1; !(_iteratorNormalCompletion1 = (_step1 = _iterator1.next()).done); _iteratorNormalCompletion1 = true){
                        var request = _step1.value;
                        if (matches(request.key)) request.resolve([]);
                        else remaining.push(request);
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
                this.queue = remaining;
            }
        },
        {
            key: "cache",
            value: function cache(key, users, now) {
                this.entries.delete(key);
                var lifetime = users.length > 0 ? this.cacheLifetime : this.emptyCacheLifetime;
                this.entries.set(key, {
                    expiresAt: now + lifetime,
                    users: users
                });
                while(this.entries.size > this.maximumEntries){
                    var oldest = this.entries.keys().next().value;
                    if (typeof oldest !== 'string') return;
                    this.entries.delete(oldest);
                }
            }
        },
        {
            key: "processQueue",
            value: function processQueue() {
                var _this = this;
                while(this.activeRequests < this.maximumConcurrentRequests && this.queue.length){
                    var request = this.queue.shift();
                    if (!request) return;
                    if (request.generation !== this.generation) {
                        request.resolve([]);
                        continue;
                    }
                    this.activeRequests++;
                    void Promise.resolve().then(request.load).then(request.resolve, request.reject).finally(function() {
                        _this.activeRequests--;
                        _this.processQueue();
                    });
                }
            }
        }
    ]);
    return ReactionUserCache;
}();
function countValue(value) {
    return typeof value === 'number' && Number.isFinite(value) ? Math.max(0, Math.floor(value)) : 0;
}
function reactionAvatarSelection(reaction, reactionType) {
    var _ref, _ref1;
    var _reaction_count_details, _reaction_count_details1;
    var burstCount = countValue((_ref = (_reaction_count_details = reaction.count_details) === null || _reaction_count_details === void 0 ? void 0 : _reaction_count_details.burst) !== null && _ref !== void 0 ? _ref : reaction.burst_count);
    var normalCount = countValue((_ref1 = (_reaction_count_details1 = reaction.count_details) === null || _reaction_count_details1 === void 0 ? void 0 : _reaction_count_details1.normal) !== null && _ref1 !== void 0 ? _ref1 : Math.max(0, countValue(reaction.count) - burstCount));
    if (reactionType === 0) return {
        count: normalCount,
        types: normalCount ? [
            0
        ] : []
    };
    if (reactionType === 1) return {
        count: burstCount,
        types: burstCount ? [
            1
        ] : []
    };
    var types = [];
    if (normalCount) types.push(0);
    if (burstCount) types.push(1);
    return {
        count: normalCount + burstCount,
        types: types
    };
}
function reactionAvatarKey(channelId, messageId, emoji, types) {
    var _emoji_id;
    return [
        channelId,
        messageId,
        (_emoji_id = emoji.id) !== null && _emoji_id !== void 0 ? _emoji_id : emoji.name,
        types.join(',')
    ].map(function(part) {
        return encodeURIComponent(part);
    }).join(':');
}
function reactionAvatarPrefix(channelId, messageId) {
    return "".concat(encodeURIComponent(channelId), ":").concat(encodeURIComponent(messageId), ":");
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
var surfaceStates = new Map();
var userSummaryItem$1 = null;
var userStore = null;
function stopEventPropagation(event) {
    var _event_stopPropagation;
    (_event_stopPropagation = event.stopPropagation) === null || _event_stopPropagation === void 0 ? void 0 : _event_stopPropagation.call(event);
}
function configureReactionAvatarSurface(component, store) {
    userSummaryItem$1 = component;
    userStore = store;
}
function setReactionAvatarSurfaceState(id, state) {
    surfaceStates.set(id, state);
}
function clearReactionAvatarSurfaceState(id) {
    surfaceStates.delete(id);
}
function clearReactionAvatarSurfaceStates() {
    surfaceStates.clear();
    userSummaryItem$1 = null;
    userStore = null;
}
function ReactionAvatarSurface(param) {
    var surfaceId = param.surfaceId;
    var _React;
    var _metro_common = window.unbound.metro.common, React = _metro_common.React, ReactNative = _metro_common.ReactNative;
    var state = surfaceStates.get(surfaceId);
    if (!state || !userSummaryItem$1 || !userStore) return null;
    var users = hydrateReactorsInOrder(state.users, function(id) {
        var _ref;
        var _userStore_getUser;
        return (_ref = userStore === null || userStore === void 0 ? void 0 : (_userStore_getUser = userStore.getUser) === null || _userStore_getUser === void 0 ? void 0 : _userStore_getUser.call(userStore, id)) !== null && _ref !== void 0 ? _ref : undefined;
    });
    var presentation = reactionAvatarPresentation(users, state.totalCount);
    var visibleUsers = presentation.users.slice(0, Math.min(REACTION_AVATAR_LIMIT, Math.max(0, state.totalCount)));
    var overflowCount = presentation.overflowCount;
    var positions = reactionAvatarStackPositions(reactionAvatarReservedSlotCount(state.totalCount));
    var stackWidth = reactionAvatarStackWidth(positions.length);
    var onLayout = function onLayout(event) {
        var _event_nativeEvent_layout, _event_nativeEvent;
        var width = Number((_event_nativeEvent = event.nativeEvent) === null || _event_nativeEvent === void 0 ? void 0 : (_event_nativeEvent_layout = _event_nativeEvent.layout) === null || _event_nativeEvent_layout === void 0 ? void 0 : _event_nativeEvent_layout.width);
        if (!Number.isFinite(width) || width <= 0) return;
        if (shouldMeasureReactionAvatarWidth(state.measured, state.width, width)) state.onWidth(width);
    };
    var stackChildren = visibleUsers.map(function(user, index) {
        var _positions_index;
        return React.createElement(ReactNative.View, {
            key: "avatar-".concat(user.id),
            pointerEvents: 'box-none',
            style: {
                height: REACTION_AVATAR_SIZE,
                left: (_positions_index = positions[index]) !== null && _positions_index !== void 0 ? _positions_index : 0,
                position: 'absolute',
                top: 0,
                width: REACTION_AVATAR_SIZE,
                zIndex: index + 1
            }
        }, React.createElement(userSummaryItem$1, reactionAvatarSummaryProps([
            user
        ], state.guildId, 1)));
    });
    if (overflowCount > 0) {
        var _positions_visibleUsers_length;
        stackChildren.push(React.createElement(ReactNative.View, {
            key: 'overflow',
            style: {
                alignItems: 'center',
                backgroundColor: '#000',
                borderRadius: REACTION_AVATAR_SIZE / 2,
                height: REACTION_AVATAR_SIZE,
                justifyContent: 'center',
                left: (_positions_visibleUsers_length = positions[visibleUsers.length]) !== null && _positions_visibleUsers_length !== void 0 ? _positions_visibleUsers_length : 0,
                position: 'absolute',
                top: 0,
                zIndex: REACTION_AVATAR_LIMIT + 1,
                width: REACTION_AVATAR_SIZE
            }
        }, React.createElement(ReactNative.Text, {
            style: {
                color: '#fff',
                fontSize: 8,
                fontWeight: '600',
                height: REACTION_AVATAR_SIZE,
                lineHeight: REACTION_AVATAR_SIZE,
                textAlign: 'center',
                width: REACTION_AVATAR_SIZE
            },
            adjustsFontSizeToFit: true,
            includeFontPadding: false,
            minimumFontScale: 0.5,
            numberOfLines: 1
        }, "+".concat(overflowCount))));
    }
    var stack = (_React = React).createElement.apply(_React, [
        ReactNative.View,
        {
            onLayout: onLayout,
            pointerEvents: 'box-none',
            style: {
                height: REACTION_AVATAR_SIZE,
                position: 'relative',
                justifyContent: 'center',
                width: stackWidth
            }
        }
    ].concat(_to_consumable_array$1(stackChildren)));
    return React.createElement(ReactNative.View, {
        onClick: stopEventPropagation,
        onKeyDown: stopEventPropagation,
        pointerEvents: 'box-none',
        style: {
            alignItems: 'flex-start',
            height: state.height,
            justifyContent: 'center',
            marginLeft: 0,
            transform: [
                {
                    scale: 0.9
                }
            ]
        }
    }, stack);
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
var REACTION_ACTIONS_PATH = 'modules/reactions/ReactionActionCreators.tsx';
var MAX_NATIVE_VIEW_DEPTH = 8;
var MAX_NATIVE_VIEW_NODES = 100;
var MAX_REACTION_CELL_NODES = 40;
var MAX_VISIBLE_CELL_SCAN_DEPTH = 40;
var MAX_VISIBLE_CELL_SCAN_NODES = 1600;
var CELL_SCAN_INTERVAL = 250;
var EMPTY_RESULT_RETRY_DELAY = 1000;
var MAX_EMPTY_RESULT_RETRIES = 2;
var AVATAR_LEADING_INSET = 4;
var AVATAR_TRAILING_PADDING = 4;
var INITIAL_SURFACE_HEIGHT = 36;
var INITIAL_SURFACE_WIDTH = 120;
var REACTION_EVENTS = [
    'MESSAGE_REACTION_ADD',
    'MESSAGE_REACTION_REMOVE',
    'MESSAGE_REACTION_REMOVE_ALL',
    'MESSAGE_REACTION_REMOVE_EMOJI'
];
var userCache = new ReactionUserCache(400, 3, 60000);
var reactionStates = new Map();
var reactionLayouts = new Map();
var reactionTableLayouts = new Map();
var activeCells = new Map();
var scheduledCells = new Set();
var lastCellScans = new Map();
var hooks = [];
var nativeIds = new WeakMap();
var reactionLayoutRefreshes = new Map();
var objc = null;
var fabric = null;
var reactionActions = null;
var messages = null;
var dispatcher = null;
var users = null;
var channels = null;
var selectedChannel = null;
var userSummaryItem = null;
var moduleListenerCleanup = null;
var surfaceModuleName = '';
var lifecycle = 0;
var currentSelectedChannelId;
var channelScanTimeouts = [];
var nextNativeId = 0;
var activated = false;
function record(value) {
    return (typeof value === "undefined" ? "undefined" : _type_of(value)) === 'object' && value !== null;
}
function property(value, key) {
    return record(value) ? value[key] : undefined;
}
function stringValue() {
    for(var _len = arguments.length, values = new Array(_len), _key = 0; _key < _len; _key++){
        values[_key] = arguments[_key];
    }
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
    try {
        for(var _iterator = values[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
            var value = _step.value;
            if (typeof value === 'string' && value.length > 0) return value;
            if (typeof value === 'number' || (typeof value === "undefined" ? "undefined" : _type_of(value)) === 'bigint') return String(value);
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
function numberValue() {
    for(var _len = arguments.length, values = new Array(_len), _key = 0; _key < _len; _key++){
        values[_key] = arguments[_key];
    }
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
    try {
        for(var _iterator = values[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
            var value = _step.value;
            if (value === null || value === undefined) continue;
            var number = typeof value === 'number' ? value : Number(value);
            if (Number.isFinite(number)) return number;
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
function messageKey(channelId, messageId) {
    return "".concat(channelId, ":").concat(messageId);
}
function selectedChannelId() {
    var _stringValue;
    var _selectedChannel_getChannelId, _selectedChannel_getLastSelectedChannelId;
    return (_stringValue = stringValue(selectedChannel === null || selectedChannel === void 0 ? void 0 : (_selectedChannel_getChannelId = selectedChannel.getChannelId) === null || _selectedChannel_getChannelId === void 0 ? void 0 : _selectedChannel_getChannelId.call(selectedChannel), selectedChannel === null || selectedChannel === void 0 ? void 0 : (_selectedChannel_getLastSelectedChannelId = selectedChannel.getLastSelectedChannelId) === null || _selectedChannel_getLastSelectedChannelId === void 0 ? void 0 : _selectedChannel_getLastSelectedChannelId.call(selectedChannel))) !== null && _stringValue !== void 0 ? _stringValue : undefined;
}
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
function nativeKey(handle) {
    var _ref;
    var hash = numberValue(nativeCall(handle, 'hash'));
    if (hash !== undefined) return "".concat((_ref = objc === null || objc === void 0 ? void 0 : objc.className(handle)) !== null && _ref !== void 0 ? _ref : 'NSObject', ":").concat(hash);
    var existing = nativeIds.get(handle);
    if (existing !== undefined) return "native:".concat(existing);
    var id = ++nextNativeId;
    nativeIds.set(handle, id);
    return "native:".concat(id);
}
function nativeChildren(view) {
    if (!objc) return [];
    var children = nativeCall(view, 'subviews');
    if (Array.isArray(children)) return children;
    if (!children || (typeof children === "undefined" ? "undefined" : _type_of(children)) !== 'object') return [];
    try {
        return objc.array(children).filter(function(child) {
            return (typeof child === "undefined" ? "undefined" : _type_of(child)) === 'object' && child !== null;
        });
    } catch (unused) {
        return [];
    }
}
function firstNativeViewByClass(root, className) {
    var maximumNodes = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : MAX_NATIVE_VIEW_NODES, maximumDepth = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : MAX_NATIVE_VIEW_DEPTH;
    if (!objc) return null;
    var queue = [
        {
            depth: 0,
            view: root
        }
    ];
    var visited = 0;
    while(queue.length > 0 && visited < maximumNodes){
        var _objc_className;
        var node = queue.shift();
        if (!node) break;
        visited++;
        if (((_objc_className = objc.className(node.view)) !== null && _objc_className !== void 0 ? _objc_className : '').includes(className)) return node.view;
        if (node.depth >= maximumDepth) continue;
        var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
        try {
            for(var _iterator = nativeChildren(node.view)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                var child = _step.value;
                queue.push({
                    depth: node.depth + 1,
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
    }
    return null;
}
function ancestorNativeViewByClass(view, className, maximumDepth) {
    if (!objc) return null;
    var current = view;
    for(var depth = 0; current && depth < maximumDepth; depth++){
        var _objc_className;
        if (((_objc_className = objc.className(current)) !== null && _objc_className !== void 0 ? _objc_className : '').includes(className)) return current;
        current = nativeCall(current, 'superview');
    }
    return null;
}
function messageInfoForCell(cell) {
    if (!objc) return;
    try {
        var viewModel = objc.getIvar(cell, 'viewModel');
        if (!viewModel || !objc.respondsTo(viewModel, 'message')) return;
        var message = nativeCall(viewModel, 'message');
        if (!message) return;
        var messageId = stringValue(nativeCall(message, 'id'));
        if (!messageId) return;
        var channel = nativeCall(message, 'channel');
        var channelId = stringValue(nativeCall(message, 'channelId'), nativeCall(message, 'channel_id'), channel ? nativeCall(channel, 'id') : null, selectedChannelId());
        if (!channelId) return;
        return {
            channelId: channelId,
            messageId: messageId
        };
    } catch (unused) {
        return;
    }
}
function messageForCell(info) {
    var _ref;
    var _messages_getMessage;
    return (_ref = messages === null || messages === void 0 ? void 0 : (_messages_getMessage = messages.getMessage) === null || _messages_getMessage === void 0 ? void 0 : _messages_getMessage.call(messages, info.channelId, info.messageId)) !== null && _ref !== void 0 ? _ref : null;
}
function reactionContextForMessage(message, channelId, reaction) {
    var messageId = stringValue(message.id);
    if (!messageId) return null;
    var rawEmoji = reaction.emoji;
    var emojiName = typeof rawEmoji === 'string' ? rawEmoji : record(rawEmoji) ? stringValue(rawEmoji.name, rawEmoji.animatedName) : null;
    if (!emojiName) return null;
    var emoji = {
        id: record(rawEmoji) ? stringValue(rawEmoji.id) : null,
        name: emojiName
    };
    var reactionType = numberValue(reaction.type);
    var selection = reactionAvatarSelection(reaction, reactionType);
    if (selection.count === 0 || selection.types.length === 0) return null;
    var key = reactionAvatarKey(channelId, messageId, emoji, selection.types);
    return {
        channelId: channelId,
        emoji: emoji,
        key: key,
        messageId: messageId,
        messageKey: messageKey(channelId, messageId),
        reaction: reaction,
        reactionType: reactionType
    };
}
function messageContextForCell(cell) {
    var info = messageInfoForCell(cell);
    if (!info) return null;
    var message = messageForCell(info);
    if (!message) return null;
    return {
        channelId: info.channelId,
        message: message,
        messageId: info.messageId
    };
}
function collectionViewForReactionList(list) {
    return firstNativeViewByClass(list, 'UICollectionView', MAX_NATIVE_VIEW_NODES, 3);
}
function itemForCollectionCell(collection, cell) {
    var indexPath = nativeCall(collection, 'indexPathForCell:', cell);
    if (!indexPath) return;
    var item = numberValue(nativeCall(indexPath, 'item'), nativeCall(indexPath, 'row'));
    return item === undefined ? undefined : Math.floor(item);
}
function userSummaryComponent() {
    return window.unbound.metro.findByName('UserSummaryItem');
}
function surfaceRegistry() {
    var _ref, _property;
    var window = globalThis.window;
    var reactNative = window.unbound.metro.common.ReactNative;
    var registry = (_ref = (_property = property(reactNative, 'AppRegistry')) !== null && _property !== void 0 ? _property : window.RN$AppRegistry) !== null && _ref !== void 0 ? _ref : window.unbound.metro.findByProps('registerComponent', 'runApplication');
    return record(registry) ? registry : null;
}
function registerSurface() {
    if (surfaceModuleName) return true;
    var registry = surfaceRegistry();
    if (!(registry === null || registry === void 0 ? void 0 : registry.registerComponent)) return false;
    surfaceModuleName = "ReactionAvatarSurface".concat(lifecycle);
    try {
        registry.registerComponent(surfaceModuleName, function() {
            return ReactionAvatarSurface;
        });
        return true;
    } catch (unused) {
        surfaceModuleName = '';
        return false;
    }
}
function renderStateForSurface(state) {
    var _channels_getChannel, _channels_getChannel1;
    return {
        guildId: channels === null || channels === void 0 ? void 0 : (_channels_getChannel1 = channels.getChannel) === null || _channels_getChannel1 === void 0 ? void 0 : (_channels_getChannel = _channels_getChannel1.call(channels, state.context.channelId)) === null || _channels_getChannel === void 0 ? void 0 : _channels_getChannel.guild_id,
        height: state.baseFrame.height || INITIAL_SURFACE_HEIGHT,
        measured: state.widthMeasured,
        onWidth: function onWidth(width) {
            return updateAvatarWidth(state, width);
        },
        totalCount: state.totalCount,
        users: state.users,
        width: state.avatarWidth
    };
}
function setSurfaceRenderState(state) {
    setReactionAvatarSurfaceState(state.surfaceId, renderStateForSurface(state));
}
function nativeStructFields(value) {
    var fields = property(value, 'value');
    if (!record(fields)) return {};
    return {
        height: numberValue(fields.height),
        width: numberValue(fields.width)
    };
}
function nativeRectFields(value) {
    var fields = property(value, 'value');
    if (!record(fields)) return {};
    var origin = record(fields.origin) ? fields.origin : {};
    var size = record(fields.size) ? fields.size : {};
    return {
        origin: {
            x: numberValue(origin.x),
            y: numberValue(origin.y)
        },
        size: {
            height: numberValue(size.height),
            width: numberValue(size.width)
        }
    };
}
function nativeFrameForView(view) {
    var _frame_origin, _frame_origin1, _frame_size, _frame_size1;
    var frame = nativeRectFields(nativeCall(view, 'frame'));
    var x = (_frame_origin = frame.origin) === null || _frame_origin === void 0 ? void 0 : _frame_origin.x;
    var y = (_frame_origin1 = frame.origin) === null || _frame_origin1 === void 0 ? void 0 : _frame_origin1.y;
    var width = (_frame_size = frame.size) === null || _frame_size === void 0 ? void 0 : _frame_size.width;
    var height = (_frame_size1 = frame.size) === null || _frame_size1 === void 0 ? void 0 : _frame_size1.height;
    if (x === undefined || y === undefined || width === undefined || height === undefined) return null;
    return {
        height: height,
        width: width,
        x: x,
        y: y
    };
}
function captureReactionAncestorFrames(list) {
    if (!objc) return [];
    var frames = [];
    var current = list;
    while(current && frames.length < 8){
        var _objc_className;
        var className = (_objc_className = objc.className(current)) !== null && _objc_className !== void 0 ? _objc_className : '';
        if (className.includes('DCDMessageTableViewCell') || className.includes('DCDTableView')) {
            break;
        }
        var frame = nativeFrameForView(current);
        if (frame) frames.push({
            frame: frame,
            view: current
        });
        if (className.includes('UITableViewCellContentView')) break;
        current = nativeCall(current, 'superview');
    }
    return frames;
}
function nativeArray(value) {
    if (Array.isArray(value)) return value;
    if (!objc || !record(value)) return [];
    try {
        return objc.array(value);
    } catch (unused) {
        return [];
    }
}
function reactionCount(collection) {
    var _numberValue;
    var sections = (_numberValue = numberValue(nativeCall(collection, 'numberOfSections'))) !== null && _numberValue !== void 0 ? _numberValue : 1;
    var count = 0;
    for(var section = 0; section < sections; section++){
        var _numberValue1;
        count += (_numberValue1 = numberValue(nativeCall(collection, 'numberOfItemsInSection:', section))) !== null && _numberValue1 !== void 0 ? _numberValue1 : 0;
    }
    return count;
}
function reactionLayoutEntry(layout, collection, list, messageIdentity) {
    var key = nativeKey(collection);
    var count = reactionCount(collection);
    var ownerCell = ancestorNativeViewByClass(list, 'DCDMessageTableViewCell', 12);
    var ownerTable = ancestorNativeViewByClass(list, 'DCDTableView', 12);
    var ownerCellKey = ownerCell ? nativeKey(ownerCell) : '';
    var existing = reactionLayouts.get(key);
    if (existing) {
        if (reactionLayoutIdentityChanged({
            itemCount: existing.itemCount,
            messageKey: existing.ownerMessageKey,
            ownerCellKey: existing.ownerCellKey
        }, {
            itemCount: count,
            messageKey: messageIdentity,
            ownerCellKey: ownerCellKey
        })) {
            var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
            try {
                for(var _iterator = reactionStates[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                    var _step_value = _sliced_to_array(_step.value, 2), stateKey = _step_value[0], state = _step_value[1];
                    if (state.layoutKey === key) disposeReactionState(stateKey, state, true);
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
            restoreReactionLayoutEntry(existing);
            existing.baseItems.clear();
            existing.appliedCells.clear();
            existing.extraWidths.clear();
            existing.itemCount = count;
            existing.ancestorFrames = captureReactionAncestorFrames(list);
            existing.ownerCellKey = ownerCellKey;
            existing.ownerMessageKey = messageIdentity;
            existing.ownerTableKey = ownerTable ? nativeKey(ownerTable) : '';
            existing.ownerCell = ownerCell;
            existing.plan = null;
            existing.revision++;
        }
        existing.collection = collection;
        existing.layout = layout;
        existing.list = list;
        existing.ownerCell = ownerCell;
        existing.ownerCellKey = ownerCellKey;
        existing.ownerTableKey = ownerTable ? nativeKey(ownerTable) : '';
        return existing;
    }
    var entry = {
        ancestorFrames: captureReactionAncestorFrames(list),
        appliedCells: new Map(),
        appliedLayoutRevision: -1,
        appliedLayoutWidth: -1,
        baseItems: new Map(),
        collection: collection,
        extraWidths: new Map(),
        invalidationScheduled: false,
        layout: layout,
        list: list,
        itemCount: count,
        ownerCell: ownerCell,
        ownerCellKey: ownerCellKey,
        ownerMessageKey: messageIdentity,
        ownerTableKey: ownerTable ? nativeKey(ownerTable) : '',
        plan: null,
        revision: 0
    };
    reactionLayouts.set(key, entry);
    return entry;
}
function captureReactionLayoutItem(entry, index, frame) {
    var _frame_origin, _frame_origin1, _frame_size, _frame_size1;
    var x = (_frame_origin = frame.origin) === null || _frame_origin === void 0 ? void 0 : _frame_origin.x;
    var y = (_frame_origin1 = frame.origin) === null || _frame_origin1 === void 0 ? void 0 : _frame_origin1.y;
    var width = (_frame_size = frame.size) === null || _frame_size === void 0 ? void 0 : _frame_size.width;
    var height = (_frame_size1 = frame.size) === null || _frame_size1 === void 0 ? void 0 : _frame_size1.height;
    if (x === undefined || y === undefined || width === undefined || height === undefined) return;
    var previous = entry.baseItems.get(index);
    if (previous && previous.x === x && previous.y === y && previous.width === width && previous.height === height) return;
    entry.baseItems.set(index, {
        height: height,
        index: index,
        width: width,
        x: x,
        y: y
    });
    entry.appliedCells.clear();
    entry.plan = null;
    entry.revision++;
    var tableLayout = reactionTableLayouts.get(entry.ownerTableKey);
    if (tableLayout) tableLayout.dirty = true;
}
function captureReactionLayoutItems(entry) {
    var _numberValue;
    if (!objc || entry.baseItems.size >= entry.itemCount) return;
    var indexPathClass = objc.getClass('NSIndexPath');
    if (!indexPathClass) return;
    var sections = (_numberValue = numberValue(nativeCall(entry.collection, 'numberOfSections'))) !== null && _numberValue !== void 0 ? _numberValue : 1;
    for(var section = 0; section < sections; section++){
        var _numberValue1;
        var count = (_numberValue1 = numberValue(nativeCall(entry.collection, 'numberOfItemsInSection:', section))) !== null && _numberValue1 !== void 0 ? _numberValue1 : 0;
        for(var item = 0; item < count; item++){
            var indexPath = nativeCall(indexPathClass, 'indexPathForItem:inSection:', item, section);
            if (!indexPath) continue;
            var attributes = nativeCall(entry.layout, 'layoutAttributesForItemAtIndexPath:', indexPath);
            if (!attributes) continue;
            captureReactionLayoutItem(entry, item, nativeRectFields(nativeCall(attributes, 'frame')));
        }
    }
}
function ensureReactionLayoutPlan(entry) {
    var _Math, _Math1;
    var _bounds_size, _entry_plan;
    if (!objc) return false;
    var bounds = nativeRectFields(nativeCall(entry.collection, 'bounds'));
    var width = (_bounds_size = bounds.size) === null || _bounds_size === void 0 ? void 0 : _bounds_size.width;
    if (width === undefined || width <= 0 || entry.baseItems.size < entry.itemCount) return false;
    if (((_entry_plan = entry.plan) === null || _entry_plan === void 0 ? void 0 : _entry_plan.revision) === entry.revision && entry.plan.width === width) return true;
    var items = _to_consumable_array(entry.baseItems.values()).map(function(item) {
        var _entry_extraWidths_get;
        return _object_spread_props(_object_spread({}, item), {
            extraWidth: (_entry_extraWidths_get = entry.extraWidths.get(item.index)) !== null && _entry_extraWidths_get !== void 0 ? _entry_extraWidths_get : 0
        });
    });
    var frames = reflowReactionItems(items, width);
    if (frames.length === 0) return false;
    var baseHeight = (_Math = Math).max.apply(_Math, _to_consumable_array(items.map(function(item) {
        return item.y + item.height;
    })));
    var height = (_Math1 = Math).max.apply(_Math1, _to_consumable_array(frames.map(function(frame) {
        return frame.y + frame.height;
    })));
    entry.plan = {
        baseHeight: baseHeight,
        frames: new Map(frames.map(function(frame) {
            return [
                frame.index,
                frame
            ];
        })),
        height: height,
        revision: entry.revision,
        width: width
    };
    return true;
}
function setReactionLayoutExtraWidth(state, width) {
    var _entry_extraWidths_get;
    var entry = reactionLayouts.get(state.layoutKey);
    if (!entry) return;
    var current = (_entry_extraWidths_get = entry.extraWidths.get(state.itemIndex)) !== null && _entry_extraWidths_get !== void 0 ? _entry_extraWidths_get : 0;
    if (Math.abs(current - width) < 1) return;
    if (width > 0) entry.extraWidths.set(state.itemIndex, width);
    else entry.extraWidths.delete(state.itemIndex);
    entry.appliedCells.clear();
    entry.plan = null;
    entry.revision++;
    var tableLayout = reactionTableLayouts.get(entry.ownerTableKey);
    if (tableLayout) tableLayout.dirty = true;
}
function invalidateReactionLayout(entry) {
    if (!objc || entry.invalidationScheduled) return;
    entry.invalidationScheduled = true;
    var token = lifecycle;
    setTimeout(function() {
        entry.invalidationScheduled = false;
        if (token !== lifecycle || reactionLayouts.get(nativeKey(entry.collection)) !== entry) return;
        nativeCall(entry.layout, 'invalidateLayout');
        nativeCall(entry.collection, 'setNeedsLayout');
        nativeCall(entry.list, 'invalidateIntrinsicContentSize');
        nativeCall(entry.list, 'setNeedsLayout');
        if (entry.ownerCell) scheduleCell(entry.ownerCell, true);
        var table = entry.ownerCell ? ancestorNativeViewByClass(entry.ownerCell, 'DCDTableView', 12) : null;
        if (table) scheduleReactionTableLayout(reactionTableLayout(table));
    }, 0);
}
function updateAvatarWidth(state, width) {
    if (!Number.isFinite(width) || width <= 0) return;
    if (!shouldMeasureReactionAvatarWidth(state.widthMeasured, state.avatarWidth, width)) return;
    var firstMeasurement = !state.widthMeasured;
    var widthChanged = Math.abs(width - state.avatarWidth) >= 1;
    var extraWidth = reactionAvatarExtraWidth(width, AVATAR_LEADING_INSET, AVATAR_TRAILING_PADDING, true);
    var extraWidthChanged = Math.abs(extraWidth - state.extraWidth) >= 1;
    state.widthMeasured = true;
    state.avatarWidth = width;
    state.extraWidth = extraWidth;
    if (extraWidthChanged) setReactionLayoutExtraWidth(state, extraWidth);
    if (!firstMeasurement && !widthChanged && !extraWidthChanged) return;
    state.revision++;
    setSurfaceRenderState(state);
    if (state.surface) {
        try {
            fabric === null || fabric === void 0 ? void 0 : fabric.update(state.surface, {
                revision: state.revision,
                surfaceId: state.surfaceId
            });
        } catch (unused) {
            return;
        }
    }
    if (extraWidthChanged) {
        var entry = reactionLayouts.get(state.layoutKey);
        if (entry) invalidateReactionLayout(entry);
    }
}
function updateSurfaceFrame(state) {
    if (!fabric || !state.surface) return;
    try {
        var width = state.avatarWidth || INITIAL_SURFACE_WIDTH;
        var position = reactionAvatarFrame(state.baseFrame, width, AVATAR_LEADING_INSET);
        var surfaceFrame = {
            height: state.baseFrame.height || INITIAL_SURFACE_HEIGHT,
            width: position.width,
            x: position.x,
            y: state.baseFrame.y
        };
        if (state.surfaceFrame && Math.abs(state.surfaceFrame.x - surfaceFrame.x) < 0.5 && Math.abs(state.surfaceFrame.y - surfaceFrame.y) < 0.5 && Math.abs(state.surfaceFrame.width - surfaceFrame.width) < 0.5 && Math.abs(state.surfaceFrame.height - surfaceFrame.height) < 0.5) return;
        fabric.setFrame(state.surface, surfaceFrame);
        state.surfaceFrame = surfaceFrame;
    } catch (unused) {
        return;
    }
}
function updateReactionViewFrame(state) {
    if (!objc || state.extraWidth === 0) return;
    var width = state.baseFrame.width + state.extraWidth;
    var current = nativeFrameForView(state.view);
    if (!current) return;
    if (Math.abs(current.width - width) < 1) return;
    setNativeFrame(state.view, _object_spread_props(_object_spread({}, current), {
        width: width
    }));
}
function removeSurface(state, resetWidth) {
    clearReactionAvatarSurfaceState(state.surfaceId);
    if (state.surface) {
        try {
            fabric === null || fabric === void 0 ? void 0 : fabric.unmount(state.surface);
        } catch (unused) {
        }
    }
    state.surface = null;
    state.surfaceFrame = null;
    if (objc) setNativeFrame(state.view, state.baseFrame);
    if (!resetWidth) return;
    state.avatarWidth = 0;
    state.extraWidth = 0;
    state.widthMeasured = false;
    setReactionLayoutExtraWidth(state, 0);
    var entry = reactionLayouts.get(state.layoutKey);
    if (entry) invalidateReactionLayout(entry);
}
function createSurface(state) {
    if (!fabric || !surfaceModuleName || state.surface || state.users.length === 0) return;
    setSurfaceRenderState(state);
    try {
        state.surface = fabric.mount(state.collectionCell, surfaceModuleName, {
            revision: state.revision,
            surfaceId: state.surfaceId
        });
        updateSurfaceFrame(state);
    } catch (unused) {
        state.surface = null;
        return;
    }
}
function updateSurface(state) {
    if (state.users.length === 0) {
        removeSurface(state, true);
        return;
    }
    state.revision++;
    setSurfaceRenderState(state);
    if (!state.surface) createSurface(state);
    else {
        try {
            fabric === null || fabric === void 0 ? void 0 : fabric.update(state.surface, {
                revision: state.revision,
                surfaceId: state.surfaceId
            });
        } catch (unused) {
            removeSurface(state, true);
            return;
        }
    }
    updateSurfaceFrame(state);
}
function createReactionState(cellKey, layoutKey, itemIndex, collectionCell, view, context, message) {
    var _ref;
    var _channels_getChannel, _channels_getChannel1;
    var baseFrame = (_ref = fabric === null || fabric === void 0 ? void 0 : fabric.measure(view)) !== null && _ref !== void 0 ? _ref : {
        height: 0,
        width: 0,
        x: 0,
        y: 0
    };
    var totalCount = reactionAvatarSelection(context.reaction, context.reactionType).count;
    var avatarWidth = reactionAvatarStackWidth(reactionAvatarReservedSlotCount(totalCount));
    var extraWidth = reactionAvatarReservedExtraWidth(totalCount, AVATAR_LEADING_INSET, AVATAR_TRAILING_PADDING);
    return {
        avatarWidth: avatarWidth,
        baseFrame: baseFrame,
        cellKey: cellKey,
        collectionCell: collectionCell,
        context: context,
        emptyResultRetryCount: 0,
        emptyResultRetryTimer: null,
        extraWidth: extraWidth,
        guildId: channels === null || channels === void 0 ? void 0 : (_channels_getChannel1 = channels.getChannel) === null || _channels_getChannel1 === void 0 ? void 0 : (_channels_getChannel = _channels_getChannel1.call(channels, context.channelId)) === null || _channels_getChannel === void 0 ? void 0 : _channels_getChannel.guild_id,
        itemIndex: itemIndex,
        layoutKey: layoutKey,
        loading: false,
        message: message,
        totalCount: totalCount,
        widthMeasured: false,
        revision: 0,
        requestGeneration: 0,
        surface: null,
        surfaceFrame: null,
        surfaceId: "".concat(cellKey, ":").concat(context.key),
        users: [],
        view: view
    };
}
function fetchReactionUsers(context) {
    return _async_to_generator(function() {
        var selection, uniqueUsers, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, reactionType, remaining, _ref, _dispatcher_dispatch, result, _iteratorNormalCompletion1, _didIteratorError1, _iteratorError1, _iterator1, _step1, user, _dispatcher_dispatch1, error, err;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    if (!(reactionActions === null || reactionActions === void 0 ? void 0 : reactionActions.getReactors)) return [
                        2,
                        []
                    ];
                    selection = reactionAvatarSelection(context.reaction, context.reactionType);
                    uniqueUsers = new Map();
                    _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                    _state.label = 1;
                case 1:
                    _state.trys.push([
                        1,
                        8,
                        9,
                        10
                    ]);
                    _iterator = selection.types[Symbol.iterator]();
                    _state.label = 2;
                case 2:
                    if (!!(_iteratorNormalCompletion = (_step = _iterator.next()).done)) return [
                        3,
                        7
                    ];
                    reactionType = _step.value;
                    remaining = REACTION_AVATAR_LIMIT - uniqueUsers.size;
                    if (remaining <= 0) return [
                        3,
                        7
                    ];
                    _state.label = 3;
                case 3:
                    _state.trys.push([
                        3,
                        5,
                        ,
                        6
                    ]);
                    return [
                        4,
                        reactionActions.getReactors({
                            channelId: context.channelId,
                            emoji: context.emoji,
                            limit: remaining,
                            messageId: context.messageId,
                            type: reactionType
                        })
                    ];
                case 4:
                    result = ((_ref = _state.sent()) !== null && _ref !== void 0 ? _ref : []).slice(0, remaining);
                    dispatcher === null || dispatcher === void 0 ? void 0 : (_dispatcher_dispatch = dispatcher.dispatch) === null || _dispatcher_dispatch === void 0 ? void 0 : _dispatcher_dispatch.call(dispatcher, {
                        channelId: context.channelId,
                        emoji: context.emoji,
                        messageId: context.messageId,
                        reactionType: reactionType,
                        type: 'MESSAGE_REACTION_ADD_USERS',
                        users: result !== null && result !== void 0 ? result : []
                    });
                    _iteratorNormalCompletion1 = true, _didIteratorError1 = false, _iteratorError1 = undefined;
                    try {
                        for(_iterator1 = (result !== null && result !== void 0 ? result : [])[Symbol.iterator](); !(_iteratorNormalCompletion1 = (_step1 = _iterator1.next()).done); _iteratorNormalCompletion1 = true){
                            user = _step1.value;
                            ;
                            if (!(user === null || user === void 0 ? void 0 : user.id) || uniqueUsers.has(user.id)) continue;
                            uniqueUsers.set(user.id, user);
                            dispatcher === null || dispatcher === void 0 ? void 0 : (_dispatcher_dispatch1 = dispatcher.dispatch) === null || _dispatcher_dispatch1 === void 0 ? void 0 : _dispatcher_dispatch1.call(dispatcher, {
                                type: 'USER_UPDATE',
                                user: user
                            });
                            if (uniqueUsers.size >= REACTION_AVATAR_LIMIT) break;
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
                    if (uniqueUsers.size >= REACTION_AVATAR_LIMIT) return [
                        3,
                        7
                    ];
                    return [
                        3,
                        6
                    ];
                case 5:
                    error = _state.sent();
                    console.error(error);
                    return [
                        3,
                        6
                    ];
                case 6:
                    _iteratorNormalCompletion = true;
                    return [
                        3,
                        2
                    ];
                case 7:
                    return [
                        3,
                        10
                    ];
                case 8:
                    err = _state.sent();
                    _didIteratorError = true;
                    _iteratorError = err;
                    return [
                        3,
                        10
                    ];
                case 9:
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
                case 10:
                    return [
                        2,
                        _to_consumable_array(uniqueUsers.values())
                    ];
            }
        });
    })();
}
function loadReactionUsers(state) {
    if (state.loading) return;
    state.loading = true;
    var requestKey = state.context.key;
    var requestGeneration = state.requestGeneration;
    var token = lifecycle;
    void userCache.load(requestKey, function() {
        return fetchReactionUsers(state.context);
    }).then(function(reactors) {
        if (token !== lifecycle || reactionStates.get(nativeKey(state.view)) !== state || !isCurrentReactionRequest(requestKey, state.context.key, requestGeneration, state.requestGeneration)) return;
        state.loading = false;
        state.users = reactors;
        updateSurface(state);
        if (reactors.length > 0) {
            if (state.emptyResultRetryTimer) clearTimeout(state.emptyResultRetryTimer);
            state.emptyResultRetryTimer = null;
            state.emptyResultRetryCount = 0;
        } else {
            scheduleEmptyReactionRetry(state);
        }
    }).catch(function() {
        if (token !== lifecycle || reactionStates.get(nativeKey(state.view)) !== state || !isCurrentReactionRequest(requestKey, state.context.key, requestGeneration, state.requestGeneration)) return;
        state.loading = false;
        scheduleEmptyReactionRetry(state);
    });
}
function scheduleEmptyReactionRetry(state) {
    if (state.totalCount <= 0 || state.emptyResultRetryTimer || state.emptyResultRetryCount >= MAX_EMPTY_RESULT_RETRIES) return;
    state.emptyResultRetryCount++;
    var token = lifecycle;
    state.emptyResultRetryTimer = setTimeout(function() {
        state.emptyResultRetryTimer = null;
        if (token !== lifecycle || reactionStates.get(nativeKey(state.view)) !== state || state.users.length > 0 || state.loading) return;
        userCache.invalidate(state.context.key);
        loadReactionUsers(state);
    }, EMPTY_RESULT_RETRY_DELAY);
}
function syncReactionView(cellKey, layoutKey, itemIndex, collectionCell, view, context, message) {
    var key = nativeKey(view);
    var existing = reactionStates.get(key);
    var collectionCellKey = nativeKey(collectionCell);
    if (!context) {
        if (existing) disposeReactionState(key, existing, true);
        return;
    }
    if ((existing === null || existing === void 0 ? void 0 : existing.context.key) === context.key && existing.cellKey === cellKey && nativeKey(existing.collectionCell) === collectionCellKey) {
        if (existing.layoutKey !== layoutKey || existing.itemIndex !== itemIndex) {
            setReactionLayoutExtraWidth(existing, 0);
            existing.layoutKey = layoutKey;
            existing.itemIndex = itemIndex;
            setReactionLayoutExtraWidth(existing, existing.extraWidth);
        }
        existing.context = context;
        existing.message = message;
        var totalCount = reactionAvatarSelection(context.reaction, context.reactionType).count;
        if (existing.totalCount !== totalCount) {
            existing.totalCount = totalCount;
            existing.avatarWidth = reactionAvatarStackWidth(reactionAvatarReservedSlotCount(totalCount));
            existing.extraWidth = reactionAvatarReservedExtraWidth(totalCount, AVATAR_LEADING_INSET, AVATAR_TRAILING_PADDING);
            existing.widthMeasured = false;
            setReactionLayoutExtraWidth(existing, existing.extraWidth);
            if (existing.users.length > 0) updateSurface(existing);
            else setSurfaceRenderState(existing);
        }
        if (existing.loading || existing.users.length > 0) return;
        var cached = userCache.get(context.key);
        if (cached !== undefined) {
            existing.users = cached;
            if (cached.length > 0) updateSurface(existing);
            else scheduleEmptyReactionRetry(existing);
            return;
        }
        loadReactionUsers(existing);
        return;
    }
    if (existing) disposeReactionState(key, existing, true);
    var state = createReactionState(cellKey, layoutKey, itemIndex, collectionCell, view, context, message);
    reactionStates.set(key, state);
    setReactionLayoutExtraWidth(state, state.extraWidth);
    var cached1 = userCache.get(context.key);
    if (cached1 !== undefined) {
        state.users = cached1;
        updateSurface(state);
        if (cached1.length === 0) scheduleEmptyReactionRetry(state);
        return;
    }
    loadReactionUsers(state);
}
function disposeReactionState(key, state, resetWidth) {
    if (state.emptyResultRetryTimer) clearTimeout(state.emptyResultRetryTimer);
    state.requestGeneration++;
    removeSurface(state, resetWidth);
    reactionStates.delete(key);
}
function reactionViewForCollectionCell(cell) {
    return firstNativeViewByClass(cell, 'ReactionView', MAX_REACTION_CELL_NODES, 5);
}
function setNativeFrame(view, frame) {
    if (!objc) return;
    var current = nativeFrameForView(view);
    if (current && Math.abs(current.x - frame.x) < 0.5 && Math.abs(current.y - frame.y) < 0.5 && Math.abs(current.width - frame.width) < 0.5 && Math.abs(current.height - frame.height) < 0.5) return;
    nativeCall(view, 'setFrame:', objc.struct('CGRect', {
        origin: {
            x: frame.x,
            y: frame.y
        },
        size: {
            height: frame.height,
            width: frame.width
        }
    }));
}
function setReactionAncestorFrames(entry, delta) {
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
    try {
        for(var _iterator = entry.ancestorFrames[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
            var _step_value = _step.value, frame = _step_value.frame, view = _step_value.view;
            setNativeFrame(view, _object_spread_props(_object_spread({}, frame), {
                height: frame.height + delta
            }));
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
function restoreReactionLayoutEntry(entry) {
    var _Math;
    var _entry_plan;
    if (!objc) return;
    setReactionAncestorFrames(entry, 0);
    var baseItems = _to_consumable_array(entry.baseItems.values());
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
    try {
        for(var _iterator = nativeArray(nativeCall(entry.collection, 'visibleCells'))[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
            var cell = _step.value;
            var index = itemForCollectionCell(entry.collection, cell);
            var frame = index === undefined ? undefined : entry.baseItems.get(index);
            if (frame) setNativeFrame(cell, frame);
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
    var baseHeight = baseItems.length ? (_Math = Math).max.apply(_Math, _to_consumable_array(baseItems.map(function(item) {
        return item.y + item.height;
    }))) : (_entry_plan = entry.plan) === null || _entry_plan === void 0 ? void 0 : _entry_plan.baseHeight;
    if (baseHeight !== undefined) {
        var _ref, _currentSize_width;
        var currentSize = nativeStructFields(nativeCall(entry.collection, 'contentSize'));
        var currentFrame = nativeFrameForView(entry.collection);
        nativeCall(entry.collection, 'setContentSize:', objc.struct('CGSize', {
            height: baseHeight,
            width: (_ref = (_currentSize_width = currentSize.width) !== null && _currentSize_width !== void 0 ? _currentSize_width : currentFrame === null || currentFrame === void 0 ? void 0 : currentFrame.width) !== null && _ref !== void 0 ? _ref : 0
        }));
        if (currentFrame) setNativeFrame(entry.collection, _object_spread_props(_object_spread({}, currentFrame), {
            height: baseHeight
        }));
    }
    var tableLayout = reactionTableLayouts.get(entry.ownerTableKey);
    if (tableLayout) {
        tableLayout.dirty = true;
        scheduleReactionTableLayout(tableLayout);
    }
}
function scheduleReactionLayoutRefresh(messageId, channelId) {
    var key = "".concat(channelId !== null && channelId !== void 0 ? channelId : '*', ":").concat(messageId);
    var existing = reactionLayoutRefreshes.get(key);
    if (existing) clearTimeout(existing);
    var token = lifecycle;
    var timeout = setTimeout(function() {
        reactionLayoutRefreshes.delete(key);
        if (token !== lifecycle || !activated) return;
        var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
        try {
            for(var _iterator = reactionLayouts.values()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                var entry = _step.value;
                if (channelId ? entry.ownerMessageKey !== messageKey(channelId, messageId) : !entry.ownerMessageKey.endsWith(":".concat(messageId))) continue;
                restoreReactionLayoutEntry(entry);
                entry.itemCount = reactionCount(entry.collection);
                entry.baseItems.clear();
                entry.appliedCells.clear();
                entry.appliedLayoutRevision = -1;
                entry.appliedLayoutWidth = -1;
                entry.plan = null;
                entry.revision++;
                nativeCall(entry.layout, 'invalidateLayout');
                nativeCall(entry.collection, 'layoutIfNeeded');
                if (entry.ownerCell) scheduleCell(entry.ownerCell, true);
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
    }, 100);
    reactionLayoutRefreshes.set(key, timeout);
}
function reactionTableLayout(table) {
    var key = nativeKey(table);
    var existing = reactionTableLayouts.get(key);
    if (existing) return existing;
    var entry = {
        layoutHookInstalled: false,
        layoutScheduled: false,
        dirty: true,
        table: table
    };
    reactionTableLayouts.set(key, entry);
    return entry;
}
function applyReactionTableLayout(entry) {
    if (!objc || !entry.dirty) return;
    entry.dirty = false;
    nativeCall(entry.table, 'beginUpdates');
    nativeCall(entry.table, 'endUpdates');
}
function scheduleReactionTableLayout(entry) {
    if (entry.layoutScheduled) return;
    entry.layoutScheduled = true;
    var token = lifecycle;
    setTimeout(function() {
        entry.layoutScheduled = false;
        if (token !== lifecycle || !objc || !entry.dirty) return;
        applyReactionTableLayout(entry);
    }, 0);
}
function applyDirtyReactionTableLayout(ownerTableKey) {
    var tableLayout = reactionTableLayouts.get(ownerTableKey);
    if (tableLayout === null || tableLayout === void 0 ? void 0 : tableLayout.dirty) scheduleReactionTableLayout(tableLayout);
}
function installReactionTableLayoutHook(entry) {
    if (!objc || !entry.ownerCell) return false;
    var table = ancestorNativeViewByClass(entry.ownerCell, 'DCDTableView', 12);
    if (!table) return false;
    var tableEntry = reactionTableLayout(table);
    if (tableEntry.layoutHookInstalled) return true;
    try {
        hooks.push(objc.hook('DCDTableView', 'layoutSubviews', {
            after: function after() {
                if (tableEntry.dirty) scheduleReactionTableLayout(tableEntry);
            }
        }, {
            instance: table,
            thread: 'main'
        }));
        tableEntry.layoutHookInstalled = true;
        return true;
    } catch (unused) {
        return false;
    }
}
function applyReactionLayout(entry) {
    var _ref, _currentSize_height;
    var _currentFrame_size;
    if (!objc) return;
    if (entry.extraWidths.size === 0) {
        if (entry.appliedLayoutRevision >= 0) restoreReactionLayoutEntry(entry);
        else setReactionAncestorFrames(entry, 0);
        entry.appliedCells.clear();
        entry.appliedLayoutRevision = -1;
        entry.appliedLayoutWidth = -1;
        applyDirtyReactionTableLayout(entry.ownerTableKey);
        return;
    }
    captureReactionLayoutItems(entry);
    if (!ensureReactionLayoutPlan(entry) || !entry.plan) return;
    var planChanged = entry.appliedLayoutRevision !== entry.plan.revision || Math.abs(entry.appliedLayoutWidth - entry.plan.width) >= 0.5;
    var tableLayout = reactionTableLayouts.get(entry.ownerTableKey);
    if (planChanged && tableLayout) tableLayout.dirty = true;
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
    try {
        for(var _iterator = nativeArray(nativeCall(entry.collection, 'visibleCells'))[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
            var cell = _step.value;
            var index = itemForCollectionCell(entry.collection, cell);
            if (index === undefined) continue;
            var frame = entry.plan.frames.get(index);
            if (!frame) continue;
            var cellKey = nativeKey(cell);
            var appliedCell = entry.appliedCells.get(cellKey);
            var currentFrame = nativeFrameForView(cell);
            var frameChanged = !reactionLayoutFrameMatches(currentFrame !== null && currentFrame !== void 0 ? currentFrame : undefined, frame);
            if (frameChanged || !appliedCell || appliedCell.index !== index || appliedCell.revision !== entry.plan.revision) {
                setNativeFrame(cell, frame);
                entry.appliedCells.set(cellKey, {
                    index: index,
                    revision: entry.plan.revision
                });
            }
            var reactionView = reactionViewForCollectionCell(cell);
            var state = reactionView ? reactionStates.get(nativeKey(reactionView)) : undefined;
            if (state) updateReactionViewFrame(state);
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
    var currentSize = nativeStructFields(nativeCall(entry.collection, 'contentSize'));
    var currentFrame1 = nativeRectFields(nativeCall(entry.collection, 'frame'));
    var currentHeight = (_ref = (_currentFrame_size = currentFrame1.size) === null || _currentFrame_size === void 0 ? void 0 : _currentFrame_size.height) !== null && _ref !== void 0 ? _ref : 0;
    var contentHeight = (_currentSize_height = currentSize.height) !== null && _currentSize_height !== void 0 ? _currentSize_height : 0;
    var targetHeight = entry.plan.height;
    var dimensionsChanged = reactionLayoutNeedsInvalidation({
        contentHeight: contentHeight,
        frameHeight: currentHeight
    }, {
        contentHeight: targetHeight,
        frameHeight: targetHeight
    });
    if (Math.abs(contentHeight - entry.plan.height) >= 1) {
        var _currentSize_width;
        nativeCall(entry.collection, 'setContentSize:', objc.struct('CGSize', {
            height: entry.plan.height,
            width: (_currentSize_width = currentSize.width) !== null && _currentSize_width !== void 0 ? _currentSize_width : entry.plan.width
        }));
    }
    if (planChanged && dimensionsChanged) {
        nativeCall(entry.collection, 'invalidateIntrinsicContentSize');
        nativeCall(entry.list, 'invalidateIntrinsicContentSize');
        nativeCall(entry.list, 'setNeedsLayout');
    }
    if (Math.abs(currentHeight - targetHeight) >= 1) {
        var _ref1, _ref2, _ref3;
        var _currentFrame_size1, _currentFrame_origin, _currentFrame_origin1;
        setNativeFrame(entry.collection, {
            height: targetHeight,
            width: (_ref1 = (_currentFrame_size1 = currentFrame1.size) === null || _currentFrame_size1 === void 0 ? void 0 : _currentFrame_size1.width) !== null && _ref1 !== void 0 ? _ref1 : entry.plan.width,
            x: (_ref2 = (_currentFrame_origin = currentFrame1.origin) === null || _currentFrame_origin === void 0 ? void 0 : _currentFrame_origin.x) !== null && _ref2 !== void 0 ? _ref2 : 0,
            y: (_ref3 = (_currentFrame_origin1 = currentFrame1.origin) === null || _currentFrame_origin1 === void 0 ? void 0 : _currentFrame_origin1.y) !== null && _ref3 !== void 0 ? _ref3 : 0
        });
    }
    setReactionAncestorFrames(entry, Math.max(0, entry.plan.height - entry.plan.baseHeight));
    if (planChanged) {
        entry.appliedLayoutRevision = entry.plan.revision;
        entry.appliedLayoutWidth = entry.plan.width;
    }
    applyDirtyReactionTableLayout(entry.ownerTableKey);
}
function restoreReactionTableLayout(entry) {
    if (!objc) return;
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
    try {
        for(var _iterator = reactionLayouts.values()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
            var layout = _step.value;
            if (layout.ownerTableKey === nativeKey(entry.table)) restoreReactionLayoutEntry(layout);
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
    entry.dirty = true;
    applyReactionTableLayout(entry);
}
function updateCell(cell) {
    if (!objc || !fabric || !messages) return;
    var cellKey = nativeKey(cell);
    var messageContext = messageContextForCell(cell);
    if (!messageContext) {
        cleanupCellReactions(cellKey);
        return;
    }
    var reactionList = firstNativeViewByClass(cell, 'DCDReactionListView', 70, 8);
    if (!reactionList) {
        cleanupCellReactions(cellKey);
        return;
    }
    var collection = collectionViewForReactionList(reactionList);
    var layout = collection ? nativeCall(collection, 'collectionViewLayout') : null;
    if (!collection || !layout) {
        cleanupCellReactions(cellKey);
        return;
    }
    var visibleCells = nativeArray(nativeCall(collection, 'visibleCells'));
    var layoutEntry = reactionLayoutEntry(layout, collection, reactionList, messageKey(messageContext.channelId, messageContext.messageId));
    installReactionTableLayoutHook(layoutEntry);
    var layoutKey = nativeKey(collection);
    captureReactionLayoutItems(layoutEntry);
    var reactions = Array.isArray(messageContext.message.reactions) ? messageContext.message.reactions : [];
    var renderAvatars = shouldRenderReactionAvatars(reactions.length);
    var visibleKeys = new Set();
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
    try {
        for(var _iterator = visibleCells[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
            var collectionCell = _step.value;
            var index = itemForCollectionCell(collection, collectionCell);
            if (index === undefined) continue;
            if (!layoutEntry.baseItems.has(index)) {
                var frame = fabric.measure(collectionCell);
                captureReactionLayoutItem(layoutEntry, index, {
                    origin: {
                        x: frame.x,
                        y: frame.y
                    },
                    size: {
                        height: frame.height,
                        width: frame.width
                    }
                });
            }
            var reactionView = reactionViewForCollectionCell(collectionCell);
            if (!reactionView) continue;
            var reaction = reactions[index];
            var context = reaction && renderAvatars ? reactionContextForMessage(messageContext.message, messageContext.channelId, reaction) : null;
            var key = nativeKey(reactionView);
            visibleKeys.add(key);
            syncReactionView(cellKey, layoutKey, index, collectionCell, reactionView, context, messageContext.message);
            var state = reactionStates.get(key);
            if (state === null || state === void 0 ? void 0 : state.surface) updateSurfaceFrame(state);
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
        for(var _iterator1 = reactionStates[Symbol.iterator](), _step1; !(_iteratorNormalCompletion1 = (_step1 = _iterator1.next()).done); _iteratorNormalCompletion1 = true){
            var _step_value = _sliced_to_array(_step1.value, 2), key1 = _step_value[0], state1 = _step_value[1];
            if (state1.cellKey === cellKey && !visibleKeys.has(key1)) {
                disposeReactionState(key1, state1, false);
            }
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
    applyReactionLayout(layoutEntry);
}
function cleanupCellReactions(cellKey) {
    var preserveLayout = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
    activeCells.delete(cellKey);
    lastCellScans.delete(cellKey);
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
    try {
        for(var _iterator = reactionStates[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
            var _step_value = _sliced_to_array(_step.value, 2), key = _step_value[0], state = _step_value[1];
            if (state.cellKey !== cellKey) continue;
            disposeReactionState(key, state, !preserveLayout);
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
    if (preserveLayout) return;
    var _iteratorNormalCompletion1 = true, _didIteratorError1 = false, _iteratorError1 = undefined;
    try {
        for(var _iterator1 = reactionLayouts[Symbol.iterator](), _step1; !(_iteratorNormalCompletion1 = (_step1 = _iterator1.next()).done); _iteratorNormalCompletion1 = true){
            var _step_value1 = _sliced_to_array(_step1.value, 2), key1 = _step_value1[0], entry = _step_value1[1];
            if (entry.ownerCellKey !== cellKey) continue;
            restoreReactionLayoutEntry(entry);
            reactionLayouts.delete(key1);
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
function scheduleCell(cell) {
    var force = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
    var _lastCellScans_get;
    var key = nativeKey(cell);
    activeCells.set(key, cell);
    var now = Date.now();
    if (!force && now - ((_lastCellScans_get = lastCellScans.get(key)) !== null && _lastCellScans_get !== void 0 ? _lastCellScans_get : 0) < CELL_SCAN_INTERVAL) return;
    if (scheduledCells.has(key)) return;
    scheduledCells.add(key);
    var token = lifecycle;
    setTimeout(function() {
        scheduledCells.delete(key);
        if (token !== lifecycle || !objc) return;
        lastCellScans.set(key, Date.now());
        try {
            updateCell(cell);
        } catch (unused) {
            return;
        }
    }, 0);
}
function scanVisibleReactionCells() {
    if (!objc) return 0;
    var applicationClass = objc.getClass('UIApplication');
    if (!applicationClass) return 0;
    var application = nativeCall(applicationClass, 'sharedApplication');
    if (!application) return 0;
    var windows = nativeArray(nativeCall(application, 'windows'));
    var keyWindow = nativeCall(application, 'keyWindow');
    if (keyWindow && !windows.some(function(window) {
        return nativeKey(window) === nativeKey(keyWindow);
    })) {
        windows.push(keyWindow);
    }
    var cells = new Map();
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
    try {
        for(var _iterator = windows[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
            var window = _step.value;
            var queue = [
                {
                    depth: 0,
                    view: window
                }
            ];
            var visited = 0;
            while(queue.length > 0 && visited < MAX_VISIBLE_CELL_SCAN_NODES){
                var _objc_className;
                var node = queue.shift();
                if (!node) break;
                visited++;
                var className = (_objc_className = objc.className(node.view)) !== null && _objc_className !== void 0 ? _objc_className : '';
                if (className.includes('DCDMessageTableViewCell')) {
                    if (nativeCall(node.view, 'window')) cells.set(nativeKey(node.view), node.view);
                    continue;
                }
                if (node.depth >= MAX_VISIBLE_CELL_SCAN_DEPTH) continue;
                var _iteratorNormalCompletion1 = true, _didIteratorError1 = false, _iteratorError1 = undefined;
                try {
                    for(var _iterator1 = nativeChildren(node.view)[Symbol.iterator](), _step1; !(_iteratorNormalCompletion1 = (_step1 = _iterator1.next()).done); _iteratorNormalCompletion1 = true){
                        var child = _step1.value;
                        queue.push({
                            depth: node.depth + 1,
                            view: child
                        });
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
    var _iteratorNormalCompletion2 = true, _didIteratorError2 = false, _iteratorError2 = undefined;
    try {
        for(var _iterator2 = cells.values()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true){
            var cell = _step2.value;
            scheduleCell(cell, true);
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
    return cells.size;
}
function onReactionChange(event) {
    var messageId = stringValue(property(event, 'messageId'), property(event, 'message_id'));
    if (!messageId) return;
    var channelId = stringValue(property(event, 'channelId'), property(event, 'channel_id'));
    userCache.invalidateMessage(messageId, channelId !== null && channelId !== void 0 ? channelId : undefined);
    scheduleReactionLayoutRefresh(messageId, channelId !== null && channelId !== void 0 ? channelId : undefined);
    var states = _to_consumable_array(reactionStates.values()).filter(function(state) {
        return state.context.messageId === messageId && (!channelId || state.context.channelId === channelId);
    });
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
    try {
        for(var _iterator = states[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
            var state = _step.value;
            state.requestGeneration++;
            state.loading = false;
            loadReactionUsers(state);
            var cell = activeCells.get(state.cellKey);
            if (cell) scheduleCell(cell, true);
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
function onConnectionOpen() {
    userCache.clear();
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
    try {
        for(var _iterator = reactionStates.values()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
            var state = _step.value;
            state.requestGeneration++;
            state.loading = false;
            loadReactionUsers(state);
            var cell = activeCells.get(state.cellKey);
            if (cell) scheduleCell(cell, true);
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
function onSelectedChannelChange() {
    var _loop = function(_i, _iter) {
        var delay = _iter[_i];
        var timeout = setTimeout(function() {
            channelScanTimeouts = channelScanTimeouts.filter(function(candidate) {
                return candidate !== timeout;
            });
            if (token !== lifecycle || !activated) return;
            userCache.cancelQueuedOutsideChannel(selectedChannelId());
            scanVisibleReactionCells();
        }, delay);
        channelScanTimeouts.push(timeout);
    };
    var nextChannelId = selectedChannelId();
    if (!shouldHandleChannelChange(currentSelectedChannelId, nextChannelId)) return;
    currentSelectedChannelId = nextChannelId;
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
    try {
        for(var _iterator = channelScanTimeouts[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
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
    channelScanTimeouts = [];
    var _iteratorNormalCompletion1 = true, _didIteratorError1 = false, _iteratorError1 = undefined;
    try {
        for(var _iterator1 = reactionLayoutRefreshes.values()[Symbol.iterator](), _step1; !(_iteratorNormalCompletion1 = (_step1 = _iterator1.next()).done); _iteratorNormalCompletion1 = true){
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
    reactionLayoutRefreshes.clear();
    var _iteratorNormalCompletion2 = true, _didIteratorError2 = false, _iteratorError2 = undefined;
    try {
        for(var _iterator2 = reactionStates[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true){
            var _step_value = _sliced_to_array(_step2.value, 2), key = _step_value[0], state = _step_value[1];
            disposeReactionState(key, state, true);
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
    var _iteratorNormalCompletion3 = true, _didIteratorError3 = false, _iteratorError3 = undefined;
    try {
        for(var _iterator3 = reactionLayouts[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true){
            var _step_value1 = _sliced_to_array(_step3.value, 2), key1 = _step_value1[0], entry = _step_value1[1];
            restoreReactionLayoutEntry(entry);
            reactionLayouts.delete(key1);
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
    activeCells.clear();
    lastCellScans.clear();
    userCache.cancelQueuedOutsideChannel(selectedChannelId());
    var token = lifecycle;
    for(var _i = 0, _iter = [
        100,
        500,
        1500,
        3000
    ]; _i < _iter.length; _i++)_loop(_i, _iter);
}
function installReactionEventListeners() {
    var _dispatcher_subscribe, _dispatcher_subscribe1, _selectedChannel_addChangeListener;
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
    try {
        for(var _iterator = REACTION_EVENTS[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
            var event = _step.value;
            dispatcher === null || dispatcher === void 0 ? void 0 : (_dispatcher_subscribe = dispatcher.subscribe) === null || _dispatcher_subscribe === void 0 ? void 0 : _dispatcher_subscribe.call(dispatcher, event, onReactionChange);
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
    dispatcher === null || dispatcher === void 0 ? void 0 : (_dispatcher_subscribe1 = dispatcher.subscribe) === null || _dispatcher_subscribe1 === void 0 ? void 0 : _dispatcher_subscribe1.call(dispatcher, 'CONNECTION_OPEN', onConnectionOpen);
    currentSelectedChannelId = selectedChannelId();
    selectedChannel === null || selectedChannel === void 0 ? void 0 : (_selectedChannel_addChangeListener = selectedChannel.addChangeListener) === null || _selectedChannel_addChangeListener === void 0 ? void 0 : _selectedChannel_addChangeListener.call(selectedChannel, onSelectedChannelChange);
}
function removeReactionEventListeners() {
    var _selectedChannel_removeChangeListener;
    if (dispatcher === null || dispatcher === void 0 ? void 0 : dispatcher.unsubscribe) {
        var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
        try {
            for(var _iterator = REACTION_EVENTS[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                var event = _step.value;
                dispatcher.unsubscribe(event, onReactionChange);
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
        dispatcher.unsubscribe('CONNECTION_OPEN', onConnectionOpen);
    }
    selectedChannel === null || selectedChannel === void 0 ? void 0 : (_selectedChannel_removeChangeListener = selectedChannel.removeChangeListener) === null || _selectedChannel_removeChangeListener === void 0 ? void 0 : _selectedChannel_removeChangeListener.call(selectedChannel, onSelectedChannelChange);
    var _iteratorNormalCompletion1 = true, _didIteratorError1 = false, _iteratorError1 = undefined;
    try {
        for(var _iterator1 = channelScanTimeouts[Symbol.iterator](), _step1; !(_iteratorNormalCompletion1 = (_step1 = _iterator1.next()).done); _iteratorNormalCompletion1 = true){
            var timeout = _step1.value;
            clearTimeout(timeout);
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
    channelScanTimeouts = [];
    var _iteratorNormalCompletion2 = true, _didIteratorError2 = false, _iteratorError2 = undefined;
    try {
        for(var _iterator2 = reactionLayoutRefreshes.values()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true){
            var timeout1 = _step2.value;
            clearTimeout(timeout1);
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
    reactionLayoutRefreshes.clear();
}
function installNativeHooks() {
    if (!objc || !fabric || hooks.length > 0) return hooks.length > 0;
    var installed = [];
    try {
        var _hooks;
        installed.push(objc.hook('DCDMessageTableViewCell', 'didMoveToWindow', {
            after: function after(param) {
                var self = param.self;
                var action = reactionCellLifecycleAction(Boolean(nativeCall(self, 'window')), false);
                if (action === 'render') scheduleCell(self, true);
            }
        }));
        installed.push(objc.hook('DCDMessageTableViewCell', 'prepareForReuse', {
            after: function after(param) {
                var self = param.self;
                var action = reactionCellLifecycleAction(false, true);
                if (action === 'dispose') cleanupCellReactions(nativeKey(self));
                scheduleCell(self, true);
            }
        }));
        installed.push(objc.hook('DCDMessageTableViewCell', 'layoutSubviews', {
            after: function after(param) {
                var self = param.self;
                return scheduleCell(self);
            }
        }));
        (_hooks = hooks).push.apply(_hooks, _to_consumable_array(installed));
        return true;
    } catch (unused) {
        var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
        try {
            for(var _iterator = installed[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
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
        return false;
    }
}
function dependenciesReady() {
    return Boolean(objc && fabric && (reactionActions === null || reactionActions === void 0 ? void 0 : reactionActions.getReactors) && (messages === null || messages === void 0 ? void 0 : messages.getMessage) && (dispatcher === null || dispatcher === void 0 ? void 0 : dispatcher.dispatch) && (users === null || users === void 0 ? void 0 : users.getUser) && (channels === null || channels === void 0 ? void 0 : channels.getChannel) && userSummaryItem);
}
function activate() {
    if (activated) return;
    if (!dependenciesReady() || !registerSurface() || !installNativeHooks()) return;
    configureReactionAvatarSurface(userSummaryItem, users);
    installReactionEventListeners();
    activated = true;
    clearModuleListener();
    var token = lifecycle;
    setTimeout(function() {
        if (token !== lifecycle || !activated) return;
        scanVisibleReactionCells();
    }, 0);
}
function captureCandidate(candidate) {
    if (!record(candidate) && typeof candidate !== 'function') return;
    var value = candidate;
    if (!messages && value._dispatcher && typeof value.getName === 'function' && typeof value.getMessage === 'function') {
        try {
            if (value.getName() === 'MessageStore') messages = value;
        } catch (unused) {
            return;
        }
    }
}
function modulePath(id) {
    var _globalThis_window_modules_get, _globalThis_window_modules;
    return (_globalThis_window_modules = globalThis.window.modules) === null || _globalThis_window_modules === void 0 ? void 0 : (_globalThis_window_modules_get = _globalThis_window_modules.get(id)) === null || _globalThis_window_modules_get === void 0 ? void 0 : _globalThis_window_modules_get.__filePath;
}
function captureLoadedModule(module, id) {
    if (!record(module) && typeof module !== 'function') return;
    var value = module;
    var path = modulePath(id);
    if (path === REACTION_ACTIONS_PATH) reactionActions = value;
    captureCandidate(value);
    captureCandidate(value.default);
    if (dependenciesReady()) activate();
}
function captureInitializedModules() {
    var modules = globalThis.window.modules;
    if (!modules) return;
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
    try {
        for(var _iterator = modules[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
            var _step_value = _sliced_to_array(_step.value, 2), id = _step_value[0], module = _step_value[1];
            var _module_publicModule;
            if (!module.isInitialized) continue;
            captureLoadedModule((_module_publicModule = module.publicModule) === null || _module_publicModule === void 0 ? void 0 : _module_publicModule.exports, id);
            if (dependenciesReady()) return;
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
    var _metro_findByFilePath, _metro_findByProps, _metro_findByProps1, _metro_findByProps2, _metro_findByProps3, _metro_findByProps4, _userSummaryComponent;
    if (!moduleListenerCleanup) {
        moduleListenerCleanup = window.unbound.metro.addListener(function(module, id) {
            return captureLoadedModule(module, id);
        });
    }
    reactionActions = (_metro_findByFilePath = window.unbound.metro.findByFilePath(REACTION_ACTIONS_PATH, {
        interop: false
    })) !== null && _metro_findByFilePath !== void 0 ? _metro_findByFilePath : reactionActions;
    messages = (_metro_findByProps = window.unbound.metro.findByProps('_dispatcher', 'getName', 'getMessage')) !== null && _metro_findByProps !== void 0 ? _metro_findByProps : messages;
    dispatcher = (_metro_findByProps1 = window.unbound.metro.findByProps('dispatch', 'subscribe')) !== null && _metro_findByProps1 !== void 0 ? _metro_findByProps1 : dispatcher;
    users = (_metro_findByProps2 = window.unbound.metro.findByProps('getUser', 'getCurrentUser')) !== null && _metro_findByProps2 !== void 0 ? _metro_findByProps2 : users;
    channels = (_metro_findByProps3 = window.unbound.metro.findByProps('getChannel')) !== null && _metro_findByProps3 !== void 0 ? _metro_findByProps3 : channels;
    selectedChannel = (_metro_findByProps4 = window.unbound.metro.findByProps('getChannelId', 'getLastSelectedChannelId')) !== null && _metro_findByProps4 !== void 0 ? _metro_findByProps4 : selectedChannel;
    userSummaryItem = (_userSummaryComponent = userSummaryComponent()) !== null && _userSummaryComponent !== void 0 ? _userSummaryComponent : userSummaryItem;
    captureInitializedModules();
    activate();
}
function start(context) {
    var _ref, _ref1;
    stop();
    lifecycle++;
    objc = (_ref = context === null || context === void 0 ? void 0 : context.native.objc) !== null && _ref !== void 0 ? _ref : null;
    fabric = (_ref1 = context === null || context === void 0 ? void 0 : context.native.fabric) !== null && _ref1 !== void 0 ? _ref1 : null;
    activated = false;
    initialize();
}
function stop() {
    lifecycle++;
    activated = false;
    removeReactionEventListeners();
    clearModuleListener();
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
    try {
        for(var _iterator = hooks.splice(0)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
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
        for(var _iterator1 = reactionLayoutRefreshes.values()[Symbol.iterator](), _step1; !(_iteratorNormalCompletion1 = (_step1 = _iterator1.next()).done); _iteratorNormalCompletion1 = true){
            var timeout = _step1.value;
            clearTimeout(timeout);
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
    reactionLayoutRefreshes.clear();
    var _iteratorNormalCompletion2 = true, _didIteratorError2 = false, _iteratorError2 = undefined;
    try {
        for(var _iterator2 = reactionStates[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true){
            var _step_value = _sliced_to_array(_step2.value, 2), key = _step_value[0], state = _step_value[1];
            disposeReactionState(key, state, true);
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
    var _iteratorNormalCompletion3 = true, _didIteratorError3 = false, _iteratorError3 = undefined;
    try {
        for(var _iterator3 = reactionTableLayouts.values()[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true){
            var table = _step3.value;
            restoreReactionTableLayout(table);
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
    reactionLayouts.clear();
    reactionTableLayouts.clear();
    activeCells.clear();
    scheduledCells.clear();
    lastCellScans.clear();
    userCache.clear();
    clearReactionAvatarSurfaceStates();
    reactionActions = null;
    messages = null;
    dispatcher = null;
    users = null;
    channels = null;
    selectedChannel = null;
    currentSelectedChannelId = undefined;
    userSummaryItem = null;
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