import React from 'react';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { map, cloneDeep } from 'lodash';
import chartOptions from './chartOptions'

import InstallationService from 'services/InstallationService'
import { AUTH_INSTALLATIONS } from 'shared/constants'
import ChartResource from './Loadable';

const transformData = (payload) => {

    var cOptions = cloneDeep(chartOptions);
    var series = InstallationService.transformData( payload.data )
    cOptions.series = series

    return (
        <section>
          <div>
            <HighchartsReact
              highcharts={Highcharts}
              options={cOptions}
              oneToOne={true}
            />
          </div>
        </section>
      );
}

const InstallChart = () => {
    return (
        <ChartResource 
        path={AUTH_INSTALLATIONS} render={ data => {
      if (data.loading) return <p>Loading data.....</p>
      return ( <section>{transformData(data.payload)}</section>  )
    }}
  />

    )
  };
  
  InstallChart.propTypes = {
   
  };
  
export default InstallChart;
