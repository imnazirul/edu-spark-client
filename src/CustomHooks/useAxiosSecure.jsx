import axios from "axios";
import { useEffect } from "react";
import useAuth from "./useAuth";
import { useLocation, useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
  baseURL: "http://localhost:5000",
});

const useAxiosSecure = () => {
  const { logOut } = useAuth();
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
          logOut()
            .then(() => {
              navigate("/login", { state: { from: location } });
            })
            .catch((err) => console.log(err));
        }

        return Promise.reject(error);
      }
    );
  }, [location, logOut, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;
