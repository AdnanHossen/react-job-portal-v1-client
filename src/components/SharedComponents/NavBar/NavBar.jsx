import React from "react";
import { Link, NavLink } from "react-router";
import useAuth from "../../../hooks/useAuth";

const NavBar = () => {
  // context value
  const { user, signOutAuth } = useAuth();
  console.log(user);

  // links dynamic way
  const links = (
    <>
      <li>
        <NavLink to={"/"}>Home</NavLink>
      </li>
      <li>
        <NavLink to={"/jobs"}>All Jobs</NavLink>
      </li>
      <li>
        <NavLink to={"/add-jobs"}>Add Jobs</NavLink>
      </li>
      <li>
        <NavLink to={"/applications/me"}>My Applications</NavLink>
      </li>
      <li>
        <NavLink to={"/posted-jobs"}>Posted Jobs</NavLink>
      </li>
    </>
  );

  // return code
  return (
    <div className="navbar">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <Link className="btn btn-ghost text-xl">Jobi</Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end space-x-2">
        {user ? (
          <>
            <button className="btn btn-outline" onClick={signOutAuth}>
              Sign Out
            </button>
          </>
        ) : (
          <>
            <button className="btn btn-outline">
              <Link to={"/register"}>Register</Link>
            </button>
            <button className="btn btn-neutral">
              <Link to={"/login"}>Login</Link>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default NavBar;
