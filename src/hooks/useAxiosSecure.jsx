import { useEffect, useMemo } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router";
import axios from "axios";

const useAxiosSecure = () => {
  // auth values
  const { signOutAuth } = useAuth();
  // navigate
  const navigate = useNavigate();

  // create instance
  const axiosInstance = useMemo(() => {
    const instance = axios.create({
      baseURL: "http://localhost:5000",
      withCredentials: true,
    });
    return instance;
  }, []);

  // side effect
  useEffect(() => {
    // response interceptor
    const responseInterceptor = axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        if (error.response?.status === 401 || error.response?.status === 403) {
          try {
            await signOutAuth();
            navigate("/login", { replace: true });
          } catch (err) {
            console.log(err);
          }
        }
        return Promise.reject(error);
      }
    );

    //   cleanup interceptor
    return () => {
      // Cleanup interceptor when component unmounts or dependencies change
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [axiosInstance, signOutAuth, navigate]);

  return axiosInstance;
};

export default useAxiosSecure;
