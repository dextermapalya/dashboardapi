import React from 'react';
import ApiClient from 'utils/ApiClient';
import { getCurrentDate } from 'utils/DateFunctions';
import PropTypes from 'prop-types';
// import Charts from './Charts'
import history from 'utils/history';
import Log from 'logger-init';

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


    componentDidMount() {
      this.setState({ loading: true });
      let date = getCurrentDate('-');
      date = '2019-06-24';
      this.fetchData();
    }

    componentDidUpdate(prevProps, prevState) {
      // console.log(prevProps, this.props, '&&&&&&&&');
      const { currentDate } = this.props;
      if (currentDate !== prevProps.currentDate) {
        // this.setState({ currentDate: currentDate, payload: [] });
        this.fetchData();
      }
    }


    fetchData() {
      this.setState({ notice: 'Loading please wait...' });
      const { path, currentDate } = this.props;
      const url = path + currentDate;

      // console.log('&&&&&&3', url, this.props);

      ApiClient.get(url)
        .then((res) => {
          // history.push("/")

          this.setState({
            payload: res.data,
            loading: false,
            notice: ''
          });
        }).catch((err) => {
          history.push('/');
          Log.info('Chart Error1', url, err);
          // if token has expired fetch a new token
          // console.log('token expired....', err.response, err.response.status);

          if (err.response && err.response.status === 401) {
            history.push('/');
            // this.context.router.transitionTo('/');
          }

          this.setState({
            payload: [],
            loading: false,
            notice: 'Unable to fetch api data',
          });
        });
    }

    render() {
      const {
        payload, loading, render
      } = this.props;

      const chartProps = {
        loading,
        payload,
      };

      // applying the render props technique
      // return <Charts {...chartProps} />
      return render(this.state);
    }
}


ChartResource.propTypes = {
  loading: PropTypes.bool,
  // error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  currentDate: PropTypes.string,
  path: PropTypes.string,
  payload: PropTypes.array,
  render: PropTypes.func
};
