import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import useApplicationApi from "../../api/useApplicationApi";

const Details = () => {
  const { _id } = useParams();
  const navigate = useNavigate();
  const { getApplicationDetails } = useApplicationApi();

  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadApplication = async () => {
      try {
        const data = await getApplicationDetails(_id);
        setApplication(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    loadApplication();
  }, [_id, getApplicationDetails]);

  const formatSalary = (salaryRange) => {
    if (!salaryRange) return "N/A";
    if (typeof salaryRange === "string") return salaryRange;
    if (
      typeof salaryRange === "object" &&
      salaryRange.min !== undefined &&
      salaryRange.max !== undefined &&
      salaryRange.currency
    ) {
      return `${salaryRange.min} - ${salaryRange.max} ${salaryRange.currency}`;
    }
    return "N/A";
  };

  if (loading) {
    return <p className="text-center py-10 text-base-content/60">Loading details...</p>;
  }

  if (!application) {
    return <p className="text-center py-10 text-base-content/60">Application not found.</p>;
  }

  const { jobInfo } = application;

  const applicantName = application.applicantName || application.name || "N/A";
  const applicantEmail = application.applicant || application.email || "N/A";
  const applicantPhone = application.applicantPhone || application.phone || "N/A";
  const applicantResume = application.applicantResume || application.resume || "N/A";
  const coverLetter = application.coverLetter || application.letter || "No cover letter added.";

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 sm:py-8">
      <div className="bg-base-100 text-base-content shadow-xl rounded-2xl p-4 sm:p-6 md:p-8 border border-base-300">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6">
          Application Details
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div className="bg-base-200 p-4 rounded-xl">
            <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Applicant Info</h2>

            <div className="space-y-2 text-sm sm:text-base">
              <p>
                <span className="font-semibold">Name:</span> {applicantName}
              </p>
              <p className="break-words">
                <span className="font-semibold">Email:</span> {applicantEmail}
              </p>
              <p>
                <span className="font-semibold">Phone:</span> {applicantPhone}
              </p>
              <p className="break-words">
                <span className="font-semibold">Resume:</span> {applicantResume}
              </p>
              <p className="mt-2">
                <span className="font-semibold">Application Status:</span>{" "}
                <span className="badge badge-warning capitalize">
                  {application.applicationStatus || "pending"}
                </span>
              </p>
            </div>
          </div>

          <div className="bg-base-200 p-4 rounded-xl">
            <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Job Info</h2>

            <div className="space-y-2 text-sm sm:text-base">
              <p>
                <span className="font-semibold">Title:</span> {jobInfo?.title || "N/A"}
              </p>
              <p>
                <span className="font-semibold">Company:</span> {jobInfo?.company || "N/A"}
              </p>
              <p>
                <span className="font-semibold">Location:</span> {jobInfo?.location || "N/A"}
              </p>
              <p>
                <span className="font-semibold">Job Status:</span> {jobInfo?.status || "N/A"}
              </p>
              <p>
                <span className="font-semibold">Salary:</span> {formatSalary(jobInfo?.salaryRange)}
              </p>
              <p>
                <span className="font-semibold">Deadline:</span> {jobInfo?.applicationDeadline || "N/A"}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-5 sm:mt-6 bg-base-200 p-4 rounded-xl">
          <h2 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Cover Letter</h2>
          <p className="text-sm sm:text-base leading-6 sm:leading-7 whitespace-pre-wrap break-words">
            {coverLetter}
          </p>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <button onClick={() => navigate(-1)} className="btn btn-outline w-full sm:w-auto">
            Go Back
          </button>

          <button
            onClick={() => navigate(`/applications/edit/${application._id}`)}
            className="btn btn-warning w-full sm:w-auto"
          >
            Edit Application
          </button>
        </div>
      </div>
    </div>
  );
};

export default Details;