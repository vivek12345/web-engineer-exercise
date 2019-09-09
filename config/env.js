'use strict';

const fs = require('fs');
const path = require('path');
const paths = require('./paths');

// Make sure that including paths.js after env.js will read .env variables.
delete require.cache[require.resolve('./paths')];

const NODE_ENV = process.env.NODE_ENV;
if (!NODE_ENV) {
  throw new Error('The NODE_ENV environment variable is required but was not specified.');
}

var dotenvFile = `${paths.dotenv}/properties.env`;

if (NODE_ENV === 'test') {
  dotenvFile = `${paths.dotenv}/properties.sample.env`;
}
if (fs.existsSync(dotenvFile)) {
  require('dotenv-expand')(
    require('dotenv').config({
      path: dotenvFile
    })
  );
}

// We support resolving modules according to `NODE_PATH`.
// This lets you use absolute paths in imports inside large monorepos:
// https://github.com/facebookincubator/create-react-app/issues/253.
// It works similar to `NODE_PATH` in Node itself:
// https://nodejs.org/api/modules.html#modules_loading_from_the_global_folders
// Note that unlike in Node, only *relative* paths from `NODE_PATH` are honored.
// Otherwise, we risk importing Node.js core modules into an app instead of Webpack shims.
// https://github.com/facebookincubator/create-react-app/issues/1023#issuecomment-265344421
// We also resolve them to make sure all tools using them work consistently.
const appDirectory = fs.realpathSync(process.cwd());
process.env.NODE_PATH = (process.env.NODE_PATH || '')
  .split(path.delimiter)
  .filter(folder => folder && !path.isAbsolute(folder))
  .map(folder => path.resolve(appDirectory, folder))
  .join(path.delimiter);

// Grab NODE_ENV and REACT_APP_* environment variables and prepare them to be
// injected into the application via DefinePlugin in Webpack configuration.
const FI_APP = /^REACT_APP_/i;

function getClientEnvironment(publicUrl) {
  const raw = Object.keys(process.env)
    .filter(key => FI_APP.test(key))
    .reduce(
      (env, key) => {
        env[key] = process.env[key];
        return env;
      },
      {
        // Useful for determining whether we’re running in production mode.
        // Most importantly, it switches React into the correct mode.
        NODE_ENV: process.env.NODE_ENV || 'development',
        // Useful for resolving the correct path to static assets in `public`.
        // For example, <img src={process.env.PUBLIC_URL + '/img/logo.png'} />.
        // This should only be used as an escape hatch. Normally you would put
        // images into the `src` and `import` them in code to get their paths.
        PUBLIC_URL: process.env.DASHBOARD_APP_PUBLIC_URL || publicUrl,
        S3_CSS_FILE_URL: process.env.NODE_ENV === 'production' ? process.env.REACT_APP_S3_CSS_FILE_URL : publicUrl,
        S3_FOLDER_URL: process.env.NODE_ENV === 'production' ? process.env.S3_FOLDER_URL : publicUrl,
        CONFIG_FOLDER_URL: process.env.NODE_ENV === 'production' ? process.env.CONFIG_FOLDER_URL : publicUrl,
        CLIENT_CODE: process.env.CLIENT_CODE,
        SENTRY_DSN: process.env.SENTRY_DSN,
        DEFAULT_LANGUAGE: process.env.DEFAULT_LANGUAGE,
        ASSETS_PATH: process.env.ASSETS_PATH,
        ENABLE_DRAFT_MODE: process.env.ENABLE_DRAFT_MODE,
        HIDE_T_AND_C: process.env.HIDE_T_AND_C
      }
    );
  // Stringify all values so we can feed into Webpack DefinePlugin
  const stringified = {
    'process.env': Object.keys(raw).reduce((env, key) => {
      env[key] = JSON.stringify(raw[key]);
      return env;
    }, {})
  };

  return { raw, stringified };
}

module.exports = getClientEnvironment;
