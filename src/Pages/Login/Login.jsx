/* eslint-disable react/no-unescaped-entities */
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import toast from "react-hot-toast";
import useAuth from "../../CustomHooks/useAuth";
import usePublicMutationPost from "../../CustomHooks/usePublicMutationPost";
import { Helmet } from "react-helmet-async";

const Login = () => {
  const mutation = usePublicMutationPost("/users");
  const [showPassword, setShowPassword] = useState(false);
  const { signIn, setLoading, signInWithGoogle } = useAuth();
  const [btnText, setBtnText] = useState("Sign In");
  const location = useLocation();
  const navigate = useNavigate();
  const from = location?.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = (formData) => {
    const { email, password } = formData;

    setBtnText(
      <div role="status" className="flex gap-1 items-center">
        <div className="border-t-white h-7 w-7 animate-spin rounded-full border-[3px] border-blue-400" />
        <span className="text-white text-[16px]">Logging In...</span>
      </div>
    );

    signIn(email, password)
      .then((res) => {
        const user = {
          name: res.user?.displayName,
          email: email,
          role: "student",
          photoURL: res.user?.photoURL,
        };
        mutation.mutate(user);
        toast.success("Sign In Successful");
        navigate(from, { replace: true });
      })
      .catch((err) => {
        setBtnText("Sign In");
        setLoading(false);
        if (err.message === "Firebase: Error (auth/invalid-credential).") {
          toast.error("Invalid Email Or Password");
        } else {
          toast.error("An Unknown Error Occurred");
        }
      });
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((res) => {
        //create user entry to database
        const user = {
          name: res.user?.displayName,
          email: res.user?.email,
          role: "student",
          photoURL: res.user?.photoURL,
        };
        mutation.mutate(user);
        toast.success("Sign In Successful");
        navigate(from, { replace: true });
      })
      .catch(() => {
        setLoading(false);
        toast.error("An Unknown Error Occurred!");
      });
  };

  return (
    <>
      <section className="flex justify-center flex-col items-center bg-[url('https://i.ibb.co/71j9gy9/joanna-kosinska-LAa-So-L0-Lr-Ys-unsplash.jpg')] bg-cover bg-center bg-blend-multiply md:min-h-screen max-sm:py-2 bg-blue-500 bg-opacity-30 max-sm:px-2 max-lg:px-4 max-sm:rounded-xl">
        <Helmet>
          <title>Sign In | EduSpark</title>
        </Helmet>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-jost font-semibold md:font-bold text-center mb-3 md:pt-5 lg:pt-10 text-btn-1 text-white font-poppins">
          SIGN IN
        </h1>
        <div
          className="flex md:gap-3 bg-blue-600 max-sm:bg-opacity-50
         max-w-5xl  md:p-5 max-md:px-3 rounded-xl md:mb-10"
        >
          <div className="hidden md:flex">
            <img
              src="https://i.ibb.co/zNnbLRd/cloud-computing-modern-flat-concept-for-web-banner-design-man-enters-password-and-login-to-access-cl.png"
              alt=""
              className="object-cover drop-shadow-2xl drop-shadow-white h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128"
            />
          </div>
          <div className="flex flex-1 flex-col justify-center text-center rounded-sm md:pr-8">
            <div className="w-full ">
              <form onSubmit={handleSubmit(handleLogin)} className="">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-white text-lg">Email</span>
                  </label>
                  <input
                    {...register("email", {
                      required: {
                        value: true,
                        message: "Email is a Required Field!",
                      },
                    })}
                    type="email"
                    placeholder="Email"
                    className="input input-bordered"
                  />
                </div>
                <div>
                  {errors.email && (
                    <p className="text-red-500 font-semibold font-jost">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div className="form-control relative">
                  <label className="label">
                    <span className="label-text text-white text-lg">
                      Password
                    </span>
                  </label>
                  <input
                    {...register("password", {
                      required: {
                        value: true,
                        message: "Enter password to proceed!",
                      },
                    })}
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="input w-full input-bordered"
                  />
                  <span
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                    className="text-2xl absolute right-4 top-[61%]"
                  >
                    {showPassword ? (
                      <IoIosEye></IoIosEye>
                    ) : (
                      <IoIosEyeOff></IoIosEyeOff>
                    )}
                  </span>
                </div>
                <div>
                  {errors.password && (
                    <p className="text-red-500 font-semibold font-jost">
                      {errors.password.message}
                    </p>
                  )}
                </div>
                <label className="label">
                  <a
                    href="#"
                    className="label-text text-white-alt link link-hover text-[16px] text-white"
                  >
                    Forgot password?
                  </a>
                </label>
                <div className="form-control mt-6">
                  <button className="btn bg-primary-1 hover:bg-primary-1 text-lg text-white hover:bg-btn-1">
                    {btnText}{" "}
                  </button>
                </div>
              </form>
              <div className="flex flex-col gap-4 justify-center  items-center mb-5 mt-3">
                {" "}
                <button
                  onClick={handleGoogleSignIn}
                  className="disabled:cursor-not-allowed flex justify-center items-center lg:space-x-3 space-x-1 max-sm:mt-3 border md:m-3 lg:px-8 md:px-2 py-2 hover:shadow-xl border-gray-300 rounded-3xl bg-base-100 brightness-110 font-medium cursor-pointer"
                >
                  <FcGoogle size={32} />

                  <p>Sign In with Google</p>
                </button>
              </div>
              <p className="text-center mb-4 text-lg text-white">
                Don't have any account?
                <Link
                  to="/register"
                  className="link max-sm:block text-blue-200 md:pb-2"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
