import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../context/Context";
import "./topbar.css";

export default function TopBar() {
  const { user, dispatch } = useContext(Context);

  // LOGOUT
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" }); 
  };
  return (
    <div className="top">
      <div className="topLeft">
        <img
          className="logo-left"
          src="https://strive.school/assets/strive_logo_color.svg"
          alt=""
        />
        <a href="https://www.facebook.com/striveschool" target="_blank">
          {" "}
          <i className="topIcon fab fa-facebook-square"></i>
        </a>
        <a
          href="https://www.instagram.com/strive.school/?hl=en"
          target="_blank"
        >
          {" "}
          <i className="topIcon fab fa-instagram-square"></i>
        </a>
        <a href="https://twitter.com/strive_school" target="_blank">
          {" "}
          <i className="topIcon fab fa-twitter-square"></i>
        </a>
      </div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <Link className="link" to="/">
              HOME
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/">
              ABOUT
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/">
              CONTACT
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/write">
              WRITE
            </Link>
          </li>
          <li className="topListItem" onClick={handleLogout}>
            {/* If there's user, on click Logout */}
            {user && "LOGOUT"}
          </li>
        </ul>
      </div>
      <div className="topRight">
        {/* If there's user, link to Settings page */}
        {user ? (
          <Link to="/settings">
            <img
              className="topImg"
              src={user.profilePic}
              alt=""
            />
          </Link>
        ) : (
          <ul className="topList">
            <li className="topListItem">
              <Link className="link" to="/login">
                LOGIN
              </Link>
            </li>
            <li className="topListItem">
              <Link className="link" to="/register">
                REGISTER
              </Link>
            </li>
          </ul>
        )}
        <i className="topSearchIcon fas fa-search"></i>
      </div>
    </div>
  );
}
