import Topbar from './topbar/TopBar';
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route, Routes} from "react-router-dom";
import Header from './header/Header';
import Sidebar from "./sidebar/Sidebar"
import Posts from "./posts/Posts"
import Homepage from './pages/homepage/Homepage';

function App() {
  return (
    <Router>
      <Topbar />
    <div className="App">
     <Homepage/>
    </div>
      </Router>
  );
}

export default App;
