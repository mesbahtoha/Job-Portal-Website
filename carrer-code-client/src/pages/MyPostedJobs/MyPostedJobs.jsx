import { Suspense } from "react";
import { useAuth } from "../../hooks/useAuth";
import MyPostedJobList from "./MyPostedJobList";
import useJobApi from "../../api/useJobApi";

const MyPostedJobs = () => {
  const { user } = useAuth();
  const { jobCreatedByPromise } = useJobApi();

  return (
    <div className="px-4">
      <Suspense fallback={<p className="text-center py-10">Loading posted jobs...</p>}>
        <MyPostedJobList jobCreatedByPromise={jobCreatedByPromise(user.email)} />
      </Suspense>
    </div>
  );
};

export default MyPostedJobs;