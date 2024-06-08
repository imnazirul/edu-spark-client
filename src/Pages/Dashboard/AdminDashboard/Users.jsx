/* eslint-disable no-unused-vars */
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../CustomHooks/useAxiosSecure";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { Helmet } from "react-helmet-async";
import { IoMdArrowBack, IoMdArrowForward } from "react-icons/io";

const Users = () => {
  const axiosSecure = useAxiosSecure();
  const [searchText, setSearchText] = useState("");
  const [query, setQuery] = useState(true);
  const [usersPerPage, setUsersPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);

  //total Users Count
  const {
    data: totalUsers,
    isPending: isCountPending,
    isError: isCountError,
  } = useQuery({
    queryKey: ["teacherCount"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users_count");
      // console.log(res.data);
      return res.data.totalUsers;
    },
  });

  const {
    data: users,
    isPending,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/users?search=${searchText}&page=${currentPage}&size=${usersPerPage}`
      );
      return res.data;
    },
  });

  useEffect(() => {
    refetch();
  }, [query, refetch, currentPage, usersPerPage]);

  const handleSearch = (e) => {
    e.preventDefault();
    const searchBarText = document.getElementById("search").value;
    setSearchText(searchBarText);
    setQuery(!query);
  };

  const handleMakeAdmin = (email, name) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do You Want to Make this Person Admin?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Make Admin",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.patch(`/users/${email}`);
        if (res.data.modifiedCount) {
          refetch();
          Swal.fire({
            title: "Success!",
            text: `${name} is Admin Now`,
            icon: "success",
          });
        }
      }
    });
  };

  // useEffect(() => {
  //   refetch();
  // }, [currentPage, refetch, usersPerPage]);

  if (isPending || isCountPending) {
    return <h1 className="text-5xl text-center mt-10">Loading...</h1>;
  }

  if (isError || isCountError) {
    return (
      <div className="h-[50vh] flex items-center justify-center">
        <h1 className="text-5xl text-center">Data Not Found!</h1>
      </div>
    );
  }

  const totalPages = Math.ceil(totalUsers / usersPerPage);

  const pages = [...Array(totalPages).keys()];
  // console.log(pages);

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
    <div className="w-full overflow-hidden">
      <Helmet>
        <title>Users | Dashboard</title>
      </Helmet>
      <form onSubmit={handleSearch} className="max-w-md mx-auto">
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 "
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="search"
            onChange={handleSearch}
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 outline-none"
            placeholder="Search User By Email..."
          />
          <button
            type="submit"
            className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2  "
          >
            Search
          </button>
        </div>
      </form>

      <h1 className="text-3xl font-semibold mb-3">ALL USERS</h1>
      <div className="overflow-x-auto">
        {users.length === 0 ? (
          <div className="flex justify-center h-[70vh] items-center">
            <h1 className="text-5xl">NO USERS FOUND!</h1>
          </div>
        ) : (
          <table className="table text-center ">
            {/* head */}
            <thead className="bg-pink-600 text-white">
              <tr>
                <th>#</th>

                <th>IMAGE</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {users.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>
                    <div className="flex items-center justify-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={user?.photoURL}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{user?.name}</td>
                  <td>{user?.email}</td>

                  <th>
                    {user?.role === "admin" ? (
                      <button className="rounded-3xl bg-opacity-20 bg-primary-1  text-primary-1  btn-sm">
                        <AdminPanelSettingsIcon></AdminPanelSettingsIcon> Admin
                      </button>
                    ) : (
                      <button
                        onClick={() => handleMakeAdmin(user?.email, user?.name)}
                        className="btn bg-primary-1 hover:bg-transparent hover:text-primary-1 hover:border-primary-1 text-white btn-sm"
                      >
                        Make Admin
                      </button>
                    )}
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <div className="flex max-sm:pl-8 md:justify-between w-full flex-col md:flex-row items-center">
          <div>
            Showing {currentPage * usersPerPage + 1} to{" "}
            {currentPage * usersPerPage + users.length} of total {totalUsers}{" "}
          </div>
          <div className="join gap-1">
            <button
              onClick={handlePrevious}
              className="join-item border hover:border-primary-1 border-primary-1 btn btn-md"
            >
              <IoMdArrowBack></IoMdArrowBack> Previous
            </button>
            {pages.map((page) => (
              <button
                key={page}
                className={`join-item btn btn-md border border-primary-1 hover:border-primary-1 ${
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
              className="join-item border border-primary-1 hover:border-primary-1 btn btn-md"
            >
              Next <IoMdArrowForward></IoMdArrowForward>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
