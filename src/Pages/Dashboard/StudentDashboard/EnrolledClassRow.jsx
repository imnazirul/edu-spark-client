/* eslint-disable react/prop-types */
const EnrolledClassRow = ({ assignment, index }) => {
  const deadlineTime = new Date(assignment.deadline).toDateString();
  return (
    <>
      <tr>
        <td>{index + 1}</td>
        <td>{assignment.title}</td>
        <td className="max-w-80">{assignment.description}</td>
        <td>{deadlineTime} 11:59 AM</td>
        <td>
          <button className="btn bg-green-500 text-white hover:bg-transparent hover:border-green-500 hover:text-green-500 btn-sm">
            SUBMIT
          </button>
        </td>
      </tr>
    </>
  );
};

export default EnrolledClassRow;
