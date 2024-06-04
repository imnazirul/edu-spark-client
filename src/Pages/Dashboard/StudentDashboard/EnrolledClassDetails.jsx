import { useParams } from "react-router-dom";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";

const EnrolledClassDetails = () => {
  const { id } = useParams();

  return (
    <div>
      <button className="btn">
        {" "}
        <AddCircleOutlineRoundedIcon></AddCircleOutlineRoundedIcon> TEACHING
        EVALUATION REPORT ({id})
      </button>
    </div>
  );
};

export default EnrolledClassDetails;
