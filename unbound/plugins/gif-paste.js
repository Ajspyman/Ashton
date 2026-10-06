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
var pendingGifReplies = new Set();
var unpatchSend = null;
var unpatchReply = null;
function isGifPickerSelection(args) {
    var _args = _sliced_to_array(args, 4), channelId = _args[0], message = _args[1], metadata = _args[3];
    return typeof channelId === 'string' && !!message && (typeof message === "undefined" ? "undefined" : _type_of(message)) === 'object' && typeof message.content === 'string' && !!metadata && (typeof metadata === "undefined" ? "undefined" : _type_of(metadata)) === 'object' && metadata.location === 'gif_reply';
}
function start() {
    var messages = window.unbound.metro.findByProps('sendMessage', 'editMessage');
    if (typeof (messages === null || messages === void 0 ? void 0 : messages.sendMessage) !== 'function') return;
    var replies = window.unbound.metro.findByProps('deletePendingReply');
    var replyStore = window.unbound.metro.findByProps('getPendingReply');
    if (typeof (replies === null || replies === void 0 ? void 0 : replies.deletePendingReply) !== 'function') return;
    if (typeof (replyStore === null || replyStore === void 0 ? void 0 : replyStore.getPendingReply) !== 'function') return;
    unpatchReply = window.unbound.patcher.instead(replies, 'deletePendingReply', function(ctx) {
        var _ctx_args = _sliced_to_array(ctx.args, 1), channelId = _ctx_args[0];
        if (typeof channelId === 'string' && pendingGifReplies.delete(channelId)) return;
        return ctx.original.apply(ctx.this, ctx.args);
    });
    unpatchSend = window.unbound.patcher.instead(messages, 'sendMessage', function(ctx) {
        var _registry_getBestActiveInputForChannelId, _input_closeCustomKeyboard, _replyStore_getPendingReply;
        if (!isGifPickerSelection(ctx.args)) return ctx.original.apply(ctx.this, ctx.args);
        var _ctx_args = _sliced_to_array(ctx.args, 2), channelId = _ctx_args[0], message = _ctx_args[1];
        var registry = window.unbound.metro.findByProps('getBestActiveInputForChannelId');
        var input = registry === null || registry === void 0 ? void 0 : (_registry_getBestActiveInputForChannelId = registry.getBestActiveInputForChannelId) === null || _registry_getBestActiveInputForChannelId === void 0 ? void 0 : _registry_getBestActiveInputForChannelId.call(registry, channelId);
        if (typeof (input === null || input === void 0 ? void 0 : input.insertText) !== 'function') return ctx.original.apply(ctx.this, ctx.args);
        input.insertText("".concat(message.content, " "));
        (_input_closeCustomKeyboard = input.closeCustomKeyboard) === null || _input_closeCustomKeyboard === void 0 ? void 0 : _input_closeCustomKeyboard.call(input);
        if ((_replyStore_getPendingReply = replyStore.getPendingReply) === null || _replyStore_getPendingReply === void 0 ? void 0 : _replyStore_getPendingReply.call(replyStore, channelId)) {
            pendingGifReplies.add(channelId);
            Promise.resolve().then(function() {
                return pendingGifReplies.delete(channelId);
            });
        }
    });
}
function stop() {
    unpatchSend === null || unpatchSend === void 0 ? void 0 : unpatchSend();
    unpatchReply === null || unpatchReply === void 0 ? void 0 : unpatchReply();
    unpatchSend = null;
    unpatchReply = null;
    pendingGifReplies.clear();
}
var index = {
    start: start,
    stop: stop
};
return index;
})();return this.__plugin;},start(context){const module=this.__load();const plugin=module?.default??module;if(plugin&&typeof plugin.start==='function')return plugin.start(context);},stop(){const module=this.__load();const plugin=module?.default??module;if(plugin&&typeof plugin.stop==='function')return plugin.stop();}})