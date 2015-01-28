(function(){var a,b,c;b={silent:!1},c={browser:"",version:"0.1.0",getBrowser:function(){var a,b,c;return b=navigator.userAgent,c=navigator.vendor,/Chrome/.test(b)&&/Google Inc/.test(c)?a="chrome":/Safari/.test(b)&&/Apple Computer/.test(c)?a="safari":/OPR/.test(b)&&/Opera Software/.test(c)&&(a="chrome"),a},ini:function(d){return d=$.extend(b,d),this.browser=this.getBrowser(),window.ext._config=d,null==localStorage.options&&"chrome"===this.browser&&(localStorage.options=JSON.stringify({})),a(),$.each(c,function(a){var b,e,f,g,h,i,j;if(a=window.ext[a],g=null!=a._info?a._info.name:a,null!=a._load&&(a._load(d),delete a._load),null!=a._aliases){for(j=a._aliases,h=0,i=j.length;i>h;h++)b=j[h],null==window.ext[b]?window.ext[b]=a:(f='Ext plugin "'+g+'" can\'t define alias "'+b+'"',c._log.warn(f));delete a._aliases}return null!=a._info&&d.silent!==!0&&(e=a._info.compatibility,"none"===e.chrome?(f='Ext plugin "'+g+'" is Safari only',c._log.warn(f)):"full"!==e.chrome&&(f='Ext plugin "'+g+'" may contain some Safari only functions',c._log.warn(f)),"none"===e.safari?(f='Ext plugin "'+g+'" is Chrome only',c._log.warn(f)):"full"!==e.safari&&(f='Ext plugin "'+g+'" may contain some Chrome only functions',c._log.warn(f))),delete a._info}),window.ext},match:{url:function(a,d,e){var f,g,h,i;return b={maxLength:"*",minLength:0,ignorecase:!0,require:""},i=d,h=!1,e=$.extend(b,e),a=a.replace(/\%20/i," "),g=/^\!/.test(i),f="{ , } /?",i=i.replace(/^\!/g,""),i=c.parse.normalize(i),i=i.replace(/\$\$/g,"(\\$)"),i=i.replace(/(\$)?\?/g,function(a,b){return b?a:"[^/]"}),i=i.replace(/(\*|\$)?\*/g,function(a,b){return b?a:"([^/]+)*"}),i=i.replace(/\*\*/g,".*?"),i=i.replace(/\$\*/g,"\\*"),i=i.replace(/(\$)?{/g,function(a,b){return b?a:"("}),i=i.replace(/(\$)?}/g,function(a,b){return b?a:")"}),i=i.replace(/(\$)?,/g,function(a,b){return b?a:"|"}),f=f.replace(/\ /g,"|"),f=new RegExp("\\$(?=("+f+"))","g"),i=i.replace(f,""),i=e.ignorecase?new RegExp("^("+i+")$","gi"):new RegExp("^("+i+")$","g"),h=g?!i.test(a):i.test(a),"*"!==e.maxLength&&(h=h&&a.length<=e.maxLength),h=h&&a.length>=e.minLength,h=h&&a.contains(e.require)},text:function(a,d,e){var f,g,h,i;return b={allowSpaces:!0,maxLength:"*",minLength:0,require:"",ignorecase:!0},i=d,h=!1,e=$.extend(b,e),g=/^\!/.test(i),f="{ , } /?",i=i.replace(/^\!/g,""),i=c.parse.normalize(i),i=i.replace(/\$\$/g,"(\\$)"),i=i.replace(/(\$)?\?/g,function(a,b){return b?a:"."}),i=i.replace(/(\$)?\*/g,function(a,b){return b?a:".*?"}),i=i.replace(/\$\*/g,"\\*"),i=i.replace(/(\$)?{/g,function(a,b){return b?a:"("}),i=i.replace(/(\$)?}/g,function(a,b){return b?a:")"}),i=i.replace(/(\$)?,/g,function(a,b){return b?a:"|"}),f=f.replace(/\ /g,"|"),f=new RegExp("\\$(?=("+f+"))","g"),i=i.replace(f,""),i=e.ignorecase?new RegExp("^("+i+")$","gi"):new RegExp("^("+i+")$","g"),h=g?!i.test(a):i.test(a),e.allowSpaces||(h=h&&-1===a.indexOf(" ")),"*"!==e.maxLength&&(h=h&&a.length<=e.maxLength),h=h&&a.length>=e.minLength,h=h&&a.contains(e.require)}},menu:{setIcon:function(a){var b,d;return"chrome"===c.browser?(b={path:chrome.extension.getURL("menu-icons/"+a+"-16.png")},chrome.browserAction.setIcon(b)):"safari"===c.browser&&(d=safari.extension.baseURI+"menu-icons/"+a+"-19.png",safari.extension.toolbarItems[0].image=d),b},resetIcon:function(){var a,b;return"chrome"===c.browser?(a={path:chrome.extension.getURL("menu-icons/icon-16.png")},chrome.browserAction.setIcon(a)):"safari"===c.browser&&(b=safari.extension.baseURI+"menu-icons/icon-19.png",safari.extension.toolbarItems[0].image=b),a},click:function(a){return"chrome"===c.browser?chrome.browserAction.onClicked.addListener(function(){return a()}):"safari"===c.browser?safari.application.addEventListener("command",function(b){return"icon-clicked"===b.command?a():void 0},!1):void 0},setBadge:function(a){return a=parseInt(a),"chrome"===c.browser?(0===a&&(a=""),chrome.browserAction.setBadgeText({text:String(a)}),chrome.browserAction.setBadgeBackgroundColor({color:"#8E8E91"})):"safari"===c.browser&&(safari.extension.toolbarItems[0].badge=a),""===a&&(a=0),a},getBadge:function(a){var b;return"chrome"===c.browser&&(b=chrome.browserAction.getBadgeText({},a)),"safari"===c.browser&&(b=safari.extension.toolbarItems[0].badge),b}},options:{_aliases:["ops","opts"],_load:function(){return"chrome"===c.browser?$.ajax({url:chrome.extension.getURL("configure.json"),dataType:"json",async:!1,success:function(a){var b,d,e,f,g;for(f=a.options,g=[],d=0,e=f.length;e>d;d++)b=f[d],g.push("undefined"==typeof c.options.get(b.key)?c.options.set(b.key,b["default"]):void 0);return g}}):void 0},set:function(a,b){var d;return"chrome"===c.browser?(d=$.parseJSON(localStorage.options),d[a]=b,localStorage.options=JSON.stringify(d)):"safari"===c.browser&&(safari.extension.settings[a]=b),d[a]},get:function(a){var b,d;return"chrome"===c.browser?(b=$.parseJSON(localStorage.options),d=b[a]):"safari"===c.browser&&(d=safari.extension.settings[a]),d},reset:function(a){var b,d;return"chrome"===c.browser?(d=$.parseJSON(localStorage.options),$.ajax({url:"../../configure.json",dataType:"json",async:!1,success:function(b){return d[a]=_.filter(b.options,{key:a})[0]["default"],localStorage.options=JSON.stringify(d)}}),b=d[a]):"safari"===c.browser&&(b=safari.extension.settings.removeItem(a)),b},resetAll:function(a){return $.ajax({url:"../../configure.json",dataType:"json",async:!1,success:function(b){var d,e,f,g,h;for(g=b.options,h=[],e=0,f=g.length;f>e;e++)d=g[e],h.push(-1===a.indexOf(d.key)?c.options.reset(d.key):void 0);return h}}),c.options.dump()},dump:function(){var a;return a=[],$.ajax({url:"../../configure.json",dataType:"json",async:!1,success:function(b){var c,d,e,f,g;for(f=b.options,g=[],d=0,e=f.length;e>d;d++)c=f[d],g.push(a.push(c.key));return g}}),a}},parse:{array:function(){var a,b,c,d,e;for(c=[],a=arguments,d=0,e=a.length;e>d;d++)b=a[d],"string"==typeof b?c.push(b):c=c.concat(b);return c},id:function(a){return a.toLowerCase().replace(/\ /g,"_")},normalize:function(a){var b;return b="\\( \\) \\| \\. \\/ \\^ \\+ \\[ \\] \\- \\!",b=b.replace(/\ /g,"|"),b=new RegExp("(?=("+b+"))","g"),a=a.replace(b,"\\")}},validate:{url:function(a){return c.match.url(a,"*{://,www.,://www.,}*.**")},secureUrl:function(a){return c.match.url(a,"https://{www.,}*.**")},file:function(a,b){return null!=b?c.match.url(a,"file://**."+b):c.match.url(a,"file://**")},email:function(a){return c.match.text(a,"*@*.*",{allowSpaces:!1})},password:function(a,d){var e;return b={maxLength:12,minLength:5,require:""},e={allowSpaces:!1,ignorecase:!1},d=$.extend(b,d),$.extend(d,e),c.match.text(a,"*",d)}}},a=function(){return c._log={},c._log.info=c._config.silent!==!0?function(){return Function.prototype.bind.call(console.info,console)}():function(){},c._log.warn=c._config.silent!==!0?function(){return Function.prototype.bind.call(console.warn,console)}():function(){},c._log.error=function(){return Function.prototype.bind.call(console.error,console)}()},Array.prototype.compress=function(){var a,b;return a=this,b=[],$.each(a,function(a,c){return-1===$.inArray(c,b)?b.push(c):void 0}),b},String.prototype.compress=function(){return this.replace(/\ /g,"")},String.prototype.contains=function(a){var b,d,e,f,g,h,i;for("object"==typeof a?g=a:(g=[],g.push(a)),e=!1,h=0,i=g.length;i>h;h++)f=g[h],d=/^\!/.test(f),b="{ , } /?",f=f.replace(/^\!/g,""),f=c.parse.normalize(f),f=f.replace(/\$\$/g,"(\\$)"),f=f.replace(/(\$)?\?/g,function(a,b){return b?a:"."}),f=f.replace(/(\$)?\*/g,function(a,b){return b?a:".*?"}),f=f.replace(/\$\*/g,"\\*"),f=f.replace(/(\$)?{/g,function(a,b){return b?a:"("}),f=f.replace(/(\$)?}/g,function(a,b){return b?a:")"}),f=f.replace(/(\$)?,/g,function(a,b){return b?a:"|"}),b=b.replace(/\ /g,"|"),b=new RegExp("\\$(?=("+b+"))","g"),f=f.replace(b,"\\"),f=new RegExp("^(.*?"+f+".*?)$","gi"),e=d?!f.test(this):f.test(this);return e},window.ext=c,"function"==typeof window.define&&window.define.amd&&window.define("ext",["jquery"],function(){return window.ext})}).call(this);