import { useState } from "react";
import { IoKeyOutline } from "react-icons/io5";
import { MdOutlineLaunch } from "react-icons/md";
import { Link } from "react-router-dom";
import { useUserAuth } from "../Context/UserAuthContext";

export const ForgotPassword = () => {
  const { resetPasswordAccount } = useUserAuth();
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);

  const handleResetPassword = async (event) => {
    event.preventDefault();

    setTimeout(() => {
      setSuccessMessage(null);
    }, 10000);

    try {
      await resetPasswordAccount(email);
      // Jika operasi berhasil tanpa error, Anda dapat menampilkan pesan sukses langsung
      setSuccessMessage("Password reset email sent successfully!");
    } catch (error) {
      // Menangani kesalahan Firebase
      console.error("Error sending reset email:", error.message);

      error.code === "auth/too-many-requests"
        ? setSuccessMessage("Please wait for a minute. Too many requests.")
        : setSuccessMessage(null);
    }
  };

  return (
    <div className="max-w-lg p-8 mx-auto my-10 bg-white shadow rounded-xl shadow-slate-300">
      <h1 className="text-4xl font-medium">Reset Password</h1>
      <p className="text-slate-500">Fill up the form to reset the password</p>
      {successMessage && (
        <div className="w-full p-2 my-2 text-green-800 bg-green-200 rounded-md">
          {successMessage}
        </div>
      )}
      <form className="my-5" onSubmit={handleResetPassword}>
        <div className="flex flex-col space-y-5">
          <label htmlFor="email" className="font-medium text-slate-700">
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="w-full px-3 py-3 border rounded-lg border-slate-200 focus:outline-none focus:border-slate-500 hover:shadow"
            placeholder="Enter email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            type="submit"
            className="inline-flex items-center justify-center w-full py-3 space-x-2 font-medium text-white bg-indigo-600 border-indigo-500 rounded-lg hover:bg-indigo-500 hover:shadow"
          >
            <IoKeyOutline />
            <span>Reset Password</span>
          </button>
          <p className="text-center">
            Not registered yet?{" "}
            <Link
              to="/register"
              className="inline-flex items-center space-x-1 font-medium text-indigo-600"
            >
              <span>Register now </span>
              <MdOutlineLaunch />
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};
