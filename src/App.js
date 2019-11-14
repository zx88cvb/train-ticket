import React, {createContext, 
  useState, 
  useContext, 
  useEffect, 
  useMemo,
  memo,
  useCallback} from 'react';
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

function App(props) {
  const [battery, setBattery] = useState(() => {
    console.log('initial count');
    return props.defaultCount || 60;
  })
  const [online, setOnline] = useState(false)

  const [count, setCount] = useState(0);
  const [size, setSize] = useState({
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight
  });

  const onResize = () => {
    setSize({
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight
    })
  }
  useEffect(() => {
    document.title = `You clicked ${count} times`;
  }, [count]);

  useEffect(() => {
    window.addEventListener('resize', onResize, false);

    return () => {
      window.removeEventListener('resize', onResize, false);
    };
  }, []);
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
        <button onClick={() => setCount(count + 1)}>
          Click Title
          size: {size.width} x {size.height}
        </button>
        <Middle />
      </OnlineContext.Provider>
    </BatteryContext.Provider>
  );
}

const Counter = memo(function Counter(props) {
  console.log('Counter reder');
  return (
    <h1 onClick={props.onClick}>{props.count}</h1>
  );
});

function MemoApp() {
  const [count, setCount] = useState(0);

  const double = useMemo(() => {
    return count * 2;
  }, [count === 3]);

  const onClick = useCallback(() => {
    console.log('Click');
  }, []);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>
        Click Count double: {double}
      </button>
      <Counter count={double} 
      onClick={onClick}/>
    </div>
  );
}

export default MemoApp;
