import { useState } from "react";

// Composant pour gérer le changement de nom de l'utilisateur
const UserNameEdit = ({ fullName, onSave }) => {

  // On définit l'état qui servira à dire si un edit est en cours ou non
  const [editing, setEditing] = useState(false);

  // On utilise un état pour gérer le nom complet
  const [name, setName] = useState({
    firstName: fullName.split(" ")[0] || "",
    lastName: fullName.split(" ").slice(1).join(" ") || ""
  });

  // On gère l'enregistrement du nouveau nom, avec un nom et prénom requis
  const handleSave = () => {
    if (!name.firstName.trim() || !name.lastName.trim()) {
      alert("Both first name and last name are required.");
      return;
    }
    const newName = `${name.firstName.trim()} ${name.lastName.trim()}`;
    onSave(newName);
    setEditing(false);
  };

  // On gère la fonction du bouton d'annulation d'edit 
  const handleCancel = () => {
    setName({
      firstName: fullName.split(" ")[0] || "",
      lastName: fullName.split(" ").slice(1).join(" ") || ""
    });
    setEditing(false);
  };

  // handleChange tilise setName pour mettre à jour l'état du nom
  const handleChange = (e, field) => {
    setName({ ...name, [field]: e.target.value });
  };

  // On gère l'appui sur entrée pour valider
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSave();
    }
  };

  return !editing ? (
    <button className="edit-button" onClick={() => setEditing(true)}>
      Edit Name
    </button>
  ) : (
    <div className="input-wrapper-edit">
      <div className="input-container">
        <label>First Name</label>
        <input
          type="text"
          placeholder="Tony"
          value={name.firstName}
          onChange={(e) => handleChange(e, "firstName")}
          onKeyDown={handleKeyPress}
        />
      </div>  
      <div className="input-container">
      <label>Last Name</label>
        <input
          type="text"
          placeholder="Jarvis"
          value={name.lastName}
          onChange={(e) => handleChange(e, "lastName")}
          onKeyDown={handleKeyPress}
        />
      </div>
      <div className="button-container">
        <button className="edit-button" onClick={handleSave}>Save</button>
        <button className="edit-button" onClick={handleCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default UserNameEdit;
