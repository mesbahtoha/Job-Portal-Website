import { use, useState } from "react";
import { Link } from "react-router";
import useJobApi from "../../api/useJobApi";

const MyPostedJobList = ({ jobCreatedByPromise }) => {
  const loadedJobs = use(jobCreatedByPromise);
  const [jobs, setJobs] = useState(loadedJobs);
  const { deleteJob } = useJobApi();

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job?"
    );

    if (!confirmDelete) return;

    try {
      const result = await deleteJob(id);

      if (result.deletedCount > 0) {
        const remainingJobs = jobs.filter((job) => job._id !== id);
        setJobs(remainingJobs);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const formatSalary = (salaryRange) => {
    if (!salaryRange) return "N/A";

    if (
      typeof salaryRange === "object" &&
      salaryRange.min !== undefined &&
      salaryRange.max !== undefined &&
      salaryRange.currency
    ) {
      return `${salaryRange.min} - ${salaryRange.max} ${salaryRange.currency}`;
    }

    if (
      typeof salaryRange === "object" &&
      salaryRange.minSalary !== undefined &&
      salaryRange.maxSalary !== undefined &&
      salaryRange.currency
    ) {
      return `${salaryRange.minSalary} - ${salaryRange.maxSalary} ${salaryRange.currency.toUpperCase()}`;
    }

    return "N/A";
  };

  return (
    <div className="max-w-7xl mx-auto my-10 px-4">
      <div className="bg-base-100 text-base-content rounded-2xl shadow-md p-4 md:p-6">
        <h2 className="text-3xl font-bold mb-6 text-center">
          My Posted Jobs ({jobs.length})
        </h2>

        {jobs.length === 0 ? (
          <div className="alert alert-info shadow-lg">
            <span>You haven’t posted any jobs yet.</span>
          </div>
        ) : (
          <>
            {/* Desktop */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="table table-zebra w-full">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Job Title</th>
                    <th>Company</th>
                    <th>Location</th>
                    <th>Salary</th>
                    <th>Deadline</th>
                    <th>Applications</th>
                    <th>Count</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {jobs.map((job, index) => (
                    <tr key={job._id}>
                      <th>{index + 1}</th>
                      <td className="font-semibold">{job.title}</td>
                      <td>{job.company}</td>
                      <td>{job.location}</td>
                      <td>{formatSalary(job.salaryRange)}</td>
                      <td>{job.applicationDeadline}</td>
                      <td>
                        <Link
                          to={`/applications/${job._id}`}
                          className="btn btn-sm btn-outline btn-info"
                        >
                          View Applications
                        </Link>
                      </td>
                      <td>{job.applicationCount}</td>
                      <td>
                        <div className="flex flex-wrap gap-2">
                          <Link
                            to={`/jobs/${job._id}`}
                            className="btn btn-sm btn-info"
                          >
                            View Details
                          </Link>

                          <Link
                            to={`/jobs/edit/${job._id}`}
                            className="btn btn-sm btn-warning"
                          >
                            Edit
                          </Link>

                          <button
                            onClick={() => handleDelete(job._id)}
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

            {/* Mobile / Tablet */}
            <div className="grid gap-4 lg:hidden">
              {jobs.map((job, index) => (
                <div
                  key={job._id}
                  className="card bg-base-200 border border-base-300 shadow-sm"
                >
                  <div className="card-body p-4">
                    <h3 className="card-title text-lg">
                      {index + 1}. {job.title}
                    </h3>

                    <p>
                      <span className="font-semibold">Company:</span>{" "}
                      {job.company}
                    </p>
                    <p>
                      <span className="font-semibold">Location:</span>{" "}
                      {job.location}
                    </p>
                    <p>
                      <span className="font-semibold">Salary:</span>{" "}
                      {formatSalary(job.salaryRange)}
                    </p>
                    <p>
                      <span className="font-semibold">Deadline:</span>{" "}
                      {job.applicationDeadline}
                    </p>
                    <p>
                      <span className="font-semibold">Applications:</span>{" "}
                      {job.applicationCount}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-3">
                      <Link
                        to={`/applications/${job._id}`}
                        className="btn btn-sm btn-outline btn-info"
                      >
                        View Applications
                      </Link>

                      <Link
                        to={`/jobs/${job._id}`}
                        className="btn btn-sm btn-info"
                      >
                        View Details
                      </Link>

                      <Link
                        to={`/jobs/edit/${job._id}`}
                        className="btn btn-sm btn-warning"
                      >
                        Edit
                      </Link>

                      <button
                        onClick={() => handleDelete(job._id)}
                        className="btn btn-sm btn-error"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MyPostedJobList;