import { createBrowserRouter } from "react-router";
import Layouts from "./../components/Layouts/Layouts";
import Home from "../pages/Home/Home";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";
import AllJobs from "../components/UniqueComponents/AllJobs/AllJobs";
import JobDetails from "../components/UniqueComponents/JobDetails/JobDetails";
import Application from "../components/UniqueComponents/Application/Application";
import MyApplications from "../components/UniqueComponents/MyApplications/MyApplications";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import AddJobs from "../components/UniqueComponents/AddJobs/AddJobs";
import PostedJobs from "../components/UniqueComponents/PostedJobs/PostedJobs";
import CategoryJobs from "../components/UniqueComponents/CategoryJobs/CategoryJobs";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layouts></Layouts>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/jobs",
        element: <AllJobs></AllJobs>,
      },
      {
        path: "/category/:category",
        element: <CategoryJobs></CategoryJobs>,
      },
      {
        path: "/jobs/:id",
        element: <JobDetails></JobDetails>,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/jobs/${params.id}`),
      },
      {
        path: "/add-jobs",
        element: (
          <PrivateRoute>
            <AddJobs></AddJobs>
          </PrivateRoute>
        ),
      },
      {
        path: "posted-jobs",
        element: (
          <PrivateRoute>
            <PostedJobs></PostedJobs>
          </PrivateRoute>
        ),
      },
      {
        path: "/application/:id",
        element: (
          <PrivateRoute>
            <Application></Application>
          </PrivateRoute>
        ),
      },
      {
        path: "/applications/me",
        element: (
          <PrivateRoute>
            <MyApplications></MyApplications>
          </PrivateRoute>
        ),
      },
      {
        path: "register",
        element: <Register></Register>,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
    ],
  },
]);

export default router;
