import React, {createContext, useState, useContext} from 'react';
// import logo from './logo.svg';
import './App.css';

const BatteryContext= createContext(90);
const OnlineContext= createContext();

function Leaf() {
  const battery = useContext(BatteryContext)
  return(
    // <BatteryContext.Consumer>
    //   {
    //     battery => (
    //       <h1>Battery: {battery}</h1>
    //     )
    //   }
    // </BatteryContext.Consumer>
    <h1>Battery: {battery}</h1>
  );
}

function Middle() {
  return (
    <Leaf/>
  );
}

function App() {
  const [battery, setBattery] = useState(60)
  const [online, setOnline] = useState(false)
  return (
    <BatteryContext.Provider value={battery}>
      <OnlineContext.Provider value={online}>
        <button type="button"
         onClick={() => setBattery(battery -1)}>
          Press
        </button>
        <button type="button"
         onClick={() => setOnline(!online)}>
          Switch
        </button>
        <Middle />
      </OnlineContext.Provider>
    </BatteryContext.Provider>
  );
}

export default App;
