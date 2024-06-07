import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../CustomHooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const TeacherRequest = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: teacherRequests = [],
    isPending,
    refetch,
    // isError,
  } = useQuery({
    queryKey: ["teachersRequest"],
    queryFn: async () => {
      const res = await axiosSecure.get("teacher_request");
      return res.data;
    },
  });

  const handleReqApprove = (id, name, email) => {
    const info = { status: "approved", email: email };
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Approve Teacher",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.patch(`/teacher_requests/${id}`, info);
        // console.log(res);
        if (res.data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            title: "Approved!",
            text: `${name} is Now a Teacher.`,
            icon: "success",
          });
        }
      }
    });
  };

  const handleReqReject = (id, name) => {
    // TODO: CHANGE USER ROLE TO TEACHER
    const info = { status: "rejected" };
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Reject Teacher",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.patch(`/teacher_requests/${id}`, info);
        console.log(res);
        if (res.data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            title: "Rejected!",
            text: `${name} got Rejected.`,
            icon: "success",
          });
        }
      }
    });
  };

  if (isPending) {
    <h1 className="text-5xl text-center mt-10">Loading...</h1>;
  }

  return (
    <div>
      <Helmet>
        <title>Teacher Requests | Dashboard</title>
      </Helmet>
      <div className="overflow-x-auto">
        <table className="table text-center ">
          {/* head */}
          <thead className="bg-pink-600 text-white">
            <tr>
              <th>IMAGE </th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>EXPERIENCE</th>
              <th>TITLE</th>
              <th>CATEGORY</th>
              <th>STATUS</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {teacherRequests.map((request) => (
              <tr key={request._id}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={request.image}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                  </div>
                </td>
                <td>{request?.name}</td>
                <td>{request?.email}</td>
                <td>{request?.experience}</td>
                <td>{request?.title}</td>
                <td>{request?.category}</td>
                <td>
                  {request.status === "approved" ? (
                    <span className="text-green-500 bg-green-500 bg-opacity-15 rounded-3xl capitalize px-3 py-1">
                      Accepted
                    </span>
                  ) : request.status === "rejected" ? (
                    <span className="text-red-500 bg-red-500 bg-opacity-15 rounded-3xl capitalize px-3 py-1">
                      Rejected
                    </span>
                  ) : (
                    <span className="text-orange-500 bg-orange-500 bg-opacity-15 rounded-3xl capitalize px-3 py-1">
                      Pending
                    </span>
                  )}

                  {/* <span
                    className={`${
                      
                        ? "text-green-500 bg-green-500"
                        : request.status === "rejected"
                        ? "text-red-500 bg-red-500"
                        : "text-orange-500 bg-orange-500"
                    } bg-opacity-15 rounded-3xl capitalize px-3 py-1`}
                  >
                    Accepted
                  </span> */}
                </td>
                <td>
                  <div className="flex gap-1 items-center">
                    <button
                      onClick={() =>
                        handleReqApprove(
                          request?._id,
                          request?.name,
                          request?.email
                        )
                      }
                      disabled={request?.status !== "pending"}
                      className="btn mr-1 bg-green-500 hover:bg-transparent hover:text-green-500 hover:border-green-500 text-white btn-sm"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() =>
                        handleReqReject(request?._id, request?.name)
                      }
                      disabled={request?.status !== "pending"}
                      className="btn bg-red-500 hover:bg-transparent hover:text-red-500 hover:border-red-500 text-white btn-sm"
                    >
                      Reject
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeacherRequest;
