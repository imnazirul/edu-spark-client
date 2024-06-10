/* eslint-disable no-unused-vars */
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../CustomHooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import { IoMdArrowBack, IoMdArrowForward } from "react-icons/io";

const AllClassesAdmin = () => {
  const axiosSecure = useAxiosSecure();
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const {
    data: totalClasses = 0,
    isPending: isCountPending,
    isCountError,
  } = useQuery({
    queryKey: ["teacherCount"],
    queryFn: async () => {
      const res = await axiosSecure.get("/classes_count");
      return res.data.totalClasses;
    },
  });

  const {
    data: classes = [],
    isPending,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["classes", currentPage],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/classes?page=${currentPage}&size=${itemsPerPage}`
      );
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
        axiosSecure.patch(`/class_status/${id}`, data).then((res) => {
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
        axiosSecure.patch(`/class_status/${id}`, data).then((res) => {
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

  useEffect(() => {
    refetch();
  }, [currentPage, itemsPerPage, refetch]);

  if (isPending || isCountPending) {
    return (
      <div className="mt-16">
        <div className="flex flex-col gap-4 w-full">
          <div className="skeleton h-10 w-full"></div>
          <div className="skeleton h-16 w-full"></div>
          <div className="skeleton h-16 w-full"></div>
          <div className="skeleton h-16 w-full"></div>
          <div className="skeleton h-16 w-full"></div>
          <div className="skeleton h-16 w-full"></div>
          <div className="skeleton h-16 w-full"></div>
          <div className="skeleton h-16 w-full"></div>
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

  const totalPages = Math.ceil(totalClasses / itemsPerPage);
  const pages = [...Array(totalPages).keys()];

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
        <title>All Classes | Dashboard</title>
      </Helmet>
      <div className="overflow-x-auto ">
        <h1 className="text-2xl md:text-3xl underline mb-2   text-center font-semibold font-poppins">
          ALL CLASSES
        </h1>
        <table className="table text-center">
          {/* head */}
          <thead className="bg-pink-600 text-white">
            <tr>
              <th>IMAGE</th>
              <th>TITLE</th>
              <th>EMAIL</th>
              <th>SHORT DESCRIPTION</th>
              <th>STATUS</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {classes.map((sinClass) => (
              <tr key={sinClass._id}>
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
                <td className="min-w-36">{sinClass?.title}</td>
                <td>{sinClass?.email}</td>
                <td className="min-w-60">{sinClass?.short_description}</td>
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
      <div className="flex mt-2 md:justify-between w-full flex-col md:flex-row items-center">
        <p className="max-sm:mb-3">
          Showing {currentPage * itemsPerPage + 1} to{" "}
          {currentPage * itemsPerPage + classes.length} of total {totalClasses}{" "}
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

export default AllClassesAdmin;
