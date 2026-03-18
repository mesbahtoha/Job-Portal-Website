import useAxiosSecure from "../hooks/useAxios/useAxiosSecure";

const useApplicationApi = () => {
  const axiosSecure = useAxiosSecure();

  const myApplicationsPromise = async (email) => {
    const res = await axiosSecure.get(`/applications?email=${email}`);
    return res.data;
  };

  const getApplicationDetails = async (id) => {
    const res = await axiosSecure.get(`/applications/details/${id}`);
    return res.data;
  };

  const updateApplication = async (id, updatedData) => {
    const res = await axiosSecure.patch(`/applications/${id}`, updatedData);
    return res.data;
  };

  const deleteApplication = async (id) => {
    const res = await axiosSecure.delete(`/applications/${id}`);
    return res.data;
  };

  const updateApplicationStatus = async (id, applicationStatus) => {
    const res = await axiosSecure.patch(`/applications/status/${id}`, {
      applicationStatus,
    });
    return res.data;
  };

  return {
    myApplicationsPromise,
    getApplicationDetails,
    updateApplication,
    deleteApplication,
    updateApplicationStatus,
  };
};

export default useApplicationApi;