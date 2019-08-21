/* const Log = require('js-logger');
export default Log */

const Log = require('js-logger');

Log.useDefaults();
if (process.env.NODE_ENV === 'production') {
  Log.setLevel(Log.OFF);
}

export default Log;
