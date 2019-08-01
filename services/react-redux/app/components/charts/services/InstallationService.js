import { filter, map, uniq, remove, maxBy } from 'lodash';
import { getHoursUntilNow } from 'utils/DateFunctions';
import Log from 'logger-init';

const InstallationService = {


  filterData(json, h, key) {
    let data = [];
    const tmp = filter(json, {
      os: key,
      hr: h
    });

    if (tmp.length === 0) {
      return { hr: h, os: key, install_cnt: 0 };
    }

    // the above filter returns an array so extract the 0th element
    return tmp[0];
  },

  /* transform json object into data that can be consumed by highcharts */
  transformData(jsonInput) {

    let dt = jsonInput.dt_query;
    if (jsonInput.data) {
      Log.debug('INSTALLATION TOTAL:', jsonInput.data.length, dt);
      jsonInput.data  = filter(jsonInput.data, { 'dt': dt });
      Log.debug('INSTALLATION TOTAL::::', jsonInput.data.length);
    }

    let maxH = maxBy(jsonInput.data, 'hr');
    maxH = (maxH === undefined) ? 23 : maxH.HOUR;
    const hours = getHoursUntilNow(maxH);
    // first extract all unique keys ex that way hardcoding is avoided
    const osTypes = uniq(map(jsonInput.data, 'os'));
    const series = [];
    // iterate through each osType and generate hourly data
    const osData = []; // multi dimensional array
    osTypes.forEach((item, index) => {
      osData[item] = []; // init a multi dimensional array for every OS
    });
    let tmpObj = {};

    osTypes.forEach((item, index) => {
      hours.forEach((h, idx) => {
        tmpObj = this.filterData(jsonInput.data, h, item);
        // remove this matching row so that the next iteration will be faster
        remove(jsonInput, { hr: tmpObj.hr, os: tmpObj.os });
        // jsonInput.remove(e => e === tmpObj);
        osData[item].push(tmpObj);
      });
    });
    let tmp;
    osTypes.forEach((item, index) => {
      tmp = map(osData[item], 'install_cnt'); // [12, 14, 16, 18]
      series.push({ name: item, data: tmp });
    });

    return { series, hours };

  },

};

export default InstallationService;
