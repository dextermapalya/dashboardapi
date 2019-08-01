import {
  filter, map, uniq, maxBy, remove
} from 'lodash';
import { getHoursUntilNow } from 'utils/DateFunctions';
import Log from 'logger-init';

const SubscriptionService = {

  /* transform json object into data that can be consumed by highcharts */
  transformData(jsonInput) {

    let dt = jsonInput.dt_query;
    if (jsonInput.data) {
      Log.debug('SUBSCRIPTION TOTAL:', jsonInput.data.length, dt);
      jsonInput.data  = filter(jsonInput.data, { 'dt': dt });
      Log.debug('SUBSCRIPTION TOTAL::::', jsonInput.data.length);
    }

    // first extract all unique keys ex that way hardcoding is avoided
    const paymentTypes = uniq(map(jsonInput.data, 'payment_method'));
    const series = [];
    // iterate through each osType and generate hourly data
    let maxH = maxBy(jsonInput.data, 'HOUR');
    maxH = (maxH === undefined) ? 23 : maxH.HOUR;
    const hours = getHoursUntilNow(maxH);

    // const hours = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9,10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,23];

    paymentTypes.forEach((item, index) => {
      // filter all items that match keyword
      const data = filter(jsonInput.data, { payment_method: item });
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
        const tmp = filter(jsonInput.data, {
          payment_method: item,
          hr: h
        });
        // remove this matching row so that the next iteration will be faster
        if (tmp.length === 0) {
          hData.push({ payment_method: item, hr: h, subs: 0 });
        } else {
          // the above filter returns an array so extract the 0th element
          hData.push(tmp[0]);
          remove(jsonInput.data, { hr: tmp[0].hr, payment_method: tmp[0].payment_method });
        }
      });
      
      const hourlyData = map(hData, 'subs');
      Log.debug('SUBSCRIPTIONS +++', item, hourlyData)
      series.push({ name: item, data: hourlyData });
    });
    Log.debug('SUBSCRIPTIONS +++', series)

    return { series, hours };
    // inspect the value
  },

};

export default SubscriptionService;
