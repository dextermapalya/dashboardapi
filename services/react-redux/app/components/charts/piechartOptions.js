const piechartOptions = {
  legend: {
    align: 'left',
    verticalAlign: 'top',
    borderWidth: 1,
    itemMarginTop: 0,
    itemMarginBottom: 0,
    x: 0,
    y: -14,
  },
  plotOptions: {
    pie: {
      allowPointSelect: true,
      cursor: 'pointer',
      dataLabels: {
        enabled: false
      },
      showInLegend: true
    }
  },
  chart: {
    type: 'pie'
  },
  title: {
    text: 'App Errors'
  },
  series: [{ data: [] }]
};

export default piechartOptions;
