// import { useParams } from "react-router-dom";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import EnrolledClassRow from "./EnrolledClassRow";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../CustomHooks/useAxiosSecure";

const EnrolledClassDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const {
    data: assignments,
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["SingleClassItem", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/assignments/${id}`);
      console.log(res);
      return res.data;
    },
    refetchOnWindowFocus: "always",
  });

  if (isPending) {
    return <h1 className="text-5xl text-center mt-10">Loading...</h1>;
  }

  return (
    <div>
      <h1 className="text-3xl text-center font-medium uppercase underline mb-5">
        Assignments For This Class
      </h1>
      <button className="btn bg-blue-500 text-white hover:bg-transparent hover:border-blue-500 hover:text-blue-500 mb-4">
        {" "}
        <AddCircleOutlineRoundedIcon></AddCircleOutlineRoundedIcon> ADD TEACHING
        EVALUATION REPORT
      </button>
      <div>
        {assignments.length === 0 ? (
          <div className="h-[50vh] flex items-center justify-center">
            <h1 className="text-4xl text-center">
              NO ASSIGNMENT AVAILABLE FOR THIS CLASS
            </h1>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table text-center">
              {/* head */}
              <thead>
                <tr>
                  <th>#</th>
                  <th>TITLE</th>
                  <th>DESCRIPTION</th>
                  <th>DEADLINE</th>
                  <th>STATUS</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {!isPending &&
                  assignments.map((assignment, index) => (
                    <EnrolledClassRow
                      IsPending={isPending}
                      Refetch={refetch}
                      key={assignment._id}
                      index={index}
                      assignment={assignment}
                    ></EnrolledClassRow>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default EnrolledClassDetails;
