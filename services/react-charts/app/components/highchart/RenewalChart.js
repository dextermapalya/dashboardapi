import React from 'react';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { cloneDeep } from 'lodash';
import stackedChartOptions from './barchart'
import ApiClient from 'utils/ApiClient'
import RenewalService from './RenewalService'

class RenewalChart extends React.Component { // eslint-disable-line react/prefer-stateless-function

    /*state = {
      chartname : this.props.chartname
    }*/
    
    constructor(props) {
      super(props);

      //clone a copy of high chart options otherwise the same instance is applied across all charts
      //this means the content of each chart will be the same
      this.cOptions = cloneDeep(stackedChartOptions);
      //this.cOptions = JSON.parse(JSON.stringify(chartOptions)); 

      this.state = { chartOptions:{} };
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
       this.fetchData()
     }
     /*if(prevProps.isLoggedin !== chartname && this.props.chartname == "registrations") {
          console.log('fethcing data ++++')
          this.fetchData();
     } */
      //this.fetchData(); //this is for installations    

   }
    /**
     * when initial state make ajax request to fetch data
     */
    componentDidMount() {
      console.log('props....+++', this.props)
      const { charttype, fetchData } = this.props;
      console.log('ctype', charttype)
      //this.cOptions.series = []
      this.cOptions.title.text = "Renewals Hourly"
      this.cOptions.xAxis.title.text = "Time"
      this.cOptions.yAxis[0].title.text = " Payment Method"

      if (charttype && charttype.trim().length > 0) {
        console.log('fethcing data ++++')

        //this.fetchData();
      }
       
    }

    //ajax call to fetch timeline series
  fetchData() {

    //ApiService.get()
    ApiClient.get( 'v1.1/activerenewals/2019-06-24' )
    .then(res => {
      //delegate the json transformation to a service
      var series = RenewalService.transformData( res.data.data )
      console.log('renewal series', series) 
      this.cOptions.series = series
      this.setState({chartOptions: this.cOptions})
    })

  } 

  render() {
    return (
      <section>
        <div>
        {/*<div id="renewal_chart" style="min-width: 310px; height: 400px; margin: 0 auto">

        </div> */}
        <HighchartsReact
            highcharts={Highcharts}
            options={this.state.chartOptions}
        /> 
        </div>
      </section>
    );
  }
}

export default RenewalChart;