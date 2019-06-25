/*var temp = new Date();
temp.toUTCString();
//var min = new Date( temp.getUTCFullYear(), temp.getUTCMonth(), temp.getUTCDate(), temp.getUTCHours(), temp.getUTCMinutes(), temp.getUTCSeconds() );
min: Date.UTC(temp.getUTCFullYear(), temp.getUTCMonth(), temp.getUTCDate(), 0, 0, 0),
max: Date.UTC(temp.getUTCDate(), temp.getUTCMonth(), temp.getUTCDate(), 0, 0, 0),
*/
const hours = [12,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]

const RegistrationOptions = {
    chart: {
        scrollablePlotArea: {
            minWidth: 700
        }
    },
  
    data: [],
  
    title: {
        text: 'Registrations - Hourly'
    },
  
    subtitle: {
        text: 'Source: SUNNXT API'
    },
  

    xAxisaa: {
        title: {
          text: "Time"
        },
        //tickInterval: 7 * 24 * 3600 * 1000, // one week
        tickWidth: 0,
        gridLineWidth: 1,
        labels: {
            align: 'left',
            x: 3,
            y: -3
        }
    },
    xAxis: {
        title: {
            text: "Time"
        },
        categories: hours
     },

    yAxis: [{ // left y axis
        title: {
            text: "Users"
        },
        labels: {
            align: 'left',
            x: 3,
            y: 16,
            format: '{value:.,0f}'
        },
        showFirstLabel: false
    }, { // right y axis
        linkedTo: 0,
        gridLineWidth: 0,
        opposite: true,
        title: {
            text: null
        },
        labels: {
            align: 'right',
            x: -3,
            y: 16,
            format: '{value:.,0f}'
        },
        showFirstLabel: false
    }],
  
    legend: {
        align: 'left',
        verticalAlign: 'top',
        borderWidth: 0
    },
  
    tooltip: {
        shared: true,
        crosshairs: true
    },
  
    plotOptions: {
        series: {
            cursor: 'pointer',
            point: {
                events: {
                    click: function (e) {
                        hs.htmlExpand(null, {
                            pageOrigin: {
                                x: e.pageX || e.clientX,
                                y: e.pageY || e.clientY
                            },
                            headingText: this.series.name,
                            maincontentText: Highcharts.dateFormat('%A, %b %e, %Y', this.x) + ':<br/> ' +
                                this.y + ' sessions',
                            width: 200
                        });
                    }
                }
            },
            marker: {
                lineWidth: 1
            }
        }
    },
  
    series : [{
        name: 'Registrations',
        data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2,
           26.5, 23.3, 18.3, 13.9, 9.6],
         },
         {
           name: 'App Installs',
           data: [4.0, 9, 11, 100, 18, 27, 4,
               3, 1, 0, 14, 9],
         } 
    ]

    /*series: [{
        name: 'All sessions',
        lineWidth: 4,
        marker: {
            radius: 4
        }
    }, {
        name: 'New users'
    }]*/
  }
  

  export default RegistrationOptions;