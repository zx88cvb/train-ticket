export const ACTION_SET_FROM = 'SET_FROM';
export const ACTION_SET_TO = 'SET_TO';
export const ACTION_SET_IS_CITY_SELECTOR_VISIBLE = 'SET_IS_CITY_SELECTOR_VISIBLE';
export const ACTION_SET_CURRENT_SELECTING_LEFT_CITY = 'SET_CURRENT_SELECTING_LEFT_CITY';
export const ACTION_SET_CITY_DATA = 'SET_CITY_DATA';
// 当前是否加载城市数据
export const ACTION_SET_IS_LOADING_CITY_DATA = 'SET_IS_LOADING_CITY_DATA';
export const ACTION_SET_IS_DATE_SELECTOR_VISIBLE = 'SET_IS_DATE_SELECTOR_VISIBLE';
export const ACTION_SET_HIGH_SPEED = 'SET_HIGH_SPEED';

// 来自
export function setFrom(from) {
  return {
    type: ACTION_SET_FROM,
    payload: from
  }
}

// to
export function setTo(to) {
  return {
    type: ACTION_SET_TO,
    payload: to
  }
}

// 是否加载城市数据
export function setIsLoadingCityData(isLoadingCityData) {
  return {
    type: ACTION_SET_IS_LOADING_CITY_DATA,
    payload: isLoadingCityData
  }
}

export function setCityData(cityData) {
  return {
    type: ACTION_SET_CITY_DATA,
    payload: cityData
  }
}

export function toggleHighSpeed() {
  return (dispatch, getState) => {
      const { highSpeed } = getState();
      dispatch({
          type: ACTION_SET_HIGH_SPEED,
          payload: !highSpeed,
      });
  };
}

export function showCitySelector(currentSelectingLeftCity) {
  return dispatch => {
    dispatch({
      type: ACTION_SET_IS_CITY_SELECTOR_VISIBLE,
      payload: true,
    });

    dispatch({
      type: ACTION_SET_CURRENT_SELECTING_LEFT_CITY,
      payload: currentSelectingLeftCity,
    });
  };
}

// 关闭城市选择浮层
export function hideCitySelector() {
  return {
    type: ACTION_SET_IS_CITY_SELECTOR_VISIBLE,
    payload: false,
  };
}

export function setSelectedCity(city) {
  return (dispatch, getState) => {
    const { currentSelectingLeftCity } = getState();

    if (currentSelectingLeftCity) {
      dispatch(setFrom(city));
    } else {
      dispatch(setTo(city));
    }

    // 关闭城市选择浮层
    dispatch(hideCitySelector());
  };
}

export function showDateSelector() {
  return {
      type: ACTION_SET_IS_DATE_SELECTOR_VISIBLE,
      payload: true,
  };
}

export function hideDateSelector() {
  return {
      type: ACTION_SET_IS_DATE_SELECTOR_VISIBLE,
      payload: false,
  };
}

// 交换 to from 数据
export function exchangeFromTo() {
  return (dispatch, getState) => {
    const { from, to } = getState();
    dispatch(setFrom(to));
    dispatch(setTo(from));
  };
}

// 加载city数据
export function fetchCityData() {
  return (dispatch, getState) => {
    const { isLoadingCityData } = getState();
    if (isLoadingCityData) {
      return;
    }

    // 获取localStorage缓存中的数据
    const cache = JSON.parse(localStorage.getItem('city_data_cache') || '{}');

    if (Date.now < cache.expires) {
      dispatch(setCityData(cache.data));
      return;
    }
    dispatch(setIsLoadingCityData(true));

    // Date.now() 防止缓存
    fetch('/rest/cities?_' + Date.now())
      .then(res => res.json())
      // 成功
      .then(cityData => {
        dispatch(setCityData(cityData));
        // 将城市数据 缓存到 localStorage中
        localStorage.setItem('city_data_cache', JSON.stringify({
          expires: Date.now() + 60 * 1000,
          data: cityData
        }));
        dispatch(setIsLoadingCityData(false));
      })
      // 500
      .catch(() => {
        dispatch(setIsLoadingCityData(false));
      });
  };
}