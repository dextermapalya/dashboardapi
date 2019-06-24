import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import axios from 'axios';
import PropTypes from 'prop-types';


const optionsa = {
    title: {
      text: 'Registrations - Hourly'
    },
    series: [{
      data: []
    }]
}

const options = {
    chart: {
        scrollablePlotArea: {
            minWidth: 700
        }
    },

    data: {
        csvURL: 'https://cdn.jsdelivr.net/gh/highcharts/highcharts@v7.0.0/samples/data/analytics.csv',
        beforeParse: function (csv) {
            return csv.replace(/\n\n/g, '\n');
        }
    },

    title: {
        text: 'Daily sessions at www.highcharts.com'
    },

    subtitle: {
        text: 'Source: Google Analytics'
    },

    xAxis: {
        tickInterval: 7 * 24 * 3600 * 1000, // one week
        tickWidth: 0,
        gridLineWidth: 1,
        labels: {
            align: 'left',
            x: 3,
            y: -3
        }
    },

    yAxis: [{ // left y axis
        title: {
            text: null
        },
        labels: {
            align: 'left',
            x: 3,
            y: 16,
            format: '{value:.,0f}'
        },
        showFirstLabel: false
    }, { // right y axis
        linkedTo: 0,
        gridLineWidth: 0,
        opposite: true,
        title: {
            text: null
        },
        labels: {
            align: 'right',
            x: -3,
            y: 16,
            format: '{value:.,0f}'
        },
        showFirstLabel: false
    }],

    legend: {
        align: 'left',
        verticalAlign: 'top',
        borderWidth: 0
    },

    tooltip: {
        shared: true,
        crosshairs: true
    },

    plotOptions: {
        series: {
            cursor: 'pointer',
            point: {
                events: {
                    click: function (e) {
                        hs.htmlExpand(null, {
                            pageOrigin: {
                                x: e.pageX || e.clientX,
                                y: e.pageY || e.clientY
                            },
                            headingText: this.series.name,
                            maincontentText: Highcharts.dateFormat('%A, %b %e, %Y', this.x) + ':<br/> ' +
                                this.y + ' sessions',
                            width: 200
                        });
                    }
                }
            },
            marker: {
                lineWidth: 1
            }
        }
    },

    series: [{
        name: 'All sessions',
        lineWidth: 4,
        marker: {
            radius: 4
        }
    }, {
        name: 'New users'
    }]
}

export default class TimeSeries extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    /**
     * when initial state make ajax request to fetch data
     */
    componentDidMount() {
      const { chartype, fetchData } = this.props;
      if (chartype && chartype.trim().length > 0) {
        fetchData();
      }
       
    }

    render() {
        const {
          loading, error, ChartData, chartype, fetchData
        } = this.props;

        const chartDataProps = {
          loading,
          error,
          ChartData
        };
    
        return (
          <section>
            <div>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={options}
                />
            </div>
          </section>
        );
      }

}

TimeSeries.propTypes = {
    loading: PropTypes.bool,
    error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
    ChartData: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
    fetchData: PropTypes.func,
    chartype: PropTypes.string,
  };