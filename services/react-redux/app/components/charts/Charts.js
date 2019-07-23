import React from 'react';
import PropTypes from 'prop-types';

import LoadingIndicator from 'components/LoadingIndicator';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { map, cloneDeep } from 'lodash';
import chartOptions from './chartOptions';

const transformData = (data) => {
  return (
    <h4>Chart 4</h4>
  );
};
const Charts = ({ loading, payload, error }) => {
  if (loading) {
    return <div component={LoadingIndicator} />;
  }

  if (error !== false) {
    const ErrorComponent = () => (
      <h4>Something went wrong, please try again!</h4>
    );
    return <div component={ErrorComponent} />;
  }

  if (payload !== false) {
    return (
      <div>
        <HighchartsReact
          highcharts={Highcharts}
          options={transformData(payload)}
          oneToOne
        />
      </div>
    );
  }

  return null;
};

Charts.propTypes = {
  loading: PropTypes.bool,
  payload: PropTypes.any,
  error: PropTypes.bool
};

export default Charts;
