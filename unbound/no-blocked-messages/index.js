({__plugin:null,__load(){if(this.__plugin)return this.__plugin;this.__plugin=(function () {
'use strict';
var unpatchCreateRow = null;
var unpatchChatManagerSetup = null;
var unpatchRowManagerGenerate = null;
var unpatchUpdatesQueueAdd = null;
function getRuntime() {
    var _root, ___unboundNoBlockedMessagesRuntime;
    var root = globalThis;
    return (___unboundNoBlockedMessagesRuntime = (_root = root).__unboundNoBlockedMessagesRuntime) !== null && ___unboundNoBlockedMessagesRuntime !== void 0 ? ___unboundNoBlockedMessagesRuntime : _root.__unboundNoBlockedMessagesRuntime = {
        chatManager: null,
        rowManager: null,
        messages: null,
        updatesQueue: null
    };
}
function refreshRows() {
    var runtime = getRuntime();
    if (!runtime.chatManager || !runtime.rowManager || !runtime.messages || !runtime.updatesQueue) return;
    runtime.chatManager.setup(runtime.messages);
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
    try {
        for(var _iterator = runtime.messages[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
            var row = _step.value;
            runtime.chatManager.createRow(runtime.rowManager.generate(row));
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
    runtime.updatesQueue.add(runtime.chatManager.createChangeset());
    runtime.updatesQueue.tryFlush();
}
function installPatches() {
    var _metro_find, _metro_find1, _metro_find2, _ChatManager_prototype, _RowManager_prototype, _ChatUpdatesQueue_prototype;
    var ChatManager = (_metro_find = window.unbound.metro.find(function(module) {
        var _module_default;
        return (module === null || module === void 0 ? void 0 : (_module_default = module.default) === null || _module_default === void 0 ? void 0 : _module_default.name) === 'ChatManager';
    })) === null || _metro_find === void 0 ? void 0 : _metro_find.default;
    var RowManager = (_metro_find1 = window.unbound.metro.find(function(module) {
        var _module_default;
        return (module === null || module === void 0 ? void 0 : (_module_default = module.default) === null || _module_default === void 0 ? void 0 : _module_default.name) === 'RowManager';
    })) === null || _metro_find1 === void 0 ? void 0 : _metro_find1.default;
    var ChatUpdatesQueue = (_metro_find2 = window.unbound.metro.find(function(module) {
        var _module_default;
        return (module === null || module === void 0 ? void 0 : (_module_default = module.default) === null || _module_default === void 0 ? void 0 : _module_default.name) === 'ChatUpdatesQueue';
    })) === null || _metro_find2 === void 0 ? void 0 : _metro_find2.default;
    var runtime = getRuntime();
    if (ChatManager === null || ChatManager === void 0 ? void 0 : (_ChatManager_prototype = ChatManager.prototype) === null || _ChatManager_prototype === void 0 ? void 0 : _ChatManager_prototype.createRow) {
        unpatchChatManagerSetup = window.unbound.patcher.before(ChatManager.prototype, 'setup', function(context) {
            runtime.chatManager = context.this;
            runtime.messages = context.args[0];
        });
        unpatchCreateRow = window.unbound.patcher.instead(ChatManager.prototype, 'createRow', function(context) {
            var _context_args_;
            if (((_context_args_ = context.args[0]) === null || _context_args_ === void 0 ? void 0 : _context_args_.type) === 2) return;
            return context.original.apply(context.this, context.args);
        });
    }
    if (RowManager === null || RowManager === void 0 ? void 0 : (_RowManager_prototype = RowManager.prototype) === null || _RowManager_prototype === void 0 ? void 0 : _RowManager_prototype.generate) {
        unpatchRowManagerGenerate = window.unbound.patcher.before(RowManager.prototype, 'generate', function(context) {
            runtime.rowManager = context.this;
        });
    }
    if (ChatUpdatesQueue === null || ChatUpdatesQueue === void 0 ? void 0 : (_ChatUpdatesQueue_prototype = ChatUpdatesQueue.prototype) === null || _ChatUpdatesQueue_prototype === void 0 ? void 0 : _ChatUpdatesQueue_prototype.add) {
        unpatchUpdatesQueueAdd = window.unbound.patcher.before(ChatUpdatesQueue.prototype, 'add', function(context) {
            runtime.updatesQueue = context.this;
        });
    }
    refreshRows();
}
function removePatches() {
    unpatchCreateRow === null || unpatchCreateRow === void 0 ? void 0 : unpatchCreateRow();
    unpatchCreateRow = null;
    refreshRows();
    unpatchChatManagerSetup === null || unpatchChatManagerSetup === void 0 ? void 0 : unpatchChatManagerSetup();
    unpatchChatManagerSetup = null;
    unpatchRowManagerGenerate === null || unpatchRowManagerGenerate === void 0 ? void 0 : unpatchRowManagerGenerate();
    unpatchRowManagerGenerate = null;
    unpatchUpdatesQueueAdd === null || unpatchUpdatesQueueAdd === void 0 ? void 0 : unpatchUpdatesQueueAdd();
    unpatchUpdatesQueueAdd = null;
}
var index = {
    start: function start() {
        installPatches();
    },
    stop: function stop() {
        removePatches();
    }
};
return index;
})();return this.__plugin;},start(context){const module=this.__load();const plugin=module?.default??module;if(plugin&&typeof plugin.start==='function')return plugin.start(context);},stop(){const module=this.__load();const plugin=module?.default??module;if(plugin&&typeof plugin.stop==='function')return plugin.stop();}})