// const hours = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, '22:00', '23:00'];

const stackedChartOptions = {

  chart: {
    type: 'column',
    marginTop: 130
  },
  title: {
    text: ' '
  },
  xAxis: {
    title: {
      text: ' ',
      y: 60
    },
    categories: []
  },
  yAxis: [{
    min: 0,
    title: {
      text: ' '
    },
    stackLabels: {
      enabled: true,
      style: {
        fontWeight: 'bold',
        /* color: ( // theme
                    Highcharts.defaultOptions.title.style &&
                    Highcharts.defaultOptions.title.style.color
                ) || 'gray' */
      }
    }
  }],
  legend: {
    align: 'right',
    verticalAlign: 'top',
    x: 0,
    y: -14,
    floating: true,
    backgroundColor: 'white',
    //    Highcharts.defaultOptions.legend.backgroundColor || 'white',
    borderColor: '#CCC',
    borderWidth: 1,
    shadow: false,
    itemMarginTop: 0,
    itemMarginBottom: 0,
    draggable: true
  },
  tooltip: {
    headerFormat: '<b>{point.x}</b><br/>',
    pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
  },
  plotOptions: {
    column: {
      stacking: 'normal',
      dataLabels: {
        enabled: true
      }
    }
  },
  series: []
};

export default stackedChartOptions;
