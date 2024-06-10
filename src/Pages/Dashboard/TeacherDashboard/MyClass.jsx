import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../CustomHooks/useAuth";
import useAxiosSecure from "../../../CustomHooks/useAxiosSecure";
import UpdateIcon from "@mui/icons-material/Update";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import InfoIcon from "@mui/icons-material/Info";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const MyClass = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    data: classes = [],
    isPending,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["teacherClasses", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/teacher_classes/${user?.email}`);
      return res.data;
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/classes/${id}`);
        if (res.data.deletedCount > 0) {
          refetch();
          Swal.fire({
            title: "Deleted!",
            text: "Your Class has been deleted.",
            icon: "success",
          });
        }
      }
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
    <div>
      <Helmet>
        <title>My Classes | Dashboard</title>
      </Helmet>
      <h1 className="text-2xl md:text-3xl lg:text-4xl text-center font-semibold font-poppins underline mb-4">
        YOUR CLASSES
      </h1>

      <div className="flex flex-col md:pl-5 gap-4">
        {isPending ? (
          <div className="flex flex-col gap-5">
            <div className="flex flex-col md:flex-row items-center gap-3 md:gap-6 border p-5 rounded-xl">
              <div className="skeleton h-36 md:h-52 w-full md:w-[30%]"></div>

              <div className="w-full md:w-1/2">
                <div className="skeleton h-2 w-[60%] mb-1"></div>
                <div className="skeleton h-2 w-[60%] mb-2 md:mb-5"></div>
                <div className="skeleton h-8 my-2 w-[90%] mb-4"></div>
                <div className="skeleton h-8 w-[50%] mb-5"></div>
                <div className="skeleton h-3 hidden md:flex md:mb-2 w-[90%]"></div>
                <div className="skeleton h-3 mb-1 md:mb-2 w-[90%]"></div>
                <div className="skeleton h-3 md:mb-2 w-[90%]"></div>
              </div>
              <div className="w-full grid grid-cols-2 max-md:gap-2 md:grid-cols-1 md:w-[20%] space-y-1 md:space-y-4">
                <div className="skeleton h-5 md:h-10 md:w-[90%]"></div>
                <div className="skeleton h-5 md:h-10  md:w-[90%]"></div>
                <div className="skeleton h-5 md:h-10 md:w-[90%]"></div>
                <div className="skeleton h-5 md:h-10 md:w-[90%]"></div>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-3 md:gap-6 border p-5 rounded-xl">
              <div className="skeleton h-36 md:h-52 w-full md:w-[30%]"></div>

              <div className="w-full md:w-1/2">
                <div className="skeleton h-2 w-[60%] mb-1"></div>
                <div className="skeleton h-2 w-[60%] mb-2 md:mb-5"></div>
                <div className="skeleton h-8 my-2 w-[90%] mb-4"></div>
                <div className="skeleton h-8 w-[50%] mb-5"></div>
                <div className="skeleton h-3 hidden md:flex md:mb-2 w-[90%]"></div>
                <div className="skeleton h-3 mb-1 md:mb-2 w-[90%]"></div>
                <div className="skeleton h-3 md:mb-2 w-[90%]"></div>
              </div>
              <div className="w-full grid grid-cols-2 max-md:gap-2 md:grid-cols-1 md:w-[20%] space-y-1 md:space-y-4">
                <div className="skeleton h-5 md:h-10 md:w-[90%]"></div>
                <div className="skeleton h-5 md:h-10  md:w-[90%]"></div>
                <div className="skeleton h-5 md:h-10 md:w-[90%]"></div>
                <div className="skeleton h-5 md:h-10 md:w-[90%]"></div>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-3 md:gap-6 border p-5 rounded-xl">
              <div className="skeleton h-36 md:h-52 w-full md:w-[30%]"></div>

              <div className="w-full md:w-1/2">
                <div className="skeleton h-2 w-[60%] mb-1"></div>
                <div className="skeleton h-2 w-[60%] mb-2 md:mb-5"></div>
                <div className="skeleton h-8 my-2 w-[90%] mb-4"></div>
                <div className="skeleton h-8 w-[50%] mb-5"></div>
                <div className="skeleton h-3 hidden md:flex md:mb-2 w-[90%]"></div>
                <div className="skeleton h-3 mb-1 md:mb-2 w-[90%]"></div>
                <div className="skeleton h-3 md:mb-2 w-[90%]"></div>
              </div>
              <div className="w-full grid grid-cols-2 max-md:gap-2 md:grid-cols-1 md:w-[20%] space-y-1 md:space-y-4">
                <div className="skeleton h-5 md:h-10 md:w-[90%]"></div>
                <div className="skeleton h-5 md:h-10  md:w-[90%]"></div>
                <div className="skeleton h-5 md:h-10 md:w-[90%]"></div>
                <div className="skeleton h-5 md:h-10 md:w-[90%]"></div>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-3 md:gap-6 border p-5 rounded-xl">
              <div className="skeleton h-36 md:h-52 w-full md:w-[30%]"></div>

              <div className="w-full md:w-1/2">
                <div className="skeleton h-2 w-[60%] mb-1"></div>
                <div className="skeleton h-2 w-[60%] mb-2 md:mb-5"></div>
                <div className="skeleton h-8 my-2 w-[90%] mb-4"></div>
                <div className="skeleton h-8 w-[50%] mb-5"></div>
                <div className="skeleton h-3 hidden md:flex md:mb-2 w-[90%]"></div>
                <div className="skeleton h-3 mb-1 md:mb-2 w-[90%]"></div>
                <div className="skeleton h-3 md:mb-2 w-[90%]"></div>
              </div>
              <div className="w-full grid grid-cols-2 max-md:gap-2 md:grid-cols-1 md:w-[20%] space-y-1 md:space-y-4">
                <div className="skeleton h-5 md:h-10 md:w-[90%]"></div>
                <div className="skeleton h-5 md:h-10  md:w-[90%]"></div>
                <div className="skeleton h-5 md:h-10 md:w-[90%]"></div>
                <div className="skeleton h-5 md:h-10 md:w-[90%]"></div>
              </div>
            </div>
          </div>
        ) : (
          classes.map((classItem) => (
            <div
              key={classItem._id}
              className="flex flex-col items-center justify-enter gap-3 md:p-3 max-sm:pt-2  border border-gray-200 rounded-lg shadow md:flex-row  bg-gradient-to-r  from-blue-700 to-blue-400 bg-base-300 bg-blend-overlay bg-opacity-20"
            >
              <div className="h-full w-full px-3 overflow-hidden md:w-[30%] rounded-xl ">
                <img
                  className="object-cover w-full h-24 md:max-h-52 md:h-52 rounded-xl  "
                  src={classItem.image}
                  alt=""
                />
              </div>

              <div className="md:w-[45%] max-sm:px-2">
                <div className="">
                  <p className="text-white text-xs">
                    <span>Email: </span>
                    {classItem.email}
                  </p>
                  <p className=" font-normal text-xs text-white  ">
                    <span>Name: </span> {classItem.name}
                  </p>
                </div>
                <h2 className="text-lg md:text-2xl text- font-bold tracking-tight w-full">
                  {classItem.title}
                </h2>
                <p className="md:text-xl mb-1 text-white font-medium">
                  Price: $
                  <span className="text-xl md:text-3xl font-semibold">
                    {classItem.price}
                  </span>
                </p>
                <p className=" font-normal max-sm:text-xs text-white  ">
                  {classItem.short_description}
                </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-1 relative justify-between md:w-[25%] gap-2 md:gap-4  px-2 pb-2">
                <div className="flex gap-2 justify-center items-center">
                  <p className="md:font-semibold text-white text-xs lg:text-lg">
                    STATUS :
                  </p>
                  {classItem?.status === "approved" ? (
                    <p className="text-green-500 md:px-3 px-1 text-center py-1 bg-white  border-green-500 rounded-3xl text-xs lg:text-lg font-medium">
                      Approved
                    </p>
                  ) : classItem?.status === "rejected" ? (
                    <p className="text-red-500 text-center py-1 bg-white  rounded-3xl lg:text-lg font-medium md:px-3 px-2 text-xs  ">
                      Rejected
                    </p>
                  ) : (
                    <p className="text-blue-500  text-center py-1 bg-white  rounded-3xl lg:text-lg font-medium md:px-3 px-2 text-xs ">
                      Pending
                    </p>
                  )}
                </div>
                <Link
                  className="btn btn-sm bg-green-500 hover:bg-green-200   border-green-500 hover:bg-opacity-70 hover:border-green-100  text-white hover:text-green-600  lg:text-lg font-medium "
                  to={`/dashboard/update_class/${classItem._id}`}
                >
                  <UpdateIcon></UpdateIcon> UPDATE
                </Link>
                <button
                  onClick={() => handleDelete(classItem?._id)}
                  className="btn btn-sm bg-red-500 hover:bg-red-200   border-red-500 hover:bg-opacity-70 hover:border-red-100  text-white hover:text-red-500 text-sm  lg:text-lg font-medium "
                >
                  <DeleteOutlineIcon></DeleteOutlineIcon> DELETE
                </button>
                {classItem?.status === "approved" ? (
                  <Link
                    className="btn btn-sm bg-blue-700  hover:bg-opacity-70 hover:bg-blue-200 border-blue-700 hover:border-blue-900  text-white hover:text-blue-800  text-sm  lg:text-lg font-medium"
                    to={`/dashboard/my_class_details/${classItem?._id}`}
                  >
                    {" "}
                    <InfoIcon></InfoIcon> SEE DETAILS
                  </Link>
                ) : (
                  <button className="text-gray-500 text-opacity-80 bg-gray-200 bg-opacity-60 py-1 rounded-lg cursor-not-allowed">
                    <InfoIcon></InfoIcon> SEE DETAILS
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyClass;
