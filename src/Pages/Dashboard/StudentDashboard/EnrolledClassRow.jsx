import { useMutation } from "@tanstack/react-query";
import useAuth from "../../../CustomHooks/useAuth";
import useAxiosSecure from "../../../CustomHooks/useAxiosSecure";

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
      console.log(response);
      Refetch();
    },
  });

  const handleSubmit = () => {
    const submittedEmailsArray = assignment.submittedEmails;
    submittedEmailsArray.push(user?.email);
    // console.log(submittedEmailsArray);
    updateSubmissions(submittedEmailsArray);
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
            (email) => email === user?.email
          ) ? (
            <p className=" bg-green-500 text-green-500 border-green-500 bg-opacity-20 rounded-3xl text-lg font-medium">
              SUBMITTED
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
