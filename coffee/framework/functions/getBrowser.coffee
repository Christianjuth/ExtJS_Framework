getBrowser : ->
  #vars
  userAgent = navigator.userAgent
  vendor =  navigator.vendor

  #check browser
  if /Chrome/.test(userAgent) and /Google Inc/.test(vendor)
    browser = 'chrome'
  else if /Safari/.test(userAgent) and /Apple Computer/.test(vendor)
    browser = 'safari'
  else if /OPR/.test(userAgent) and /Opera Software/.test(vendor)
    browser = 'chrome'
  return browser
