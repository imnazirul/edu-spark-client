import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../CustomHooks/useAxiosSecure";
import { useEffect, useState } from "react";

const Users = () => {
  const axiosSecure = useAxiosSecure();
  const [searchText, setSearchText] = useState("");
  const [query, setQuery] = useState(true);

  const {
    data: users,
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?search=${searchText}`);
      return res.data;
    },
  });

  useEffect(() => {
    refetch();
  }, [query, refetch]);

  const handleSearch = (e) => {
    e.preventDefault();
    const searchBarText = document.getElementById("search").value;
    setSearchText(searchBarText);
    setQuery(!query);
  };
  // console.log(searchText);

  if (isPending) {
    return <h1 className="text-5xl text-center mt-10">Loading...</h1>;
  }

  return (
    <div className="w-full overflow-hidden">
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
                      <button className="btn bg-secondary-1 text-white btn-sm">
                        Admin
                      </button>
                    ) : (
                      <button className="btn bg-primary-1 text-white btn-sm">
                        Make Admin
                      </button>
                    )}
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Users;
