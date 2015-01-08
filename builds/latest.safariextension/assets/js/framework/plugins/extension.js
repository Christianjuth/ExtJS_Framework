
/*!
Licence - 2015
--------------------------------
This plugin is protected by the MIT licence and is open source.
I ask you do not remove and/or modify this copyright in any way.
This plugin is built separately from the ExtJS framework/library
and therefor falls under its own licence (MIT).  ExtJS and other
contributors can not claim ownership.  All contributors agree their
work is open source and falls under this plugins licence (MIT).

https://github.com/Christianjuth/
 */

(function() {
  var id, log, name, plugin;

  plugin = {
    _info: {
      authors: ['Christian Juth'],
      name: 'Utilities',
      version: '0.1.0',
      min: '0.1.0',
      compatibility: {
        chrome: 'full',
        safari: 'partial'
      }
    },
    run: function() {
      var bkPage;
      if (ext.browser === 'chrome') {
        bkPage = chrome.extension.getBackgroundPage();
        bkPage.test = function() {
          return alert(window.message);
        };
        bkPage.test();
        return delete bkPage.test;
      }
    },
    reload: function() {
      if (ext.browser === 'chrome') {
        return chrome.runtime.reload();
      } else if (ext.browser === 'safari') {
        safari.extension.globalPage.contentWindow.reload = function() {
          window.console.clear();
          return location.reload();
        };
        return safari.extension.globalPage.contentWindow.reload();
      }
    },
    update: function() {
      if (ext.browser === 'chrome') {
        return chrome.runtime.requestUpdateCheck();
      }
    }
  };


  /*
  From the ExtJS team
  -------------------
  The code below was designed by the ExtJS team to provide useful info to the
  developers. We ask you do not change this code unless necessary. By keeping
  this standard on all plugins, we hope to make development easy by providing
  useful info to developers.  In addition to logging, the code below also
  contains the AMD function for defining the plugin.  This waits for the ExtJS
  AMD module to define the library itself, and then your plugin is defined
  which prevents any undefined errors.  Although not suggested, plugins can be
  loaded before the ExtJS library.  The functionality below assures ease of
  use. We also ask you keep this code up to date with any changes that may
  occur in the future.  Please refer to the sample plugin on the GitHub repo
  where this code is updated.
  
  https://github.com/Christianjuth/extension_framework/tree/plugin
   */

  name = plugin._info.name;

  id = name.toLowerCase().replace(/\ /g, "_");

  log = {
    error: function(msg) {
      return console.error('Ext plugin (' + name + ') says: ' + msg);
    },
    warn: function(msg) {
      return console.warn('Ext plugin (' + name + ') says: ' + msg);
    },
    info: function(msg) {
      return console.warn('Ext plugin (' + name + ') says: ' + msg);
    }
  };

  if (typeof window.define === 'function' && window.define.amd) {
    window.define(['ext'], function() {
      if ((plugin._info.min == null) || plugin._info.min <= window.ext.version) {
        return window.ext[id] = plugin;
      } else {
        return console.error('Ext plugin (' + name + ') requires ExtJS v' + plugin._info.min + '+');
      }
    });
  }

}).call(this);
