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
      chartname : this.props.chartname
    }
    

   /* when the parent state changes this is the function in the child class that is 
   triggered the return state automatically updates the state 
   and gets passed on to the function componentDidUpdate
   */ 
   static getDerivedStateFromProps(nextProps, prevState){
     console.log('getDerivedState From Props', nextProps, prevState )
      if( nextProps.chartname !== prevState.chartname){
        return { chartname: nextProps.chartname};
      } else return null;
   }
   
   /*
   * this function is called after getDerivedStateFromProps is invoked
   * and only if the parent state has changed
   */
   componentDidUpdate(prevProps, prevState) {
    console.log('props....', this.props, '**', this.state)
     console.log('component updated...', prevProps, prevState)
     const { chartname } = this.state;
     if(prevProps.chartname !== chartname && this.props.chartname == "registrations") {
          console.log('fethcing data ++++')
          this.fetchData();
    }

   }
    /**
     * when initial state make ajax request to fetch data
     */
    componentDidMount() {
      console.log('props....+++', this.props)
      const { charttype, fetchData } = this.props;
      console.log('ctype', charttype)
      if (charttype && charttype.trim().length > 0) {
        console.log('fethcing data ++++')

        this.fetchData();
      }
       
    }

    //ajax call to fetch timeline series
  fetchData() {

    var user_info = localStorage.getItem('user_info');

    var token = 
    axios.defaults.headers.common = {'Authorization': ' Bearer ' + token}
    var url = 'http://localhost/api/v1.1/activesubscription/5/2019-06-24'
    ApiClient.get( 'v1.1/activesubscription/5/2019-06-24' )
    .then(res => {
      const chartData = res.data;
      this.setState({ chartData });
      let data  = [ ['06/24/2019 07:00', 25], ['06/24/2019 07:00', 4], ['06/24/2019 07:00', 4] ]
      RegistrationOptions.data = data
    })

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
