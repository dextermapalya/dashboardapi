import {
  filter, map, uniq, maxBy
} from 'lodash';
import { getHoursUntilNow } from 'utils/DateFunctions';

const RenewalService = {

  /* transform json object into data that can be consumed by highcharts */
  transformData(jsonInput) {
    // first extract all unique keys ex that way hardcoding is avoided
    const paymentTypes = uniq(map(jsonInput, 'payment_method'));
    const series = [];
    let maxH = maxBy(jsonInput, 'HOUR');
    maxH = (maxH === undefined) ? 23 : maxH.HOUR;
    const hours = getHoursUntilNow(maxH);

    // const hours = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9,10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,23];

    paymentTypes.forEach((item, index) => {
      // filter all items that match keyword
      const data = filter(jsonInput, { payment_method: item });
      console.log('FILTER', data);
      const hData = [];
      /* The bar chart will display inaccurate results because it expects
        all payment types to contain equal number of values for each of the time slots
        assuming the time slots are midnight, 1am, 2am, 3am, 4am [0,1,2,3,4]
        ex: Paytm [15,20,25,30,19]
            Credit Cart [1,9,11]
            Debit card [8,7]

            The above data will display an inaccurate graph, this must be fixed by
            inserting a zero at the given time slot
        ex: Paytm [15,20,25,30,19]
            Credit Cart [1,9,0,11,0]
            Debit card [8,0,7,0,0]
        */

      /* iterate through each hour from 0 to 23 hours and check if there is any data
        otherwise insert a zero */
      hours.forEach((h, idx) => {
        const tmp = filter(jsonInput, {
          payment_method: item,
          HOUR: h
        });
        if (tmp.length === 0) {
          hData.push({ payment_method: item, HOUR: h, Renewals: 0 });
        } else {
          // the above filter returns an array so extract the 0th element
          hData.push(tmp[0]);
        }
      });
      const hourlyData = map(hData, 'Renewals');
      series.push({ name: item, data: hourlyData });
    });

    // iterate through each osType and generate hourly data
    /* paymentTypes.forEach((item, index) => {
      // filter all items that match keyword
      const data = filter(jsonInput, { payment_method: item });

      const hourlyData = map(data, 'Renewals');
      series.push({ name: item, data: hourlyData });
    }); */

    return { series, hours };
    // inspect the value
  },

};

export default RenewalService;
