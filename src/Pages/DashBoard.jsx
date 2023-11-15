import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../Context/UserAuthContext";
import { useState } from "react";

export const Dashboard = () => {
  const { user, logOut, deleteUserAccount } = useUserAuth();
  const [isDeletingAccount, setIsDeletingAccount] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleDeleteUserAccount = () => {
    document.getElementById("my_modal_1").showModal();
  };
  const FinalDeleteUserHandler = async () => {
    try {
      setIsDeletingAccount(true); // Set state menjadi true saat proses penghapusan dimulai
      await deleteUserAccount();
      navigate("/");
    } catch (error) {
      console.error(error.message);
    } finally {
      setIsDeletingAccount(false); // Set state kembali menjadi false setelah proses selesai atau terjadi kesalahan
    }
  };

  const editAccountHandler = () => {
    navigate("/dashboard/test");
  };

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen gap-y-5">
      <h1 className="mt-5 text-3xl font-bold capitalize">dashboard</h1>
      <div className="block md:flex gap-x-4">
        <div className="w-full p-4 bg-white shadow-md md:w-2/5 sm:p-6 lg:p-8">
          <div className="flex items-center justify-between mb-3">
            <span className="block text-xl font-semibold capitalize">
              user Profile
            </span>
            <button
              onClick={editAccountHandler}
              className="px-3 py-1 text-sm font-bold text-white bg-gray-700 rounded-md - hover:bg-gray-800"
            >
              Edit
            </button>
          </div>
          <span className="text-gray-600">
            This information is secret so be careful
          </span>
          <div className="flex justify-center w-full p-8 mx-2">
            <img
              className="items-center w-32 max-w-xs border"
              src={user && user.photoURL}
              alt="user image"
            />
          </div>
          <button
            onClick={handleLogout}
            className="w-full px-3 py-1 text-sm font-bold text-white rounded-md btn btn-neutral"
          >
            log out
          </button>
        </div>
        <div className="w-full p-8 bg-white shadow-md md:w-3/5 lg:ml-4">
          <div className="p-6 rounded shadow">
            <div className="pb-6">
              <h1 className="block pb-1 font-semibold text-gray-700">Name</h1>
              <div className="flex">
                <h2 className="w-full px-4 py-2 text-sm rounded-r border-1">
                  {user ? user.displayName || "guest909089" : "guest909089"}
                </h2>
              </div>
            </div>
            <div className="pb-6">
              <h1 className="block pb-1 font-semibold text-gray-700 capitalize">
                email
              </h1>
              <div className="flex">
                <h2 className="w-full px-4 py-2 text-sm rounded-r border-1">
                  {user && user.email}
                </h2>
              </div>
            </div>
            <div className="pb-4">
              <span className="block pt-4 text-gray-600 opacity-70">
                Personal login information of your account
              </span>
            </div>
            <button
              onClick={handleDeleteUserAccount}
              className={`w-full py-1 text-sm font-bold text-center text-white capitalize rounded-md btn ${
                isDeletingAccount
                  ? "btn-disabled cursor-not-allowed"
                  : "btn-error"
              }`}
              disabled={isDeletingAccount} // Menggunakan atribut disabled agar tombol tidak dapat diklik selama proses berlangsung
            >
              {isDeletingAccount ? "please wait..." : "Delete Account"}
            </button>
          </div>
        </div>
      </div>
      {/* Open the modal using document.getElementById('ID').showModal() method */}

      <dialog id="my_modal_1" className="modal">
        <div className="flex flex-col modal-box gap-y-4">
          <h3 className="text-lg font-bold">Hello {user.displayName}</h3>
          <div className="alert alert-warning">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 stroke-current shrink-0"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <span>Warning: Are you sure you want to delete your account?</span>
          </div>
          <div className="flex items-center justify-around w-full modal-action gap-x-4">
            <form method="dialog" className="flex-1 capitalize">
              {/* if there is a button in form, it will close the modal */}
              <button className="w-full btn">cencel</button>
            </form>
            <button
              className={`w-full flex-1 py-1 text-sm font-bold text-center text-white capitalize rounded-md btn ${
                isDeletingAccount
                  ? "btn-disabled cursor-not-allowed"
                  : "btn-error"
              }`}
              onClick={FinalDeleteUserHandler}
            >
              {isDeletingAccount ? "please wait..." : "Delete my Account"}
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};
