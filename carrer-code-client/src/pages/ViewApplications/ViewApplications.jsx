import { useMemo, useState } from "react";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";
import axios from "axios";

const ViewApplications = () => {
  const loadedApplications = useLoaderData();
  const [applications, setApplications] = useState(loadedApplications);

  const jobTitle = useMemo(() => {
    if (!applications.length) return "This Job";
    return applications[0]?.jobTitle || applications[0]?.title || "This Job";
  }, [applications]);

  const handleStatusChange = async (e, appId) => {
    const newStatus = e.target.value;

    try {
      const response = await axios.patch(
        `https://carrer-code-server-six.vercel.app/applications/status/${appId}`,
        { applicationStatus: newStatus }
      );

      if (response.data.modifiedCount > 0 || response.data.matchedCount > 0) {
        const updatedApplications = applications.map((app) =>
          app._id === appId
            ? { ...app, applicationStatus: newStatus }
            : app
        );

        setApplications(updatedApplications);

        Swal.fire({
          title: "Application status updated!",
          text: `New status: ${newStatus}`,
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Update failed",
        text: "Could not update application status.",
        icon: "error",
      });
    }
  };

  const getStatusBadgeClass = (status) => {
    if (status === "accepted" || status === "hired") return "badge-success";
    if (status === "rejected") return "badge-error";
    return "badge-warning";
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-base-100 text-base-content rounded-2xl shadow-lg border border-base-300 p-4 md:p-6">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold">
            Applications for:{" "}
            <span className="text-primary">{jobTitle}</span>
          </h1>
          <p className="mt-2 text-sm md:text-base opacity-70">
            Review applicants and update their hiring status.
          </p>
        </div>

        {applications.length === 0 ? (
          <div className="alert alert-info shadow-sm">
            <span>No applications found for this job.</span>
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="table table-zebra w-full">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Resume</th>
                    <th>Current Status</th>
                    <th>Change Status</th>
                  </tr>
                </thead>

                <tbody>
                  {applications.map((app, index) => {
                    const applicantName =
                      app.applicantName || app.name || "N/A";
                    const applicantEmail =
                      app.applicant || app.email || "N/A";
                    const applicantPhone =
                      app.applicantPhone || app.phone || "N/A";
                    const applicantResume =
                      app.applicantResume || app.resume || "";
                    const currentStatus =
                      app.applicationStatus || app.status || "pending";

                    return (
                      <tr key={app._id}>
                        <th>{index + 1}</th>
                        <td className="font-semibold">{applicantName}</td>
                        <td>{applicantEmail}</td>
                        <td>{applicantPhone}</td>
                        <td>
                          {applicantResume ? (
                            <a
                              href={applicantResume}
                              target="_blank"
                              rel="noreferrer"
                              className="link link-primary"
                            >
                              View Resume
                            </a>
                          ) : (
                            <span className="opacity-60">Not provided</span>
                          )}
                        </td>
                        <td>
                          <span
                            className={`badge capitalize ${getStatusBadgeClass(
                              currentStatus
                            )}`}
                          >
                            {currentStatus}
                          </span>
                        </td>
                        <td>
                          <select
                            onChange={(e) => handleStatusChange(e, app._id)}
                            className="select select-bordered select-sm w-full max-w-[160px]"
                            value={currentStatus}
                          >
                            <option value="pending">Pending</option>
                            <option value="accepted">Accepted</option>
                            <option value="rejected">Rejected</option>
                          </select>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile / Tablet Cards */}
            <div className="grid gap-4 lg:hidden">
              {applications.map((app, index) => {
                const applicantName =
                  app.applicantName || app.name || "N/A";
                const applicantEmail =
                  app.applicant || app.email || "N/A";
                const applicantPhone =
                  app.applicantPhone || app.phone || "N/A";
                const applicantResume =
                  app.applicantResume || app.resume || "";
                const currentStatus =
                  app.applicationStatus || app.status || "pending";

                return (
                  <div
                    key={app._id}
                    className="card bg-base-200 border border-base-300 shadow-sm"
                  >
                    <div className="card-body p-4">
                      <h2 className="card-title text-lg">
                        {index + 1}. {applicantName}
                      </h2>

                      <p>
                        <span className="font-semibold">Email:</span>{" "}
                        {applicantEmail}
                      </p>

                      <p>
                        <span className="font-semibold">Phone:</span>{" "}
                        {applicantPhone}
                      </p>

                      <p>
                        <span className="font-semibold">Resume:</span>{" "}
                        {applicantResume ? (
                          <a
                            href={applicantResume}
                            target="_blank"
                            rel="noreferrer"
                            className="link link-primary"
                          >
                            View Resume
                          </a>
                        ) : (
                          "Not provided"
                        )}
                      </p>

                      <div className="mt-2 flex items-center gap-2 flex-wrap">
                        <span className="font-semibold">Current Status:</span>
                        <span
                          className={`badge capitalize ${getStatusBadgeClass(
                            currentStatus
                          )}`}
                        >
                          {currentStatus}
                        </span>
                      </div>

                      <div className="mt-4">
                        <label className="label font-semibold">
                          Change Status
                        </label>
                        <select
                          onChange={(e) => handleStatusChange(e, app._id)}
                          className="select select-bordered w-full"
                          value={currentStatus}
                        >
                          <option value="pending">Pending</option>
                          <option value="accepted">Accepted</option>
                          <option value="rejected">Rejected</option>
                        </select>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ViewApplications;