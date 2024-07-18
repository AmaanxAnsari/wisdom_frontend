import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Loading } from "./Loading";

export const Employees = () => {
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);
  const closeButton = useRef(null);
  const getURL = `${process.env.REACT_APP_API_URL}/admin/user`;

  const formsSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    addCustomer(formJson);
    setLoading(false);
  };

  const addCustomer = async (body) => {
    setError("");
    setSuccessMessage("");

    setLoading(true);

    // setLoading(false);
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("user_token")}`,
      },
    };
    console.log("config", config);
    try {
      const token = await axios.post(getURL,
        body,
        config
      );
      if (token.data._id) {
        // getClientData();
        setSuccessMessage("User Added Successfully !");
        closeButton.current.click();
      } else {
        setError("Something Went Wrong ");
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message);
      } else {
        setError(err.message);
      }
    }
    setLoading(false);

  };

  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("user_token")}`,
    },
  };
  const getClientData = async () => {
    setError("");
    setSuccessMessage("");
    try {
      const data = await axios.get(getURL,config);
      if (data.data) {
        setClients(data.data);
      } else {
        setError("Something Went Wrong !! ");
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message);
      } else {
        setError(err.message);
      }
      // console.log("errr",err.response.data.message);

      // throw new Error("Unable to get a token.");
    }
  };
  useEffect(() => {
    getClientData();
  }, []);

  return (
    <div className="main-content app-content mt-0">
      <div className="side-app">
        {/* CONTAINER */}
        <div className="main-container container-fluid">
          {/* PAGE-HEADER */}
          <div className="page-header">
            <h1 className="page-title">Admin Users</h1>
            <div>
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="/admin">Home</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                Admin Users
                </li>
              </ol>
            </div>
          </div>
          <div className="row row-sm">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-header">
                  <div className="row">
                    <div className="col-lg-12">
                      <h3 className="card-title">Admin Users</h3>
                    </div>
                    <div className="col-lg-12 mt-4">
                      {successMessage.length > 0 && (
                        <div class="alert alert-success" role="alert">
                          <button
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="alert"
                            aria-hidden="true"
                          >
                            ×
                          </button>
                          <i class="fa fa-frown-o me-2" aria-hidden="true"></i>
                          {successMessage}
                        </div>
                      )}
                      {error.length > 0 && (
                        <div class="alert alert-danger" role="alert">
                          <button
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="alert"
                            aria-hidden="true"
                          >
                            ×
                          </button>
                          <i class="fa fa-frown-o me-2" aria-hidden="true"></i>
                          {error}
                        </div>
                      )}
                    </div>
                  </div>
                  <br />
                </div>
                <div className="card-header">
                  <button
                    type="button"
                    className="btn btn-green me-3  mt-2"
                    data-bs-toggle="modal"
                    data-bs-target="#input-modal"
                    data-bs-whatever="@mdo"
                  >
                    Add
                  </button>
                  <div className="modal fade" id="input-modal">
                    <div className="modal-dialog" role="document">
                      <div className="modal-content modal-content-demo">
                        <form method="post" onSubmit={formsSubmit}>
                          <div className="modal-header">
                            <h6 className="modal-title">Add</h6>
                            <button
                              className="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            >
                              <span aria-hidden="true">×</span>
                            </button>
                          </div>
                          <div className="modal-body">
                            {loading ? (
                              <Loading />
                            ) : (
                              <>
                                {error.length > 0 && (
                                  <div className="mb-3">
                                    <div
                                      class="alert alert-danger"
                                      role="alert"
                                    >
                                      <button
                                        type="button"
                                        class="btn-close"
                                        data-bs-dismiss="alert"
                                        aria-hidden="true"
                                      >
                                        ×
                                      </button>
                                      <i
                                        class="fa fa-frown-o me-2"
                                        aria-hidden="true"
                                      ></i>
                                      {error}
                                    </div>
                                  </div>
                                )}
                                <div className="mb-3">
                                  <label
                                    htmlFor="recipient-name"
                                    className="col-form-label"
                                  >
                                    First Name :
                                  </label>
                                  <input
                                    type="text"
                                    name="firstName"
                                    className="form-control"
                                    id="recipient-name"
                                    required
                                    placeholder="Enter First Name"
                                  />
                                </div>
                                <div className="mb-3">
                                  <label
                                    htmlFor="message-text"
                                    className="col-form-label"
                                  >
                                    Last Name:
                                  </label>
                                  <input
                                    type="text"
                                    name="lastName"
                                    className="form-control"
                                    id="recipient-name"
                                    required
                                    placeholder="Enter Last Name"
                                  />
                                </div>
                                <div className="mb-3">
                                  <label
                                    htmlFor="message-text"
                                    className="col-form-label"
                                  >
                                     Email:
                                  </label>
                                  <input
                                    type="email"
                                    name="email"
                                    className="form-control"
                                    id="recipient-name"
                                    required
                                    placeholder="Enter Email"
                                  />
                                </div>
                                <div className="mb-3">
                                  <label
                                    htmlFor="message-text"
                                    className="col-form-label"
                                  >
                                    Mobile:
                                  </label>
                                  <input
                                    type="number"
                                    name="mobile"
                                    className="form-control"
                                    id="recipient-name"
                                    required
                                    placeholder="Enter Mobile"
                                  />
                                </div>
                                <div className="mb-3">
                                  <label
                                    htmlFor="message-text"
                                    className="col-form-label"
                                  >
                                    Password:
                                  </label>
                                  <input
                                    type="password"
                                    name="password"
                                    className="form-control"
                                    id="recipient-name"
                                    required
                                    placeholder="Enter Password"
                                  />
                                </div>
                               
                              </>
                            )}
                          </div>
                          <div className="modal-footer">
                            <button
                              className="btn ripple btn-success"
                              type="submit"
                            >
                              Save changes
                            </button>
                            <button
                              className="btn ripple btn-danger"
                              data-bs-dismiss="modal"
                              type="button"
                              ref={closeButton}
                            >
                              Close
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table
                      id="file-datatable"
                      className="table table-bordered text-nowrap key-buttons border-bottom"
                    >
                      <thead>
                        <tr>
                          <th className="border-bottom-0">Sr No</th>
                          <th className="border-bottom-0">Name</th>
                          <th className="border-bottom-0">Address</th>
                          <th className="border-bottom-0">Mobile</th>
                          <th className="border-bottom-0">Password</th>
                          <th className="border-bottom-0">State</th>
                          <th className="border-bottom-0">Code</th>
                        </tr>
                      </thead>
                      {loading ? (
                        <div className="text-center mt-2 mb-4">Loading......</div>
                      ) : (
                        <tbody>
                          {clients &&
                            clients.map((item, i) => {
                              return (
                                <tr key={i}>
                                  <td>{i + 1}</td>
                                  <td>{item?.name}</td>
                                  <td>{item?.address}</td>
                                  <td>{item?.mobile}</td>
                                  <td>{item?.password}</td>
                                  <td>{item?.state}</td>
                                  <td>{item?.code}</td>
                                </tr>
                              );
                            })}
                        </tbody>
                      )}
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* CONTAINER END */}
      </div>
    </div>
  );
};
