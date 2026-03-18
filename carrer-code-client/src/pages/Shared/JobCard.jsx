import { FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router";

const JobCard = ({ job }) => {
  const { title, location, description, company, company_logo, requirements, salaryRange, _id } = job;

  return (
    <div className="card w-78 my-10 mx-auto shadow-sm py-5 px-2 bg-base-200 border border-base-300">
      <div className="flex ml-6 items-center gap-2">
        <figure>
          <img src={company_logo} width={40} alt={company} />
        </figure>
        <div>
          <h3 className="text-2xl font-semibold text-base-content">{company}</h3>
          <p className="text-sm flex items-center gap-0.5 text-base-content/70">
            <FaMapMarkerAlt /> {location}
          </p>
        </div>
      </div>
      <div className="card-body">
        <h2 className="card-title text-base-content">
          {title}
          <div className="badge badge-secondary">NEW</div>
        </h2>
        <p className="text-base-content/80">{description}</p>
        <div className="card-actions">
          {requirements.map((skill, index) => (
            <div key={index} className="badge badge-outline text-base-content/80">
              {skill}
            </div>
          ))}
        </div>
        <p className="font-bold text-base-content">
          Salary: {salaryRange.min} - {salaryRange.max} {salaryRange.currency}
        </p>
        <div className="card-actions justify-end mt-2">
          <Link to={`/jobs/${_id}`}>
            <button className="btn btn-soft btn-info">Show Details</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JobCard;