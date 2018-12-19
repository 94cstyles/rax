const runSequence = require('run-sequence');
const { join } = require('path');
const { getAppConfig } = require('../config/getAppConfig');
const { registerGulpTasks } = require('./tasks');

const { BUILD_DEST } = process.env;

module.exports = function(opts) {
  const { projectDir, publicPath, isDebug } = opts;
  registerGulpTasks({
    appConfig: getAppConfig(projectDir),
    projectDir,
    destDir: join(projectDir, BUILD_DEST || 'build'),
    publicPath,
    isDebug
  });

  runSequence(
    'clean',
    'ensure-dir',
    [
      'build-config',
      'build-app',
      'build-schema',
      'build-mod-meta',
      'collect-assets',
      'build-include-files',
    ],
    'bundle',
    'build-web',
  );
};
