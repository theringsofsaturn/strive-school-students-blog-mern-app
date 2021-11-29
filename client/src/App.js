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
import Settings from "./pages/settings/Settings";
import Login from "./pages/Login/Login";
import Register from "./pages/register/Register";

function App() {
  const currentUser = false;
  return (
    <Router>
      <Topbar />
      <Routes>
        <Route path="/" element={<Homepage />} />

        <Route path="/posts" element={<Homepage />} />

        <Route
          path="/register"
          element={currentUser ? <Homepage /> : <Register />}
        />

        <Route path="/login" element={currentUser ? <Homepage /> : <Login />} />

        <Route path="/post/:id" element={<Single />} />

        {/* Will enable after enabling the user */}
        {/* <Route path="/write" element={currentUser ? <Write /> : <Login />} /> */}
        <Route path="/write" element={<Write />} />

        <Route path="/settings" element={<Settings />} />
         {/* Will enable after enabling the user */}
        {/* <Route
          path="/settings"
          element={currentUser ? <Settings /> : <Login />}
        /> */}

        {/* <Route path="/register">{user ? <Home /> : <Register />}</Route>
        <Route path="/login">{user ? <Home /> : <Login />}</Route>
        <Route path="/write">{user ? <Write /> : <Register />}</Route>
        <Route path="/settings">{user ? <Settings /> : <Register />}</Route> */}
      </Routes>
    </Router>
  );
}

export default App;
