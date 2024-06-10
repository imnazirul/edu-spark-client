/* eslint-disable no-unused-vars */
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../CustomHooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { IoMdArrowForward } from "react-icons/io";

const TeacherRequest = () => {
  const axiosSecure = useAxiosSecure();
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);

  //teacher count
  const {
    data: totalCount = 0,
    isPending: isCountPending,
    isError: isCountError,
  } = useQuery({
    queryKey: ["teacherCount"],
    queryFn: async () => {
      const res = await axiosSecure.get("/teacher_requests_count");
      // console.log(res.data);
      return res.data.count;
    },
  });

  const {
    data: teacherRequests = [],
    isPending,
    refetch,
    isError,
  } = useQuery({
    queryKey: ["teachersRequest", currentPage],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `teacher_requests?page=${currentPage}&size=${itemsPerPage}`
      );
      return res.data;
    },
  });

  useEffect(() => {
    refetch();
  }, [currentPage, itemsPerPage, refetch]);

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

  if (isPending || isCountPending) {
    return (
      <div className="mt-8">
        <div className="flex flex-col gap-4 w-full">
          <div className="skeleton h-10 w-full"></div>
          <div className="skeleton h-9 w-full"></div>
          <div className="skeleton h-9 w-full"></div>
          <div className="skeleton h-9 w-full"></div>
          <div className="skeleton h-9 w-full"></div>
          <div className="skeleton h-9 w-full"></div>
          <div className="skeleton h-9 w-full"></div>
          <div className="skeleton h-9 w-full"></div>
          <div className="skeleton h-9 w-full"></div>
          <div className="skeleton h-9 w-full"></div>
        </div>
      </div>
    );
  }

  if (isError || isCountError) {
    return (
      <div className="h-[50vh] flex items-center justify-center">
        <h1 className="text-5xl text-center">Data Not Found!</h1>
      </div>
    );
  }

  const totalPage = Math.ceil(totalCount / itemsPerPage);
  const pages = [...Array(totalPage).keys()];
  // console.log(currentPage);

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div>
      <Helmet>
        <title>Teacher Requests | Dashboard</title>
      </Helmet>
      <h1 className="text-2xl md:text-3xl  text-center font-semibold font-poppins underline mb-1">
        TEACHER REQUESTS
      </h1>
      <div className="overflow-x-auto">
        <table className="table text-center w-full ">
          {/* head */}
          <thead className="bg-pink-600 text-white">
            <tr>
              <th>IMAGE </th>
              <th>NAME</th>
              {/* <th>EMAIL</th> */}
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
                {/* <td>{request?.email}</td> */}
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
      <div className="flex mt-2 md:justify-between w-full flex-col md:flex-row items-center">
        <p className="max-sm:mb-3">
          Showing {currentPage * itemsPerPage + 1} to{" "}
          {currentPage * itemsPerPage + teacherRequests.length} of total{" "}
          {totalCount}
        </p>
        <div className="join gap-1">
          <button
            onClick={handlePrevious}
            className="join-item border hover:border-primary-1 border-primary-1 btn btn-sm md:btn-md"
          >
            <IoMdArrowBack></IoMdArrowBack> Previous
          </button>
          {pages.map((page) => (
            <button
              key={page}
              className={`join-item btn btn-sm md:btn-md border border-primary-1 hover:border-primary-1 ${
                currentPage === page
                  ? "bg-primary-1 hover:bg-primary-1 text-white"
                  : ""
              }`}
              onClick={() => setCurrentPage(page)}
            >
              {page + 1}
            </button>
          ))}
          <button
            onClick={handleNext}
            className="join-item border border-primary-1 hover:border-primary-1 btn btn-sm md:btn-md"
          >
            Next <IoMdArrowForward></IoMdArrowForward>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeacherRequest;
