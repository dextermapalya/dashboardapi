// import { Profile, Post, Posts} from '../../PrivateComponents';
import Dashboard from 'containers/Dashboard/Dashboard';
import FeaturePage from 'containers/FeaturePage/Loadable';

export default {
  Dashboard: {
    component: Dashboard,
    path: '/dashboard'
  },
  FeaturePage: {
    component: FeaturePage,
    path: '/features'
  }
};
