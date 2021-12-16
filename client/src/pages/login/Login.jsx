import axios from "axios";
import { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";

import Google from "../../assets/google.png";
import Facebook from "../../assets/facebook.png";
import Github from "../../assets/github.png";

import "./login.css";

const Login = () => {
  const Login = () => {
    const google = () => {
      window.open("http://localhost:5000/auth/google", "_self");
    };

    const github = () => {
      window.open("http://localhost:5000/auth/github", "_self");
    };

    const facebook = () => {
      window.open("http://localhost:5000/auth/facebook", "_self");
    };

    const userRef = useRef();
    const passwordRef = useRef();
    const { dispatch, isFetching } = useContext(Context); // Pass 'user' as a first argument {user, dispatch, isFetching } to console log the user

    // Function to handle the login form
    const handleSubmit = async (e) => {
      e.preventDefault();
      // When I click the button Login, it will call LOGIN_START action, it will update so, isFetching to true, and we can make our API call.
      dispatch({ type: "LOGIN_START" });
      try {
        const res = await axios.post("http://localhost:3001/api/auth/login", {
          // Pass the data that we required on the backend part
          username: userRef.current.value,
          password: passwordRef.current.value,
        });
        // If there's response, it means it's successful, so we can dispatch LOGIN_SUCCESS action, and we can update the state to the user.
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      } catch (err) {
        dispatch({ type: "LOGIN_FAILURE" });
      }
    };
    // console.log("User Login",user);

    return (
      <div className="login">
        <h1 className="loginTitle">Choose a Login Method</h1>
        <div className="wrapper">
          <div className="left">
            <div className="loginButton google" onClick={google}>
              <img src={Google} alt="" className="icon" />
              Google
            </div>
            <div className="loginButton facebook" onClick={facebook}>
              <img src={Facebook} alt="" className="icon" />
              Facebook
            </div>
            <div className="loginButton github" onClick={github}>
              <img src={Github} alt="" className="icon" />
              Github
            </div>
          </div>
          <div className="center">
            <div className="line" />
            <div className="or">OR</div>
          </div>
          <div className="right">
            {/* <input type="text" placeholder="Username" />
            <input type="text" placeholder="Password" />
            <button className="submit">Login</button> */}
            <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          className="loginInput"
          type="text"
          placeholder="Enter your username..."
          ref={userRef}
        />
        <label>Password</label>
        <input
          className="loginInput"
          type="password"
          placeholder="Enter your password..."
          ref={passwordRef}
        />
        <button className="loginButton" type="submit" disabled={isFetching}> 
        {/* disabled={isFetching} --> Make this disabled if isFetching */}
        {/* Added styles: if disabled, cursor not allowed and red color */}
          Login
        </button>
      </form>
      <button className="loginRegisterButton">Register</button>
          </div>
        </div>
      </div>
    );
  };
};

export default Login;
