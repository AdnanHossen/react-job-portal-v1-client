import { useState } from "react";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa6";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import { getFriendlyAuthError } from "../../hooks/useAuthErros";
import { toast } from "react-toastify";
import axios from "axios";

const Login = () => {
  // navigate
  const navigate = useNavigate();
  // context value
  const { signInAuth, signInGoogle } = useAuth();
  const location = useLocation();
  console.log(location);
  const from = location?.state || "/";

  // password toggle
  const [showPassword, setShowPassword] = useState(false);

  // toggle function
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const values = Object.fromEntries(formData.entries());
    const { email, password } = values;

    //   register in firebase
    try {
      // signin to firebase
      const userCredential = await signInAuth(email, password);
      // if successful
      console.log(userCredential?.user);

      // show toast on success
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

      // navigate to state or home
      navigate(from);
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
      console.log(userCredential?.user);
      const user = userCredential?.user?.email;
      // call token api
      axios
        .post(`http://localhost:5000/jwt`, { user }, { withCredentials: true })
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
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
          Hi, Welcome Back!
        </h2>

        {/* form field */}
        <form className="space-y-4 sm:space-y-5" onSubmit={handleSubmit}>
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
            LOGIN
          </button>
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
            Login with Google
          </button>
        </div>
        <p className="text-center text-xs sm:text-sm mt-3 sm:mt-4">
          Do not have an account?{" "}
          <Link to={"/register"} className="text-green-600">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
