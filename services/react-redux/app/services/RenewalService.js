import {filter, map, uniq} from 'lodash'

const Renewalervice = {

    /* transform json object into data that can be consumed by highcharts*/
    transformData: function(jsonInput) {
        //first extract all unique keys ex that way hardcoding is avoided
        const paymentTypes =  uniq( map(jsonInput, 'payment_method') )
        const series = []
        //iterate through each osType and generate hourly data
        paymentTypes.forEach(function(item, index) {
            //filter all items that match keyword
            var data = filter( jsonInput, { 'payment_method': item } );

            var hourlyData = map(data, 'Renewals'); 
            series.push ( {'name': item, data: hourlyData } )

        });

        return series
        //inspect the value
    },

};

export default Renewalervice;