import React from "react";
import Banner from "../../components/UniqueComponents/Banner/Banner";
import ExploreJobs from "../../components/UniqueComponents/ExploreJobs/ExploreJobs";

const Home = () => {
  return (
    <div>
      <main>
        {/* banner section */}
        <section className="">
          <Banner></Banner>
        </section>

        {/* explore section */}
        <section className="my-10 min-h-screen flex items-center justify-center">
          <ExploreJobs></ExploreJobs>
        </section>
      </main>
    </div>
  );
};

export default Home;
