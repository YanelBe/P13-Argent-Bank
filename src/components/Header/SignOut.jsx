import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/reducers/userReducer";
import { useNavigate, Link } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOut } from '@fortawesome/free-solid-svg-icons';


// Composant pour gérer la déconnexion, supprime le token et renvoie vers la page d'accueil
const SignOut = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    localStorage.removeItem("jwtToken");
    navigate("/");
  };

  return (
    <Link className="main-nav-item" to="/" onClick={handleLogout}>
      <FontAwesomeIcon icon={faSignOut} />
      {' '}
      Sign Out
    </Link>
  );
};

export default SignOut;
