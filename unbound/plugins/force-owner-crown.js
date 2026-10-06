({__plugin:null,__load(){if(this.__plugin)return this.__plugin;this.__plugin=(function () {
'use strict';
function resolveCrownSource(id, resolveAssetSource, getAssetUri) {
    var assetUri = getAssetUri(id);
    if (typeof assetUri === 'string' && assetUri.length > 0) return assetUri;
    var resolved = resolveAssetSource(id);
    if (typeof (resolved === null || resolved === void 0 ? void 0 : resolved.uri) === 'string' && resolved.uri.length > 0) return resolved.uri;
    return id;
}var CROWN_ASSET = 'ic_crown_16px';
var CROWN_LABEL = 'Server Owner';
var unpatch = null;
var assetUriResolver = null;
function getCrownSource() {
    var id = window.unbound.assets.getIDByName(CROWN_ASSET);
    if (id == null) return null;
    if (!assetUriResolver) assetUriResolver = window.unbound.metro.findByProps('getAssetUriForEmbed');
    return resolveCrownSource(id, function(assetId) {
        return window.unbound.metro.common.ReactNative.Image.resolveAssetSource(assetId);
    }, function(assetId) {
        var _assetUriResolver_getAssetUriForEmbed;
        return assetUriResolver === null || assetUriResolver === void 0 ? void 0 : (_assetUriResolver_getAssetUriForEmbed = assetUriResolver.getAssetUriForEmbed) === null || _assetUriResolver_getAssetUriForEmbed === void 0 ? void 0 : _assetUriResolver_getAssetUriForEmbed.call(assetUriResolver, assetId);
    });
}
function isGuildOwner(guildId, userId) {
    var _guilds_getGuild, _guilds_getGuild1;
    if (!guildId || !userId) return false;
    var guilds = window.unbound.metro.findStore('Guild');
    return (guilds === null || guilds === void 0 ? void 0 : (_guilds_getGuild1 = guilds.getGuild) === null || _guilds_getGuild1 === void 0 ? void 0 : (_guilds_getGuild = _guilds_getGuild1.call(guilds, guildId)) === null || _guilds_getGuild === void 0 ? void 0 : _guilds_getGuild.ownerId) === userId;
}
function applyCrown(rowMessage) {
    if (!rowMessage || rowMessage.roleIcon) return;
    if (!isGuildOwner(rowMessage.guildId, rowMessage.authorId)) return;
    var crownSource = getCrownSource();
    if (crownSource == null) return;
    rowMessage.roleIcon = {
        source: crownSource,
        name: CROWN_LABEL,
        size: 18,
        alt: CROWN_LABEL
    };
}
var index = {
    start: function start() {
        var target = window.unbound.metro.findByProps('generateMessageRowData');
        if (typeof (target === null || target === void 0 ? void 0 : target.generateMessageRowData) !== 'function') return;
        unpatch = window.unbound.patcher.after(target, 'generateMessageRowData', function(ctx) {
            try {
                var _ctx_result;
                applyCrown((_ctx_result = ctx.result) === null || _ctx_result === void 0 ? void 0 : _ctx_result.message);
            } catch (unused) {}
        });
    },
    stop: function stop() {
        unpatch === null || unpatch === void 0 ? void 0 : unpatch();
        unpatch = null;
        assetUriResolver = null;
    }
};
return index;
})();return this.__plugin;},start(context){const module=this.__load();const plugin=module?.default??module;if(plugin&&typeof plugin.start==='function')return plugin.start(context);},stop(){const module=this.__load();const plugin=module?.default??module;if(plugin&&typeof plugin.stop==='function')return plugin.stop();}})