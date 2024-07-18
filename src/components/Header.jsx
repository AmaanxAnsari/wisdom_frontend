import React from "react";
import { Link } from "react-router-dom";
import { Siderbar } from "./Siderbar";
import { Siderbardealer } from "./Siderbardealer";
export const Header = () => {
  let user_type = localStorage.getItem('user_type');
  return (
    <>
      <div className="app-header header sticky mb-5">
        <div className="container-fluid main-container">
          <div className="d-flex">
            <a

              aria-label="Hide Sidebar"
              className="app-sidebar__toggle"
              data-bs-toggle="sidebar"
              href="/"
            />
            {/* sidebar-toggle*/}
            <a className="logo-horizontal " >
              <img
                src="logo.jpg"
                className="header-brand-img desktop-logo"
                alt="logo"
              />
              <img
                src="logo.jpg"
                className="header-brand-img light-logo1"
                alt="logo"
              />
            </a>
            {/* LOGO */}
            {/* <div className="main-header-center ms-3 d-none d-lg-block">
              <input
                type="text"
                className="form-control"
                id="typehead"
                placeholder="Search for results..."
              />
              <button className="btn px-0 pt-2">
                <i className="fe fe-search" aria-hidden="true" />
              </button>
            </div> */}
            <div className="d-flex order-lg-2 ms-auto header-right-icons">
              {/* SEARCH */}
              <button
                className="navbar-toggler navresponsive-toggler d-lg-none ms-auto"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent-4"
                aria-controls="navbarSupportedContent-4"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon fe fe-more-vertical" />
              </button>
              <div className="navbar navbar-collapse responsive-navbar p-0">
                <div
                  className="collapse navbar-collapse"
                  id="navbarSupportedContent-4"
                >
                  <div className="d-flex order-lg-2">
                    <div className="dropdown d-lg-none d-flex">
                      <Link
                        to="/"
                        href="/"
                        className="nav-link icon"
                        data-bs-toggle="dropdown"
                      >
                        <i className="fe fe-search" />
                      </Link>
                      <div className="dropdown-menu header-search dropdown-menu-start">
                        <div className="input-group w-100 p-2">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Search...."
                          />
                          <div className="input-group-text btn btn-primary">
                            <i className="fa fa-search" aria-hidden="true" />
                          </div>
                        </div>
                      </div>
                    </div>




                    {/* FULL-SCREEN */}
                    {/* <div className="dropdown  d-flex notifications">
                      <Link
                        to="/"
                        className="nav-link icon"
                        data-bs-toggle="dropdown"
                      >
                        <i className="fe fe-bell" />
                        <span className=" pulse" />
                      </Link>
                      <div className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                        <div className="drop-heading border-bottom">
                          <div className="d-flex">
                            <h6 className="mt-1 mb-0 fs-16 fw-semibold text-dark">
                              Notifications
                            </h6>
                          </div>
                        </div>
                        <div className="notifications-menu">
                          <Link
                            to="/"
                            className="dropdown-item d-flex"
                            href="notify-list.html"
                          >
                            <div className="me-3 notifyimg  bg-primary brround box-shadow-primary">
                              <i className="fe fe-mail" />
                            </div>
                            <div className="mt-1 wd-80p">
                              <h5 className="notification-label mb-1">
                                New Application received
                              </h5>
                              <span className="notification-subtext">
                                3 days ago
                              </span>
                            </div>
                          </Link>
                          <Link
                            to="/"
                            className="dropdown-item d-flex"
                            href="notify-list.html"
                          >
                            <div className="me-3 notifyimg  bg-secondary brround box-shadow-secondary">
                              <i className="fe fe-check-circle" />
                            </div>
                            <div className="mt-1 wd-80p">
                              <h5 className="notification-label mb-1">
                                Project has been approved
                              </h5>
                              <span className="notification-subtext">
                                2 hours ago
                              </span>
                            </div>
                          </Link>
                          <Link
                            to="/"
                            className="dropdown-item d-flex"
                            href="notify-list.html"
                          >
                            <div className="me-3 notifyimg  bg-success brround box-shadow-success">
                              <i className="fe fe-shopping-cart" />
                            </div>
                            <div className="mt-1 wd-80p">
                              <h5 className="notification-label mb-1">
                                Your Product Delivered
                              </h5>
                              <span className="notification-subtext">
                                30 min ago
                              </span>
                            </div>
                          </Link>
                          <Link
                            to="/"
                            className="dropdown-item d-flex"
                            href="notify-list.html"
                          >
                            <div className="me-3 notifyimg bg-pink brround box-shadow-pink">
                              <i className="fe fe-user-plus" />
                            </div>
                            <div className="mt-1 wd-80p">
                              <h5 className="notification-label mb-1">
                                Friend Requests
                              </h5>
                              <span className="notification-subtext">
                                1 day ago
                              </span>
                            </div>
                          </Link>
                        </div>
                        <div className="dropdown-divider m-0" />
                        <Link
                          to="/"
                          href="notify-list.html"
                          className="dropdown-item text-center p-3 text-muted"
                        >
                          View all Notification
                        </Link>
                      </div>
                    </div> */}


                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {user_type === "admin" ?(<Siderbar />):(<Siderbardealer />)}

    </>
  );
};
