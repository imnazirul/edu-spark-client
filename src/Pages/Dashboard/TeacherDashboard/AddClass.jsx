import ControlPointRoundedIcon from "@mui/icons-material/ControlPointRounded";
import useAuth from "../../../CustomHooks/useAuth";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../../CustomHooks/useAxiosSecure";
import Swal from "sweetalert2";

const img_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const img_hosting_api = `https://api.imgbb.com/1/upload?key=${img_hosting_key}`;

const AddClass = () => {
  const axiosSecure = useAxiosSecure();
  // TODO: ERROR MESSAGE
  const { mutate, isPending } = useMutation({
    mutationFn: async (data) => {
      const res = await axiosSecure.post("/classes", data);
      return res.data;
    },
    onSuccess: (response) => {
      if (response?.insertedId) {
        Swal.fire({
          title: "CLASS ADDED!",
          text: "PLEASE WAIT FOR APPROVAL",
          icon: "success",
        });
      }
    },
    onError: () => {
      Swal.fire({
        title: "AN ERROR HAPPENED WHILE ADDING CLASS",
        text: "PLEASE RELOAD OR TRY AGAIN LATER",
        icon: "error",
      });
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleAddClass = async (classData) => {
    const imgFile = { image: classData.image[0] };

    const res = await axiosSecure.post(img_hosting_api, imgFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });

    if (res.data.success) {
      const imageURL = res.data.data.display_url;

      const ClassInfo = {
        price: parseFloat(classData.price),
        title: classData.title,
        long_description: classData.long_description || "Not Available",
        short_description: classData.short_description,
        name: user?.displayName,
        email: user?.email,
        teacherImg: user?.photoURL,
        totalEnrollment: 0,
        image: imageURL,
        status: "pending",
      };

      mutate(ClassInfo);
    }
  };

  const { user } = useAuth();
  return (
    <div>
      <h1 className="text-2xl md:text-3xl lg:text-4xl text-center font-semibold font-poppins underline mb-4">
        ADD YOUR CLASS
      </h1>

      <div>
        <div className="px-8">
          {" "}
          <div className="my-2">
            <p className="label-text text-center mb-1 font-medium text-[17px]">
              YOUR IMAGE
            </p>

            <img
              className="rounded-full w-16 h-16 mx-auto"
              src={user?.photoURL}
              alt=""
            />
          </div>
          <div>
            <div className="flex gap-5">
              <div className="form-control flex-1">
                <label className="label">
                  <span className="label-text  text-primary-1 text-lg">
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
                  <span className="label-text  text-primary-1 text-lg">
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
            ADD CLASS INFO
          </span>
        </div>
        <form
          onSubmit={handleSubmit(handleAddClass)}
          className="grid grid-cols-2 gap-5 px-8"
        >
          <div className="form-control">
            <label className="label">
              <span className="label-text  text-lg">TITLE</span>
            </label>
            <input
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
              <span className="label-text  text-lg">UPLOAD CLASS IMAGE</span>
            </label>
            {/* md */}
            <input
              {...register("image", {
                required: {
                  value: true,
                  message: "Image is Required !",
                },
              })}
              type="file"
              className="file-input file-input-bordered file-input-md w-full max-w-xs"
            />

            {errors.image && (
              <p className="text-red-500 font-medium font-jost">
                {errors.image.message}
              </p>
            )}
          </div>

          <div className="form-control relative">
            <label className="label">
              <span className="label-text  text-lg">DESCRIPTION</span>
            </label>
            <textarea
              {...register("short_description", {
                required: {
                  value: true,
                  message: "Description is Required !",
                },
              })}
              placeholder="Class Description"
              className="input input-bordered pt-1 h-16 resize-none"
            ></textarea>
            {errors.short_description && (
              <p className="text-red-500 font-medium font-jost">
                {errors.short_description.message}
              </p>
            )}
          </div>

          <div className="form-control col-span-2">
            <label className="label">
              <span className="label-text  text-lg">
                LONG DESCRIPTION (OPTIONAL)
              </span>
            </label>
            <textarea
              {...register("long_description")}
              placeholder="Detailed Description Of Class"
              className="input h-24 px-2 py-1 input-bordered resize-none"
            ></textarea>
          </div>

          <div className="form-control mt-6 col-span-2">
            <button className="btn  bg-primary-1 hover:bg-primary-1  text-lg text-white ">
              <ControlPointRoundedIcon> </ControlPointRoundedIcon>{" "}
              {isPending ? "ADDING CLASS..." : "ADD CLASS"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddClass;
