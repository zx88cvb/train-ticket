import {
  createStore,
  combineReducers,
  applyMiddleware
} from 'redux';

import reducers from './reducers';
import thunk from 'redux-thunk';

export default createStore(
  combineReducers(reducers),
  {
    from: '北京',
    to: '上海',
    isCitySelectorVisible: false,
    currentSelectingLeftCity: false,
    cityData: null,
    // 当前是否加载城市数据
    isLoadingCityData: false,
    isDateSelectorVisible: false,
    highSpeed: false
  },
  applyMiddleware(thunk)
);