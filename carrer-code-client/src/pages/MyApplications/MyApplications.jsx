import { Suspense } from "react";
import ApplicationList from "./ApplicationList";
import { useAuth } from "../../hooks/useAuth";
import useApplicationApi from "../../api/useApplicationApi";
// import useApplicationApi from "../../api/useApplicationApi";

const MyApplications = () => {
  const { user } = useAuth();
  const { myApplicationsPromise } = useApplicationApi();

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <Suspense fallback={<p className="text-center">Loading your applications...</p>}>
        <ApplicationList
          myApplicationsPromise={myApplicationsPromise(user.email)}
        />
      </Suspense>
    </div>
  );
};

export default MyApplications;