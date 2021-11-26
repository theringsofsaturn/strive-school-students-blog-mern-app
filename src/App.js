import Topbar from './topbar/TopBar';
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route, Routes} from "react-router-dom";
import Header from './header/Header';
import Sidebar from "./sidebar/Sidebar"
import Posts from "./posts/Posts"

function App() {
  return (
    <Router>
    <div className="App">
      <Topbar />
      <Header/>
      <Sidebar/>
      <Posts/>
    </div>
      </Router>
  );
}

export default App;
