import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Import fungsi getAuth dari Firebase Authentication

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FB_API_KEY,
  authDomain: import.meta.env.VITE_FB_AUTHDOMAIN,
  projectId: import.meta.env.VITE_FB_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FB_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FB_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FB_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);

// Dapatkan instance autentikasi menggunakan fungsi getAuth
export const auth = getAuth(app); // Buat variabel autentikasi dan ekspor, menggunakan instance app yang telah diinisialisasi

// Komentar: Dalam Firebase Authentication, fungsi getAuth() digunakan untuk mendapatkan objek autentikasi atau status autentikasi saat ini. Ini memungkinkan pemeriksaan apakah pengguna sudah masuk atau belum, serta memberikan akses ke informasi autentikasi pengguna.
export default app;
