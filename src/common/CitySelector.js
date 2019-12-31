import React from 'react';
import './CitySelector.css';

export default function CitySelector(props) {
  const {
    show,
    cityData,
    isLoading
  } = props;
  return (
    <div className={['city-selector', (!show) && 'hidden'].filter(Boolean).join(' ')}>

    </div>
  );
}
