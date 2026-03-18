import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import useApplicationApi from "../../api/useApplicationApi";
import Swal from "sweetalert2";

const Edit = () => {
  const { _id } = useParams();
  const navigate = useNavigate();
  const { getApplicationDetails, updateApplication } = useApplicationApi();

  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getApplicationDetails(_id);
        setApplication(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [_id, getApplicationDetails]);

  const handleUpdateApplication = async (e) => {
    e.preventDefault();

    const form = e.target;

    const updatedApplication = {
      applicantName: form.applicantName.value,
      applicantPhone: form.applicantPhone.value,
      applicantResume: form.applicantResume.value,
      coverLetter: form.coverLetter.value,
    };

    const result = await updateApplication(_id, updatedApplication);

    if (result.modifiedCount > 0 || result.matchedCount > 0) {
      Swal.fire({
  position: "top-end",
  icon: "success",
  title: "Application updated successfully",
  showConfirmButton: false,
  timer: 1500
});
      // navigate(`/applications/details/${_id}`);
    }
  };

  if (loading) {
    return <p className="text-center py-10">Loading edit form...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-base-100 text-base-content shadow-xl rounded-2xl p-5 md:p-8 border border-base-300">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">
          Edit Application
        </h1>

        <form onSubmit={handleUpdateApplication} className="space-y-5">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="label font-semibold">Applicant Name</label>
              <input
                type="text"
                name="applicantName"
                defaultValue={application.applicantName || application.name || ""}
                className="input input-bordered w-full"
                required
              />
            </div>

            <div>
              <label className="label font-semibold">Phone</label>
              <input
                type="text"
                name="applicantPhone"
                defaultValue={application.applicantPhone || application.phone || ""}
                className="input input-bordered w-full"
                required
              />
            </div>
          </div>

          <div>
            <label className="label font-semibold">Resume Link</label>
            <input
              type="url"
              name="applicantResume"
              defaultValue={application.applicantResume || application.resume || ""}
              className="input input-bordered w-full"
              placeholder="https://your-resume-link.com"
              required
            />
          </div>

          <div>
            <label className="label font-semibold">Cover Letter</label>
            <textarea
              name="coverLetter"
              defaultValue={application.coverLetter || application.letter || ""}
              className="textarea textarea-bordered w-full min-h-36"
              placeholder="Write your cover letter here..."
            ></textarea>
          </div>

          <div className="flex flex-wrap gap-3">
            <button type="submit" className="btn btn-primary">
              Save Changes
            </button>

            <button
              type="button"
              onClick={() => navigate(-1)}
              className="btn btn-outline"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Edit;