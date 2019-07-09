import { filter, map, uniq } from 'lodash';

const RegistrationService = {

  /* transform json object into data that can be consumed by highcharts */
  transformData(jsonInput) {
    const mobile = map(jsonInput, 'Mobile_Reg'); // [12, 14, 16, 18]
    const others = map(jsonInput, 'email_Reg');
    const series = [];
    series.push({ name: 'Mobile', data: mobile });
    series.push({ name: 'Others', data: others });
    return series;
    // inspect the value
  },

};

export default RegistrationService;
