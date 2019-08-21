import Log from 'logger-init';

const ApperrorService = {
  /* transform json object into data that can be consumed by highcharts */
  transformData(jsonInput) {
    if (jsonInput.data === undefined) {
      return [];
    }

    Log.info('APP_ERRORS service', jsonInput);
    if (jsonInput.data) {
      Log.debug('APP_ERRORS:', jsonInput.data);
    }

    const pie = [
      { name: 'Sign In/Up', y: jsonInput.data.sign_in_up },
      { name: 'Forgot Password', y: jsonInput.data.forgot_password },
      { name: 'Not able to subscribe', y: jsonInput.data.subscription },
      { name: 'Playback Error', y: jsonInput.data.playback },
      { name: 'App launch issue', y: jsonInput.data.applaunch },
    ];

    Log.debug('APP_ERRORS', pie);

    return [{ data: pie }];
  }
};

export default ApperrorService;
