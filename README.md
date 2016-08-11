# laxar-developer-tools-web-extension

The laxar-developer-tools-web-extension is a browser extension which helps to develop LaxarJS applications.
It adds an additional tab to the developer tools that displays application events, helps visualizing the structure of the current page, and allows to browse log messages of the running LaxarJS application.


## Develop

To use the developer version of the laxar-developer-tools-widget modify the `createPanel.js`:
`"laxar-developer-tools-widget/content/index.html",` to    `"laxar-developer-tools-widget/content/debug.html",` and follow the instruction in the
[README](https://github.com/LaxarJS/ax-developer-tools-widget) of the widget.


Hint: Open developer console with `F12`, undock the console and then open the developer console for the extension with `Strg+Shift+J`
