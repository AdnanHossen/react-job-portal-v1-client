import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
// import axios from "axios";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router";

const MyApplications = () => {
  // state
  const [applications, setApplications] = useState([]);
  // axios secured
  const axiosSecure = useAxiosSecure();
  // user auth
  const { user } = useAuth();
  const email = user?.email;
  console.log(user?.email);

  useEffect(() => {
    axiosSecure
      .get(`/applications?applicantEmail=${email}`)
      .then((res) => {
        console.log(res.data);
        setApplications(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [axiosSecure, email]);

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
          {applications.map((application) => (
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
                        src={application?.job_found?.company_logo}
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">
                      {application?.job_found?.company}
                    </div>
                    <div className="text-sm opacity-50">
                      {application?.job_found?.location}
                    </div>
                  </div>
                </div>
              </td>
              <td>
                {application.title}
                <br />
                <span className="badge badge-ghost badge-sm">
                  {application?.job_found?.category}
                </span>
              </td>
              <td>{application?.job_found?.jobType}</td>
              <th>
                <button className="btn btn-ghost btn-xs">
                  <Link to={`/jobs/${application._id}`}>Details</Link>
                </button>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyApplications;
