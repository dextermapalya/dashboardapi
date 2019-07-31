import { filter, map, uniq, maxBy } from 'lodash';
import { getHoursUntilNow } from 'utils/DateFunctions';
import { formatDate } from 'utils/DateFunctions';
import Log from 'logger-init';

const RegistrationService = {

  filterData(json, h, dt, key) {
    let data = [];
    const tmp = filter(json, {
      DATE: dt,
      Mobile: key,
      hour: h
    });

    if (tmp.length === 0) {
      return { DATE: dt, HOUR: h, Mobile: key, users: 0 }
    } else {
      // the above filter returns an array so extract the 0th element
      return tmp[0];
    }

  },

  /* transform json object into data that can be consumed by highcharts */
  transformData(jsonInput) {
    let maxH = maxBy(jsonInput, 'HOUR');
    maxH = (maxH === undefined) ? 23 : maxH.HOUR;
    const hours = getHoursUntilNow(maxH);
    // const dt = formatDate(new Date());
    let dt = jsonInput.dt_query;
    // console.log('REGISTRATION hours', hours, maxH, dt, jsonInput);

    const categories = ['mobile', 'email'];
    //let data = filter(jsonInput.data, { DATE: dt, Mobile: 'mobile' });
    let mdata = [];
    let edata = [];
    let mobile = [];
    let email = [];
    hours.forEach((h, idx) => {
      mdata.push( this.filterData(jsonInput.data, h, dt, 'mobile') ); 
      edata.push( this.filterData(jsonInput.data, h, dt, 'email') ); 
    });

    Log.debug('REGISTRATION Mobile', mdata, edata);
    // console.log('REGISTRATION data', data);
    mobile = map(mdata, 'users'); // [12, 14, 16, 18]
    email = map(edata, 'users');
    ///data = filter(jsonInput.data, { DATE: dt, Mobile: 'email' });
    ///const email = map(data, 'users'); // [12, 14, 16, 18]
    Log.debug('REGISTRATION email', mobile, email);

    // const others = map(jsonInput, 'email_Reg');
    const series = [];
    series.push({ name: 'Mobile', data: mobile });
    series.push({ name: 'Others', data: email });
    return series;
    // inspect the value
  },

};

export default RegistrationService;
