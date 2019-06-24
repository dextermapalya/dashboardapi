import React from 'react';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import axios from 'axios';
import RegistrationOptions from './RegistrationOptions'
import ApiClient from '../../utils/ApiClient'

const optionsa = {
  title: {
    text: 'Registrations - Hourly'
  },
  series: [{
    data: []
  }]
}


class RegistrationChart extends React.Component { // eslint-disable-line react/prefer-stateless-function

    state = {
      chartData : {}
    }
    /**
     * when initial state make ajax request to fetch data
     */
    componentDidMount() {
      const { charttype, fetchData } = this.props;
      console.log(charttype)
      if (charttype && charttype.trim().length > 0) {
        this.fetchData();
      }
       
    }

    //ajax call to fetch timeline series
  fetchData() {

    var token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyLCJ1c2VybmFtZSI6ImFwcCIsImV4cCI6MTU2MTM3NjUyNywiZW1haWwiOiJhcHBAYXBhbHlhLmNvbSJ9.r7LA73efzuVhe56f0gV2p4Mz8P25RqZH5CEfkSSwhP0"
    axios.defaults.headers.common = {'Authorization': ' Bearer ' + token}
    var url = 'http://localhost/api/v1.1/activesubscription/5/2019-06-24'
    ApiClient.get( 'activesubscription/5/2019-06-24' )
    .then(res => {
      const chartData = res.data;
      this.setState({ chartData });
      let data  = [ ['06/24/2019 07:00', 25], ['06/24/2019 07:00', 4], ['06/24/2019 07:00', 4] ]
      RegistrationOptions.data = data
    })

    /*axios.get( url )
      .then(res => {
        const chartData = res.data;
        this.setState({ chartData });
        options.data = chartData
      }) */

  } 

  render() {
    return (
      <section>
        <div>
          <HighchartsReact
            highcharts={Highcharts}
            options={RegistrationOptions}
          />
        </div>
      </section>
    );
  }
}

export default RegistrationChart;
