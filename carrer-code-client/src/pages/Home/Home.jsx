import { useLoaderData } from "react-router";
import Banner from "./Banner";
import HotJobs from "./HotJobs";

const Home = () => {

    const jobs = useLoaderData()

    if(!jobs){
        return <p>Loading Hot Jobs...</p>
    }

    if(jobs.length === 0){
        return <p>No jobs found</p>;
    }

    return (
        <div>
            <Banner></Banner>
            <HotJobs jobs={jobs} ></HotJobs>
        </div>
    )
}

export default Home;