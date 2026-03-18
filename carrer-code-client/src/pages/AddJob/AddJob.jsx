import Swal from "sweetalert2";
import { useAuth } from "../../hooks/useAuth";
import axios from "axios";

const AddJob = () => {

    const { user } = useAuth();
    console.log(user);

    const handleAddJob = e => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        // Process salary range data
        const { min, max, currency, ...rest } = data;
        rest.salaryRange = { min, max, currency };

        // Process requirements in the array format
        rest.requirements = data.requirements.split(',').map(req => req.trim());

        // Process responsibilities in the array format
        rest.responsibilities = data.responsibilities.split(',').map(res => res.trim());
        console.log(rest);


        // Save data to the monoDB
        axios.post('https://carrer-code-server-six.vercel.app/jobs', rest)
            .then(res => {
                console.log(res.data);

                if (res.data.insertedId) {
                    Swal.fire({
                        title: "Added Successfully!",
                        icon: "success",
                        draggable: true
                    });
                }

            })
            .catch(err => {
                console.log(err);
            });

    }

    return (
        <div className="max-w-4xl mx-auto my-10 p-8 bg-base-100 shadow-xl rounded-xl">
            <h2 className="text-4xl font-bold text-center mb-8">
                Add a New Job
            </h2>

            <form onSubmit={handleAddJob} className="space-y-6">
                {/* Job Title */}
                <div>
                    <label className="label font-semibold">Job Title</label>
                    <input
                        type="text"
                        name="title"
                        placeholder="Software Engineer"
                        className="input input-bordered w-full"
                    />
                </div>

                {/* Company & Location */}
                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <label className="label font-semibold">Company Name</label>
                        <input
                            name="company"
                            type="text"
                            placeholder="Favorite IT"
                            className="input input-bordered w-full"
                        />
                    </div>

                    <div>
                        <label className="label font-semibold">Location</label>
                        <input
                            name="location"
                            type="text"
                            placeholder="Halishohor, Chittagong"
                            className="input input-bordered w-full"
                        />
                    </div>
                </div>

                {/* Job Type & Category */}
                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <label className="label font-semibold">Job Type</label>
                        <select
                            name="jobType"
                            className="select select-bordered w-full"
                        >
                            <option value="">Select Job Type</option>
                            <option value="Remote">Remote</option>
                            <option value="Hybrid">Hybrid</option>
                            <option value="Onsite">Onsite</option>
                        </select>
                    </div>

                    <div>
                        <label className="label font-semibold">Category</label>
                        <input
                            name="category"
                            type="text"
                            placeholder="Engineering"
                            className="input input-bordered w-full"
                        />
                    </div>
                </div>

                {/* Salary Range */}
                <div className="grid md:grid-cols-3 gap-4">
                    <div>
                        <label className="label font-semibold">Min Salary</label>
                        <input
                            name="min"
                            type="number"
                            placeholder="40000"
                            className="input input-bordered w-full"
                        />
                    </div>

                    <div>
                        <label className="label font-semibold">Max Salary</label>
                        <input
                            name="max"
                            type="number"
                            placeholder="60000"
                            className="input input-bordered w-full"
                        />
                    </div>

                    <div>
                        <label className="label font-semibold">Currency</label>
                        <input
                            name="currency"
                            type="text"
                            placeholder="BDT"
                            className="input input-bordered w-full"
                        />
                    </div>
                </div>

                {/* Application Deadline */}
                <div>
                    <label className="label font-semibold">Application Deadline</label>
                    <input
                        name="applicationDeadline"
                        type="date"
                        className="input input-bordered w-full"
                    />
                </div>

                {/* Job Description */}
                <div>
                    <label className="label font-semibold">Job Description</label>
                    <textarea
                        name="description"
                        className="textarea textarea-bordered w-full h-32"
                        placeholder="Write job description..."
                    ></textarea>
                </div>

                {/* Requirements */}
                <div>
                    <label className="label font-semibold">
                        Requirements (comma separated)
                    </label>
                    <input
                        name="requirements"
                        type="text"
                        placeholder="JavaScript, React, Node.js, MongoDB"
                        className="input input-bordered w-full"
                    />
                </div>

                {/* Responsibilities */}
                <div>
                    <label className="label font-semibold">
                        Responsibilities (comma separated)
                    </label>
                    <input
                        name="responsibilities"
                        type="text"
                        placeholder="Develop software, Code review, Team collaboration"
                        className="input input-bordered w-full"
                    />
                </div>

                {/* HR Info */}
                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <label className="label font-semibold">HR Name</label>
                        <input
                            name="hr_name"
                            type="text"
                            placeholder="Farhan Rahman"
                            className="input input-bordered w-full"
                        />
                    </div>

                    <div>
                        <label className="label font-semibold">HR Email</label>
                        <input
                            defaultValue={user.email}
                            name="hr_email"
                            type="email"
                            placeholder="hr@techsolutions.com"
                            className="input input-bordered w-full"
                        />
                    </div>
                </div>

                {/* Company Logo */}
                <div>
                    <label className="label font-semibold">Company Logo URL</label>
                    <input
                        name="company_logo"
                        type="text"
                        placeholder="https://i.ibb.co/....png"
                        className="input input-bordered w-full"
                    />
                </div>

                {/* Status */}
                <div>
                    <label className="label font-semibold">Job Status</label>
                    <select
                        name="status"
                        className="select select-bordered w-full"
                    >
                        <option value="active">active</option>
                        <option value="closed">closed</option>
                    </select>
                </div>

                {/* Submit */}
                <div className="text-center pt-6">
                    <button className="btn btn-primary btn-wide text-lg">
                        Post Job
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddJob;
