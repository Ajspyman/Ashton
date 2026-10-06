({__plugin:null,__load(){if(this.__plugin)return this.__plugin;this.__plugin=(function () {
'use strict';
var defaultRules = [
    'action_object_map',
    'action_type_map',
    'action_ref_map',
    'spm@*.aliexpress.com',
    'scm@*.aliexpress.com',
    'aff_platform',
    'aff_trace_key',
    'algo_expid@*.aliexpress.*',
    'algo_pvid@*.aliexpress.*',
    'btsid',
    'ws_ab_test',
    'pd_rd_*@amazon.*',
    '_encoding@amazon.*',
    'psc@amazon.*',
    'tag@amazon.*',
    'ref_@amazon.*',
    'pf_rd_*@amazon.*',
    'pf@amazon.*',
    'crid@amazon.*',
    'keywords@amazon.*',
    'sprefix@amazon.*',
    'sr@amazon.*',
    'ie@amazon.*',
    'node@amazon.*',
    'qid@amazon.*',
    'callback@bilibili.com',
    'cvid@bing.com',
    'form@bing.com',
    'sk@bing.com',
    'sp@bing.com',
    'sc@bing.com',
    'qs@bing.com',
    'pq@bing.com',
    'sc_cid',
    'mkt_tok',
    'trk',
    'trkCampaign',
    'ga_*',
    'gclid',
    'gclsrc',
    'hmb_campaign',
    'hmb_medium',
    'hmb_source',
    'spReportId',
    'spJobID',
    'spUserID',
    'spMailingID',
    'itm_*',
    's_cid',
    'elqTrackId',
    'elqTrack',
    'assetType',
    'assetId',
    'recipientId',
    'campaignId',
    'siteId',
    'mc_cid',
    'mc_eid',
    'pk_*',
    'sc_campaign',
    'sc_channel',
    'sc_content',
    'sc_medium',
    'sc_outcome',
    'sc_geo',
    'sc_country',
    'nr_email_referer',
    'vero_conv',
    'vero_id',
    'yclid',
    '_openstat',
    'mbid',
    'cmpid',
    'cid',
    'c_id',
    'campaign_id',
    'Campaign',
    'hash@ebay.*',
    'fb_action_ids',
    'fb_action_types',
    'fb_ref',
    'fb_source',
    'fbclid',
    'refsrc@facebook.com',
    'hrc@facebook.com',
    'gs_l',
    'gs_lcp@google.*',
    'ved@google.*',
    'ei@google.*',
    'sei@google.*',
    'gws_rd@google.*',
    'gs_gbg@google.*',
    'gs_mss@google.*',
    'gs_rn@google.*',
    '_hsenc',
    '_hsmi',
    '__hssc',
    '__hstc',
    'hsCtaTracking',
    'source@sourceforge.net',
    'position@sourceforge.net',
    't@*.twitter.com',
    's@*.twitter.com',
    'ref_*@*.twitter.com',
    'tt_medium',
    'tt_content',
    'lr@yandex.*',
    'redircnt@yandex.*',
    'feature@youtube.com',
    'kw@youtube.com',
    'si@youtu.be',
    'wt_zmc',
    'utm_source',
    'utm_content',
    'utm_medium',
    'utm_campaign',
    'utm_term',
    'si@open.spotify.com',
    'igsh',
    'igshid',
    'share_id@reddit.com'
];function _instanceof(left, right) {
    "@swc/helpers - instanceof";
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
        return !!right[Symbol.hasInstance](left);
    } else return left instanceof right;
}
function _type_of(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
var unpatches = [];
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
var reHasRegExpChar = RegExp(reRegExpChar.source);
function escapeRegExp(str) {
    return str && reHasRegExpChar.test(str) ? str.replace(reRegExpChar, '\\$&') : str || '';
}
var universalRules = new Set();
var rulesByHost = new Map();
var hostRules = new Map();
function createRules() {
    universalRules = new Set();
    rulesByHost = new Map();
    hostRules = new Map();
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
    try {
        for(var _iterator = defaultRules[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
            var rule = _step.value;
            var splitRule = rule.split('@');
            var paramRule = new RegExp("^".concat(escapeRegExp(splitRule[0]).replace(/\\\*/, '.+?'), "$"));
            if (!splitRule[1]) {
                universalRules.add(paramRule);
                continue;
            }
            var hostRule = new RegExp("^(www\\.)?".concat(escapeRegExp(splitRule[1]).replace(/\\\./, '\\.').replace(/^\\\*\\\./, '(.+?\\.)?').replace(/\\\*/, '.+?'), "$"));
            var hostRuleIndex = hostRule.toString();
            hostRules.set(hostRuleIndex, hostRule);
            if (!rulesByHost.get(hostRuleIndex)) rulesByHost.set(hostRuleIndex, new Set());
            rulesByHost.get(hostRuleIndex).add(paramRule);
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
function removeParam(rule, param, parent) {
    if (param === rule || _instanceof(rule, RegExp) && rule.test(param)) {
        parent.delete(param);
    }
}
function replacer(match) {
    var url;
    try {
        url = new URL(match);
    } catch (unused) {
        return match;
    }
    if (url.searchParams.entries().next().done) return match;
    universalRules.forEach(function(rule) {
        url.searchParams.forEach(function(_value, param, parent) {
            return removeParam(rule, param, parent);
        });
    });
    hostRules.forEach(function(regex, hostRuleName) {
        if (!regex.test(url.hostname)) return;
        rulesByHost.get(hostRuleName).forEach(function(rule) {
            url.searchParams.forEach(function(_value, param, parent) {
                return removeParam(rule, param, parent);
            });
        });
    });
    return url.toString();
}
function clean(content) {
    if (!content || !/https?:\/\//.test(content)) return content;
    return content.replace(/(https?:\/\/[^\s<]+[^<.,:;"'>)|\]\s])/g, function(match) {
        return replacer(match);
    });
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
function getMessageActions() {
    return window.unbound.metro.findByProps('sendMessage', 'editMessage');
}
var index = {
    start: function start() {
        createRules();
        var MessageActions = getMessageActions();
        if (!MessageActions) return;
        var clean_ = function clean_(ctx) {
            var message = findMessageArg(ctx.args);
            if (message && typeof message.content === 'string') {
                message.content = clean(message.content);
            }
        };
        if (typeof MessageActions.sendMessage === 'function') {
            unpatches.push(window.unbound.patcher.before(MessageActions, 'sendMessage', clean_));
        }
        if (typeof MessageActions.editMessage === 'function') {
            unpatches.push(window.unbound.patcher.before(MessageActions, 'editMessage', clean_));
        }
    },
    stop: function stop() {
        while(unpatches.length)unpatches.pop()();
    }
};
return index;
})();return this.__plugin;},start(context){const module=this.__load();const plugin=module?.default??module;if(plugin&&typeof plugin.start==='function')return plugin.start(context);},stop(){const module=this.__load();const plugin=module?.default??module;if(plugin&&typeof plugin.stop==='function')return plugin.stop();}})