import { NavLink, Outlet } from "react-router-dom";
import "./dashboard.css";
import { Menu } from "@mui/icons-material";
import useRole from "../CustomHooks/useRole";

const Dashboard = () => {
  const { role: userRole, isRoleLoading } = useRole();
  const role = userRole;

  if (isRoleLoading) {
    return <h1 className="text-5xl text-center mt-10">Loading...</h1>;
  }

  return (
    <div className="font-poppins lg:flex">
      {/* dashboard sidebar */}
      <div className="lg:max-w-80 h-full max-h-screen overflow-hidden text-white lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

        {/* Page content here */}
        <div className="w-full bg-primary-1 flex justify-between items-center">
          <label
            htmlFor="my-drawer-2"
            className="text-white drawer-button lg:hidden ml-2 "
          >
            <Menu style={{ width: "50px", height: "50px" }}></Menu>
          </label>

          <div className="text-2xl flex items-center px-5 py-2 text-center font-semibold">
            <img
              className="w-10"
              src="https://i.ibb.co/cyns15p/images-removebg-preview-1.png"
              alt=""
            />
            <h1>Dashboard</h1>
          </div>
        </div>

        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>

          <div className="menu  p-4 w-80 min-h-full space-y-8 bg-[url('https://images.pexels.com/photos/5825604/pexels-photo-5825604.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] bg-black bg-opacity-40 text-white z-50  bg-bottom bg-cover bg-blend-overlay">
            {role === "admin" ? (
              <>
                <span className="dashboard-item ">
                  <NavLink
                    className="px-4 py-2 text-2xl w-full font-semibold "
                    to="/dashboard/teacher_requests"
                  >
                    Teacher Requests
                  </NavLink>
                </span>{" "}
                <span className="dashboard-item ">
                  <NavLink
                    className="px-4 py-2 text-2xl w-full font-semibold "
                    to="/dashboard/users"
                  >
                    Users
                  </NavLink>
                </span>{" "}
                <span className="dashboard-item ">
                  <NavLink
                    className="px-4 py-2 text-2xl w-full font-semibold "
                    to="/dashboard/my_enroll_class"
                  >
                    All Classes
                  </NavLink>
                </span>{" "}
              </>
            ) : role === "teacher" ? (
              <>
                {" "}
                <span className="dashboard-item ">
                  <NavLink
                    className="px-4 py-2 text-2xl w-full font-semibold "
                    to="/dashboard/add_class"
                  >
                    Add Class
                  </NavLink>
                </span>
                <span className="dashboard-item ">
                  <NavLink
                    className="px-4 py-2 text-2xl w-full font-semibold "
                    to="/dashboard/my_class"
                  >
                    My Class
                  </NavLink>
                </span>
              </>
            ) : (
              <>
                {" "}
                <span className="dashboard-item ">
                  <NavLink
                    className="px-4 py-2 text-2xl w-full font-semibold "
                    to="/dashboard/my_enroll_class"
                  >
                    My Enroll Class
                  </NavLink>
                </span>{" "}
              </>
            )}
            <span className="dashboard-item ">
              <NavLink
                className="px-4 py-2 text-2xl w-full font-semibold "
                to="/dashboard/profile"
              >
                My Profile
              </NavLink>
            </span>{" "}
            <div className="divider"></div>
            <span className="dashboard-item ">
              <NavLink
                className="px-4 py-2 text-2xl w-full font-semibold "
                to="/"
              >
                Home
              </NavLink>
            </span>
          </div>
        </div>
      </div>
      <div className="flex-1 max-h-screen overflow-y-auto px-5">
        {" "}
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
