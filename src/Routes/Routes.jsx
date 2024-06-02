import { createBrowserRouter } from "react-router-dom";
import Root from "../Layout/Root";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Home from "../Pages/Home/Home/Home";
import AllClasses from "../Pages/AllClasses/AllClasses";
import TeachOnEdu from "../Pages/TeachOnEdu/TeachOnEdu";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import ClassDetails from "../Pages/ClassDetails/ClassDetails";
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
        element: <TeachOnEdu></TeachOnEdu>,
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
        element: <ClassDetails></ClassDetails>,
      },
    ],
  },
]);

export default router;
