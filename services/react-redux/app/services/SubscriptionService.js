import { filter, map, uniq } from 'lodash';

const SubscriptionService = {

  /* transform json object into data that can be consumed by highcharts */
  transformData(jsonInput) {
    // first extract all unique keys ex that way hardcoding is avoided
    const paymentTypes = uniq(map(jsonInput, 'payment_method'));
    const series = [];
    // iterate through each osType and generate hourly data
    paymentTypes.forEach((item, index) => {
      // filter all items that match keyword
      const data = filter(jsonInput, { payment_method: item });

      const hourlyData = map(data, 'subs');
      series.push({ name: item, data: hourlyData });
    });

    return series;
    // inspect the value
  },

};

export default SubscriptionService;
