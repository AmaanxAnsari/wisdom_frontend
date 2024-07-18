import React  from 'react'
import { Outlet, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const Siderbar = () => {
  const navigate = useNavigate();

  const logout = () =>{

    localStorage.clear();
    navigate("/");

  }
  return (
    <div className="sticky">
      <div className="app-sidebar__overlay" data-bs-toggle="sidebar" />
      <div className="app-sidebar">
        <div className="side-header" style={{ height: "80px" }}>
          <Link to="/" className="header-brand1" href="index.html">
            <img
              src="jsw_steel_logo.png"
              className="header-brand-img desktop-logo"
              alt="logo"
              style={{ height: "80px" }}
            />
            <img
              src="jsw_steel_logo.png"
              className="header-brand-img toggle-logo"
              alt="logo"
              style={{ height: "80px" }}
            />
            <img
              src="jsw_steel_logo.png"
              className="header-brand-img light-logo"
              alt="logo"
              style={{ height: "80px" }}
            />
            <img
              src="jsw_steel_logo.png"
              className="header-brand-img light-logo1"
              alt="logo"
              style={{ height: "80px" }}
            />
          </Link>
          {/* LOGO */}
        </div>
        <div className="main-sidemenu">
          <div className="slide-left disabled" id="slide-left">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#7b8191"
              width={24}
              height={24}
              viewBox="0 0 24 24"
            >
              <path d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z" />
            </svg>
          </div>
          <ul className="side-menu">
            <li className="sub-category">
              <h3>Main</h3>
            </li>
            <li className="slide">
              <Link
                to="/admin"
                className="side-menu__item has-link"
                data-bs-toggle="slide"
                href="index.html"
              >
                <i className="side-menu__icon fe fe-home"></i>
                <span className="side-menu__label">Dashboard</span>
              </Link>
            </li>
            <li className="sub-category">
              <h3>Master</h3>
            </li>
            <li className="slide">
              <Link
                to="/admin_students"
                className="side-menu__item"
                data-bs-toggle="slide"
                // href="/"
              >
                <i className="side-menu__icon fe fe-user" />
                <span className="side-menu__label">Students</span>
              </Link>
            </li>
            <li className="slide">
              <Link
                to="/admin_courses"
                className="side-menu__item"
                data-bs-toggle="slide"
                // href="/"
              >
                <i className="side-menu__icon fe fe-shopping-bag" />
                <span className="side-menu__label">Courses</span>
              </Link>
            </li>
            <li className="slide">
              <Link
                to="/admin_videos"
                className="side-menu__item"
                data-bs-toggle="slide"
                // href="/"
              >
                <i className="side-menu__icon fe fe-video" />
                <span className="side-menu__label">Videos</span>
              </Link>
            </li>

            <li className="slide">
              <Link
                to="/admin_users"
                className="side-menu__item"
                data-bs-toggle="slide"
              >
                <i className="side-menu__icon fe fe-settings" />
                <span className="side-menu__label">Admin Users</span>
              </Link>
            </li>
            <li className="slide">
              <p
                onClick={logout}
                className="side-menu__item"
                data-bs-toggle="slide"
              >
                <i className="side-menu__icon fe fe-log-out" />
                <span className="side-menu__label">Logout</span>
              </p>
            </li>
          </ul>
        </div>
      </div>
      {/*/APP-SIDEBAR*/}
        <Outlet />
    </div>
  );
}
