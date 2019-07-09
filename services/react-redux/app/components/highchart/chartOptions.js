const hours = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, '22:00', '23:00'];

const chartOptions = {
  chart: {
    scrollablePlotArea: {
      minWidth: 700
    }
  },

  data: [],

  title: {
    text: 'App Installations by OS - Hourly'
  },

  subtitle: {
    text: 'Source: SUNNXT API'
  },


  xAxisaa: {
    title: {
      text: 'Time'
    },
    // tickInterval: 7 * 24 * 3600 * 1000, // one week
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
      text: 'Time'
    },
    categories: hours
  },

  yAxis: [{ // left y axis
    title: {
      text: 'Users'
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
          click(e) {
            hs.htmlExpand(null, {
              pageOrigin: {
                x: e.pageX || e.clientX,
                y: e.pageY || e.clientY
              },
              headingText: this.series.name,
              maincontentText: `${Highcharts.dateFormat('%A, %b %e, %Y', this.x)}:<br/> ${
                this.y} sessions`,
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
  series: []


  /* series: [{
        name: 'All sessions',
        lineWidth: 4,
        marker: {
            radius: 4
        }
    }, {
        name: 'New users'
    }] */
};


export default chartOptions;
