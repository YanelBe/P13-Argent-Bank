import axiosInstance from "./axiosInstance";

// Fonctions pour intéragir avec l'API, pour la connexion, la récupération de profil et la mise à jour de profil
export const loginUser = async (email, password) => {
  try {
    const response = await axiosInstance.post("/user/login", {
      email: email,
      password: password,
    });
    const jwtToken = response.data.body.token;
    return jwtToken;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};


export const getUserProfile = async () => {
  try {
    const response = await axiosInstance.post("/user/profile");
    return {
      status: response.data.status,
      message: response.data.message,
      body: response.data.body,
    };
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
};

// On rajoute le token dans le header d'autorisation ici aussi, pour éviter les erreurs
export const updateUserProfile = async (jwtToken, updatedProfile) => {
  try {
    const response = await axiosInstance.put("/user/profile", updatedProfile, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });
    if (response.status !== 200) {
      throw new Error("Erreur lors de la mise à jour du profil.");
    }
    return response.data.body;
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw error;
  }
};

