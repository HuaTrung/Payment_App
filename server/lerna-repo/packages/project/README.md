## How to run

- npm install
- npm i cross-env
- it's just a temporary fix:
    + Go to **/node_modules/react-scripts/config** then edit **webpack.config.dev.js**
    + Add 'src' in your code. Change this code
    ``` javascript
    modules: ['node_modules', paths.appNodeModules].concat(
      // It is guaranteed to exist because we tweak it in `env.js`
      process.env.NODE_PATH.split(path.delimiter).filter(Boolean)
    )
    
    to
    
    modules: ['node_modules', 'src', paths.appNodeModules].concat(
      // It is guaranteed to exist because we tweak it in `env.js`
      process.env.NODE_PATH.split(path.delimiter).filter(Boolean)
      )

