import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { cloneDeep } from 'lodash';
// import chartOptions from './chartOptions'
import ApiClient from 'utils/ApiClient';
import SubscriptionService from 'services/SubscriptionService';
import { getCurrentDate } from 'utils/DateFunctions';
import stackedChartOptions from './barchartOptions';

class SubscriptionChart extends React.Component { // eslint-disable-line react/prefer-stateless-function
  /* state = {
      chartname : this.props.chartname
    } */

  constructor(props) {
    super(props);

    // clone a copy of high chart options otherwise the same instance is applied across all charts
    // this means the content of each chart will be the same
    this.cOptions = cloneDeep(stackedChartOptions);
    // this.cOptions = JSON.parse(JSON.stringify(chartOptions));
    this.state = { chartOptions: {} };
  }

  /* when the parent state changes this is the function in the child class that is
   triggered the return state automatically updates the state
   and gets passed on to the function componentDidUpdate
   */
  static getDerivedStateFromProps(nextProps, prevState) {
    console.log('getDerivedState From Props', nextProps, prevState);
    if (nextProps.isLoggedin !== prevState.isLoggedin) {
      return { chartname: nextProps.chartname, isLoggedin: nextProps.isLoggedin };
    } return null;
  }

  /*
   * this function is called after getDerivedStateFromProps is invoked
   * and only if the parent state has changed
   */
  componentDidUpdate(prevProps, prevState) {
    console.log('props....', this.props, '**', this.state);
    console.log('component updated...', prevProps, prevState);
    const { chartname } = this.state;
    console.log(this.state);

    if (this.props.isLoggedin == true && prevProps.isLoggedin != this.props.isLoggedin) {
      this.fetchData();
    }

    if (this.props.date != prevProps.date) {
      this.setState({ chartOptions: {} });
      this.fetchData();
    }
  }

  /**
     * when initial state make ajax request to fetch data
     */
  componentDidMount() {
    console.log('props....+++', this.props);
    // cdate = (new Date(cts)).toString();
    const { chartname, fetchData, isLoggedin } = this.props;
    this.cOptions.series = [];
    this.cOptions.series = [];
    this.cOptions.title.text = 'Subscriptions Hourly';
    this.cOptions.xAxis.title.text = 'Time';
    this.cOptions.yAxis[0].title.text = ' Payment Method';

    if (chartname && chartname.trim().length > 0 && isLoggedin) {
      this.fetchData();
    }
  }

  // ajax call to fetch timeline series
  fetchData() {
    // get current date to avoid hard coding
    const { date } = this.props;
    // today = `2019-06-24`
    ApiClient.get(`v1.1/activesubscriptions/${date}`)
      .then((res) => {
      // delegate the json transformation to a service
        const series = SubscriptionService.transformData(res.data.data);
        console.log('subscriptionseries', series);
        this.cOptions.series = series;
        this.setState({ chartOptions: this.cOptions });
      });
  }

  render() {
    return (
      <section>
        <div>
          <HighchartsReact
            highcharts={Highcharts}
            options={this.state.chartOptions}
            oneToOne
          />
        </div>
      </section>
    );
  }
}

export default SubscriptionChart;
