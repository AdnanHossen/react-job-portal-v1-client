import axios from "axios";
import React from "react";
import { useParams } from "react-router";
import useAuth from "../../../hooks/useAuth";

const Application = () => {
  // param id of job
  const { id } = useParams();

  // context value
  const { user } = useAuth();

  //   console.log(id);

  // submit function
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const values = Object.fromEntries(formData.entries());
    const { linkedin, github, socialMedia } = values;
    const job_id = id;
    const applicantEmail = user.email;

    console.log(values);

    //   send data to server side
    axios
      .post(`http://localhost:5000/applications`, {
        linkedin,
        github,
        socialMedia,
        job_id,
        applicantEmail,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // return  code
  return (
    <div className="flex justify-center items-center min-h-screen">
      <form className="w-full max-w-lg" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">LinkedIn URL</span>
            </label>
            <input
              type="url"
              name="linkedin"
              placeholder="Enter your LinkedIn URL"
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">GitHub URL</span>
            </label>
            <input
              type="url"
              name="github"
              placeholder="Enter your GitHub URL"
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control md:col-span-2">
            <label className="label">
              <span className="label-text">Social Media URL</span>
            </label>
            <input
              type="url"
              name="socialMedia"
              placeholder="Enter your Social Media URL"
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control md:col-span-2">
            <button type="submit" className="btn btn-primary w-full">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Application;
