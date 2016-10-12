# laxar-developer-tools-web-extension

The laxar-developer-tools-web-extension is a browser extension which helps to develop LaxarJS applications.
It adds an additional tab to the developer tools that displays application events, helps visualizing the structure of the current page, and allows to browse log messages of the running LaxarJS application.


## Develop

To use the developer version of the laxar-developer-tools-widget modify the `WIDGET_CONTENT_PATH` in the file `createPanel.js` from `'laxar-developer-tools-widget/content/index.html'` to `'laxar-developer-tools-widget/content/debug.html'` and follow the instruction in the
[README](https://github.com/LaxarJS/ax-developer-tools-widget) of the widget.

Hint: Open developer console with `F12`, undock the console and then open the developer console for the extension with `Strg+Shift+J`


## Create Extension Package

To build the extension clean the dist folder at first:
```
grunt clean-dist
```

Copy the widget to the dist folder:
```
grunt copy-widget
```

Install node modules and create dist version of the widget:
```
cd dist/laxar-developer-tools-web-extension/laxar-developer-tools-widget/content
npm install
grunt dist-without-optimize
cd ../../../../
```

Create dist version of extension:
```
grunt dist
```

Create extension package:
```
cd dist
google-chrome --pack-extension=laxar-developer-tools-web-extension --pack-extension-key=[extension_key]
```
