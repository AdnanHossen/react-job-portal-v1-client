import Lottie from "lottie-react";
import laptopBanner from "../../../assets/laptopAnimation.json";

const Banner = () => {
  return (
    <div className="hero min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse gap-6">
        <div className="flex-1 w-full max-w-md lg:max-w-full">
          <Lottie
            animationData={laptopBanner}
            loop={true}
            className="w-full h-auto"
          />
        </div>
        <div className="flex-1 w-full text-center lg:text-left">
          <p className="text-base text-[#5ea17e]">#1 Online Marketplace</p>
          <h1 className="text-[40px] md:text-[60px] lg:text-[80px] font-bold text-[#005025]">
            Find the talents for any job.
          </h1>
          <p className="py-4 lg:py-6 text-[18px] lg:text-[22px] text-[#000000b3]">
            Unlock your potential with quality job & earn from world leading
            brands & co.
          </p>
          <button className="btn btn-outline text-white py-6 px-7 rounded-full text-base bg-[#00bf58]">
            Post A Job
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
