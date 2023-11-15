import { MdAlternateEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { TbLogin2 } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../Context/UserAuthContext";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";

export const Register = () => {
  const { signUp, gooogleSignIn } = useUserAuth(); // ini di dapat dari file context
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [emailAndPassword, setEmailAndPassword] = useState({
    email: "",
    password: "",
  });

  const onChangeHandler = (key, event) => {
    setEmailAndPassword((prefValue) => ({
      ...prefValue,
      [key]: event.target.value,
    }));
  };

  const googleSignUpHandler = async (event) => {
    event.preventDefault();

    try {
      await gooogleSignIn();
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  const submitHandler = async (event) => {
    event.preventDefault();
    setError("");
    try {
      await signUp(emailAndPassword.email, emailAndPassword.password);
      navigate("/");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setError("Email is already in use. Please use another email.");
      } else if (error.code === "auth/weak-password") {
        setError(" Password should be at least 6 characters ");
      } else if (error.code === "auth/missing-password") {
        setError("please check your password");
      } else if (error.code === "auth/missing-email") {
        setError("please check your email address");
      } else {
        setError("An error occurred during registration. Please try again.");
      }
      console.error("Error during sign up:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-300">
      <div className="flex flex-col w-full max-w-sm px-4 py-8 bg-white rounded-md shadow-md sm:px-6 md:px-8 lg:px-10">
        <div className="self-center text-xl font-medium text-gray-800 uppercase sm:text-2xl">
          register Your Account
        </div>
        {error && (
          <div className="w-full px-3 py-3 mt-5 text-red-900 bg-red-200 rounded-md">
            {error}
          </div>
        )}
        <button
          onClick={googleSignUpHandler}
          className="relative py-2 mt-6 text-sm text-gray-800 bg-gray-100 border rounded-md hover:bg-gray-200"
        >
          <span className="absolute top-0 left-0 flex items-center justify-center w-10 h-full text-blue-500">
            <FcGoogle />
          </span>
          <span>register with Google</span>
        </button>
        <div className="relative h-px mt-10 mb-3 bg-gray-300">
          <div className="absolute top-0 left-0 flex justify-center w-full -mt-2">
            <span className="px-4 text-xs text-gray-500 uppercase bg-white">
              Or register With Email
            </span>
          </div>
        </div>
        <div className="mt-5">
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

            <div className="flex w-full">
              <button
                type="submit"
                className="flex items-center justify-center w-full py-2 text-sm text-white transition duration-150 ease-in bg-blue-600 rounded focus:outline-none sm:text-base hover:bg-blue-700"
              >
                <span className="mr-2 uppercase">register</span>
                <span>
                  <TbLogin2 />
                </span>
              </button>
            </div>
          </form>
        </div>
        <div className="flex items-center justify-center mt-6">
          <Link
            to={"/"}
            className="inline-flex items-center text-xs font-bold text-center text-blue-500 hover:text-blue-700"
          >
            <span className="ml-2">already have an account?</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
