import React from 'react';
import ApiClient from 'utils/ApiClient';
import { getCurrentDate } from 'utils/DateFunctions';
import PropTypes from 'prop-types';
// import Charts from './Charts'
import history from 'utils/history';

export default class ChartResource extends React.PureComponent {
    state = {
      loading: false,
      payload: [],
      notice: '',
    }

    constructor(props) {
      super(props);
      this.fetchData = this.fetchData.bind(this);
    }

    fetchData() {
      this.setState({ notice: 'Loading please wait...' });
      const url = this.props.path + this.props.currentDate;

      console.log('&&&&&&3', url, this.props);

      ApiClient.get(url)
        .then((res) => {
          //history.push("/")

          this.setState({
            payload: res.data,
            loading: false,
            notice: ''
          });
        }).catch((err ) => {
          //if token has expired fetch a new token
          console.log('token expired....', err.response, err.response.status)
         
          if (err.response.status === 401) {
            history.push("/")
            //this.context.router.transitionTo('/');
            console.log('token expired....', err.response, err.response.status)
          }

          this.setState({
            payload: [],
            loading: false,
            notice: 'Unable to fetch api data',
          });
        });
    }

    componentDidMount() {
      this.setState({ loading: true });
      let date = getCurrentDate('-');
      date = '2019-06-24';
      this.fetchData();
    }

    componentDidUpdate(prevProps, prevState) {
      console.log(prevProps, this.props, '&&&&&&&&');
      if (this.props.currentDate != prevProps.currentDate) {
        this.setState({ currentDate: this.props.currentDate, payload: [] });
        this.fetchData();
      }
    }

    render() {
      console.log('&&&&3', this.props);
      const {
        payload, loading
      } = this.props;

      const chartProps = {
        loading,
        payload,
      };

      // applying the render props technique
      // return <Charts {...chartProps} />
      return this.props.render(this.state);
    }
}


ChartResource.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  currentDate: PropTypes.string,
  path: PropTypes.string
};
