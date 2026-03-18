// // import useAxiosSecure from "../hooks/useAxios/useAxiosSecure";

// import useAxiosSecure from "../hooks/useAxios/useAxiosSecure";

// const useJobApi = () => {

//     const axiosSecure = useAxiosSecure();

//     const jobCreatedByPromise = email => {
//         return axiosSecure.get(`/jobs/applications?email=${email}`)
//             .then(res => res.data);
//     };

//     return {
//         jobCreatedByPromise
//     };
// };

// export default useJobApi;






import useAxiosSecure from "../hooks/useAxios/useAxiosSecure";

const useJobApi = () => {
  const axiosSecure = useAxiosSecure();

  const jobCreatedByPromise = async (email) => {
    const res = await axiosSecure.get(`/jobs/applications?email=${email}`);
    return res.data;
  };

  const getJobDetails = async (id) => {
    const res = await axiosSecure.get(`/jobs/${id}`);
    return res.data;
  };

  const updateJob = async (id, updatedJob) => {
    const res = await axiosSecure.patch(`/jobs/${id}`, updatedJob);
    return res.data;
  };

  const deleteJob = async (id) => {
    const res = await axiosSecure.delete(`/jobs/${id}`);
    return res.data;
  };

  return {
    jobCreatedByPromise,
    getJobDetails,
    updateJob,
    deleteJob,
  };
};

export default useJobApi;