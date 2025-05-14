import React from "react";
import useCategoryIcon from "../../../hooks/useCategoryIcon";
import { Link } from "react-router";

const ExploreJob = ({ category }) => {
  const { count, category: jobCategory } = category;

  const getIcon = useCategoryIcon();
  const IconComponent = getIcon(jobCategory);

  return (
    <Link to={`/category/${jobCategory}`}>
      <div className="py-16 px-4 flex flex-col justify-center items-center border-2 border-[#d1ece7cc] hover:border-[#00bf58] text-center rounded-[40px] sm:rounded-[50px] hover:shadow-lg hover:cursor-pointer transition-shadow duration-300">
        <IconComponent className="text-2xl sm:text-3xl opacity-70 mb-4" />
        <h2 className="text-[14px] sm:text-[16px] font-semibold text-[#254035] uppercase tracking-wide mb-2">
          {jobCategory}
        </h2>
        <p className="text-[12px] sm:text-[14px] text-[#09321c99]">
          {count}+ jobs
        </p>
      </div>
    </Link>
  );
};

export default ExploreJob;
