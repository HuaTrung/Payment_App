## How to run

- **npm install** to re-install all modules  
- **npm i cross-env** to set enviroment variable
- if in **node_modules** doesn't have react-scripts -> **npm install reaact-scripts**
- it's just a temporary fix:
    + Go to **/node_modules/react-scripts/config** then edit **webpack.config.dev.js**
    + Add **'src'** in your code. Change this code line **83**
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

 ## If it is the one of following errors :
 
  - Cannot find module **'webpack/lib/node/NodeTemplatePlugin'**:
    + npm remove webpack -g
    + npm i webpack --save-dev
    
  - Cannot read property **'thisCompilation'** of undefine:
    + npm remove webpack
    + npm install webpack@3.11.0
    
