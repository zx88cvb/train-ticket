import React, {
  useCallback,
  useMemo
} from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './App.css';

import Header from '../common/Header';
import DepartDate from './DepartDate';
import HighSpeed from './HighSpeed';
import Journey from './Journey';
import Submit from './Submit';

import CitySelector from '../common/CitySelector';

import {
  exchangeFromTo,
  showCitySelector,
  hideCitySelector
} from './actions';

function App(props) {
  // 取出store数据
  const {
    from,
    to,
    isCitySelectorVisible,
    cityData,
    isLoadingCityData,
    dispatch
  } = props;

  const onBack = useCallback(() => {
    window.history.back();
  }, []);

  // const doExchangeFromTo = useCallback(() => {
  //   dispatch(exchangeFromTo());
  // }, [dispatch]);

  // const doShowCitySelector = useCallback((m) => {
  //   dispatch(showCitySelector(m));
  // }, [dispatch]);

  const cbs = useMemo(() => {
    return bindActionCreators({
      exchangeFromTo,
      showCitySelector
    }, dispatch);
  }, [dispatch]);

  const citySelectorCbs = useMemo(() => {
    return bindActionCreators({
      onBack: hideCitySelector
    }, dispatch);
  }, [dispatch]);

  return (
    <div>
      <div className="header-wrapper">
        <Header title="火车票"
          onBack={onBack} />
      </div>
      <form className="form">
        <Journey from={from}
          to={to}
          {...cbs}
          // exchangeFromTo={doExchangeFromTo}
          // showCitySelector={doShowCitySelector}
          />
        <DepartDate />
        <HighSpeed />
        <Submit />
      </form>
      <CitySelector 
        show={isCitySelectorVisible}
        cityData={cityData}
        isLoading={isLoadingCityData}
        {...citySelectorCbs} />
    </div>
  );
}

export default connect(
  function mapStateToProps(state) {
    return state;
  },
  function mapDispatchToProps(dispatch) {
    return { dispatch };
  }
)(App);