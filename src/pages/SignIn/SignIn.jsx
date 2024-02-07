import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { loginUser, getUserProfile } from "../../redux/actions/userActions";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

import Header from "../../components/Header/Header";


// Composant de la page de connexion
const SignIn = () => {
  
  const [email, setEmail] = useState(localStorage.getItem("email") || "");
  const [password, setPassword] = useState(localStorage.getItem("password") || "");
  const [rememberMe, setRememberMe] = useState(localStorage.getItem("rememberMe") === "true");
  const [customError, setCustomError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loggedIn = localStorage.getItem("jwtToken") ? true : false;

  useEffect(() => {
      if (loggedIn) {
          navigate("/profile");
      }
  }, [loggedIn, navigate]);

  // Gestion du changement des informations pour gérer l'état local
  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "rememberMe") {
      setRememberMe(checked);
    }
  };

  // Gestion du submit des informations de connexion
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const token = await dispatch(loginUser({ email, password })).unwrap();
      localStorage.setItem("jwtToken", token);
      
      if (rememberMe) {
        localStorage.setItem("rememberMe", "true");
      } else {
        localStorage.removeItem("rememberMe");
      }
      
      dispatch(getUserProfile(token)).unwrap();
      navigate("/profile");
    } catch (error) {
      setCustomError("Your email or password is incorrect.");
    }
  };

  return (
    <>
      <Header />
      <main className="main bg-dark">
        <section className="sign-in-content">
          <FontAwesomeIcon icon={faUserCircle} />
          <h1>Sign In</h1>

          <form onSubmit={handleSubmit}>
            <div className="input-wrapper">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" value={email} onChange={handleChange} />
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" name="password" value={password} onChange={handleChange} />
            </div>
            <div className="input-remember">
              <input type="checkbox" id="remember-me" name="rememberMe" checked={rememberMe} onChange={handleChange} />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            {customError && <p className="error-message">{customError}</p>}
            <button className="sign-in-button" type="submit">Sign In</button>
          </form>
        </section>
      </main>
    </>
  );
}

export default SignIn;
