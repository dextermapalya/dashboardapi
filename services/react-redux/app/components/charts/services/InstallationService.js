import {filter, map, uniq} from 'lodash'

const InstallationService = {

    /* transform json object into data that can be consumed by highcharts*/
    transformData: function(jsonInput) {
        //first extract all unique keys ex that way hardcoding is avoided
        const osTypes =  uniq( map(jsonInput, 'os') )
        const series = []
        //iterate through each osType and generate hourly data
        osTypes.forEach(function(item, index) {
            //filter all items that match keyword
            var data = filter( jsonInput, { 'os': item } );

            var hourlyData = map(data, 'Installs_cnt'); 
            series.push ( {'name': item, data: hourlyData } )

        });

        return series
    },

};

export default InstallationService;