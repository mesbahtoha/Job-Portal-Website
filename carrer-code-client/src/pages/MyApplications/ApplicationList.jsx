import { use, useState } from "react";
import { Link } from "react-router";
import useApplicationApi from "../../api/useApplicationApi.js";

const ApplicationList = ({ myApplicationsPromise }) => {
  const loadedApplications = use(myApplicationsPromise);
  const [applications, setApplications] = useState(loadedApplications);
  const { deleteApplication } = useApplicationApi();

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this application?");
    if (!confirmDelete) return;

    const result = await deleteApplication(id);

    if (result.deletedCount > 0) {
      const remainingApplications = applications.filter((app) => app._id !== id);
      setApplications(remainingApplications);
    }
  };

  const getStatusBadgeClass = (status) => {
    if (status === "accepted") return "badge-success";
    if (status === "rejected") return "badge-error";
    return "badge-warning";
  };

  return (
    <div className="bg-base-100 text-base-content rounded-2xl shadow-md p-4 md:p-6">
      <h3 className="text-2xl font-bold mb-6 text-center md:text-left">
        Jobs Applied: {applications.length}
      </h3>

      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Job Title</th>
              <th>Company</th>
              <th>Location</th>
              <th>Job Status</th>
              <th>Application Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {applications.map((app, index) => (
              <tr key={app._id}>
                <th>{index + 1}</th>
                <td>{app.title}</td>
                <td>{app.company}</td>
                <td>{app.location}</td>
                <td>
                  <span className="badge badge-info badge-outline capitalize">
                    {app.jobStatus || "active"}
                  </span>
                </td>
                <td>
                  <span className={`badge capitalize ${getStatusBadgeClass(app.applicationStatus)}`}>
                    {app.applicationStatus || "pending"}
                  </span>
                </td>
                <td>
                  <div className="flex flex-wrap gap-2">
                    <Link
                      to={`/applications/details/${app._id}`}
                      className="btn btn-sm btn-info"
                    >
                      Details
                    </Link>

                    <Link
                      to={`/applications/edit/${app._id}`}
                      className="btn btn-sm btn-warning"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() => handleDelete(app._id)}
                      className="btn btn-sm btn-error"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile / Tablet Cards */}
      <div className="grid gap-4 lg:hidden">
        {applications.map((app, index) => (
          <div
            key={app._id}
            className="card bg-base-200 shadow-sm border border-base-300"
          >
            <div className="card-body p-4">
              <h2 className="card-title text-lg">
                {index + 1}. {app.title}
              </h2>

              <p><span className="font-semibold">Company:</span> {app.company}</p>
              <p><span className="font-semibold">Location:</span> {app.location}</p>

              <div className="flex flex-wrap gap-2 mt-2">
                <span className="badge badge-info badge-outline capitalize">
                  Job: {app.jobStatus || "active"}
                </span>

                <span className={`badge capitalize ${getStatusBadgeClass(app.applicationStatus)}`}>
                  Application: {app.applicationStatus || "pending"}
                </span>
              </div>

              <div className="card-actions justify-start mt-4 flex-wrap">
                <Link
                  to={`/applications/details/${app._id}`}
                  className="btn btn-sm btn-info"
                >
                  Details
                </Link>

                <Link
                  to={`/applications/edit/${app._id}`}
                  className="btn btn-sm btn-warning"
                >
                  Edit
                </Link>

                <button
                  onClick={() => handleDelete(app._id)}
                  className="btn btn-sm btn-error"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApplicationList;