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
        <svg
          aria-hidden="true"
          className="w-7 h-7 text-gray-200 animate-spin  fill-blue-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
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
      <section className="flex justify-center flex-col items-center bg-[url('https://i.ibb.co/71j9gy9/joanna-kosinska-LAa-So-L0-Lr-Ys-unsplash.jpg')] bg-cover bg-center bg-blend-multiply min-h-screen bg-blue-500 bg-opacity-30">
        <Helmet>
          <title>Sign In | EduSpark</title>
        </Helmet>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-jost font-bold text-center pt-5 lg:pt-10 text-btn-1 text-white font-poppins">
          SIGN IN
        </h1>
        <div className="flex gap-3 bg-blue-600 max-w-5xl p-5 rounded-xl mb-10">
          <div className="">
            <img
              src="https://i.ibb.co/zNnbLRd/cloud-computing-modern-flat-concept-for-web-banner-design-man-enters-password-and-login-to-access-cl.png"
              alt=""
              className="object-contain drop-shadow-2xl drop-shadow-white h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128"
            />
          </div>
          <div className="flex flex-1 flex-col justify-center text-center rounded-sm pr-8">
            <div className=" w-full  ">
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
                  className="disabled:cursor-not-allowed flex justify-center items-center space-x-3 border m-3 px-8 py-2 hover:shadow-xl border-gray-300 rounded-3xl bg-base-100 brightness-110 font-medium cursor-pointer"
                >
                  <FcGoogle size={32} />

                  <p>Sign In with Google</p>
                </button>
              </div>
              <p className="text-center mb-4 text-lg text-white">
                Don't have any account?{" "}
                <Link to="/register" className="link text-blue-200 pb-2">
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
