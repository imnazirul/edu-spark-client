import axios from "axios";
import { useEffect } from "react";
import useAuth from "./useAuth";
import { useLocation, useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
  baseURL: "https://edu-manage-server-ten.vercel.app",
});

const useAxiosSecure = () => {
  const { logOut, loading } = useAuth();
  // console.log(logOut);
  const navigate = useNavigate();
  const location = useLocation();

  axiosSecure.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("access-token");
      config.headers.authorization = `Bearer ${token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  useEffect(() => {
    axiosSecure.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        const status = error?.response?.status;

        if (status === 401 || status === 403) {
          //logout the user
          if (!loading) {
            logOut()
              .then(() => {
                navigate("/login", { state: { from: location } });
              })
              .catch((err) => console.log(err));
          }
        }

        return Promise.reject(error);
      }
    );
  }, [loading, location, logOut, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;
