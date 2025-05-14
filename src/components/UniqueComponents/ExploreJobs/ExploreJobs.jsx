import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import ExploreJob from "./ExploreJob";

const ExploreJobs = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/categories`).then((res) => {
      console.log(res.data);
      setCategories(res.data);
    });
  }, []);

  return (
    <div className="w-[90%] mx-auto py-10 space-y-10">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-[32px] sm:text-[40px] md:text-[48px] font-semibold text-[#005025] leading-tight">
          Explore the marketplace.
        </h1>
        <p className="text-[14px] sm:text-[16px] text-[#00bf58] underline uppercase tracking-wide font-medium">
          <Link to={"/jobs"}>Explore all fields</Link>
        </p>
      </div>

      {/* Grid Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
        {categories.map((category, idx) => (
          <ExploreJob key={idx} category={category} />
        ))}
      </div>
    </div>
  );
};

export default ExploreJobs;
