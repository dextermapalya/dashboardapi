import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { map, cloneDeep } from 'lodash';
import chartOptions from './chartOptions'

const Chart = ({ component, data }) => {
  const ComponentToRender = component;
  let content = (<div></div>);

  // If we have data, render them
  if (data) {
    console.log(data)
  } else {
    // Otherwise render a single component
    content = (<ComponentToRender />);
  }

  return (
        <div>
        <HighchartsReact
          highcharts={Highcharts}
          options={chartOptions}
          oneToOne={true}
        />
        </div>
  );
};

Chart.propTypes = {
  component: PropTypes.elementType.isRequired,
  data: PropTypes.any,
};

export default Chart;
