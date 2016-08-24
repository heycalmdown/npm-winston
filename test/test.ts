import test = require('blue-tape');

import * as winston from 'winston';

// module augment for custom level log
// https://github.com/winstonjs/winston#using-custom-logging-levels
// https://github.com/Microsoft/TypeScript/issues/7545
declare module 'winston' {
  interface LoggerInstance {
    yay: winston.LeveledLogMethod;
  }
}

test('simple test', (t) => {
  winston.debug('haha', {meta: 'data'});
  const logger = new winston.Logger({
    levels: {yay: 0, haha: 1, hoho: 2},
    transports: [
      new (winston.transports.Console)()
    ]
  });
  logger.yay('yay!');
  t.equal(winston.config.cli.levels.error, 0);
  t.equal(winston.config.npm.levels.error, 0);
  t.equal(winston.config.syslog.levels.emerg, 0);
  t.end();
});
