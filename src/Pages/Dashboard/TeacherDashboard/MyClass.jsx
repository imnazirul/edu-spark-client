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

  if (isPending) {
    return <h1 className="text-5xl text-center mt-10">Loading...</h1>;
  }

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

      <div className="flex flex-col pl-5 gap-4">
        {classes.map((classItem) => (
          <div
            key={classItem._id}
            className="flex flex-col items-center justify-enter gap-3 p-3  border border-gray-200 rounded-lg shadow md:flex-row  bg-gradient-to-r  from-blue-700 to-blue-400 bg-base-300 bg-blend-overlay bg-opacity-20"
          >
            <div className="h-full overflow-hidden w-[30%] rounded-xl ">
              <img
                className="object-cover w-full max-h-52 h-52 rounded-xl  "
                src={classItem.image}
                alt=""
              />
            </div>

            <div className="w-[45%]">
              <div className="">
                <p className="text-white ">
                  <span>Email: </span>
                  {classItem.email}
                </p>
                <p className=" font-normal text-white  ">
                  <span>Name: </span> {classItem.name}
                </p>
              </div>
              <h2 className=" text-2xl text- font-bold tracking-tight max-sm:text-center">
                {classItem.title}
              </h2>
              <p className="text-xl mb-1 text-white font-medium">
                Price: $
                <span className="text-3xl font-semibold">
                  {classItem.price}
                </span>
              </p>
              <p className=" font-normal text-white  ">
                {classItem.short_description}
              </p>
            </div>
            <div className="flex flex-col relative justify-between w-[25%] gap-4">
              <div className="flex gap-2 justify-center items-center">
                <p className="font-semibold text-white text-lg">STATUS : </p>
                {classItem?.status === "approved" ? (
                  <p className="text-green-500 px-3 text-center py-1 bg-white  border-green-500 rounded-3xl text-lg font-medium">
                    Approved
                  </p>
                ) : classItem?.status === "rejected" ? (
                  <p className="text-red-500 text-center py-1 bg-white  rounded-3xl text-lg font-medium px-3">
                    Rejected
                  </p>
                ) : (
                  <p className="text-blue-500  text-center py-1 bg-white  rounded-3xl text-lg font-medium px-3">
                    Pending
                  </p>
                )}
              </div>
              <Link
                className="btn btn-sm bg-green-500 hover:bg-green-200   border-green-500 hover:bg-opacity-70 hover:border-green-100  text-white hover:text-green-600  text-lg font-medium "
                to={`/dashboard/update_class/${classItem._id}`}
              >
                <UpdateIcon></UpdateIcon> UPDATE
              </Link>
              <button
                onClick={() => handleDelete(classItem?._id)}
                className="btn btn-sm bg-red-500 hover:bg-red-200   border-red-500 hover:bg-opacity-70 hover:border-red-100  text-white hover:text-red-500   text-lg font-medium "
              >
                <DeleteOutlineIcon></DeleteOutlineIcon> DELETE
              </button>
              {classItem?.status === "approved" ? (
                <Link
                  className="btn btn-sm bg-blue-700  hover:bg-opacity-70 hover:bg-blue-200 border-blue-700 hover:border-blue-900  text-white hover:text-blue-800    text-lg font-medium"
                  to={`/dashboard/my_class_details/${classItem?._id}`}
                >
                  {" "}
                  <button className="">
                    <InfoIcon></InfoIcon> SEE DETAILS
                  </button>
                </Link>
              ) : (
                <button className="text-gray-500 text-opacity-80 bg-gray-200 bg-opacity-60 py-1 rounded-lg cursor-not-allowed">
                  <InfoIcon></InfoIcon> SEE DETAILS
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyClass;
