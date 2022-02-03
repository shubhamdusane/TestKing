import React from 'react';
import { withRouter } from 'react-router-dom';
import './App.scss';
import AppRoutes from './AppRoutes';
import { connect } from 'react-redux';
import { loadNetwork } from '../redux/interactions';
import { metamaskErrorSelector, networkProviderSelector } from '../redux/selectors';
import { clearMetamaskError } from '../redux/actions';

const App = ({ dispatch, networkProvider, metamaskError }) => {
  
  // if (!networkProvider) {
  //   loadNetwork(dispatch);
  // }

  // if (metamaskError) {
  //   alert(metamaskError.toString())
  //   dispatch(clearMetamaskError())
  // }
    return (
      <AppRoutes/>
    );
}
const mapStateToProps = (state) => {
  return {
    networkProvider: networkProviderSelector(state),
    metamaskError: metamaskErrorSelector(state)
  }
}

export default connect(mapStateToProps)(withRouter(App));
