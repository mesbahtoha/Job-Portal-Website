import { useLoaderData } from "react-router";
import { FaMapMarkerAlt, FaCalendarAlt, FaMoneyBillWave, FaBuilding } from "react-icons/fa";
import { Link } from "react-router";

const JobDetails = () => {
  const job = useLoaderData();

  if (!job) return <p className="text-center mt-10 text-base-content/60">Job not found</p>;

  const {
    _id,
    title,
    company,
    location,
    jobType,
    category,
    applicationDeadline,
    salaryRange,
    description,
    requirements,
    responsibilities,
    hr_email,
    hr_name,
    company_logo,
  } = job;

  return (
    <div className="max-w-6xl mx-auto py-10 px-4 md:px-0">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-10">
        <img
          src={company_logo}
          alt={company}
          className="w-32 h-32 object-contain rounded-lg shadow-md bg-base-100"
        />
        <div>
          <h1 className="text-4xl font-bold text-base-content mb-2">{title}</h1>
          <p className="text-lg text-base-content/80 flex items-center gap-2">
            <FaBuilding /> {company}
          </p>
          <p className="text-base-content/70 flex items-center gap-2 mt-1">
            <FaMapMarkerAlt /> {location} • {jobType} • {category}
          </p>
          <p className="text-base-content/70 flex items-center gap-2 mt-1">
            <FaCalendarAlt /> Apply by: {applicationDeadline}
          </p>
          <p className="text-base-content/70 flex items-center gap-2 mt-1">
            <FaMoneyBillWave /> Salary: {salaryRange.min} - {salaryRange.max} {salaryRange.currency}
          </p>
        </div>
      </div>

      {/* Description */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-base-content mb-2">Job Description</h2>
        <p className="text-base-content/90">{description}</p>
      </div>

      {/* Requirements */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-base-content mb-2">Requirements</h2>
        <ul className="list-disc list-inside text-base-content/90">
          {requirements.map((requirement, index) => (
            <li key={index}>{requirement}</li>
          ))}
        </ul>
      </div>

      {/* Responsibilities */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-base-content mb-2">Responsibilities</h2>
        <ul className="list-disc list-inside text-base-content/90">
          {responsibilities.map((responsibility, index) => (
            <li key={index}>{responsibility}</li>
          ))}
        </ul>
      </div>

      {/* HR Contact */}
      <div className="mb-8 p-4 bg-base-200 border border-base-300 rounded-lg">
        <h2 className="text-2xl font-semibold text-base-content mb-2">Contact HR</h2>
        <p className="text-base-content/90">
          <span className="font-semibold">Name:</span> {hr_name}
        </p>
        <p className="text-base-content/90">
          <span className="font-semibold">Email:</span>{" "}
          <a className="link link-primary" href={`mailto:${hr_email}`}>
            {hr_email}
          </a>
        </p>
      </div>

      {/* Apply Button */}
      <div className="text-center mt-10">
        <Link to={`/jobapply/${_id}`}>
          <button className="btn btn-primary btn-lg">Apply Now</button>
        </Link>
      </div>
    </div>
  );
};

export default JobDetails;