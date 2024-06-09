import { useState } from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../CustomHooks/useAuth";
import toast, { Toaster } from "react-hot-toast";
import useAxiosPublic from "../../CustomHooks/useAxiosPublic";
import "./sweetalert.css";
import usePublicMutationPost from "../../CustomHooks/usePublicMutationPost";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const img_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const img_hosting_api = `https://api.imgbb.com/1/upload?key=${img_hosting_key}`;

const Register = () => {
  const mutation = usePublicMutationPost("/users");
  const [btnText, setBtnText] = useState("Sign Up");
  const [showPassword, setShowPassword] = useState(false);
  const {
    createUser,
    updateUserProfile,
    signInWithGoogle,
    setReload,
    reload,
    setLoading,
  } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosPublic = useAxiosPublic();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleRegister = (formData) => {
    const { fullName, photo, email, password } = formData;

    setBtnText(
      <div role="status" className="flex gap-1 items-center">
        <div className="border-t-white h-7 w-7 animate-spin rounded-full border-[3px] border-blue-400" />
        <span className="text-white text-lg">Processing...</span>
      </div>
    );

    const imgFile = { image: photo[0] };

    axiosPublic
      .post(img_hosting_api, imgFile, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.data.success) {
          const photoURL = res.data.data.display_url;
          // console.log(photoURL);

          createUser(email, password)
            .then(() => {
              updateUserProfile(fullName, photoURL)
                .then(() => {
                  //create user entry to the database
                  const user = {
                    name: fullName,
                    email: email,
                    role: "student",
                    photoURL: photoURL,
                  };

                  mutation.mutate(user);
                  setBtnText("Sign In");
                  setReload(!reload);
                })
                .catch((err) => {
                  setBtnText("Sign In");
                  console.log(err);
                });

              toast.success("Registration Successful.");
              navigate(location?.state ? location.state : "/");
            })
            .catch((err) => {
              setBtnText("Sign In");
              setLoading(false);
              if (
                err.message === "Firebase: Error (auth/email-already-in-use)."
              ) {
                toast.error("Email Already In Use");
              } else {
                toast.error("An Unknown Error Occurred!");
              }
            });
        } else {
          toast.error("An Unknown Error Occurred!");
        }
      })
      .catch(() => {
        setBtnText("Sign In");
        Swal.fire({
          title: "UNSUPPORTED IMAGE FORMAT",
          customClass: {
            confirmButton: "confirm-button-class",
            title: "title-class",
            icon: "icon-class",
          },
          text: "PLEASE CHANGE THE PHOTO AND TRY AGAIN",
          icon: "error",
        });
      });
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((res) => {
        const user = {
          name: res.user?.displayName,
          email: res.user?.email,
          role: "student",
          photoURL: res.user?.photoURL,
        };
        mutation.mutate(user);
        toast.success("Sign In Successful");
        navigate(location?.state ? location.state : "/");
      })
      .catch(() => {
        setLoading(false);
        toast.error("An Unknown Error Occurred!");
      });
  };

  return (
    <>
      {" "}
      <Toaster></Toaster>
      <section className="flex justify-center flex-col items-center bg-[url('https://i.ibb.co/71j9gy9/joanna-kosinska-LAa-So-L0-Lr-Ys-unsplash.jpg')] bg-cover bg-center bg-blend-multiply md:min-h-screen max-sm:py-2 bg-blue-500 bg-opacity-30 max-sm:px-2 max-lg:px-4 max-sm:rounded-xl">
        <Helmet>
          <title>Sign Up | EduSpark</title>
        </Helmet>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-jost font-semibold md:font-bold text-center mb-3 md:pt-5 lg:pt-10 text-btn-1 text-white font-poppins">
          SIGN UP
        </h1>
        <div
          className="flex md:gap-3 bg-blue-600 max-sm:bg-opacity-50
         max-w-5xl md:p-5 max-md:px-3 rounded-xl md:mb-10"
        >
          <div className="hidden md:flex">
            <img
              src="https://i.ibb.co/zNnbLRd/cloud-computing-modern-flat-concept-for-web-banner-design-man-enters-password-and-login-to-access-cl.png"
              alt=""
              className="object-contain drop-shadow-2xl drop-shadow-white h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128"
            />
          </div>
          <div className="flex flex-1 flex-col justify-center text-center rounded-sm md:pr-8">
            <div className=" w-full  ">
              <form onSubmit={handleSubmit(handleRegister)} className="">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-white text-lg">Name</span>
                  </label>
                  <input
                    {...register("fullName", {
                      required: {
                        value: true,
                        message: "Name is a Required Field!",
                      },
                    })}
                    type="text"
                    placeholder="Name"
                    className="input input-bordered"
                  />
                </div>
                <div>
                  {errors.fullName && (
                    <p className="text-red-500 font-semibold font-jost">
                      {errors.fullName.message}
                    </p>
                  )}
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-white text-lg">Email</span>
                  </label>
                  <input
                    {...register("email", {
                      required: {
                        value: true,
                        message: "Email is a required Field!",
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
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-white text-lg">
                      Upload Profile Picture
                    </span>
                  </label>
                  {/* md */}
                  <input
                    {...register("photo", {
                      required: {
                        value: true,
                        message: "Profile Photo is a required Field",
                      },
                    })}
                    type="file"
                    className="file-input file-input-bordered file-input-md w-full max-w-xs"
                  />
                </div>
                <div>
                  {errors.photo && (
                    <p className="text-red-500 font-semibold font-jost">
                      {errors.photo.message}
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
                      minLength: {
                        value: 6,
                        message: "Password Must be equal 6 Character or longer",
                      },
                      maxLength: {
                        value: 32,
                        message: "Password Cannot be longer than 32 characters",
                      },
                      validate: {
                        isLower: (value) => {
                          if (/[a-z]/.test(value)) {
                            return true;
                          }
                          return "Password Must Contain At Least One Lowercase Character";
                        },
                        isUpper: (value) => {
                          if (/[A-Z]/.test(value)) {
                            return true;
                          }
                          return "Password Must Contain At Least One UpperCase Character";
                        },
                      },
                    })}
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="input input-bordered"
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
                <div className="form-control mt-6">
                  <button className="btn  bg-primary-1 hover:bg-primary-1  text-lg text-white ">
                    {btnText}{" "}
                  </button>
                </div>
              </form>
              <div className="flex flex-col gap-4 justify-center  items-center mb-5 mt-3">
                {" "}
                <button
                  onClick={handleGoogleSignIn}
                  className="disabled:cursor-not-allowed flex justify-center items-center lg:space-x-3 space-x-1 max-sm:mt-3 border md:m-3 lg:px-8 md:px-2 md:text-sm py-2 hover:shadow-xl border-gray-300 rounded-3xl bg-base-100 brightness-110 font-medium cursor-pointer"
                >
                  <FcGoogle size={32} />

                  <p>Continue with Google</p>
                </button>
              </div>
              <p className="text-center mb-4 text-lg text-white">
                Already have an account?{" "}
                <Link to="/login" className="link text-blue-200 pb-2">
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
