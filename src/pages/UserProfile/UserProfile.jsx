import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import UserAccount from "../../components/UserAccount/UserAccount";
import UserNameEdit from "../../components/UserNameEdit/UserNameEdit";
import Header from "../../components/Header/Header";

import { getUserProfile, updateUserProfile } from "../../redux/actions/userActions";

import accountData from "../../datas/accountData";

// Composant pour la page de profil utilisateur
const UserProfile = () => {
  const profile = useSelector((state) => state.user.profile);
  const error = useSelector((state) => state.user.error);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // On utilise un useState et un useEffect pour gérer l'affichage et le changement du nom et prénom
  const [displayName, setDisplayName] = useState("");

  useEffect(() => {
    if (profile && profile.body) {
      setDisplayName(`${profile.body.firstName} ${profile.body.lastName}`);
    }
  }, [profile]);

  // S'il n'y a pas de token, on est redirigé vers la page de profil, sinon, on récupère le profil
  useEffect(() => {
    const jwtToken = localStorage.getItem("jwtToken");
    if (!jwtToken) {
      navigate("/login");
    } else if (!profile || !profile.body || !profile.body.firstName) {
      dispatch(getUserProfile(jwtToken));
    }
  }, [dispatch, navigate, profile]);

  const handleNameUpdate = async (newName) => {
    const jwtToken = localStorage.getItem("jwtToken");
    const [firstName, lastName] = newName.split(" ").concat(["", ""]);
    const updatedProfile = { firstName, lastName };

    await dispatch(updateUserProfile({ token: jwtToken, updatedProfile }));
    setDisplayName(newName);
  };

  return (
    <>
      <Header />
      {error && <p className="error-message">Error: {error}</p>}
      <main className="main bg-dark">
        <div className="header">
          <h1 className="profile-title">Welcome back<br />{displayName}</h1>
          <UserNameEdit fullName={displayName} onSave={handleNameUpdate} />
        </div>
        <h2 className="sr-only">Accounts</h2>
        {accountData.map(account => (
          <UserAccount
            key={`${account.title}-${account.accountNumber}`}
            title={account.title}
            accountNumber={account.accountNumber}
            amount={account.amount}
            description={account.description}
          />
        ))}
      </main>
    </>
  );
};

export default UserProfile;
