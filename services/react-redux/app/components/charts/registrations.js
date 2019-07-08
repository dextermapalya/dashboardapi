import React from 'react';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { map, cloneDeep } from 'lodash';
import chartOptions from './chartOptions'

import RegistrationService from 'components/charts/services/RegistrationService'
import { AUTH_REGISTRATIONS } from 'shared/constants'
import ChartResource from './Loadable';
import PropTypes from "prop-types";

/**
 * called from functional component InstallChart, when its parent class successfully 
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
    var cOptions = cloneDeep(chartOptions);
    var series = RegistrationService.transformData( payload.data )
    cOptions.series = series
    console.log('&&&&&5', series)

    return (
          <div>
            <HighchartsReact
              highcharts={Highcharts}
              options={cOptions}
              oneToOne={true}
            />
          </div>
      );
}

/**
 * RegistrationChart 
 * Displays the graph related to app registrations
 * This calls a reusable React component ChartResource by passing the api link 
 * ex: v1.1/activenstallations/24-06-2019
 * The render function exists in ChartResource component
 * @param  {} 
 *
 * @return {jsx content}   
 */
const RegistrationChart = () => {
    return (
        <ChartResource 
        path={AUTH_REGISTRATIONS} render={ data => {
      if (data.loading) return <p>{data.notice}</p>
      return ( <section>{transformData(data.payload)}</section>  )
    }}
  />

    )
  };
  
  RegistrationChart.propTypes = {
   
  };
  
export default RegistrationChart;
