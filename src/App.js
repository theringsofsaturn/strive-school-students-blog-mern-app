import Topbar from "../src/component/topbar/TopBar";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes,
} from "react-router-dom";
import Header from "../src/component/header/Header";
import Sidebar from "../src/component/sidebar/Sidebar";
import Posts from "../src/component/posts/Posts";
import Homepage from "./pages/homepage/Homepage";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
// import SinglePost from './components/singlePost/SinglePost';

function App() {
  return (
    <Router>
      <Topbar />
      <Write/>
      {/* <Single /> */}
      {/* <Homepage /> */}
    </Router>
  );
}

export default App;
