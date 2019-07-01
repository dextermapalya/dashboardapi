import React from 'react';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { map, cloneDeep } from 'lodash';
import chartOptions from './chartOptions'
import ApiClient from 'utils/ApiClient'
import RegistrationService from 'services/RegistrationService'

class RegistrationChart extends React.Component { // eslint-disable-line react/prefer-stateless-function

    /*state = {
      chartname : this.props.chartname
    }*/
    
    constructor(props) {
      super(props);
      //clone a copy of high chart options otherwise the same instance is applied across all charts
      //this means the content of each chart will be the same
      this.cOptions = cloneDeep(chartOptions);
      this.state = { chartOptions: {} };
    }

   /* when the parent state changes this is the function in the child class that is 
   triggered the return state automatically updates the state 
   and gets passed on to the function componentDidUpdate
   */ 
   static getDerivedStateFromProps(nextProps, prevState) {
     console.log('getDerivedState From Props', nextProps, prevState )
      if( nextProps.isLoggedin !== prevState.isLoggedin){
        return { chartname: nextProps.chartname, isLoggedin: nextProps.isLoggedin };
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
     console.log( this.state)

     if (this.props.isLoggedin == true && prevProps.isLoggedin == false) {
      this.fetchData() //fetchdata for registrations
     }
    

   }
    /**
     * when initial state make ajax request to fetch data
     */
    componentDidMount() {
      
      const { charttype, fetchData } = this.props;
      console.log('ctype', charttype)
      this.cOptions.series = []
      this.cOptions.title.text = "Registrations Hourly"
      this.cOptions.xAxis.title.text = "Time"
      this.cOptions.yAxis[0].title.text = " Device Type"
    
    }

    //ajax call to fetch timeline series
  fetchData() {

    //ApiService.get()
    ApiClient.get( 'v1.1/activeregistrations/2019-06-24' )
    .then(res => {
      //delegate the json transformation to a service
      var series = RegistrationService.transformData( res.data.data )
      console.log('series registrations', series) 
      this.cOptions.series = series
      this.setState({chartOptions: this.cOptions})
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
