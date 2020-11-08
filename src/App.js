 import './App.css';
 import MainContainer from "./Container/MainContainer"
 import { Route, Switch } from 'react-router-dom';
 import Chart from "./Components/Chart/Chart"


function App() {
  return (
    <div className="App">
     <Switch>
      <Route path="/details" component={Chart} />
      <Route path="/" component={MainContainer} />
    </Switch>
    </div>
  );
}

export default App;
