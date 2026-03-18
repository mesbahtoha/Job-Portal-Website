import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import useJobApi from "../../api/useJobApi";

const EditJob = () => {
  const { _id } = useParams();
  const navigate = useNavigate();
  const { getJobDetails, updateJob } = useJobApi();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadJob = async () => {
      try {
        const data = await getJobDetails(_id);
        setJob(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    loadJob();
  }, [_id, getJobDetails]);

  const handleUpdateJob = async (e) => {
    e.preventDefault();
    const form = e.target;

    const updatedJob = {
      title: form.title.value,
      company: form.company.value,
      location: form.location.value,
      jobType: form.jobType.value,
      category: form.category.value,
      applicationDeadline: form.applicationDeadline.value,
      description: form.description.value,
      status: form.status.value,
      salaryRange: {
        min: Number(form.minSalary.value),
        max: Number(form.maxSalary.value),
        currency: form.currency.value,
      },
      requirements: form.requirements.value
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
      responsibilities: form.responsibilities.value
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
    };

    try {
      const result = await updateJob(_id, updatedJob);

      if (result.modifiedCount > 0 || result.matchedCount > 0) {
        alert("Job updated successfully");
        navigate("/mypostedjobs");
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <p className="text-center py-10">Loading job data...</p>;
  }

  if (!job) {
    return <p className="text-center py-10">Job not found.</p>;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="bg-base-100 shadow-xl rounded-2xl border border-base-300 p-5 md:p-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Edit Job</h1>

        <form onSubmit={handleUpdateJob} className="space-y-5">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="label font-semibold">Job Title</label>
              <input
                type="text"
                name="title"
                defaultValue={job.title || ""}
                className="input input-bordered w-full"
                required
              />
            </div>

            <div>
              <label className="label font-semibold">Company</label>
              <input
                type="text"
                name="company"
                defaultValue={job.company || ""}
                className="input input-bordered w-full"
                required
              />
            </div>

            <div>
              <label className="label font-semibold">Location</label>
              <input
                type="text"
                name="location"
                defaultValue={job.location || ""}
                className="input input-bordered w-full"
                required
              />
            </div>

            <div>
              <label className="label font-semibold">Job Type</label>
              <input
                type="text"
                name="jobType"
                defaultValue={job.jobType || ""}
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <label className="label font-semibold">Category</label>
              <input
                type="text"
                name="category"
                defaultValue={job.category || ""}
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <label className="label font-semibold">Deadline</label>
              <input
                type="date"
                name="applicationDeadline"
                defaultValue={job.applicationDeadline || ""}
                className="input input-bordered w-full"
                required
              />
            </div>

            <div>
              <label className="label font-semibold">Min Salary</label>
              <input
                type="number"
                name="minSalary"
                defaultValue={job.salaryRange?.min || ""}
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <label className="label font-semibold">Max Salary</label>
              <input
                type="number"
                name="maxSalary"
                defaultValue={job.salaryRange?.max || ""}
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <label className="label font-semibold">Currency</label>
              <input
                type="text"
                name="currency"
                defaultValue={job.salaryRange?.currency || ""}
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <label className="label font-semibold">Status</label>
              <select
                name="status"
                defaultValue={job.status || "active"}
                className="select select-bordered w-full"
              >
                <option value="active">Active</option>
                <option value="closed">Closed</option>
              </select>
            </div>
          </div>

          <div>
            <label className="label font-semibold">Description</label>
            <textarea
              name="description"
              defaultValue={job.description || ""}
              className="textarea textarea-bordered w-full min-h-28"
            ></textarea>
          </div>

          <div>
            <label className="label font-semibold">
              Requirements (comma separated)
            </label>
            <textarea
              name="requirements"
              defaultValue={job.requirements?.join(", ") || ""}
              className="textarea textarea-bordered w-full min-h-24"
            ></textarea>
          </div>

          <div>
            <label className="label font-semibold">
              Responsibilities (comma separated)
            </label>
            <textarea
              name="responsibilities"
              defaultValue={job.responsibilities?.join(", ") || ""}
              className="textarea textarea-bordered w-full min-h-24"
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

export default EditJob;