import
{
  filter, map, uniq, maxBy, remove
} from 'lodash';

import { getHoursUntilNow, formatDate } from 'utils/DateFunctions';
import Log from 'logger-init';

const RegistrationService = {

  // filterData(json, h, dt, key) {
  //   const data = [];
  //   const tmp = filter(json, {
  //     DATE: dt,
  //     mobile: key,
  //     hour: h
  //   });

  //   if (tmp.length === 0) {
  //     return
  //     {DATE: dt, hour: h, mobile: key, users: 0 };
  //   } else {
  //     // the above filter returns an array so extract the 0th element
  //     return tmp[0];
  //   }

  // },

  /* transform json object into data that can be consumed by highcharts */
  transformData(jsonInput) {
    const dt = jsonInput.dt_query;
    if (jsonInput.data) {
      Log.debug('REGISTRATIONS TOTAL:', jsonInput.data.length);
      jsonInput.data = filter(jsonInput.data, { DATE: dt });
      Log.debug('REGISTRATIONS TOTAL::::', jsonInput.data.length);
    }

    let maxH = maxBy(jsonInput.data, 'hour');
    maxH = (maxH === undefined) ? 23 : maxH.hour;
    const hours = getHoursUntilNow(maxH);
    const series = [];
    // const dt = formatDate(new Date());

    const deviceTypes = uniq(map(jsonInput.data, 'mobile'));
    const deviceData = [];
    deviceTypes.forEach((item, index) => {
      deviceData[item] = []; // init a multi dimensional array for every OS
    });

    // const tmpObj = {};

    // console.log('REGISTRATION hours', hours, maxH, dt, jsonInput);
    deviceTypes.forEach((item, index) => {
      const hData = [];

      hours.forEach((h, idx) => {
        const tmp = filter(jsonInput.data, {
          DATE: dt,
          mobile: item,
          hour: h
        });
        // remove this matching row so that the next iteration will be faster
        if (tmp.length === 0) {
          hData.push({
            DATE: dt, hr: h, users: 0, mobile: item
          });
        } else {
          // the above filter returns an array so extract the 0th element
          hData.push(tmp[0]);
          remove(jsonInput.data, { hr: tmp[0].hr, mobile: tmp[0].mobile });
        }
      });

      const hourlyData = map(hData, 'users');
      Log.debug('REGISTRATIONS +++', item, hourlyData);
      series.push({ name: item, data: hourlyData });
      Log.debug('REGISTRATIONS ___', series);
    });

    return { series, hours };
  },

};

export default RegistrationService;
