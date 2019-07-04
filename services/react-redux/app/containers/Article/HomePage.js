/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import ReposList from 'components/ReposList';
import './style.scss';
//import Player from "./Player.jsx";
import RxPlayer from "rx-player";
import { Button } from 'reactstrap';


export default class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  /**
   * when initial state username is not null, submit the form to load repos
   */
  componentDidMount() {
    console.log('did mount...')
    const { username, onSubmitForm } = this.props;
    if (username && username.trim().length > 0) {
      onSubmitForm();
    }
    //this.initPlayer();
    this.fetchUsers();
  }

  fetchUsers() {
    fetch('http://jsonplaceholder.typicode.com/users')
    .then(res => res.json())
    .then((data) => {
      this.setState({ contacts: data })
      console.log(this.state.contacts)
    })
    .catch(console.log)
  }

  initPlayer() {
    console.log('Loading video.....')
    const player = new RxPlayer({videoElement: document.getElementById("video")});
    player.loadVideo({
      //url: "http://vm2.dashif.org/livesim-dev/segtimeline_1/testpic_6s/Manifest.mpd",
      url:"https://akamaiazure-prodsunnxtms.streaming.mediaservices.windows.net/2dbff538-c8b9-4d5e-813b-aef4975eeef0/60141.ism/manifest",
      transport: "dash",
      type:"multiDrm",
      headers: {
        "drmToken": 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2FwaS5zdW5ueHQuY29tL3Rva2VuaXNzdWVydXJsLyIsImF1ZCI6InVybjpzdW5ueHQiLCJleHAiOjE1NjIxMDAxNzl9.MU5LGtGJ8Zc84qpewSFRNxYpJHXblS_EMAPp2prRzs0'
      },
      autoPlay: true});
  }

  render() {
    console.log('rendering...')
    const {
      loading, error, repos, username, onChangeUsername, onSubmitForm
    } = this.props;
    const reposListProps = {
      loading,
      error,
      repos
    };

    return (
      <article>
        <Helmet>
          <title>Home Page</title>
          <meta name="description" content="A React.js Boilerplate application homepage" />
        </Helmet>
        <div className="home-page">
          <section className="centered">
            <h2>Start your next react project in seconds 1234</h2>
            <p>
              A minimal <i>React-Redux</i> boilerplate with all the best practices
            </p>
            <Button color="danger">Red Button!</Button>
          </section>
         
          <section>
            <form onSubmit={onSubmitForm}>
              <label htmlFor="username">
                Show Github repositories by
                <span className="at-prefix">@</span>
                <input
                  id="username"
                  type="text"
                  placeholder="dextermapalya"
                  value={username}
                  onChange={onChangeUsername}
                />
              </label>
            </form>
            <ReposList {...reposListProps} />
          </section>
        </div>
      </article>
    );
  }
}

HomePage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  repos: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  onSubmitForm: PropTypes.func,
  username: PropTypes.string,
  onChangeUsername: PropTypes.func
};
