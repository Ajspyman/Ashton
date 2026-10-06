({__plugin:null,__load(){if(this.__plugin)return this.__plugin;this.__plugin=(function () {
'use strict';
function _array_like_to_array(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
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
var EMPTY_STICKERS = [];
var STICKER_PICKER_ROW_MODULE_ID = 9610;
var STICKER_PICKER_ROW_PATH = 'modules/stickers/native/StickerPickerListRow.tsx';
var FLOATING_INPUT_PATH = 'modules/chat_input/native/FloatingChatInputContainer.tsx';
var SEND_BUTTON_PATH = 'modules/chat_input/native/accessories/ChatInputSendButton.tsx';
var STICKER_PATH = 'modules/stickers/native/Sticker.tsx';
var STICKER_PREVIEW_CONTAINER_SIZE = 80;
var STICKER_PREVIEW_IMAGE_SIZE = 76;
var unpatches = [];
var initializationInterval = null;
var initialized = false;
var composerPatched = false;
var lifecycle = 0;
var clearStagedPreviews = function clearStagedPreviews() {};
var nativeSendHandlers = new Map();
var sendButtonRefs = new Map();
var stagedChannelIds = new Set();
var stagedStickers = new Map();
var stickerPreviewListeners = new Map();
var pendingSends = new Set();
function getStagedStickers(channelId) {
    var _stagedStickers_get;
    return (_stagedStickers_get = stagedStickers.get(channelId)) !== null && _stagedStickers_get !== void 0 ? _stagedStickers_get : EMPTY_STICKERS;
}
function subscribeToStagedStickers(channelId, listener) {
    var _stickerPreviewListeners_get;
    var listeners = (_stickerPreviewListeners_get = stickerPreviewListeners.get(channelId)) !== null && _stickerPreviewListeners_get !== void 0 ? _stickerPreviewListeners_get : new Set();
    listeners.add(listener);
    stickerPreviewListeners.set(channelId, listeners);
    return function() {
        listeners.delete(listener);
        if (!listeners.size) stickerPreviewListeners.delete(channelId);
    };
}
function setStagedStickers(channelId, stickers) {
    var _stickerPreviewListeners_get;
    if (stickers.length) stagedStickers.set(channelId, stickers);
    else stagedStickers.delete(channelId);
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
    try {
        for(var _iterator = ((_stickerPreviewListeners_get = stickerPreviewListeners.get(channelId)) !== null && _stickerPreviewListeners_get !== void 0 ? _stickerPreviewListeners_get : [])[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
            var listener = _step.value;
            listener();
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
function unwrap(module) {
    var holder = module;
    var prop = 'default';
    var current = module === null || module === void 0 ? void 0 : module.default;
    while(current && (typeof current === "undefined" ? "undefined" : _type_of(current)) === 'object'){
        var next = current.type ? 'type' : current.render ? 'render' : null;
        if (!next) break;
        holder = current;
        prop = next;
        current = current[next];
    }
    return typeof current === 'function' ? {
        holder: holder,
        prop: prop
    } : null;
}
function resolveComponent(value) {
    var current = value;
    for(var depth = 0; current && depth < 8; depth++){
        var _ref, _ref1, _current_default;
        if (typeof current === 'function') return current;
        if ((typeof current === "undefined" ? "undefined" : _type_of(current)) !== 'object') return null;
        var next = (_ref = (_ref1 = (_current_default = current.default) !== null && _current_default !== void 0 ? _current_default : current.type) !== null && _ref1 !== void 0 ? _ref1 : current.render) !== null && _ref !== void 0 ? _ref : current.Sticker;
        if (!next || next === current) return null;
        current = next;
    }
    return typeof current === 'function' ? current : null;
}
function currentChannelId(selectedChannel) {
    var _ref;
    var _selectedChannel_getCurrentlySelectedChannelId, _selectedChannel_getChannelId;
    return (_ref = (_selectedChannel_getCurrentlySelectedChannelId = selectedChannel.getCurrentlySelectedChannelId) === null || _selectedChannel_getCurrentlySelectedChannelId === void 0 ? void 0 : _selectedChannel_getCurrentlySelectedChannelId.call(selectedChannel)) !== null && _ref !== void 0 ? _ref : (_selectedChannel_getChannelId = selectedChannel.getChannelId) === null || _selectedChannel_getChannelId === void 0 ? void 0 : _selectedChannel_getChannelId.call(selectedChannel);
}
function PendingSticker(param) {
    var channelId = param.channelId, clearSticker = param.clearSticker, Sticker = param.Sticker, selectedChannel = param.selectedChannel;
    var _sticker_opaque;
    var _$React = window.unbound.metro.common.React;
    var ReactNative = window.unbound.metro.common.ReactNative;
    var stickerIds = _$React.useSyncExternalStore(function(onChange) {
        return subscribeToStagedStickers(channelId, onChange);
    }, function() {
        return getStagedStickers(channelId).map(function(sticker) {
            return String(sticker.id);
        }).join(',');
    });
    var stickerId = stickerIds.split(',')[0];
    var sticker = stickerId ? getStagedStickers(channelId).find(function(sticker) {
        return String(sticker.id) === stickerId;
    }) : null;
    var selectedId = currentChannelId(selectedChannel);
    if (!sticker || selectedId && selectedId !== channelId) return null;
    return /*#__PURE__*/ React.createElement(ReactNative.View, {
        pointerEvents: "box-none",
        style: {
            alignItems: 'flex-end',
            bottom: 64,
            height: STICKER_PREVIEW_CONTAINER_SIZE,
            paddingRight: 16,
            position: 'absolute',
            right: 0,
            justifyContent: 'center'
        }
    }, /*#__PURE__*/ React.createElement(ReactNative.Pressable, {
        accessibilityLabel: "Remove sticker preview",
        accessibilityRole: "button",
        hitSlop: 8,
        onPress: function onPress() {
            return clearSticker(channelId);
        },
        style: {
            alignItems: 'center',
            backgroundColor: 'rgba(46,40,59,0.96)',
            borderColor: 'rgba(255,255,255,0.48)',
            borderWidth: 1.5,
            justifyContent: 'center',
            height: STICKER_PREVIEW_CONTAINER_SIZE,
            width: STICKER_PREVIEW_CONTAINER_SIZE,
            borderRadius: 18,
            overflow: 'hidden'
        }
    }, /*#__PURE__*/ React.createElement(ReactNative.View, {
        style: {
            borderRadius: 16,
            height: STICKER_PREVIEW_IMAGE_SIZE,
            overflow: 'hidden',
            width: STICKER_PREVIEW_IMAGE_SIZE
        }
    }, /*#__PURE__*/ React.createElement(Sticker, {
        animated: true,
        opaque: (_sticker_opaque = sticker.opaque) !== null && _sticker_opaque !== void 0 ? _sticker_opaque : true,
        size: STICKER_PREVIEW_IMAGE_SIZE,
        sticker: sticker
    }))));
}
function updateSendButton(channelId, hasText) {
    var _sendButtonRefs_get_current_setHasText, _sendButtonRefs_get_current, _sendButtonRefs_get;
    (_sendButtonRefs_get = sendButtonRefs.get(channelId)) === null || _sendButtonRefs_get === void 0 ? void 0 : (_sendButtonRefs_get_current = _sendButtonRefs_get.current) === null || _sendButtonRefs_get_current === void 0 ? void 0 : (_sendButtonRefs_get_current_setHasText = _sendButtonRefs_get_current.setHasText) === null || _sendButtonRefs_get_current_setHasText === void 0 ? void 0 : _sendButtonRefs_get_current_setHasText.call(_sendButtonRefs_get_current, hasText);
}
function getComposerText(channelId, input, drafts) {
    var _input_flushPendingDraftSave, _input_getText;
    input === null || input === void 0 ? void 0 : (_input_flushPendingDraftSave = input.flushPendingDraftSave) === null || _input_flushPendingDraftSave === void 0 ? void 0 : _input_flushPendingDraftSave.call(input);
    return String((input === null || input === void 0 ? void 0 : (_input_getText = input.getText) === null || _input_getText === void 0 ? void 0 : _input_getText.call(input)) || drafts.getDraft(channelId, 0) || '');
}
function restoreNativeSend(channelId) {
    var entry = nativeSendHandlers.get(channelId);
    if (!entry) return;
    if (entry.input.handleSend === entry.patched) entry.input.handleSend = entry.original;
    nativeSendHandlers.delete(channelId);
}
function start() {
    var _resolveComponent;
    if (initialized) return;
    var activeLifecycle = ++lifecycle;
    var registry = window.unbound.metro.findByProps('getBestActiveInputForChannelId');
    var selectedChannel = window.unbound.metro.findByProps('getCurrentlySelectedChannelId');
    var drafts = window.unbound.metro.findByProps('getDraft');
    var messages = window.unbound.metro.findByProps('sendMessage', 'editMessage');
    var Sticker = (_resolveComponent = resolveComponent(window.unbound.metro.findByFilePath(STICKER_PATH, {
        interop: false
    }))) !== null && _resolveComponent !== void 0 ? _resolveComponent : resolveComponent(window.unbound.metro.findByName('Sticker', {
        interop: false
    }));
    if (!registry || !selectedChannel || !drafts || !messages || !Sticker) {
        initializationInterval !== null && initializationInterval !== void 0 ? initializationInterval : initializationInterval = setInterval(start, 250);
        return;
    }
    if (initializationInterval) {
        clearInterval(initializationInterval);
        initializationInterval = null;
    }
    initialized = true;
    var getInput = function getInput(channelId) {
        var _ref, _ref1;
        var _registry_getBestActiveInputForChannelId, _nativeSendHandlers_get, _registry_getBestActiveInput;
        return (_ref = (_ref1 = (_registry_getBestActiveInputForChannelId = registry.getBestActiveInputForChannelId) === null || _registry_getBestActiveInputForChannelId === void 0 ? void 0 : _registry_getBestActiveInputForChannelId.call(registry, channelId)) !== null && _ref1 !== void 0 ? _ref1 : (_nativeSendHandlers_get = nativeSendHandlers.get(channelId)) === null || _nativeSendHandlers_get === void 0 ? void 0 : _nativeSendHandlers_get.input) !== null && _ref !== void 0 ? _ref : (_registry_getBestActiveInput = registry.getBestActiveInput) === null || _registry_getBestActiveInput === void 0 ? void 0 : _registry_getBestActiveInput.call(registry);
    };
    var clearComposer = function clearComposer(input) {
        var _input_setText, _input_clearText, _input_flushPendingDraftSave;
        if (!input) return;
        (_input_setText = input.setText) === null || _input_setText === void 0 ? void 0 : _input_setText.call(input, '');
        (_input_clearText = input.clearText) === null || _input_clearText === void 0 ? void 0 : _input_clearText.call(input);
        (_input_flushPendingDraftSave = input.flushPendingDraftSave) === null || _input_flushPendingDraftSave === void 0 ? void 0 : _input_flushPendingDraftSave.call(input);
    };
    var clearSticker = function clearSticker(channelId) {
        setStagedStickers(channelId, []);
        stagedChannelIds.delete(channelId);
        restoreNativeSend(channelId);
        var input = getInput(channelId);
        var text = getComposerText(channelId, input, drafts);
        updateSendButton(channelId, Boolean(text.trim()));
    };
    var sendStagedSticker = function sendStagedSticker(channelId) {
        for(var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++){
            args[_key - 1] = arguments[_key];
        }
        var _getInput_handleSend;
        var _getInput_handleSend1, _getInput;
        if (pendingSends.has(channelId)) return;
        var stickers = getStagedStickers(channelId);
        if (!stickers.length) return (_getInput = getInput(channelId)) === null || _getInput === void 0 ? void 0 : (_getInput_handleSend1 = _getInput.handleSend) === null || _getInput_handleSend1 === void 0 ? void 0 : (_getInput_handleSend = _getInput_handleSend1).call.apply(_getInput_handleSend, [
            _getInput
        ].concat(_to_consumable_array(args)));
        var input = getInput(channelId);
        var content = getComposerText(channelId, input, drafts);
        var stickerIds = stickers.map(function(sticker) {
            return String(sticker.id);
        });
        pendingSends.add(channelId);
        var result;
        try {
            result = content ? messages._sendMessage(channelId, {
                content: content,
                tts: false,
                invalidEmojis: [],
                validNonShortcutEmojis: []
            }, {
                stickerIds: stickerIds
            }) : messages.sendStickers(channelId, stickerIds);
        } catch (error) {
            pendingSends.delete(channelId);
            throw error;
        }
        setStagedStickers(channelId, []);
        var clear = function clear() {
            pendingSends.delete(channelId);
            clearComposer(input);
            clearSticker(channelId);
        };
        if (result && typeof result.then === 'function') return result.then(function(value) {
            return clear(), value;
        }, function(error) {
            pendingSends.delete(channelId);
            if (activeLifecycle === lifecycle && initialized) {
                setStagedStickers(channelId, stickers);
                stagedChannelIds.add(channelId);
                updateSendButton(channelId, true);
            }
            throw error;
        });
        clear();
        return result;
    };
    var patchInput = function patchInput(input, channelId) {
        if (!input || typeof input.handleSend !== 'function') return;
        var existing = nativeSendHandlers.get(channelId);
        if (existing && existing.input === input && input.handleSend === existing.patched) return;
        if (existing) restoreNativeSend(channelId);
        var original = input.handleSend;
        var patched = function patched() {
            for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
                args[_key] = arguments[_key];
            }
            return pendingSends.has(channelId) || getStagedStickers(channelId).length ? sendStagedSticker.apply(void 0, [
                channelId
            ].concat(_to_consumable_array(args))) : original.apply(input, args);
        };
        nativeSendHandlers.set(channelId, {
            input: input,
            original: original,
            patched: patched
        });
        input.handleSend = patched;
    };
    var stageSticker = function stageSticker(channelId, sticker, input) {
        var _activeInput_closeCustomKeyboard, _activeInput_showSideActions;
        if (!channelId || !(sticker === null || sticker === void 0 ? void 0 : sticker.id)) return;
        var existing = getStagedStickers(channelId);
        if (!existing.some(function(item) {
            return String(item.id) === String(sticker.id);
        })) {
            setStagedStickers(channelId, _to_consumable_array(existing).concat([
                sticker
            ]));
        }
        stagedChannelIds.add(channelId);
        var activeInput = input !== null && input !== void 0 ? input : getInput(channelId);
        patchInput(activeInput, channelId);
        activeInput === null || activeInput === void 0 ? void 0 : (_activeInput_closeCustomKeyboard = activeInput.closeCustomKeyboard) === null || _activeInput_closeCustomKeyboard === void 0 ? void 0 : _activeInput_closeCustomKeyboard.call(activeInput);
        activeInput === null || activeInput === void 0 ? void 0 : (_activeInput_showSideActions = activeInput.showSideActions) === null || _activeInput_showSideActions === void 0 ? void 0 : _activeInput_showSideActions.call(activeInput);
        updateSendButton(channelId, true);
    };
    clearStagedPreviews = function clearStagedPreviews() {
        var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
        try {
            for(var _iterator = stagedChannelIds[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                var channelId = _step.value;
                setStagedStickers(channelId, []);
                restoreNativeSend(channelId);
                var input = getInput(channelId);
                var text = getComposerText(channelId, input, drafts);
                updateSendButton(channelId, Boolean(text.trim()));
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
        stagedChannelIds.clear();
    };
    var pickerPatchTarget = function pickerPatchTarget(picker) {
        var target = unwrap(picker);
        if (!target) return false;
        unpatches.push(window.unbound.patcher.before(target.holder, target.prop, function(ctx) {
            var props = ctx.args[0];
            if (typeof (props === null || props === void 0 ? void 0 : props.onPressSticker) !== 'function') return;
            var original = props.onPressSticker;
            ctx.args[0] = _object_spread_props(_object_spread({}, props), {
                onPressSticker: function onPressSticker(sticker) {
                    for(var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++){
                        args[_key - 1] = arguments[_key];
                    }
                    var _ref;
                    var _props_channel;
                    var channelId = (_ref = (_props_channel = props.channel) === null || _props_channel === void 0 ? void 0 : _props_channel.id) !== null && _ref !== void 0 ? _ref : currentChannelId(selectedChannel);
                    if (!channelId) return original.apply(props, [
                        sticker
                    ].concat(_to_consumable_array(args)));
                    return stageSticker(channelId, sticker, getInput(channelId));
                }
            });
        }));
        return true;
    };
    var stickerPickerPatched = false;
    var patchStickerPicker = function patchStickerPicker() {
        if (stickerPickerPatched) return true;
        stickerPickerPatched = pickerPatchTarget(window.unbound.metro.findByFilePath(STICKER_PICKER_ROW_PATH, {
            interop: false
        }));
        if (stickerPickerPatched) return true;
        window.unbound.metro.initializeModule(STICKER_PICKER_ROW_MODULE_ID);
        stickerPickerPatched = pickerPatchTarget(window.unbound.metro.findByName('StickerPickerListRow', {
            interop: false
        }));
        return stickerPickerPatched;
    };
    var removePickerListener = window.unbound.metro.addListener(function(module) {
        var _resolveComponent;
        if (((_resolveComponent = resolveComponent(module)) === null || _resolveComponent === void 0 ? void 0 : _resolveComponent.name) === 'StickerPickerListRow') patchStickerPicker();
    });
    unpatches.push(removePickerListener);
    if (!patchStickerPicker()) {
        var pickerPatchInterval = setInterval(function() {
            if (activeLifecycle !== lifecycle || !patchStickerPicker()) return;
            clearInterval(pickerPatchInterval);
        }, 250);
        unpatches.push(function() {
            return clearInterval(pickerPatchInterval);
        });
    }
    var sendButton = unwrap(window.unbound.metro.findByFilePath(SEND_BUTTON_PATH, {
        interop: false
    }));
    if (sendButton) {
        unpatches.push(window.unbound.patcher.after(sendButton.holder, sendButton.prop, function(ctx) {
            var _ctx_args__channel, _ctx_args_;
            var channelId = (_ctx_args_ = ctx.args[0]) === null || _ctx_args_ === void 0 ? void 0 : (_ctx_args__channel = _ctx_args_.channel) === null || _ctx_args__channel === void 0 ? void 0 : _ctx_args__channel.id;
            var ref = ctx.args[1];
            if (channelId && ref) sendButtonRefs.set(channelId, ref);
            return ctx.result;
        }));
        unpatches.push(window.unbound.patcher.before(sendButton.holder, sendButton.prop, function(ctx) {
            var _props_channel;
            var props = ctx.args[0];
            var channelId = props === null || props === void 0 ? void 0 : (_props_channel = props.channel) === null || _props_channel === void 0 ? void 0 : _props_channel.id;
            if (!channelId || !getStagedStickers(channelId).length) {
                return;
            }
            ctx.args[0] = _object_spread_props(_object_spread({}, props), {
                hasPendingAttachments: true,
                requireTextContent: false,
                onSendMessage: function onSendMessage() {
                    for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
                        args[_key] = arguments[_key];
                    }
                    return sendStagedSticker.apply(void 0, [
                        channelId
                    ].concat(_to_consumable_array(args)));
                }
            });
        }));
    }
    var patchComposer = function patchComposer() {
        if (composerPatched) return true;
        var target = unwrap(window.unbound.metro.findByFilePath(FLOATING_INPUT_PATH, {
            interop: false
        }));
        if (!target) return false;
        composerPatched = true;
        unpatches.push(window.unbound.patcher.after(target.holder, target.prop, function(ctx) {
            var _ref;
            var _ctx_args__channel, _ctx_args_, _ctx_result;
            var channelId = (_ref = (_ctx_args_ = ctx.args[0]) === null || _ctx_args_ === void 0 ? void 0 : (_ctx_args__channel = _ctx_args_.channel) === null || _ctx_args__channel === void 0 ? void 0 : _ctx_args__channel.id) !== null && _ref !== void 0 ? _ref : currentChannelId(selectedChannel);
            if (!channelId || !((_ctx_result = ctx.result) === null || _ctx_result === void 0 ? void 0 : _ctx_result.props)) return ctx.result;
            var React1 = window.unbound.metro.common.React;
            var preview = React1.createElement(PendingSticker, {
                key: 'sticker-preview',
                channelId: channelId,
                clearSticker: clearSticker,
                Sticker: Sticker,
                selectedChannel: selectedChannel
            });
            return React1.cloneElement(ctx.result, {}, React1.createElement(React1.Fragment, null, ctx.result.props.children, preview));
        }));
        return true;
    };
    if (!patchComposer()) {
        var composerPatchInterval = setInterval(function() {
            if (activeLifecycle !== lifecycle || !patchComposer()) return;
            clearInterval(composerPatchInterval);
        }, 250);
        unpatches.push(function() {
            return clearInterval(composerPatchInterval);
        });
    }
}
function stop() {
    if (initializationInterval) {
        clearInterval(initializationInterval);
        initializationInterval = null;
    }
    lifecycle++;
    initialized = false;
    composerPatched = false;
    clearStagedPreviews();
    clearStagedPreviews = function clearStagedPreviews() {};
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
    try {
        for(var _iterator = unpatches.splice(0)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
            var unpatch = _step.value;
            unpatch();
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
        for(var _iterator1 = nativeSendHandlers.keys()[Symbol.iterator](), _step1; !(_iteratorNormalCompletion1 = (_step1 = _iterator1.next()).done); _iteratorNormalCompletion1 = true){
            var channelId = _step1.value;
            restoreNativeSend(channelId);
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
    pendingSends.clear();
    sendButtonRefs.clear();
}
var index = {
    start: start,
    stop: stop
};
return index;
})();return this.__plugin;},start(){const plugin=this.__load();if(plugin&&typeof plugin.start==='function')return plugin.start();},stop(){const plugin=this.__load();if(plugin&&typeof plugin.stop==='function')return plugin.stop();}})