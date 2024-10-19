
import React, { Component } from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import './App.css';
import NavBar from './components/navbar';
import Home from './components/home';
import Footer from './components/footer';
import { ToastContainer } from "react-toastify";
import Property from './components/property';
import NotFound from './components/notFound';
import LoginForm from './components/login/loginForm';
import auth from "./services/authService";
import ManageProperties from './components/manageProperties/manageProperties';
import AddProperty from './components/manageProperties/addProperty';
import EditProperty from './components/manageProperties/editProperty';
import AreaManagement from './components/manageAreas/areaManagement';
import EditArea from './components/manageAreas/editArea';
import NotificationManagement from './components/manageNotification/notificationManagement';
import LogOut from './components/logout/logout';

class App extends Component {
  state = { isRequestDone:false }; //comment it
  async componentDidMount() {
    // const userId = auth.getCurrentUser();
    const userProfile = await auth.getUserProfile();
    // this.setState({ userId, userProfile });
    const isRequestDone = true;

    this.setState({ userProfile,isRequestDone });
  }
  render() {
    let LoggedIn = null;
    const { isRequestDone } = this.state;
    if (this.state) {
      const { userProfile } = this.state;
      LoggedIn = userProfile;
    }
    // LoggedIn = true; //comment it
    return (
      <React.Fragment>
        <ToastContainer />
        {/* <Switch> */}
        {!isRequestDone && <div id="loader"></div>}
        {isRequestDone && (
        <React.Fragment>
          <NavBar isLoggedIn={!!LoggedIn}/>
          <Switch>
            <Route path="/manage-notifications" exact render={(props) => (<NotificationManagement {...props} isLoggedIn={!!LoggedIn} />)} />
            <Route path="/edit-area/:id/:name" exact render={(props) => (<EditArea {...props} isLoggedIn={!!LoggedIn} />)} />
            <Route path="/manage-area" exact render={(props) => (<AreaManagement {...props} isLoggedIn={!!LoggedIn} />)} />
            <Route path="/edit-property/:id" exact render={(props) => (<EditProperty {...props} isLoggedIn={!!LoggedIn} />)} />
            <Route path="/add-property" exact render={(props) => (<AddProperty {...props} isLoggedIn={!!LoggedIn} />)} />
            <Route path="/manage-properties" exact render={(props) => (<ManageProperties {...props} isLoggedIn={!!LoggedIn} />)} />
            <Route path="/login" exact render={(props) => (<LoginForm {...props} isLoggedIn={!!LoggedIn} />)} />
            <Route path="/logout" exact render={(props) => (<LogOut {...props} isLoggedIn={!!LoggedIn} />)} />
            <Route path="/property/:id" exact render={(props) => (<Property {...props} isLoggedIn={!!LoggedIn} />)} />
            {/* <Route path="/edit-class/:id" exact component={EditClass} />
            <Route path="/classes" exact component={Classes} /> */}
            <Route path="/not-found" component={NotFound} />
            <Route path="/" exact render={(props) => (<Home {...props} isLoggedIn={!!LoggedIn} />)} />
            <Redirect to="/not-found" />
          </Switch>
          <Footer/>
        </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}
 
export default App;

