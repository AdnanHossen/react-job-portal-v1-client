import React from "react";

import { Link, useLoaderData, useParams } from "react-router";

const JobDetails = () => {
  // params
  const { id } = useParams();
  console.log(id);

  // load data
  const job = useLoaderData();
  console.log(job);
  const { company_logo, title, description } = job;

  return (
    <div className="card bg-base-100 w-96 shadow-sm">
      <figure>
        <img src={company_logo} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{description}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">
            <Link to={`/application/${id}`}>Apply Now</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
