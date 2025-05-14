import axios from "axios";
import React, { useEffect, useState } from "react";
import AllJob from "./AllJob";

const AllJobs = () => {
  // state to manage data
  const [jobs, setJobs] = useState([]);

  // side effect
  useEffect(() => {
    axios
      .get(`http://localhost:5000/jobs`)
      .then((res) => {
        console.log(res.data);
        setJobs(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // return code
  return (
    <div className="my-10">
      <h1 className="text-center text-4xl my-10">All Jobs</h1>

      {/* jobs holder */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {jobs.map((job, idx) => (
          <AllJob key={idx} job={job}></AllJob>
        ))}
      </div>
    </div>
  );
};

export default AllJobs;
