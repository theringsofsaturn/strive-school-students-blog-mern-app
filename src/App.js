import Topbar from './topbar/TopBar';
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route, Routes} from "react-router-dom";
import Header from './header/Header';

function App() {
  return (
    <Router>
    <div className="App">
      <Topbar />
      <Header/>
    </div>
      </Router>
  );
}

export default App;
