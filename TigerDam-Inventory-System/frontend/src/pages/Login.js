import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useItemsContext } from "../hooks/useItemContext";
import logo from "../images/US-Flood-Control-logo.png";
import "../css/Login.css";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!username || !password) {
      setError("Please provide both username and password");
      return;
    }

    fetch("https://tiger-inventory-backend.onrender.com/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((response) => {
        if(response.message === "User authenticated successfully"){
          localStorage.setItem("user", JSON.stringify(response.user));
        navigate("/");
        } else {
          setError(response.message)
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <>
      <div className="Login_Contents">
        <svg className="Login_circlef" fill="none" viewBox="50 0 946 946">
          <circle cx="12.25%" cy="50%" r="46%" fill="#FC771C" />
          <circle cx="12.25%" cy="50%" r="28%" fill="#183040" />
        </svg>
        <div className="Login_Form">
          <div className="Login_Top">
            <img src={logo} className="Login_logo" alt="Italian Trulli"></img>
            <h1 className="Login_label">LOGIN</h1>
          </div>
          <div className="Login_Bottom">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className="Login_username"
              />

              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="Login_password"
              />
              <button className="Login_Button">Login</button>
              {error && <div className="error-login">{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
