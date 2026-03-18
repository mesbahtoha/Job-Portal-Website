import axios from "axios";
import { useEffect } from "react";
import { useAuth } from "../useAuth";

const axiosInstance = axios.create({
  baseURL: "https://carrer-code-server-six.vercel.app",
});

const useAxiosSecure = () => {
  const { user, signOutUser } = useAuth();

  useEffect(() => {
    const requestInterceptor = axiosInstance.interceptors.request.use(
      (config) => {
        if (user?.accessToken) {
          config.headers.authorization = `Bearer ${user.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const status = error?.response?.status;

        if (status === 401 || status === 403) {
          try {
            await signOutUser();
            console.log("User signed out for unauthorized access");
          } catch (err) {
            console.log(err);
          }
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [user, signOutUser]);

  return axiosInstance;
};

export default useAxiosSecure;