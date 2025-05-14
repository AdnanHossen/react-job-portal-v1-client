import { createBrowserRouter } from "react-router";
import Layouts from "./../components/Layouts/Layouts";
import Home from "../pages/Home/Home";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";
import AllJobs from "../components/UniqueComponents/AllJobs/AllJobs";
import JobDetails from "../components/UniqueComponents/JobDetails/JobDetails";
import Application from "../components/UniqueComponents/Application/Application";
import MyApplications from "../components/UniqueComponents/MyApplications/MyApplications";

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
        path: "/jobs/:id",
        element: <JobDetails></JobDetails>,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/jobs/${params.id}`),
      },
      {
        path: "/application/:id",
        element: <Application></Application>,
      },
      {
        path: "/applications/me",
        element: <MyApplications></MyApplications>,
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
