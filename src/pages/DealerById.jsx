import React,{useState,useEffect} from 'react'
import { Outlet, Link } from "react-router-dom";
import { Routes, Route, useParams } from 'react-router-dom';
import axios from "axios";

export const DealerById = () => {
    let { id } = useParams();
    const [data, setData] = useState([]);
    const [successMessage, setSuccessMessage] = useState("");
    const [clients, setClients] = useState([]);
    const [error, setError] = useState("");
    const [password, setPassword] = useState("password");
    const [email, setEmail] = useState("email1@email.com");
    const [loading, setLoading] = useState(false);
    const [showOTP, setShowOTP] = useState(false);
    const [otp, setOTP] = useState("");
   
    const postURL = `${process.env.REACT_APP_API_URL}/customer`;
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("user_token")}`,
      },
    };

    const getCustomers = async () => {
      setLoading(true);
      setError("");
      setSuccessMessage("");
      try {
        const data = await axios.get(postURL, config);
        if (data.data) {
          setClients(data.data);
        } else {
          setError("Something Went Wrong !! ");
        }
        setLoading(false);
      } catch (err) {
        if (err.response) {
          setError(err.response.data.message);
        } else {
          setError(err.message);
        }
        setLoading(false);

        // console.log("errr",err.response.data.message);

        // throw new Error("Unable to get a token.");
      }
    };

    const getData = async (id) => {
      const getUrl = `${process.env.REACT_APP_API_URL}/dealer/${id}`;
    
      console.log("geturl",getUrl);
        setError("");
        try {
          const data = await axios.get(getUrl,config);
          if (data.data) {
            setData(data.data);
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
    useEffect(()=>{
        getData(id);
        getCustomers();
    },[id])
  return (
    //     <div className="main-content app-content mt-0">
    //     <div className="side-app">
    //       {/* CONTAINER */}
    //       <div className="main-container container-fluid">
    //         {/* PAGE-HEADER */}
    //         <div className="page-header">
    //           <h1 className="page-title">Dealer's Details</h1>
    //           <div>
    //             <ol className="breadcrumb">
    //               <li className="breadcrumb-item">
    //                 <a href="/admin">Home</a>
    //               </li>
    //               <li className="breadcrumb-item active" aria-current="page">
    //                 <Link to="/admin_courses">Dealer's</Link>

    //               </li>
    //               <li className="breadcrumb-item active" aria-current="page">
    //               Dealer's Details
    //               </li>
    //             </ol>
    //           </div>
    //         </div>
    //         <div className="row row-sm">
    //           <div className="col-lg-12">
    //             <div className="card">
    //               <div className="card-header">
    //                 <div className="row">
    //                   <div className="col-lg-12">
    //                     <h3 className="card-title">Dealer Details</h3>
    //                   </div>
    //                   <div className="col-lg-12 mt-4">
    //                     {successMessage.length > 0 && (
    //                       <div class="alert alert-success" role="alert">
    //                         <button
    //                           type="button"
    //                           class="btn-close"
    //                           data-bs-dismiss="alert"
    //                           aria-hidden="true"
    //                         >
    //                           ×
    //                         </button>
    //                         <i class="fa fa-frown-o me-2" aria-hidden="true"></i>
    //                         {successMessage}
    //                       </div>
    //                     )}
    //                     {error.length > 0 && (
    //                       <div class="alert alert-danger" role="alert">
    //                         <button
    //                           type="button"
    //                           class="btn-close"
    //                           data-bs-dismiss="alert"
    //                           aria-hidden="true"
    //                         >
    //                           ×
    //                         </button>
    //                         <i class="fa fa-frown-o me-2" aria-hidden="true"></i>
    //                         {error}
    //                       </div>
    //                     )}
    //                   </div>
    //                 </div>
    //                 <br />
    //               </div>

    //               <div className="card-body">
    //                 <div className="table-responsive">
    //                   <table
    //                     id="file-datatable"
    //                     className="table table-bordered text-nowrap key-buttons border-bottom"
    //                   >

    //                     {loading ? (
    //                       <div className="text-center mt-2 mb-4">Loading......</div>
    //                     ) : (
    //                       <>
    //                       <thead>
    //                       <tr>
    //                         <th className="border-bottom-0">Sr No</th>
    //                         <th className="border-bottom-0">Name</th>
    //                         <th className="border-bottom-0">Mobile</th>
    //                         <th className="border-bottom-0">Email</th>
    //                       </tr>
    //                     </thead>
    //                       <tbody>
    //                         {data &&
    //  (

    //                               <tr key={data._id}>
    //                                 <td>{1}</td>
    //                                 <td>{data.firm_name}</td>
    //                                 <td>{data.mobile}</td>
    //                                 <td>{data.email}</td>

    //                               </tr>
    //                            )}
    //                       </tbody>
    //                       </>
    //                     )}
    //                     </table>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //       {/* CONTAINER END */}
    //     </div>
    //   </div>
    <div className="main-content app-content mt-9">
      <div className="side-app">
        {/* CONTAINER */}
        <div className="main-container container-fluid mt-5">
          {/* PAGE-HEADER */}
          <div className="page-header">
            <h1 className="page-title">Retailer Details</h1>
            <div>
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="/admin">Home</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  <Link to="/admin_students">Retailer</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Retailer Details
                </li>
              </ol>
            </div>
          </div>

          {/* Dealers Tabs */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Name:- {data.firm_name}</h3>
            </div>
            <div className="card-body">
              <div className="panel panel-primary">
                <div className="tab-menu-heading">
                  <div className="tabs-menu">
                    {/* Tabs */}
                    <ul className="nav panel-tabs panel-info">
                      <li>
                        <a
                          href="#tab21"
                          className="active"
                          data-bs-toggle="tab"
                        >
                          <span>
                            <i className="fe fe-user me-1" />
                          </span>
                          Retailer Profile
                        </a>
                      </li>
                      <li>
                        <a href="#tab23" data-bs-toggle="tab">
                          <span>
                            <i className="fe fe-shopping-bag me-1" />
                          </span>
                          Sale Details
                        </a>
                      </li>
                      <li>
                        <a href="#tab24" data-bs-toggle="tab">
                          <span>
                            <i className="fe fe-database me-1" />
                          </span>
                          Customers
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="panel-body tabs-menu-body">
                  <div className="tab-content">
                    <div className="tab-pane active" id="tab21">
                      <div className="card ">
                        <div className="card-header">
                          <h3 className="card-title">Retailer Profile</h3>
                        </div>
                        <div className="card-body">
                          <div className="form-group">
                            <label htmlFor="exampleInputname">Name:</label>
                            <input
                              type="text"
                              className="form-control"
                              id="exampleInputname"
                              value={data.firm_name}
                              readOnly
                            />
                          </div>

                          <div className="form-group">
                            <label htmlFor="exampleInputname1">
                              Dealer ID:
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="exampleInputname1"
                              value={data._id}
                              readOnly
                            />
                          </div>

                          <div className="row">
                            <div className="col-lg-12 col-md-12">
                              <div className="form-group">
                                <label htmlFor="exampleInputnumber">
                                  Contact Number:
                                </label>
                                <input
                                  type="number"
                                  className="form-control"
                                  id="exampleInputnumber"
                                  value={data.mobile}
                                  readOnly
                                />
                              </div>
                            </div>
                            <div className="col-lg-12 col-md-12">
                              <div className="form-group">
                                <label htmlFor="exampleInputEmail1">
                                  Email Id:
                                </label>
                                <input
                                  type="email"
                                  className="form-control"
                                  id="exampleInputEmail1"
                                  value={data.email}
                                  readOnly
                                />
                              </div>
                            </div>
                          </div>
                          {/* <div className="form-group">
                    <label className="form-label">About Me</label>
                    <textarea
                      className="form-control"
                      rows={6}
                      defaultValue={"My bio........."}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Website</label>
                    <input
                      className="form-control"
                      placeholder="http://splink.com"
                    />
                  </div> */}
                        </div>
                        {/* <div className="card-footer text-end">
                          <button className="btn btn-success my-1 me-3">
                            Save
                          </button>
                          <button className="btn btn-danger my-1">
                            Cancel
                          </button>
                        </div> */}
                      </div>
                    </div>

                    <div className="tab-pane" id="tab23">
                      <div className="card ">
                        <div className="card-header">
                          <div className="card-title">Sale Details</div>
                        </div>

                        <div className="card-body">
                          <div className="table-responsive">
                            <table
                              id="file-datatable"
                              className="table table-bordered text-nowrap key-buttons border-bottom"
                            >
                              {loading ? (
                                <div className="text-center mt-2 mb-4">
                                  Loading......
                                </div>
                              ) : (
                                <>
                                  <thead>
                                    <tr>
                                      <th className="border-bottom-0">Sr No</th>
                                      <th className="border-bottom-0">
                                        Product
                                      </th>
                                      <th className="border-bottom-0">Qty</th>
                                      <th className="border-bottom-0">Rate</th>
                                      <th className="border-bottom-0">Total</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {clients &&
                                      clients.map((item, i) => {
                                        return (
                                          <tr key={i}>
                                            <td>{i + 1}</td>
                                            <td>{item?.name}</td>
                                            <td>{item?.mobile}</td>
                                            <td>{item?.dealerId}</td>
                                            <td>
                                              {item?.isPhoneNumberVerified
                                                ? "YES"
                                                : "NO"}
                                            </td>
                                          </tr>
                                        );
                                      })}
                                  </tbody>
                                </>
                              )}
                            </table>
                          </div>
                        </div>

                        {/* <div className="card-body">
                  <div className="text-center chat-image mb-5">
                    <div className="main-chat-msg-name">
                      <a href="profile.html">
                        <h5 className="mb-1 text-dark fw-semibold">
                          {data.name}
                        </h5>
                      </a>
                      <p className="text-muted mt-0 mb-0 pt-0 fs-13">
                        {data.mobile}
                      </p>
                    </div>
                  </div> */}
                        {/* <div className="form-group">
          <label className="form-label">Current Password</label>
          <div className="wrap-input100 validate-input input-group" id="Password-toggle">
            <a href="javascript:void(0)" className="input-group-text bg-white text-muted">
              <i className="zmdi zmdi-eye text-muted" aria-hidden="true" />
            </a>
            <input className="input100 form-control" type="password" placeholder="Current Password" autoComplete="current-password" />
          </div>
        </div> */}
                        {/* <div className="form-group">
          <label className="form-label">New Password</label>
          <div className="wrap-input100 validate-input input-group" id="Password-toggle1">
            <a href="javascript:void(0)" className="input-group-text bg-white text-muted">
              <i className="zmdi zmdi-eye text-muted" aria-hidden="true" />
            </a>
            <input className="input100 form-control" type="password" placeholder="New Password" autoComplete="new-password" />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Confirm Password</label>
          <div className="wrap-input100 validate-input input-group" id="Password-toggle2">
            <a href="javascript:void(0)" className="input-group-text bg-white text-muted">
              <i className="zmdi zmdi-eye text-muted" aria-hidden="true" />
            </a>
            <input className="input100 form-control" type="password" placeholder="Confirm Password" autoComplete="new-password" />
          </div>
        </div> */}
                        {/* </div> */}
                        {/* <div className="card-footer text-end">
        <a href="javascript:void(0)" className="btn btn-primary">Update</a>
        <a href="javascript:void(0)" className="btn btn-danger">Cancel</a>
      </div> */}
                      </div>
                    </div>
                    <div className="tab-pane" id="tab24">
                      <div className="card ">
                        <div className="card-header">
                          <div className="card-title">Customers</div>
                        </div>

                        <div className="card-body">
                          <div className="table-responsive">
                            <table
                              id="file-datatable"
                              className="table table-bordered text-nowrap key-buttons border-bottom"
                            >
                              {loading ? (
                                <div className="text-center mt-2 mb-4">
                                  Loading......
                                </div>
                              ) : (
                                <>
                                  <thead>
                                    <tr>
                                      <th className="border-bottom-0">Sr No</th>
                                      <th className="border-bottom-0">Name</th>
                                      <th className="border-bottom-0">
                                        Mobile
                                      </th>
                                      <th className="border-bottom-0">
                                        Dealer
                                      </th>
                                      <th className="border-bottom-0">
                                        Mobile Verified
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {clients &&
                                      clients.map((item, i) => {
                                        return (
                                          <tr key={i}>
                                            <td>{i + 1}</td>
                                            <td>{item?.name}</td>
                                            <td>{item?.mobile}</td>
                                            <td>{item?.dealerId}</td>
                                            <td>
                                              {item?.isPhoneNumberVerified
                                                ? "YES"
                                                : "NO"}
                                            </td>
                                          </tr>
                                        );
                                      })}
                                  </tbody>
                                </>
                              )}
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
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
}
