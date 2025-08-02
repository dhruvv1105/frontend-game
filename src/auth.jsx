const BACKEND_URL = import.meta.env.VITE_BACKEND_URL; // For Vite
// If you're still using CRA (Create React App), use: process.env.REACT_APP_BACKEND_URL

export const login = () => {
  if (!BACKEND_URL) {
    console.error("BACKEND_URL is not defined");
    return;
  }
  window.location.href = `${BACKEND_URL}/auth/google`;
};

export const logout = () => {
  if (!BACKEND_URL) {
    console.error("BACKEND_URL is not defined");
    return;
  }
  window.location.href = `${BACKEND_URL}/auth/logout`;
};

export const getCurrentUser = async () => {
  if (!BACKEND_URL) {
    console.error("BACKEND_URL is not defined");
    return null;
  }

  try {
    const response = await fetch(`${BACKEND_URL}/auth/current_user`, {
      credentials: "include",
    });

    if (!response.ok) throw new Error("Failed to fetch current user");

    return await response.json();
  } catch (err) {
    console.error("Error fetching user:", err.message);
    return null;
  }
};
