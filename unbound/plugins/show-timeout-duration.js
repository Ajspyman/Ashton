({__plugin:null,__load(){if(this.__plugin)return this.__plugin;this.__plugin=(function () {
'use strict';
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
var REFRESH_INTERVAL = 30000;
var MARKER = 'timeout remaining';
var unpatch = null;
var refreshTimer = null;
var members = null;
var channels = null;
var dispatcher = null;
var touchedMessages = new Map();
function timeoutDeadline(value) {
    if (!value) return null;
    var timestamp = _instanceof(value, Date) ? value.getTime() : new Date(String(value)).getTime();
    return Number.isFinite(timestamp) && timestamp > Date.now() ? timestamp : null;
}
function formatRemaining(deadline) {
    var totalMinutes = Math.max(1, Math.ceil((deadline - Date.now()) / 60000));
    var days = Math.floor(totalMinutes / 1440);
    var hours = Math.floor(totalMinutes % 1440 / 60);
    var minutes = totalMinutes % 60;
    if (days > 0) return hours > 0 ? "".concat(days, "d ").concat(hours, "h") : "".concat(days, "d");
    if (hours > 0) return minutes > 0 ? "".concat(hours, "h ").concat(minutes, "m") : "".concat(hours, "h");
    return "".concat(minutes, "m");
}
function resolveDeadline(message) {
    var _channels_getChannel, _channels_getChannel1, _message_author, _members_getMember, _members_getMember1;
    var guildId = message.channel_id ? channels === null || channels === void 0 ? void 0 : (_channels_getChannel1 = channels.getChannel) === null || _channels_getChannel1 === void 0 ? void 0 : (_channels_getChannel = _channels_getChannel1.call(channels, message.channel_id)) === null || _channels_getChannel === void 0 ? void 0 : _channels_getChannel.guild_id : undefined;
    var userId = (_message_author = message.author) === null || _message_author === void 0 ? void 0 : _message_author.id;
    if (!guildId || !userId) return null;
    return timeoutDeadline(members === null || members === void 0 ? void 0 : (_members_getMember1 = members.getMember) === null || _members_getMember1 === void 0 ? void 0 : (_members_getMember = _members_getMember1.call(members, guildId, userId)) === null || _members_getMember === void 0 ? void 0 : _members_getMember.communicationDisabledUntil);
}
function refreshMessages() {
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
    try {
        for(var _iterator = touchedMessages.values()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
            var message = _step.value;
            var _dispatcher_dispatch;
            dispatcher === null || dispatcher === void 0 ? void 0 : (_dispatcher_dispatch = dispatcher.dispatch) === null || _dispatcher_dispatch === void 0 ? void 0 : _dispatcher_dispatch.call(dispatcher, {
                type: 'MESSAGE_UPDATE',
                message: _object_spread({}, message),
                log_edit: false
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
function addTimeoutDuration(row, message) {
    if (!(message === null || message === void 0 ? void 0 : message.id)) return;
    var deadline = resolveDeadline(message);
    if (!deadline) {
        touchedMessages.delete(message.id);
        return;
    }
    touchedMessages.set(message.id, message);
    if (typeof (row === null || row === void 0 ? void 0 : row.timestamp) !== 'string' || row.timestamp.includes(MARKER)) return;
    var duration = formatRemaining(deadline);
    row.timestamp = "".concat(row.timestamp, " • ").concat(duration, " ").concat(MARKER);
    if (typeof row.timestampAccessibilityLabel === 'string') {
        row.timestampAccessibilityLabel = "".concat(row.timestampAccessibilityLabel, " • Timeout expires in ").concat(duration);
    }
}
var index = {
    start: function start() {
        members = window.unbound.metro.findStore('GuildMember');
        channels = window.unbound.metro.findByProps('getChannel');
        dispatcher = window.unbound.metro.findByProps('dispatch', 'subscribe');
        var target = window.unbound.metro.findByProps('generateMessageRowData');
        if (!members || !channels || !(target === null || target === void 0 ? void 0 : target.generateMessageRowData)) return;
        unpatch = window.unbound.patcher.after(target, 'generateMessageRowData', function(ctx) {
            try {
                var _ctx_result, _ctx_args_;
                addTimeoutDuration((_ctx_result = ctx.result) === null || _ctx_result === void 0 ? void 0 : _ctx_result.message, (_ctx_args_ = ctx.args[0]) === null || _ctx_args_ === void 0 ? void 0 : _ctx_args_.message);
            } catch (unused) {}
        });
        refreshTimer = setInterval(refreshMessages, REFRESH_INTERVAL);
    },
    stop: function stop() {
        unpatch === null || unpatch === void 0 ? void 0 : unpatch();
        unpatch = null;
        if (refreshTimer) clearInterval(refreshTimer);
        refreshTimer = null;
        members = null;
        channels = null;
        dispatcher = null;
        touchedMessages.clear();
    }
};
return index;
})();return this.__plugin;},start(context){const module=this.__load();const plugin=module?.default??module;if(plugin&&typeof plugin.start==='function')return plugin.start(context);},stop(){const module=this.__load();const plugin=module?.default??module;if(plugin&&typeof plugin.stop==='function')return plugin.stop();}})