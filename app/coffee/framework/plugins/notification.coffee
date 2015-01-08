###!
Licence - 2015
--------------------------------
This plugin is protected by the MIT licence and is open source.
I ask you do not remove and/or modify this copyright in any way.
This plugin is built separately from the ExtJS framework/library
and therefor falls under its own licence (MIT).  ExtJS and other
contributors can not claim ownership.  All contributors agree their
work is open source and falls under this plugins licence (MIT).

https://github.com/Christianjuth/
###

#define local copy of plugin
plugin = {

  #define plugin info object
  _info :
    authors : ['Christian Juth']
    name : 'Notification'
    version : '0.1.0'
    min : '0.1.0'
    compatibility :
      chrome : 'full'
      safari : 'full'
    github : ''

  #define plugin aliases
  _aliases : ['noti']

  #functions
  basic : (title,content) ->
    if ext.browser is 'chrome'
      chrome.notifications.create '', {
        iconUrl : chrome.extension.getURL('icon-128.png')
        type: 'basic'
        title:title
        message: content
      }, () ->
    else if ext.browser is 'safari'
      new Notification(title,{body : content})

  delay : (title,content,milliseconds) ->
    if 50000 < parseInt milliseconds
      log.error 'timeout too long'
    else
      setTimeout ->
        if ext.browser is 'chrome'
          chrome.notifications.create '', {
            iconUrl : chrome.extension.getURL('icon-128.png')
            type: 'basic'
            title:title
            message: content
          }, () ->
        else if ext.browser is 'safari'
          new Notification(title,{body : content})
      ,milliseconds
}


###
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
###
name = plugin._info.name
id = name.toLowerCase().replace(/\ /g,"_")
#console logging
log = {
  error : (msg) -> console.error 'Ext plugin (' + name + ') says: ' + msg
  warn : (msg) -> console.warn 'Ext plugin (' + name + ') says: ' + msg
  info : (msg) -> console.warn 'Ext plugin (' + name + ') says: ' + msg
}
#setup AMD support if browser supports the AMD define function
if typeof window.define is 'function' && window.define.amd
  window.define ['ext'], ->
    #load ExtJS meets version requirements
    if !plugin._info.min? or plugin._info.min <= window.ext.version
      window.ext[id] = plugin
    else
      console.error 'Ext plugin ('+name+') requires ExtJS v'+plugin._info.min+'+'
