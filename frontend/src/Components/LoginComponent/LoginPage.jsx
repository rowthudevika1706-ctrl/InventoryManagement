import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateUser } from "../../Services/LoginService";
import "../../DisplayView.css";

const LoginPage = () => {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    username: "",
    password: ""
  });

  const [errors, setErrors] = useState({});
  const [flag, setFlag] = useState(true);
  const [loading, setLoading] = useState(false);

  /* ================================
        Input Change Handler
  ================================== */
  const onChangeHandler = (e) => {
    setFlag(true);
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  /* ================================
        Login API Call
  ================================== */
  const validateLogin = () => {
    setLoading(true);

    validateUser(loginData.username, loginData.password)
      .then((response) => {
        let role = String(response.data);

        if (role === "Admin")
          navigate("/admin-menu");
        else if (role === "Manager")
          navigate("/manager-menu");
        else if (role === "Vendor")
          navigate("/vendor-menu");
        else
          setFlag(false);
      })
      .catch(() => setFlag(false))
      .finally(() => setLoading(false));
  };

  /* ================================
        Form Validation
  ================================== */
  const handleValidation = (e) => {
    e.preventDefault();

    let tempErrors = {};
    let isValid = true;

    if (!loginData.username.trim()) {
      tempErrors.username = "Username is required";
      isValid = false;
    }

    if (!loginData.password.trim()) {
      tempErrors.password = "Password is required";
      isValid = false;
    }

    setErrors(tempErrors);

    if (isValid) validateLogin();
  };

  /* ================================
        Register Navigation
  ================================== */
  const handleRegister = () => {
    navigate("/register");
  };

  /* ================================
        UI
  ================================== */
  return (
    <div className="main-container">

      {/* LEFT PANEL */}
      <div className="overlay">
        <div>
          <h1>SmartShelfX</h1>
          <p className="tagline">Intelligent Inventory. Zero Guesswork.</p>

          <p className="description">
            SmartShelfX transforms inventory management with AI-driven demand forecasting.
            Predict stock needs with precision, eliminate stockouts, and prevent overstocking —
            all in real time.
          </p>

          <ul className="features">
            <li>AI-Powered Forecasting</li>
            <li>Real-Time Stock Monitoring</li>
            <li>Automated Restocking</li>
            <li>Smart Purchase Order Suggestions</li>
          </ul>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="right-panel">
        <div className="form-box">

          <h2>Sign In</h2>

          <form onSubmit={handleValidation}>

            <div className="input-group">
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={loginData.username}
                onChange={onChangeHandler}
              />
              {errors.username && <span className="error">{errors.username}</span>}
            </div>

            <div className="input-group">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={loginData.password}
                onChange={onChangeHandler}
              />
              {errors.password && <span className="error">{errors.password}</span>}
            </div>

            <button type="submit" disabled={loading}>
              {loading ? "Signing In..." : "Login"}
            </button>

            {!flag && (
              <p className="error-msg">
                Invalid Username or Password
              </p>
            )}

            {/* REGISTER SECTION */}
            <p className="register-text p-3 m-2">
              Don’t have an account?{" "}
              <span className="register-link" onClick={handleRegister}>
                Register
              </span>
            </p>

          </form>
        </div>
      </div>

    </div>
  );
};

export default LoginPage;