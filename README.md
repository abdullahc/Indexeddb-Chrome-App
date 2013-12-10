Indexeddb-Chrome-App
====================

This is a chrome application port of the HTML5 rocks indexedDB todo list.
http://www.html5rocks.com/en/tutorials/indexeddb/todo/

Why?
--------------
- We needed an offline Chrome app, with Chromium, that will let users carry a USB drive around with persistent storage
- This should work even if adminstration rights are not available.

Typical Use case?
--------------
- Give employees a USB key to go offline, Do some work and sync up when they are back online.
- Keep a portable version of a chrome app that can keep data which you can easily query using javascript.


Components
--------------

- Chromium portable @ http://crportable.sourceforge.net/
- HTML5Rocks Todo list using indexeddb - http://www.html5rocks.com/en/tutorials/indexeddb/todo/
- Chrome apps HTML5 Storage API -https://developers.google.com/chrome/apps/docs/developers_guide#manifest



Words of Advice
--------------
**Please play around with the storage capacity parameter basde on which browser you are using**
Below is what google recommends. I found **unlimitedStorage** to be particularly helpful when designing the complete offline + portable solution

    {
  "name": "Google Mail",
  "description": "Read your gmail",
  "version": "1",
  "app": {
    "urls": [
      "*://mail.google.com/mail/",
      "*://www.google.com/mail/"
    ],
    "launch": {
      "web_url": "http://mail.google.com/mail/"
    }
  },
  "icons": {
    "128": "icon_128.png"
  },
  "permissions": [
    "unlimitedStorage",
    "notifications"
  ]
}
