# Pro tips

*Take note of the issues encountered during application development, and how to solve problems.*

## How to debug React Native app in Chrome?

- Open in Chrome: `http://localhost:8081/debugger-ui/`
- Open menu setting in emulator/device (Ctrl + D)
  - *Enable Debug JS Remotely*.
  - *Dev Settings* -> *Debug server host & port for device*, type: ip & port of emulator/machine (*10.0.3.2:8081*).
  - Run: *react-native run-android*.
- [If false] Uninstall your app in emulator/device, then run: *react-native run-android*.

## Error: *this._constructor is not a function realm*

Description

```javascript
this._constructor is not a function
handleException	@	ExceptionsManager.js:76
handleError	@	InitializeCore.js:69
reportFatalError	@	error-guard.js:42
guardedLoadModule	@	require.js:209
metroRequire	@	require.js:136
(anonymous)	@	blob:http://localhos…2c1677416b07:191032
executeApplicationScript	@	debuggerWorker.js:40
(anonymous)	@	debuggerWorker.js:65
```

Resolve

- Commented out the line 80 from "*node_modules\realm\lib\browser\index.js*"

```javascript
[80] //config = this._constructor(config);
[81] let schemas = typeof config == 'object' && config.schema;
[82] let constructors = schemas ? {} : null;
```