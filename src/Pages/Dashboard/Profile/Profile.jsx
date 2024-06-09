/* eslint-disable react/no-unescaped-entities */
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../CustomHooks/useAuth";
import useAxiosSecure from "../../../CustomHooks/useAxiosSecure";
import CameraAltRoundedIcon from "@mui/icons-material/CameraAltRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useState } from "react";
import Swal from "sweetalert2";
import toast, { Toaster } from "react-hot-toast";
import { Helmet } from "react-helmet-async";
import useAxiosPublic from "../../../CustomHooks/useAxiosPublic";
const img_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const img_hosting_api = `https://api.imgbb.com/1/upload?key=${img_hosting_key}`;

const Profile = () => {
  const { user, updateUserProfile, reload, setReload } = useAuth();
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const [imgName, setImgName] = useState("");
  const [btnText, setBtnText] = useState("Upload");
  const {
    data: userInfo,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user?.email}`);
      return res.data;
    },
    enabled: Boolean(user?.email),
  });

  if (isPending) {
    return <h1 className="text-xl text-center mt-16">Loading...</h1>;
  }

  const handleName = () => {
    const imgFile = document.getElementById("uploadFile1").files;
    if (imgFile) {
      setImgName(imgFile[0].name);
    } else {
      setImgName("");
    }
    console.log(imgFile);
  };

  const handleUpload = (e) => {
    e.preventDefault();
    const imgData = document.getElementById("uploadFile1").files;
    const imgFile = { image: imgData[0] };
    // console.log(imgData);

    // const imgFile = { image: classData.image[0] };
    setBtnText(
      <>
        <div className="border-blue-400 h-5 w-5 animate-spin rounded-full border-2 border-t-white" />{" "}
        Uploading...
      </>
    );
    axiosPublic
      .post(img_hosting_api, imgFile, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.data.success) {
          const imageURL = res.data.data.display_url;
          updateUserProfile(user?.displayName, imageURL)
            .then(() => {
              // console.log(res);
              setBtnText("Uploaded");
              toast.success("Profile Picture Updated Successfully.");
              setReload(!reload);
              document.getElementById("my_modal_1").close();
            })
            .catch((err) => {
              console.log(err);
              setBtnText("Upload");
            });
        }
      })
      .catch(() => {
        setBtnText("Upload");

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

  if (isError) {
    return (
      <div className="h-[50vh] flex items-center justify-center">
        <h1 className="text-5xl text-center">Data Not Found!</h1>
      </div>
    );
  }

  return (
    <>
      <div className="w-full border py-3  rounded-xl px-1  md:px-4 mx-auto">
        <Helmet>
          <title>Profile | EduSpark</title>
        </Helmet>
        <Toaster></Toaster>
        <div className="relative flex flex-col  bg-base-100 w-full mb-6  rounded-lg ">
          <div className="md:px-6">
            <div className="flex flex-wrap justify-center">
              <div className="w-full px-4 flex justify-center">
                <div className="relative rounded-full">
                  <img
                    alt="..."
                    src={user?.photoURL}
                    className="shadow-xl  w-28 rounded-full object-cover h-28  border-4 border-primary-1  "
                  />
                  <p
                    onClick={() =>
                      document.getElementById("my_modal_1").showModal()
                    }
                    className="absolute bottom-[2px] right-1 bg-gray-600 rounded-full p-1 cursor-pointer"
                  >
                    <CameraAltRoundedIcon
                      sx={{ color: "white" }}
                    ></CameraAltRoundedIcon>
                  </p>
                </div>
              </div>
              <div className="w-full md:px-4 text-center mt-5">
                <h1 className="text-xl md:text-3xl font-bold block uppercase tracking-wide text-blueGray-600">
                  {user?.displayName}
                </h1>
                <span className="text-lg md:text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                  ({userInfo?.role})
                </span>
              </div>
            </div>
            <div className="text-center mt-5 md:mt-12">
              <h3 className="text-sm md:text-xl font-semibold leading-normal mb-2 text-blueGray-700 ">
                Email: {userInfo?.email}
              </h3>
              <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                Phone: {user?.phoneNumber || "Not Available"}
              </div>
              <div className="flex justify-between flex-col text-sm items-center mt-8">
                <p className="mb-2 text-blueGray-600 ">
                  Account Created - {user?.metadata?.creationTime}
                </p>
                <p className="mb-2 text-blueGray-600">
                  Last Sign In - {user?.metadata?.lastSignInTime}
                </p>
              </div>
            </div>
            <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
              <div className="flex flex-wrap justify-center">
                <div className="w-full lg:w-9/12 px-4">
                  <p className="mb-4 md:text-lg leading-relaxed text-blueGray-700">
                    "Life is like riding a bicycle. To keep your balance, you
                    must keep moving."
                  </p>
                  <a
                    href="javascript:void(0);"
                    className="font-normal text-pink-500"
                  >
                    - Albert Einstein
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Open the modal using document.getElementById('ID').showModal() method */}

        <dialog id="my_modal_1" className="modal">
          <div className="modal-box">
            <form onSubmit={handleUpload}>
              <label
                htmlFor="uploadFile1"
                className="bg-white font-semibold text-base rounded max-w-md h-52 flex flex-col items-center justify-center cursor-pointer border-2 border-gray-300 border-dashed mx-auto font-[sans-serif]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-11 mb-2 fill-gray-500"
                  viewBox="0 0 32 32"
                >
                  <path
                    d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"
                    data-original="#000000"
                  />
                  <path
                    d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"
                    data-original="#000000"
                  />
                </svg>
                Upload file
                <input
                  onChange={handleName}
                  type="file"
                  id="uploadFile1"
                  className="hidden"
                />
                {imgName ? (
                  <div className="mt-4 space-y-3 flex flex-col items-center justify-center">
                    {" "}
                    <p className="text-lg font-medium text-center">{imgName}</p>
                    <button className="btn btn-sm bg-blue-500 text-white hover:bg-transparent hover:text-blue-500 hover:border-blue-500">
                      {btnText}
                    </button>
                  </div>
                ) : (
                  <p className="text-xs font-medium text-gray-400 mt-2">
                    PNG, JPG SVG, WEBP, and GIF are Allowed.
                  </p>
                )}
              </label>
            </form>

            <div className=" modal-action absolute -top-3 right-2">
              <form method="dialog">
                <button className="bg-gray-100 p-1 border-0 rounded-full">
                  <CloseRoundedIcon
                    sx={{
                      fontSize: "30px",
                    }}
                  ></CloseRoundedIcon>
                </button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    </>
  );
};

export default Profile;
