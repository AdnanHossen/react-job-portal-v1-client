import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router";

const PostedJobs = () => {
  // user from observer
  const { user } = useAuth();
  console.log(user?.email);

  // axios secure
  const axiosSecure = useAxiosSecure();

  // state declare
  const [postedJobs, setPostedJobs] = useState([]);

  // get the posted jobs base on email
  useEffect(() => {
    axiosSecure
      .get(`/posted-jobs?hr_email=${user?.email}`)
      .then((res) => {
        console.log(res.data);
        setPostedJobs(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user, axiosSecure]);

  // return code
  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </th>
            <th>Company</th>
            <th>Title & Category</th>
            <th>Job Type</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {postedJobs.map((job) => (
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img
                        src={job.company_logo}
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{job.company}</div>
                    <div className="text-sm opacity-50">{job.location}</div>
                  </div>
                </div>
              </td>
              <td>
                {job.title}
                <br />
                <span className="badge badge-ghost badge-sm">
                  {job.category}
                </span>
              </td>
              <td>{job.jobType}</td>
              <th>
                <button className="btn btn-ghost btn-xs">
                  <Link to={`/jobs/${job._id}`}>Details</Link>
                </button>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PostedJobs;
