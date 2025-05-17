import useAuth from "./../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AddJobs = () => {
  // user
  const { user } = useAuth();
  console.log(user?.email);

  // axios secured to send with credentials
  const axiosSecure = useAxiosSecure();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const values = Object.fromEntries(formData.entries());

    const { min, max, currency, requirements, benefits, ...rest } = values;
    const newValues = {
      ...rest,
      salary: { min, max, currency },
      requirements: requirements.split("\n").filter(Boolean),
      benefits: benefits.split("\n").filter(Boolean),
    };
    console.log(newValues);

    // send the object to server first
    axiosSecure
      .post(`/add-job`, newValues)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  // return code
  return (
    <div className="flex justify-center items-center min-h-screen">
      <form className="w-full max-w-4xl" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Title</span>
            </label>
            <input
              type="text"
              name="title"
              placeholder="job title"
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Company Name</span>
            </label>
            <input
              type="text"
              name="company"
              placeholder="Company Name"
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Company Location</span>
            </label>
            <input
              type="text"
              name="location"
              placeholder="Company Location"
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Job Category</span>
            </label>
            <select
              defaultValue="Pick a category"
              className="select"
              name="category"
            >
              <option disabled={false}>Pick a category</option>
              <option>Technology</option>
              <option>Development</option>
              <option>Marketing</option>
              <option>Data Science</option>
              <option>Design</option>
              <option>Finance</option>
            </select>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Experience Level</span>
            </label>
            <select
              defaultValue="Chose Experience Level"
              className="select"
              name="expertise"
            >
              <option disabled={false}>Chose Experience Level</option>
              <option>Expert</option>
              <option>Intermediate</option>
              <option>Fresher</option>
            </select>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Job Type</span>
            </label>
            <select
              defaultValue="Chose Job Type"
              className="select"
              name="jobType"
            >
              <option disabled={false}>Chose Job Type</option>
              <option>Part-Time</option>
              <option>Full-Time</option>
              <option>Contract</option>
              <option>Intern</option>
            </select>
          </div>
          <div className="form-control col-span-3 space-y-2">
            <label className="label">
              <span className="label-text">Salary Range</span>
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                name="min"
                placeholder="Minimum Salary"
                className="input input-bordered w-full"
              />
              <input
                type="text"
                name="max"
                placeholder="Maximum Salary"
                className="input input-bordered w-full"
              />
              <select
                defaultValue="Chose Currency"
                className="select"
                name="currency"
              >
                <option disabled={false}>Chose A Currency</option>
                <option>Bdt</option>
                <option>Dollar</option>
                <option>Euro</option>
                <option>Yuan</option>
                <option>Yen</option>
                <option>Pound</option>
              </select>
            </div>
          </div>
          <div className="form-control col-span-2">
            <legend className="fieldset-legend">Job Description</legend>
            <textarea
              name="description"
              className="textarea w-full h-12"
              placeholder="Write Detailed Job Description"
            ></textarea>
          </div>
          <div className="form-control col-span-2">
            <legend className="fieldset-legend">Job Requirements</legend>
            <textarea
              name="requirements"
              className="textarea w-full h-12"
              placeholder="For multiple requirements write them in a single line"
            ></textarea>
          </div>
          <div className="form-control col-span-2">
            <legend className="fieldset-legend">Benefits</legend>
            <textarea
              name="benefits"
              className="textarea w-full h-12"
              placeholder="For multiple benefits write them in a single line"
            ></textarea>
          </div>

          <div className="form-control col-span-2">
            <label className="label">
              <span className="label-text">Posted Date</span>
            </label>
            <input
              type="text"
              name="posted"
              placeholder="Posted Date"
              className="input input-bordered w-full"
            />
          </div>

          <div className="form-control col-span-2">
            <label className="label">
              <span className="label-text">Application Deadline</span>
            </label>
            <input
              type="text"
              name="deadline"
              placeholder="Application Deadline"
              className="input input-bordered w-full"
            />
          </div>

          <div className="form-control col-span-2">
            <label className="label">
              <span className="label-text">HR Contact Name </span>
            </label>
            <input
              type="text"
              name="hr_name"
              placeholder="HR Name"
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control col-span-2">
            <label className="label">
              <span className="label-text">HR Contact Email </span>
            </label>
            <input
              type="text"
              name="hr_email"
              defaultValue={user?.email}
              readOnly={true}
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control col-span-2">
            <label className="label">
              <span className="label-text">Company Logo </span>
            </label>
            <input
              type="url"
              name="company_logo"
              placeholder="Place Logo URL"
              className="input input-bordered w-full"
            />
          </div>

          <div className="form-control md:col-span-3">
            <button type="submit" className="btn btn-primary w-full">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddJobs;
