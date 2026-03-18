import { useLoaderData, useNavigate, useParams } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import axios from "axios";
import Swal from "sweetalert2";
import { useState } from "react";

const JobApply = () => {
  const { _id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const { title } = useLoaderData();

  const [loading, setLoading] = useState(false);

  const handleApply = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;

    const application = {
      jobId: _id,
      applicant: user?.email,
      name: form.name.value,
      email: form.email.value,
      phone: form.phone.value,
      resume: form.resume.value,
      letter: form.letter.value,
    };

    try {
      const res = await axios.post(
        "https://carrer-code-server-six.vercel.app/applications",
        application
      );

      if (res.data.insertedId) {
        await Swal.fire({
          icon: "success",
          title: "Application Submitted!",
          text: "Your job application has been sent successfully.",
          confirmButtonColor: "#3085d6",
        });

        // Redirect to My Applications page
        navigate("/myapplications");
      }
    } catch (error) {
      console.log(error);

      Swal.fire({
        icon: "error",
        title: "Application Failed",
        text: error?.response?.data?.message || "Something went wrong.",
      });
    }

    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-base-100 shadow-lg rounded-xl mb-10 border border-base-300">
      <h3 className="text-3xl md:text-4xl font-bold text-center mb-8">
        Apply for <span className="text-primary">{title}</span>
      </h3>

      <form onSubmit={handleApply} className="space-y-5">
        {/* Name */}
        <div>
          <label className="label font-semibold">Full Name</label>
          <input
            name="name"
            type="text"
            placeholder="Enter your full name"
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="label font-semibold">Email</label>
          <input
            name="email"
            type="email"
            defaultValue={user?.email || ""}
            className="input input-bordered w-full"
            required
            readOnly
          />
        </div>

        {/* Phone */}
        <div>
          <label className="label font-semibold">Phone Number</label>
          <input
            name="phone"
            type="tel"
            placeholder="Enter your phone number"
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Resume */}
        <div>
          <label className="label font-semibold">Resume Link</label>
          <input
            name="resume"
            type="url"
            placeholder="https://your-resume-link.com"
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Cover Letter (optional) */}
        <div>
          <label className="label font-semibold">Cover Letter (Optional)</label>
          <textarea
            name="letter"
            className="textarea textarea-bordered w-full h-32"
            placeholder="Write a short cover letter..."
          ></textarea>
        </div>

        {/* Submit */}
        <div className="text-center pt-4">
          <button
            type="submit"
            className="btn btn-primary btn-wide text-lg"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Application"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default JobApply;