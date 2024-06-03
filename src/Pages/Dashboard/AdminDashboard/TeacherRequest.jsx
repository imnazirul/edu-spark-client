import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../CustomHooks/useAxiosSecure";

const TeacherRequest = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: teacherRequests = [],
    isPending,
    isError,
  } = useQuery({
    queryKey: ["teachersRequest"],
    queryFn: async () => {
      const res = await axiosSecure.get("teacher_request");
      return res.data;
    },
  });

  const handleReqApprove = (id) => {
    console.log("approve", id);
  };
  const handleReqReject = (id) => {
    console.log("reject", id);
  };

  if (isPending) {
    <h1 className="text-5xl text-center mt-10">Loading...</h1>;
  }

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table text-center">
          {/* head */}
          <thead>
            <tr>
              <th>IMAGE </th>
              <th>NAME</th>
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
                <td>{request?.experience}</td>
                <td>{request?.title}</td>
                <td>{request?.category}</td>
                <td>
                  <span
                    className={`${
                      request.status === "approved"
                        ? "text-green-500 bg-green-500"
                        : request.status === "rejected"
                        ? "text-green-500 bg-green-500"
                        : "text-orange-500 bg-orange-500"
                    } bg-opacity-15 rounded-3xl px-3 py-1`}
                  >
                    {request?.status}
                  </span>
                </td>
                <td>
                  <div className="flex gap-1 items-center">
                    <button
                      onClick={handleReqApprove}
                      className="btn mr-1 bg-green-500 text-white btn-xs"
                    >
                      Approve
                    </button>
                    <button
                      onClick={handleReqReject}
                      className="btn bg-red-500 text-white btn-xs"
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
