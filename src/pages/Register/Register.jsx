import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa6";
import { Link, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import { toast } from "react-toastify";
import { getFriendlyAuthError } from "../../hooks/useAuthErros";

const Register = () => {
  // navigate
  const navigate = useNavigate();
  // const context value
  const { signUpAuth, signInGoogle } = useAuth();

  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  // sign in with email-pass
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const values = Object.fromEntries(formData.entries());
    const { email, password } = values;

    //   register in firebase
    try {
      const userCredential = await signUpAuth(email, password);
      console.log(userCredential.user);
      toast.success("Account successfully created", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      navigate("/");
    } catch (error) {
      console.log(error);
      const friendlyError = getFriendlyAuthError(error);
      console.log(friendlyError);

      toast.error(friendlyError, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  // sign in with google
  const handleGoogle = async () => {
    try {
      const userCredential = await signInGoogle();
      console.log(userCredential.user);
      toast.success("Successfully logged in", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      navigate("/");
    } catch (error) {
      console.log(error);
      const friendlyError = getFriendlyAuthError(error);
      toast.error(friendlyError, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  // return code
  return (
    <div className="min-h-screen flex justify-center items-center p-4 sm:p-6 md:p-8">
      <div className="card w-full max-w-sm sm:max-w-md md:max-w-lg bg-white shadow-lg rounded-lg p-4 sm:p-6 md:p-8">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-2 sm:mb-4">
          Create Account
        </h2>

        {/* form field */}
        <form className="space-y-4 sm:space-y-5" onSubmit={handleSubmit}>
          {/* name field */}
          <div>
            <label className="label text-sm sm:text-base">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Name*"
              className="input input-bordered w-full bg-gray-100 text-sm sm:text-base"
            />
          </div>

          {/* email field */}
          <div>
            <label className="label text-sm sm:text-base">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email*"
              className="input input-bordered w-full bg-gray-100 text-sm sm:text-base"
            />
          </div>

          {/* password field */}
          <div className="relative">
            <label className="label text-sm sm:text-base">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password*"
              name="password"
              className="input input-bordered w-full bg-gray-100 pr-10 text-sm sm:text-base"
            />
            <span
              className="absolute inset-y-0 right-0 top-6 sm:top-7 flex items-center pr-3 cursor-pointer"
              onClick={togglePassword}
            >
              {showPassword ? (
                <span className="text-gray-500">
                  <FaEyeSlash />
                </span>
              ) : (
                <span className="text-gray-500">
                  <FaEye />
                </span>
              )}
            </span>
          </div>

          {/* checkbox field */}
          {/* <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="checkbox checkbox-sm sm:checkbox-md"
            />
            <span className="text-xs sm:text-sm">
              By hitting the Register button, you agree to the Terms &
              Conditions & Privacy Policy
            </span>
          </div> */}

          {/* submit button */}
          <button
            type="submit"
            className="btn btn-block bg-green-700 text-white text-sm sm:text-base"
          >
            REGISTER
          </button>
          {/* submit button end */}
        </form>
        <div className="text-center my-3 sm:my-4 text-sm sm:text-base">OR</div>
        <div className="flex justify-center space-x-4">
          <button
            className="btn btn-outline flex items-center text-sm sm:text-base"
            onClick={handleGoogle}
          >
            <span className="mr-2">
              <FaGoogle />
            </span>{" "}
            Sign up with Google
          </button>
        </div>
        <p className="text-center text-xs sm:text-sm mt-3 sm:mt-4">
          Have an account?{" "}
          <Link to={"/login"} className="text-green-600">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
