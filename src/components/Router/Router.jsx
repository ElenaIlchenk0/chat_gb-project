import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setAuth } from '../../store/actions/userActions';
import { Switch } from 'react-router-dom';
import Layout from '../Layout/Layout';
import Login from '../Login/Login';
import SignUp from '../SignUp/SignUp';
import { auth } from '../../services/firebase';
import PrivateRoute from '../../hocs/PrivateRoute';
import PublicRoute from '../../hocs/PublicRoute';

class Router extends React.Component {
  componentDidMount() {
    auth().onAuthStateChanged((user) => {
      if (user) {
        this.props.setAuth(true, user.email);
      } else {
        this.props.setAuth(false, '');
      }
    });
  }

  render() {
    return (
      <Switch>
        <PrivateRoute
          exact
          path="/"
          authenticated={this.props.authed}
          component={Layout}
        />
        <PrivateRoute
          exact
          path="/profile"
          authenticated={this.props.authed}
          render={() => <Layout isProfile />}
        />
        <PrivateRoute
          exact
          path="/chat/:id/"
          authenticated={this.props.authed}
          component={Layout}
        />
        <PublicRoute
          path="/signup"
          authenticated={this.props.authed}
          component={SignUp}
        />
        <PublicRoute
          path="/login"
          authenticated={this.props.authed}
          component={Login}
        />
      </Switch>
    );
  }
}

const mapStateToProps = ({ userReducer }) => ({
  authed: userReducer.authed,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ setAuth }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Router);
