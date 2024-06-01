import { useState } from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { Link } from "react-router-dom";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleRegister = (data) => {
    console.log(data);
  };

  const handleGoogleSignIn = () => {
    console.log("google login");
  };

  return (
    <>
      {" "}
      <section className="flex justify-center flex-col items-center bg-[url('https://i.ibb.co/71j9gy9/joanna-kosinska-LAa-So-L0-Lr-Ys-unsplash.jpg')] bg-cover bg-center bg-blend-multiply min-h-screen bg-blue-500 bg-opacity-30">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-jost font-bold text-center pt-5 lg:pt-10 text-btn-1 text-white font-poppins">
          SIGN UP
        </h1>
        <div className="flex gap-3 mb-10 bg-blue-600 max-w-5xl p-5 rounded-xl">
          <div className="">
            <img
              src="https://i.ibb.co/zNnbLRd/cloud-computing-modern-flat-concept-for-web-banner-design-man-enters-password-and-login-to-access-cl.png"
              alt=""
              className="object-contain drop-shadow-2xl drop-shadow-white h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128"
            />
          </div>
          <div className="flex flex-1 flex-col justify-center text-center rounded-sm pr-8">
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
                  {errors.photoUrl && (
                    <p className="text-red-500 font-semibold font-jost">
                      {errors.photoUrl.message}
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
                    Register
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
                {/* <GoogleButton onClick={handleGoogleLogin} /> */}
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
