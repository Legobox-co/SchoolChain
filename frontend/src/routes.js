// import scenes here and make routes of them
import React from 'react';
import {Route, Redirect} from 'react-router-dom';
// import scenes here
import { Home } from './Scene'
import Header from './Components/header';

// auth checkers for checking if the routes are authorized
// import AppCheck from './Modules/app-check';
// import EnsureLoggedInContainer from './Modules/ensure-loggedIn-container';
// import EnsureVisitorOnlyContainer from './Modules/ensure-visitoronly-conainer';

const internalPages = [
	'/home',
	'/profile',
	'/settings',
	'/project/:id'
];


const routes = (
  <React.Fragment>
		<Header />
        <Route exact path="/" component={Home} />
        {/* <Route exact path="/tuition" component={Dashboard} />
        <Route exact path="/school" component={Profile} />
        <Route path="/departments" component={Project} />
        <Route exact path="/administrative" component={Settings}/> */}
  </React.Fragment>
);

export default routes;