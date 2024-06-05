// import { useParams } from "react-router-dom";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import { useEffect, useState } from "react";
import EnrolledClassRow from "./EnrolledClassRow";

const EnrolledClassDetails = () => {
  // const { id } = useParams();

  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    fetch("/assignment.json")
      .then((res) => res.json())
      .then((data) => setAssignments(data));
  }, []);

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
        <div className="overflow-x-auto">
          <table className="table text-center">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>TITLE</th>
                <th>DESCRIPTION</th>
                <th>DEADLINE</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {assignments.map((assignment, index) => (
                <EnrolledClassRow
                  key={assignment._id}
                  index={index}
                  assignment={assignment}
                ></EnrolledClassRow>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EnrolledClassDetails;
