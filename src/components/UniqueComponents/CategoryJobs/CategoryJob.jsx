import React from "react";
import { Link } from "react-router";

const CategoryJob = ({ job }) => {
  // destructure
  const { _id, company_logo, jobType, location, title, salary } = job;

  // return code
  return (
    <div>
      <div className="card shadow-sm ">
        <figure className="p-15">
          <img
            src={company_logo}
            alt="Shoes"
            className=" h-[60px] object-contain"
          />
        </figure>
        <div className="card-body py-15 space-y-6">
          <p className="bg-[#31795a] w-[40%] text-center rounded-lg text-white">
            {jobType}
          </p>
          <h2 className="card-title">{title}</h2>
          <p className=" text-[#212529] text-base opacity-70">
            ${salary.max}-${salary.min}
          </p>
          <div className="card-actions justify-end flex items-center">
            <p className="opacity-80 text-base">{location}</p>
            <button className="btn btn-primary">
              <Link to={`/jobs/${_id}`}>View Details</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryJob;
