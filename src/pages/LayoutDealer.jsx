import React, { useEffect } from "react";
import { Header } from "../components/Header";
import { useNavigate } from "react-router-dom";
import { Outlet, Link } from "react-router-dom";
export const Layout = (props) => {
  const navigate = useNavigate();

 

  useEffect(()=>{
    let user_token = localStorage.getItem('user_token');
    // console.log("user_token",user_token);
    if(user_token === null)
    { localStorage.clear();
      navigate("/",{ state: { message: "Session Expired, Please Login To Continue !!" } });;
    }
  },[])
  return (
    <div className="app sidebar-mini ltr light-mode">
      <div>
        <div className="page">
          <div className="page-main">
            <Header />

            <div style={{ marginTop: "5%" }}>{props.children}</div>
          </div>

          {/*/Sidebar-right*/}
          {/* Country-selector modal*/}
          <div className="modal fade" id="country-selector">
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content country-select-modal">
                <div className="modal-header">
                  <h6 className="modal-title">Choose Country</h6>
                  <button
                    aria-label="Close"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    type="button"
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body">
                  <ul className="row p-3">
                    <li className="col-lg-6 mb-2">
                      <a
                        href="javascript:void(0)"
                        className="btn btn-country btn-lg btn-block active"
                      >
                        <span className="country-selector">
                          <img
                            alt
                            src="../assets/images/flags/us_flag.jpg"
                            className="me-3 language"
                          />
                        </span>
                        USA
                      </a>
                    </li>
                    <li className="col-lg-6 mb-2">
                      <a
                        href="javascript:void(0)"
                        className="btn btn-country btn-lg btn-block"
                      >
                        <span className="country-selector">
                          <img
                            alt
                            src="../assets/images/flags/italy_flag.jpg"
                            className="me-3 language"
                          />
                        </span>
                        Italy
                      </a>
                    </li>
                    <li className="col-lg-6 mb-2">
                      <a
                        href="javascript:void(0)"
                        className="btn btn-country btn-lg btn-block"
                      >
                        <span className="country-selector">
                          <img
                            alt
                            src="../assets/images/flags/spain_flag.jpg"
                            className="me-3 language"
                          />
                        </span>
                        Spain
                      </a>
                    </li>
                    <li className="col-lg-6 mb-2">
                      <a
                        href="javascript:void(0)"
                        className="btn btn-country btn-lg btn-block"
                      >
                        <span className="country-selector">
                          <img
                            alt
                            src="../assets/images/flags/india_flag.jpg"
                            className="me-3 language"
                          />
                        </span>
                        India
                      </a>
                    </li>
                    <li className="col-lg-6 mb-2">
                      <a
                        href="javascript:void(0)"
                        className="btn btn-country btn-lg btn-block"
                      >
                        <span className="country-selector">
                          <img
                            alt
                            src="../assets/images/flags/french_flag.jpg"
                            className="me-3 language"
                          />
                        </span>
                        French
                      </a>
                    </li>
                    <li className="col-lg-6 mb-2">
                      <a
                        href="javascript:void(0)"
                        className="btn btn-country btn-lg btn-block"
                      >
                        <span className="country-selector">
                          <img
                            alt
                            src="../assets/images/flags/russia_flag.jpg"
                            className="me-3 language"
                          />
                        </span>
                        Russia
                      </a>
                    </li>
                    <li className="col-lg-6 mb-2">
                      <a
                        href="javascript:void(0)"
                        className="btn btn-country btn-lg btn-block"
                      >
                        <span className="country-selector">
                          <img
                            alt
                            src="../assets/images/flags/germany_flag.jpg"
                            className="me-3 language"
                          />
                        </span>
                        Germany
                      </a>
                    </li>
                    <li className="col-lg-6 mb-2">
                      <a
                        href="javascript:void(0)"
                        className="btn btn-country btn-lg btn-block"
                      >
                        <span className="country-selector">
                          <img
                            alt
                            src="../assets/images/flags/argentina.jpg"
                            className="me-3 language"
                          />
                        </span>
                        Argentina
                      </a>
                    </li>
                    <li className="col-lg-6 mb-2">
                      <a
                        href="javascript:void(0)"
                        className="btn btn-country btn-lg btn-block"
                      >
                        <span className="country-selector">
                          <img
                            alt
                            src="../assets/images/flags/malaysia.jpg"
                            className="me-3 language"
                          />
                        </span>
                        Malaysia
                      </a>
                    </li>
                    <li className="col-lg-6 mb-2">
                      <a
                        href="javascript:void(0)"
                        className="btn btn-country btn-lg btn-block"
                      >
                        <span className="country-selector">
                          <img
                            alt
                            src="../assets/images/flags/turkey.jpg"
                            className="me-3 language"
                          />
                        </span>
                        Turkey
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          {/* Country-selector modal*/}
          {/* FOOTER */}
          <footer className="footer">
            <div className="container">
              <div className="row align-items-center flex-row-reverse">
                <div className="col-md-12 col-sm-12 text-center">
                  Copyright © <span id="year" />{" "}
                  <a href="javascript:void(0)">SoftechSolution</a>
                  {/* <span className="fa fa-heart text-danger" /> by{" "} */}
                  {/* <a href="javascript:void(0)"> India </a> All rights reserved. */}
                </div>
              </div>
            </div>
          </footer>
          {/* FOOTER END */}
        </div>
        {/* BACK-TO-TOP */}
        <a href="#top" id="back-to-top">
          <i className="fa fa-angle-up" />
        </a>
      </div>
    </div>
  );
};
