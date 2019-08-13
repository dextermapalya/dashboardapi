import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { cloneDeep } from 'lodash';

import ApperrorService from 'components/charts/services/ApperrorService';
import { AUTH_APPERRORS } from 'shared/constants';
import PropTypes from 'prop-types';
import ChartResource from './Loadable';
import chartOptions from './piechartOptions';
import Log from 'logger-init';


/**
 * called from functional component ApperrorsChart, when its parent class successfully
 * completes the api request
 *
 * @param  {Object} payload the json response from the api call
 *
 * @return {jsx content}
 */

const transformData = (payload) => {
  /* chartOptions is a template, it must be cloned or all other charts
    * will display the graph using one of the api's data
    * so it must be cloned and used in highcharts
    * */
  if (Array.isArray(payload)) {
    return (
      <h4>Loading</h4>
    );
  }

  const cOptions = cloneDeep(chartOptions);
  const tempPayload = cloneDeep(payload);
  // cOptions.title.text = 'Renewals Hourly';
  cOptions.title.text = 'App Errors';

  const data = ApperrorService.transformData(tempPayload);
  cOptions.series = data;

  return (
    <div>
      <HighchartsReact
        highcharts={Highcharts}
        options={cOptions}
        oneToOne
      />
    </div>
  );
};

/**
 * AppErrors
 * Displays the pie chart related to app errors 
 * This calls a reusable React component ChartResource by passing the api link
 * ex: v1/apperrors/2019-08-12
 * The render function exists in ChartResource component
 * @param  {}
 *
 * @return {jsx content}
 */
const ApperrorsChart = () => (
  <ChartResource
    path={AUTH_APPERRORS}
    render={(data) => {
      if (data.loading) return <p>{data.notice}</p>;
      return (<section>{transformData(data.payload)}</section>);
    }}
  />

);

export default ApperrorsChart;
