// import logo from './logo.svg';
import React, { Component } from 'react';
import './App.css';
import Header from './Components/header';
import { Provider } from "react-redux";
import routes from './routes';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
	BrowserRouter as Router,
} from 'react-router-dom';
import {options} from './config/web3';
import {configureStoreDev} from './Store';
import { PersistGate } from "redux-persist/integration/react";
import initialStore from "./Store/Reducers/inital-state";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// web3 integrations via Drizzle
import {DrizzleProvider} from 'drizzle-react';
import { LoadingComponent } from 'drizzle-react-components';
import { LoadingContainer } from 'drizzle-react-components';

let storeValues = configureStoreDev(initialStore);


export default class Providers extends React.Component{
  render(){
    return(
      <DrizzleProvider options={options}>
        <Provider store={storeValues.store}>
            <PersistGate loading={null} persistor={storeValues.persistor}>
            <LoadingContainer>
            <React.Fragment>
                  <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnVisibilityChange
                    draggable
                    pauseOnHover
                  />
                  <Router>
                    <React.Fragment>
                    {routes}
                    </React.Fragment>
                  </Router>
                </React.Fragment>
            </LoadingContainer>
                
            </PersistGate>
          </Provider>
      </DrizzleProvider>
    )
  }
}
