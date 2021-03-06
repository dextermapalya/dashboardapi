import Highcharts from 'highcharts/highstock';

const hours = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, '22:00', '23:00'];
// const hours = [0,1, 2,3, 4, 6, 8, 10, 11, 12, 14, 15, 16, 17, 18, 19, 20, 21, '22:00', '23:00'];

const chartOptions = {

  title: {
    text: ''
  },
  xAxis: {
    title: {
      text: 'Time',
      y: 60
    },
    categories: hours
  },
  yAxis: [{ // left y axis
    title: {
      text: ' ',
      y: 60
    },
    labels: {
      align: 'left',
      x: 3,
      y: 16,
      format: '{value:.,0f}',
    },
    showFirstLabel: false
  }],
  legend: {
    layout: 'horizontal',
    verticalAlign: 'top',
    borderColor: '#CCC',
    borderWidth: 1,
    shadow: false,
    itemMarginTop: 0,
    itemMarginBottom: 0
  },

  plotOptions: {
    series: {
      label: {
        connectorAllowed: true
      },
      pointStart: 0
    }
  },

  series: [],

  responsive: {
    rules: [{
      condition: {
        maxWidth: 500
      },
      chartOptions: {
        legend: {
          layout: 'horizontal',
          align: 'center',
          verticalAlign: 'top'
        }
      }
    }]
  }
};

const chartOptionsa = {
  chart: {
  },

  data: [],

  title: {
    text: ' '
  },

  /* subtitle: {
    text: 'Source: SUNNXT API'
  }, */

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
      text: 'Time',
      y: 60
    },
    categories: hours
  },

  yAxis: [{ // left y axis
    title: {
      text: ' ',
      y: 60
    },
    labels: {
      align: 'left',
      x: 3,
      y: 16,
      format: '{value:.,0f}',
      formatter() {
        return this.value;
      }
    },
    showFirstLabel: false
  }],

  legend: {
    align: 'left',
    verticalAlign: 'top',
    borderWidth: 1,
    itemMarginTop: 0,
    itemMarginBottom: 0,
    x: 0,
    y: -14,
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
            /* hs.htmlExpand(null, {
              pageOrigin: {
                x: e.pageX || e.clientX,
                y: e.pageY || e.clientY
              },
              headingText: this.series.name,
              maincontentText: `${Highcharts.dateFormat('%A, %b %e, %Y', this.x)}:<br/> ${
                this.y} sessions`,
              width: 200
            }); */
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
