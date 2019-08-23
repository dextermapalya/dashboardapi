const piechartOptions = {
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
