import Topbar from './topbar/TopBar';
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route, Routes} from "react-router-dom";

function App() {
  return (
    <Router>
    <div className="App">
      <Topbar />
    </div>
      </Router>
  );
}

export default App;
