import React from 'react';
import ApiClient from 'utils/ApiClient'
import  {getCurrentDate } from 'utils/DateFunctions'
import PropTypes from "prop-types";
//import Charts from './Charts'

export default class ChartResource extends React.PureComponent {
    state = {
      loading: false,
      payload: [],
      notice: ""
    }
    
    constructor(props) {
        super(props);
        this.fetchData = this.fetchData.bind(this)
    }

    fetchData() {
        this.setState({notice: "Loading please wait..."})
        const url = this.props.path  + this.props.currentDate
        
        console.log('&&&&&&3', url, this.props)
  
        ApiClient.get( url )
        .then(res => {
  
          this.setState({
              payload: res.data,
              loading: false,
              notice:""
            })
        }).catch(err =>
          {
              //throw new Error("Unable to fetch api data");
              this.setState({
                payload: [],
                loading: false,
                notice: "Unable to fetch api data"
              })              
          });
  
    }

    componentDidMount() {
      this.setState({ loading: true })
      let date = getCurrentDate('-')
      date = '2019-06-24'
      this.fetchData()

  
    }

    componentDidUpdate(prevProps, prevState) {
        console.log(prevProps, this.props, "&&&&&&&&")
        if (this.props.currentDate != prevProps.currentDate) {
           this.setState({currentDate:this.props.currentDate});
           this.fetchData()
        }
    
    }
    
    render() {
        console.log('&&&&3', this.props)
        const {
            payload, loading
          } = this.props;

        const chartProps = {
            loading,
            payload,
          };

      // applying the render props technique
      //return <Charts {...chartProps} />
      return this.props.render(this.state)
    }
}


ChartResource.propTypes = {
    loading: PropTypes.bool,
    error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
    currentDate: PropTypes.string,
    path:PropTypes.string
  };
  
