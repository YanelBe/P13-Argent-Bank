import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import logo from "../../assets/argentBankLogo.png"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

import SignOut from "./SignOut";


// Composant pour l'affichge d'une navbar, avec affichage conditionnel selon la connexion ou non d'un utilisateur
const Header = () => {

    // Le hook useSelector permet ici de définir le statut de connexion ainsi que le nom de l'utilisateur
    const { isLoggedIn, displayName } = useSelector(state => {
        const user = state.user.profile;
        const isLoggedIn = !!user;
        const displayName = user && user.body ? `${user.body.firstName} ${user.body.lastName}` : '';
        return { isLoggedIn, displayName };
    });
  
    return (
        <nav className="main-nav">
            <Link to="/" className="main-nav-logo">
                <img
                    src={logo}
                    alt="Argent Bank Logo"
                    className="main-nav-logo-image"
                />
                <h1 className="sr-only">Argent Bank</h1>
            </Link>
            <div>
                {isLoggedIn ? (
                    <>
                        <Link to="/profile" className="main-nav-item">
                            <FontAwesomeIcon icon={faUserCircle} />
                            {' '}
                            {displayName}
                        </Link>
                        <SignOut />
                    </>
                ) : (
                    <Link to="/login" className="main-nav-item">
                        <FontAwesomeIcon icon={faUserCircle} />
                        {' '}
                        Sign In
                    </Link>
                )}
            </div>
        </nav>
    );
};

export default Header;
