import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAuth from "../../../CustomHooks/useAuth";
import { useForm } from "react-hook-form";
import UpdateIcon from "@mui/icons-material/Update";
import useAxiosSecure from "../../../CustomHooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import useAxiosPublic from "../../../CustomHooks/useAxiosPublic";

const img_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const img_hosting_api = `https://api.imgbb.com/1/upload?key=${img_hosting_key}`;

const UpdateClass = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const [btnText, setBtnText] = useState(
    <>
      {" "}
      <UpdateIcon></UpdateIcon>
      UPDATE CLASS
    </>
  );

  const {
    data: classItem = {},
    isPending,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["SingleClassItem", id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/single_class/${id}`);
      return res.data;
    },
  });

  const { mutate: updateClass } = useMutation({
    mutationFn: async ({ _id, data }) => {
      const res = await axiosSecure.patch(`/classes/${_id}`, data);
      return res.data;
    },
    onSuccess: (response) => {
      if (response.modifiedCount > 0) {
        setBtnText(
          <>
            <UpdateIcon></UpdateIcon>
            UPDATE CLASS
          </>
        );
        refetch();
        Swal.fire({
          title: "UPDATED!",
          text: "YOUR CLASS DATA HAS BEEN UPDATED.",
          icon: "success",
        });
      }
    },
    onError: () => {
      setBtnText(
        <>
          <UpdateIcon></UpdateIcon>
          UPDATE CLASS
        </>
      );
      Swal.fire({
        title: "UPDATING FAILED!",
        text: "THERE WAS AN ERROR , TRY AGAIN.",
        icon: "error",
      });
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  if (isPending) {
    return (
      <div className="justify-center  flex flex-col  md:gap-8 border p-5 rounded-xl">
        <div className="skeleton h-20 w-20 self-center  rounded-full"></div>
        <div className="items-center grid grid-cols-1 max-md:mt-4 md:gap-8 gap-5 md:grid-cols-2">
          <div className="skeleton h-12 w-full"></div>
          <div className="skeleton h-12 w-full"></div>
          <div className="skeleton h-12 w-full"></div>
          <div className="skeleton h-12 w-full"></div>
          <div className="skeleton h-12 w-full"></div>
          <div className="skeleton h-12 w-full"></div>
          <div className="skeleton md:col-span-2 h-32 w-full"></div>
          <div className="skeleton h-12 w-full md:col-span-2"></div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="h-[50vh] flex items-center justify-center">
        <h1 className="text-5xl text-center">Data Not Found!</h1>
      </div>
    );
  }

  const { title, price, long_description, short_description, image } =
    classItem;

  const handleUpdateClass = async (classData) => {
    let imgURL = image;
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, UPDATE",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setBtnText(
          <>
            <div className="border-blue-400 h-7 w-7 animate-spin rounded-full border-[3px] border-t-white" />{" "}
            UPDATING CLASS...
          </>
        );
        try {
          if (classData.image.length > 0) {
            const imgFile = { image: classData.image[0] };
            const res = await axiosPublic.post(img_hosting_api, imgFile, {
              headers: {
                "content-type": "multipart/form-data",
              },
            });
            //   console.log(res.data.success);
            if (res.data.success) {
              imgURL = res.data.data.display_url;
            }
          }

          const updatedClassInfo = {
            title: classData.title,
            price: parseFloat(classData.price),
            image: imgURL,
            short_description: classData.short_description,
            long_description: classData.long_description || "Not Available",
          };

          updateClass({ _id: id, data: updatedClassInfo });
        } catch (err) {
          setBtnText(
            <>
              <UpdateIcon></UpdateIcon>
              UPDATE CLASS
            </>
          );
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
        }
      }
    });
  };

  return (
    <div>
      <Helmet>
        <title>Update Class | Dashboard</title>
      </Helmet>
      <h1 className="text-2xl md:text-3xl lg:text-4xl text-center font-semibold font-poppins underline mb-4">
        UPDATE CLASS
      </h1>
      <div>
        <div className="px-8">
          {" "}
          <div className="my-2">
            <p className="label-text text-center mb-1 font-medium text-[17px]">
              YOUR IMAGE
            </p>

            <img
              className="rounded-full object-cover w-16 h-16 mx-auto"
              src={user?.photoURL}
              alt=""
            />
          </div>
          <div>
            <div className="flex flex-col md:flex-row gap-5">
              <div className="form-control flex-1">
                <label className="label">
                  <span className="label-text  text-primary-1 text-sm md:text-lg">
                    YOUR NAME ( -NOT EDITABLE )
                  </span>
                </label>
                <input
                  type="text"
                  readOnly
                  defaultValue={user?.displayName}
                  className="input focus:outline-none text-pri-1 input-bordered"
                />
              </div>
              <div className="form-control flex-1  ">
                <label className="label">
                  <span className="label-text  text-primary-1 text-sm md:text-lg">
                    YOUR EMAIL (-NOT EDITABLE )
                  </span>
                </label>
                <input
                  type="text"
                  readOnly
                  defaultValue={user?.email}
                  className="input  focus:outline-none input-bordered"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="divider divider-primary text-lg mt-12 mb-2 ">
          <span className="bg-primary-1 bg-opacity-20 text-primary-1 rounded-3xl px-3 ">
            UPDATE CLASS INFO
          </span>
        </div>
        <form
          onSubmit={handleSubmit(handleUpdateClass)}
          className="grid md:grid-cols-2 gap-5 w-[100%] md:px-8"
        >
          <div className="form-control">
            <label className="label">
              <span className="label-text  text-lg">TITLE</span>
            </label>
            <input
              defaultValue={title}
              {...register("title", {
                required: {
                  value: true,
                  message: "Title is Required !",
                },
              })}
              type="text"
              placeholder="Class Title"
              className="input input-bordered"
            />

            {errors.title && (
              <p className="text-red-500 font-medium font-jost">
                {errors.title.message}
              </p>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text  text-lg">PRICE</span>
            </label>
            <input
              defaultValue={price}
              {...register("price", {
                required: {
                  value: true,
                  message: "Price is Required !",
                },
              })}
              type="number"
              placeholder="Price"
              className="input input-bordered"
              step="any"
            />

            {errors.price && (
              <p className="text-red-500 font-medium font-jost">
                {errors.price.message}
              </p>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text  text-lg">UPLOAD NEW IMAGE</span>
            </label>
            {/* md */}
            <input
              {...register("image", {
                required: false,
              })}
              type="file"
              className="file-input file-input-bordered file-input-md w-full max-w-xs"
            />
          </div>

          <div className="form-control relative">
            <label className="label">
              <span className="label-text  text-lg">DESCRIPTION</span>
            </label>
            <textarea
              defaultValue={short_description}
              {...register("short_description", {
                required: {
                  value: true,
                  message: "Description is Required !",
                },
              })}
              placeholder="Class Description"
              className="input input-bordered pt-1 h-20 text-sm resize-none"
            ></textarea>
            {errors.short_description && (
              <p className="text-red-500 font-medium font-jost">
                {errors.short_description.message}
              </p>
            )}
          </div>

          <div className="form-control md:col-span-2">
            <label className="label">
              <span className="label-text  md:text-lg">
                LONG DESCRIPTION (OPTIONAL)
              </span>
            </label>
            <textarea
              defaultValue={long_description}
              {...register("long_description")}
              placeholder="Detailed Description Of Class"
              className="input h-24 px-2 py-1 input-bordered resize-none"
            ></textarea>
          </div>

          <div className="form-control mt-6 md:col-span-2">
            <button className="btn  bg-primary-1 hover:bg-primary-1  text-lg text-white ">
              {btnText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateClass;
