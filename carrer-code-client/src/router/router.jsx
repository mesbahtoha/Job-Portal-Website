import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";
import Register from "../pages/Register/Register";
import SignIn from "../pages/SignIn/SignIn";
import JobDetails from "../pages/JobDetails/JobDetails";
import JobApply from "../pages/JobApply/JobApply";
import PrivateRoute from "../routes/PrivateRoute";
import MyApplications from "../pages/MyApplications/MyApplications";
import AddJob from "../pages/AddJob/AddJob";
import MyPostedJobs from "../pages/MyPostedJobs/MyPostedJobs";
import ViewApplications from "../pages/ViewApplications/ViewApplications";
import Details from "../pages/MyApplications/Details";
import Edit from "../pages/MyApplications/Edit";
import EditJob from "../pages/MyPostedJobs/EditJob";
import PublicRoute from "../routes/PublicRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
        loader: () =>
          fetch("https://carrer-code-server-six.vercel.app/jobs").then((res) => res.json()),
      },
      {
        path: "/register",
        element: <PublicRoute><Register/></PublicRoute>
      },
      {
        path: "/signin",
        element: <PublicRoute><SignIn/></PublicRoute>
      },
      {
        path: "/jobs/:_id",
        Component: JobDetails,
        loader: ({ params }) =>
          fetch(`https://carrer-code-server-six.vercel.app/jobs/${params._id}`).then((res) =>
            res.json()
          ),
      },
      {
        path: "/jobapply/:_id",
        element: (
          <PrivateRoute>
            <JobApply />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`https://carrer-code-server-six.vercel.app/jobs/${params._id}`).then((res) =>
            res.json()
          ),
      },
      {
        path: "/myapplications",
        element: (
          <PrivateRoute>
            <MyApplications />
          </PrivateRoute>
        ),
      },
      {
        path: "/applications/details/:_id",
        element: (
          <PrivateRoute>
            <Details />
          </PrivateRoute>
        ),
      },
      {
        path: "/applications/edit/:_id",
        element: (
          <PrivateRoute>
            <Edit />
          </PrivateRoute>
        ),
      },
      {
        path: "/addjob",
        element: (
          <PrivateRoute>
            <AddJob />
          </PrivateRoute>
        ),
      },
      {
        path: "/mypostedjobs",
        element: (
          <PrivateRoute>
            <MyPostedJobs />
          </PrivateRoute>
        ),
      },
      {
        path: "/applications/:_id",
        element: (
          <PrivateRoute>
            <ViewApplications />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`https://carrer-code-server-six.vercel.app/applications/job/${params._id}`).then(
            (res) => res.json()
          ),
      },
{
  path: "/jobs/edit/:_id",
  element: (
    <PrivateRoute>
      <EditJob />
    </PrivateRoute>
  ),
},
    ],
  },
]);