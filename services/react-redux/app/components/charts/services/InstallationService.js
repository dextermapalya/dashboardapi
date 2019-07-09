import { filter, map, uniq } from 'lodash';

const InstallationService = {

  /* transform json object into data that can be consumed by highcharts */
  transformData(jsonInput) {
    // first extract all unique keys ex that way hardcoding is avoided
    const osTypes = uniq(map(jsonInput, 'os'));
    const series = [];
    // iterate through each osType and generate hourly data
    osTypes.forEach((item, index) => {
      // filter all items that match keyword
      const data = filter(jsonInput, { os: item });

      const hourlyData = map(data, 'Installs_cnt');
      series.push({ name: item, data: hourlyData });
    });

    return series;
  },

};

export default InstallationService;
