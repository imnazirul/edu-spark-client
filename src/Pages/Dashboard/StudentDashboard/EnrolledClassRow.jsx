import { useMutation } from "@tanstack/react-query";
import useAuth from "../../../CustomHooks/useAuth";
import useAxiosSecure from "../../../CustomHooks/useAxiosSecure";
import Swal from "sweetalert2";

/* eslint-disable react/prop-types */
const EnrolledClassRow = ({ assignment, index, Refetch }) => {
  const deadlineTime = new Date(assignment.deadline).toDateString();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { mutate: updateSubmissions } = useMutation({
    mutationFn: async (data) => {
      const res = await axiosSecure.patch(
        `/assignments/${assignment?._id}`,
        data
      );
      return res.data;
    },
    onSuccess: (response) => {
      Refetch();
      if (response.modifiedCount > 0) {
        Swal.fire({
          title: "SUBMITTED SUCCESSFULLY!",
          text: "Your Assignment has been Submitted.",
          icon: "success",
        });
      }
    },
  });

  const handleSubmit = () => {
    Swal.fire({
      title: "Are you Want to Submit the Assignment?",

      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Submit",
    }).then((result) => {
      if (result.isConfirmed) {
        const submittedEmailsArray = assignment.submittedEmails;
        const submitInfo = { email: user?.email, date: new Date().getTime() };

        submittedEmailsArray.push(submitInfo);
        // console.log(submittedEmailsArray);
        updateSubmissions(submittedEmailsArray);
      }
    });
  };

  return (
    <>
      <tr>
        <td>{index + 1}</td>
        <td>{assignment.assignmentTitle}</td>
        <td className="max-w-80">{assignment.description}</td>
        <td>{deadlineTime} 11:59 AM</td>
        <td>
          {assignment?.submittedEmails.find(
            (subObj) => subObj.email === user?.email
          ) ? (
            <p className=" bg-green-500 text-green-500 border-green-500 bg-opacity-15 rounded-3xl font-medium py-1">
              Submitted
            </p>
          ) : (
            <button
              onClick={handleSubmit}
              className="btn bg-green-500 text-white hover:bg-transparent hover:border-green-500 hover:text-green-500 btn-sm"
            >
              SUBMIT
            </button>
          )}
        </td>
      </tr>
    </>
  );
};

export default EnrolledClassRow;
