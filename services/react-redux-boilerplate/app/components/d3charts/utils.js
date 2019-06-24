d3Utils.setWidth = (data) => {
    const svg = document.getElementsByClassName('line-chart');
    const svgWidth = svg[0].getBoundingClientRect().width
    xScale.range([0, svgWidth]);
    renderChanges(data);
  }