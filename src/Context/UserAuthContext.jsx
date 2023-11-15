import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  deleteUser,
  reauthenticateWithPopup,
} from "firebase/auth";
import { auth } from "../FireBase/FireBaseConfig";

const UserAuthContext = createContext();

export const UserAuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // fungsi untuk register akun
  const signUp = async (email, password) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Error signing up:", error.message);
      throw error;
    }
  };

  // fungsi untuk login akun
  const logIn = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Error signing in:", error.message);
      throw error;
    }
  };

  // Fungsi login dengan akun Google
  const gooogleSignIn = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  // fungsi reset password akun
  const resetPasswordAccount = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      console.error("Error resetting password:", error.message);
      throw error;
    }
  };

  // Fungsi hapus akun pengguna
  const deleteUserAccount = async () => {
    try {
      if (!user) {
        console.error("No user is currently signed in.");
        return;
      }

      // Periksa apakah user login dengan email
      if (isEmailProvider(user)) {
        await deleteUser(user);
        console.log("User account deleted successfully");
        return;
      }

      // Buat instance provider Google untuk mendapatkan credential Google
      const googleProvider = new GoogleAuthProvider();

      try {
        // Coba merefresh token pengguna
        await reauthenticateWithPopup(user, googleProvider);
      } catch (refreshError) {
        console.error("Error refreshing user token:", refreshError.message);
        throw refreshError;
      }

      // Setelah di autentikasi, hapus akun pengguna
      // setelah berhasil reautentikasi
      await deleteUser(user);

      console.log("User account deleted successfully");
    } catch (error) {
      console.error("Error deleting user account:", error.message);
      throw error;
    }
  };

  // Fungsi bantu untuk menentukan apakah pengguna login menggunakan email
  const isEmailProvider = (user) => {
    return user.providerData?.[0]?.providerId === "password";
  };

  // fungsi untuk logout
  const logOut = () => {
    signOut(auth)
      .then(() => {
        console.info("logout successful");
      })
      .catch((error) => {
        // Tangani kesalahan jika logout gagal
        console.error("Logout error:", error);
      });
  };

  // mengambil current user setiap komponen  childe  di mounts / render
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });

    return () => {
      // Memastikan untuk unsubscribe saat komponen dilepas (unmounted)
      unsubscribe();
    };
  }, []);

  console.info(user);
  return (
    <UserAuthContext.Provider
      value={{
        user,
        signUp,
        logIn,
        logOut,
        gooogleSignIn,
        resetPasswordAccount,
        deleteUserAccount,
      }}
    >
      {children}
    </UserAuthContext.Provider>
  );
};

UserAuthContextProvider.propTypes = {
  children: PropTypes.node,
};

export const useUserAuth = () => {
  return useContext(UserAuthContext);
};
