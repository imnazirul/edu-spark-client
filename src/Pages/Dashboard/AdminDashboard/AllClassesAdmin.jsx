import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../CustomHooks/useAxiosPublic";
import useAxiosSecure from "../../../CustomHooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const AllClassesAdmin = () => {
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  const {
    data: classes,
    isPending,
    // isError,
    refetch,
  } = useQuery({
    queryKey: ["classes"],
    queryFn: async () => {
      const res = await axiosPublic.get("/classes");
      return res.data;
    },
  });

  const handleApprove = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Approve it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const data = { status: "approved" };
        axiosSecure.patch(`/classes/${id}`, data).then((res) => {
          if (res.data.modifiedCount > 0) {
            refetch();
            Swal.fire({
              title: "Approved!",
              icon: "success",
            });
          }
        });
      }
    });
  };
  const handleReject = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Reject it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const data = { status: "rejected" };
        axiosSecure.patch(`/classes/${id}`, data).then((res) => {
          if (res.data.modifiedCount > 0) {
            refetch();
            Swal.fire({
              title: "Rejected!",
              icon: "success",
            });
          }
        });
      }
    });
  };

  if (isPending) {
    return <h1 className="text-5xl text-center mt-10">Loading...</h1>;
  }

  return (
    <div>
      <Helmet>
        <title>All Classes | Dashboard</title>
      </Helmet>
      <div className="overflow-x-auto ">
        <table className="table text-center">
          {/* head */}
          <thead className="bg-pink-600 text-white">
            <tr>
              <th>TITLE</th>
              <th>IMAGE</th>
              <th>EMAIL</th>
              <th>SHORT DESCRIPTION</th>
              <th>STATUS</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {classes.map((sinClass) => (
              <tr key={sinClass._id}>
                <td>{sinClass?.title}</td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={sinClass?.image}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                  </div>
                </td>
                <td>{sinClass?.email}</td>
                <td>{sinClass?.short_description}</td>
                <td className="  justify-center">
                  <div className="flex items-center justify-center gap-1">
                    {sinClass.status === "approved" ? (
                      <button className=" text-green-500 bg-green-500 bg-opacity-10 px-3 rounded-3xl py-1">
                        Approved
                      </button>
                    ) : sinClass.status === "rejected" ? (
                      <button className=" text-red-500  bg-red-500 bg-opacity-10 px-3 rounded-3xl py-1">
                        Rejected
                      </button>
                    ) : (
                      <>
                        {" "}
                        <button
                          onClick={() => handleApprove(sinClass?._id)}
                          className="btn bg-green-600 hover:bg-transparent hover:text-green-500 hover:border-green-500 text-white btn-sm"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(sinClass?._id)}
                          className="btn hover:bg-transparent hover:text-red-500 hover:border-red-500 bg-red-500 text-white btn-sm"
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </div>
                </td>
                <td>
                  <Link to={`/dashboard/class_progress/${sinClass?._id}`}>
                    {" "}
                    <button
                      disabled={sinClass?.status !== "approved"}
                      className="btn hover:bg-transparent hover:text-blue-500 hover:border-blue-500 bg-blue-500 text-white  btn-sm w-[120px]"
                    >
                      See Progress
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllClassesAdmin;
