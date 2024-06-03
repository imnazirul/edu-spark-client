import { createBrowserRouter } from "react-router-dom";
import Root from "../Layout/Root";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Home from "../Pages/Home/Home/Home";
import AllClasses from "../Pages/AllClasses/AllClasses";
import TeachOnEdu from "../Pages/TeachOnEdu/TeachOnEdu";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import ClassDetails from "../Pages/ClassDetails/ClassDetails";
import Dashboard from "../Layout/Dashboard";
import MyEnrollClass from "../Pages/Dashboard/StudentDashboard/MyEnrollClass";
import Profile from "../Pages/Dashboard/Profile/Profile";
import TeacherRequest from "../Pages/Dashboard/AdminDashboard/TeacherRequest";
import Users from "../Pages/Dashboard/AdminDashboard/Users";
import AllClassesAdmin from "../Pages/Dashboard/AdminDashboard/AllClassesAdmin";
import AddClass from "../Pages/Dashboard/TeacherDashboard/AddClass";
import MyClass from "../Pages/Dashboard/TeacherDashboard/MyClass";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import UpdateClass from "../Pages/Dashboard/TeacherDashboard/UpdateClass";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/classes",
        element: <AllClasses></AllClasses>,
      },
      {
        path: "/techOnEduSpark",
        element: (
          <PrivateRoute>
            <TeachOnEdu></TeachOnEdu>
          </PrivateRoute>
        ),
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/class_details/:id",
        element: (
          <PrivateRoute>
            <ClassDetails></ClassDetails>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    children: [
      //admin routes
      {
        path: "teacher_requests",
        element: <TeacherRequest></TeacherRequest>,
      },
      {
        path: "users",
        element: <Users></Users>,
      },
      {
        path: "all_classes",
        element: <AllClassesAdmin></AllClassesAdmin>,
      },

      //teacher routes
      {
        path: "add_class",
        element: <AddClass></AddClass>,
      },
      {
        path: "my_class",
        element: <MyClass></MyClass>,
      },
      {
        path: "update_class/:id",
        element: <UpdateClass></UpdateClass>,
      },
      //student routes
      {
        path: "my_enroll_class",
        element: <MyEnrollClass></MyEnrollClass>,
      },
      {
        path: "profile",
        element: <Profile></Profile>,
      },
    ],
  },
]);

export default router;
