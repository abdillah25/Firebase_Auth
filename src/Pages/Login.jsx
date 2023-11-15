import { FcGoogle } from "react-icons/fc";
import { MdAlternateEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { TbLogin2 } from "react-icons/tb";
import { IoPersonAddOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../Context/UserAuthContext";
import { useState } from "react";

export const Login = () => {
  const { logIn, gooogleSignIn } = useUserAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [emailAndPassword, setEmailAndPassword] = useState({
    email: "",
    password: "",
  });

  const onChangeHandler = (key, event) => {
    setEmailAndPassword((prevValue) => ({
      ...prevValue,
      [key]: event.target.value,
    }));
  };

  const googleLoginHandler = async (event) => {
    event.preventDefault();
    try {
      await gooogleSignIn();
      navigate("/dashboard");
    } catch (error) {
      console.error("Error during Google login:", error.message);
    }
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setError("");
    try {
      await logIn(emailAndPassword.email, emailAndPassword.password);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error during sign-in:", error);
      if (error.code === "auth/invalid-login-credentials") {
        setError("Please check your email or password.");
      } else if (error.code === "auth/too-many-requests") {
        setError("Please wait a minute. Too many requests.");
      } else {
        setError(error.code);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-5 overflow-y-hidden bg-gray-300">
      <div className="flex flex-col w-full max-w-sm px-4 py-8 bg-white rounded-md shadow-md sm:px-6 md:px-8 lg:px-10">
        <div className="self-center text-xl font-medium text-gray-800 uppercase sm:text-2xl">
          Login To Your Account
        </div>
        <button
          onClick={googleLoginHandler}
          className="relative py-2 mt-6 text-sm text-gray-800 bg-gray-100 border rounded-md hover:bg-gray-200"
        >
          <span className="absolute top-0 left-0 flex items-center justify-center w-10 h-full text-blue-500">
            <FcGoogle />
          </span>
          <span>Login with Google</span>
        </button>
        <div className="relative h-px mt-10 bg-gray-300">
          <div className="absolute top-0 left-0 flex justify-center w-full -mt-2">
            <span className="px-4 text-xs text-gray-500 uppercase bg-white">
              Or Login With Email
            </span>
          </div>
        </div>
        {error && (
          <div className="w-full px-3 py-3 mt-5 text-red-900 bg-red-200 rounded-md">
            {error}
          </div>
        )}
        <div className="mt-10">
          <form onSubmit={submitHandler}>
            <div className="flex flex-col mb-6">
              <label
                htmlFor="email"
                className="mb-1 text-xs tracking-wide text-gray-600 sm:text-sm"
              >
                E-Mail Address:
              </label>
              <div className="relative">
                <div className="absolute top-0 left-0 inline-flex items-center justify-center w-10 h-full text-gray-400">
                  <MdAlternateEmail />
                </div>
                <input
                  id="email"
                  type="email"
                  name="email"
                  className="w-full py-2 pl-10 pr-4 text-sm placeholder-gray-500 border border-gray-400 rounded-lg sm:text-base focus:outline-none focus:border-blue-400"
                  placeholder="E-Mail Address"
                  onChange={(event) => onChangeHandler("email", event)}
                />
              </div>
            </div>
            <div className="flex flex-col mb-6">
              <label
                htmlFor="password"
                className="mb-1 text-xs tracking-wide text-gray-600 sm:text-sm"
              >
                Password:
              </label>
              <div className="relative">
                <div className="absolute top-0 left-0 inline-flex items-center justify-center w-10 h-full text-gray-400">
                  <RiLockPasswordLine />
                </div>
                <input
                  id="password"
                  type="password"
                  name="password"
                  className="w-full py-2 pl-10 pr-4 text-sm placeholder-gray-500 border border-gray-400 rounded-lg sm:text-base focus:outline-none focus:border-blue-400"
                  placeholder="Password"
                  onChange={(event) => onChangeHandler("password", event)}
                />
              </div>
            </div>
            <div className="flex items-center mb-6 -mt-4">
              <div className="flex ml-auto">
                <Link
                  to={"/resetPassword"}
                  href="#"
                  className="inline-flex text-xs text-blue-500 sm:text-sm hover:text-blue-700"
                >
                  Forgot Your Password?
                </Link>
              </div>
            </div>
            <div className="flex w-full">
              <button
                type="submit"
                className="flex items-center justify-center w-full py-2 text-sm text-white transition duration-150 ease-in bg-blue-600 rounded focus:outline-none sm:text-base hover:bg-blue-700"
              >
                <span className="mr-2 uppercase">Login</span>
                <TbLogin2 />
              </button>
            </div>
          </form>
        </div>
        <div className="flex items-center justify-center mt-6">
          <Link
            to={"/register"}
            className="inline-flex items-center text-xs font-bold text-center text-blue-500 hover:text-blue-700"
          >
            <IoPersonAddOutline />
            <span className="ml-2">You don&apos;t have an account?</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
