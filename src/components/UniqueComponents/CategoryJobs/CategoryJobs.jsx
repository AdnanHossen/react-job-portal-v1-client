import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import CategoryJob from "./CategoryJob";

const CategoryJobs = () => {
  // params
  const { category } = useParams();
  console.log(category);
  // category data
  const [jobs, setJobs] = useState([]);

  // secured axios
  const axiosSecure = useAxiosSecure();

  // side effect
  useEffect(() => {
    axiosSecure
      .get(`/posted-jobs?category=${category}`)
      .then((res) => {
        console.log(res.data);
        setJobs(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [axiosSecure, category]);

  // return code
  return (
    <div>
      <div className="my-10">
        <h1 className="text-center text-4xl my-10"> {category} Jobs</h1>

        {/* jobs holder */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {jobs.map((job, idx) => (
            <CategoryJob key={idx} job={job}></CategoryJob>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryJobs;
