import JobCard from "../Shared/JobCard";

const HotJobs = ({ jobs }) => {

    console.log(jobs);

    return (
        <div className="py-5 pt-8 ">
            <div className="text-center my-12 px-4">
  <h2 className="text-3xl md:text-4xl font-bold text-base-content">
    🔥 Hot Jobs of the Day
  </h2>

  <p className="mt-3 text-base md:text-lg text-base-content/70 max-w-2xl mx-auto">
    Discover the most trending job opportunities today and apply before the deadline.
  </p>

  <div className="mt-4 w-24 h-1 bg-primary mx-auto rounded-full"></div>
</div>
            <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2">
                {
                    jobs.map(job => (
                        <JobCard job={job} key={job._id}></JobCard>
                    ))
                }
            </div>
        </div>
    )
}

export default HotJobs;