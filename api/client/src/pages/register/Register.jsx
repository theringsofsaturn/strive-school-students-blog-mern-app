import "./register.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { axiosInstance } from "../../config";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault(); // To prevent refrshing after submitting
    setError(false); // Reset the error state to false.
    try {
      const res = await axiosInstance.post("/auth/register", {
        // Will send this data when registering as specified in the backend as required.
        username,
        email,
        password,
      });
      console.log("Registration Data", res);
      // If the response is successful and there are no errors, then redirect to the login page.
      res.data && window.location.replace("/login");
    } catch (err) {
      setError(true); // If any error, set the error state to true. The user will need to write the correct data.
    }
  };

  return (
    <div className="register">
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          className="registerInput"
          type="text"
          placeholder="Enter your username..."
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Email</label>
        <input
          className="registerInput"
          type="text"
          placeholder="Enter your email..."
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password</label>
        <input
          className="registerInput"
          type="password"
          placeholder="Enter your password..."
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="registerButton" type="submit">
          Register
        </button>
      </form>
      {/* <button className="registerLoginButton">
        <Link className="link" to="/login">
          Login
        </Link>
      </button> */}
      {error && (
        <span style={{ color: "red", marginTop: "10px" }}>
          Something went wrong!
        </span>
      )}
    </div>
  );
};

export default Register;
