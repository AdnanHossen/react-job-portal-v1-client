import React, { useEffect } from "react";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";

const MyApplications = () => {
  // user auth
  const { user } = useAuth();
  const email = user?.email;
  console.log(user?.email);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/applications?applicantEmail=${email}`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [email]);

  // return code
  return (
    <div>
      <h1>hello from my applications</h1>
    </div>
  );
};

export default MyApplications;
