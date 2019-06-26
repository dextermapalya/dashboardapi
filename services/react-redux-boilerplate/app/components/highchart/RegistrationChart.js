import React from 'react';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import axios from 'axios';
import RegistrationOptions from './RegistrationOptions'
import ApiClient from '../../utils/ApiClient'
import { map } from 'lodash';


class RegistrationChart extends React.Component { // eslint-disable-line react/prefer-stateless-function

    /*state = {
      chartname : this.props.chartname
    }*/
    
    constructor(props) {
      super(props);
      this.state = { chartOptions:{} };
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

    ApiClient.get( 'v1.1/activesubscription/5/2019-04-05' )
    .then(res => {
      const chartData = res.data.data;
      this.setState({ chartData }); 
      var mobile = {name: 'Mobile', data: map(chartData, 'Mobile_Reg')} // [12, 14, 16, 18]
      var desktop = {name: 'Others', data: map(chartData, 'email_Reg')} 
      var hours = map(chartData , 'HR' )
      var series = []

      series.push (mobile)
      series.push(desktop)

      RegistrationOptions.series = series
      console.log ('****', series)
      this.setState({chartOptions: RegistrationOptions})
    })

  } 

  render() {
    return (
      <section>
        <div>
          <HighchartsReact
            highcharts={Highcharts}
            options={this.state.chartOptions}
          />
        </div>
      </section>
    );
  }
}

export default RegistrationChart;
