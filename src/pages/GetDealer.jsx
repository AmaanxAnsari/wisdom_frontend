import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate,useLocation } from "react-router-dom";
// import '../login.css';
import { Routes, Route, useParams } from 'react-router-dom';
import logo from '../assets/logo.png';
export const GetDealer = (props) => {
  const {state} = useLocation();

  let { id } = useParams();
  const [dealer, setDealer] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();
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

  const formsSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    console.log("formJson",formJson);
    addCustomer(formJson);
    setLoading(false);
  };
  const validateOTP = (e) => {
    e.preventDefault();

    setError("Not Validate , Please Try Again");

    // setLoading(true);
    // e.preventDefault();
    // const form = e.target;
    // const formData = new FormData(form);
    // const formJson = Object.fromEntries(formData.entries());
    // console.log("formJson",formJson);
    // addCustomer(formJson);
    // setLoading(false);
  };
  const addCustomer = async (body) => {
    setError("");
    setSuccessMessage("");

    setLoading(true);

    // setLoading(false);
   
    try {
      const token = await axios.post(postURL,
        body,
        config
      );
      if (token.data._id) {
        // getClientData();
        setSuccessMessage("Registration Completed !");
        setDealer();
        setShowOTP(true);
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
  const getClientData = async (id) => {
    const getUrl = `${process.env.REACT_APP_API_URL}/dealer/filter?code=${id}`;

    setError("");
    try {
      const data = await axios.get(getUrl,config);
      if (data.data) {
        setDealer(data.data);
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
    setDealer();
    getClientData(id);
  },[id])

 

  return (
    <div className="app  ltr login-img">
      {loading && (
        <div id="global-loader">
          <img
            src="assets/images/loader.svg"
            className="loader-img"
            alt="Loader"
          />
        </div>
      )}
  {/* <h2>{props.match.params.id}</h2> */}
      <div className="page">
        <div className>
          {/* CONTAINER OPEN */}
          <div className="col col-login mx-auto">
            <div className="text-center mb-2">
              <a href="index.html">
                <img
                  src={logo}
                  style={{ width: "100px", height: "100px" }}
                  alt="logo"
                />
              </a>
            </div>
          </div>
          <div className="container">
            <div className="wrap-login100 p-6">
              {/* <form className="login100-form validate-form"> */}
              <span className="login100-form-title pb-5">User Registration</span>
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

              {dealer &&  <div className="container">
                <div className="row">
                  <form method="post" onSubmit={formsSubmit}>

                      <div className="col-lg-12">
                          <div className="form-group">
                              <label htmlFor="">Dealer Name <span className="text-danger">*</span> </label>
                              <input type="text" readOnly value={dealer?.firm_name} className="form-control" />
                          </div>
                      </div>
                      <div className="col-lg-12">
                          <div className="form-group">
                              <label htmlFor="">Name <span className="text-danger">*</span> </label>
                              <input type="text" required name="name" placeholder="Enter Name"  className="form-control" />
                          </div>
                      </div>
                      <div className="col-lg-12">
                          <div className="form-group">
                              <label htmlFor="">Mobile <span className="text-danger">*</span> </label>
                              <input type="number" required name="mobile" placeholder="Enter Mobile"  className="form-control" />
                          </div>
                      </div>
                      <div className="col-lg-12">
                          <div className="form-group">
                              <label htmlFor="">Purchase Quantity <span className="text-danger">*</span> </label>
                              <input type="number" required name="purchaseQuantity" placeholder="Enter Purchase Quantity "  className="form-control" />
                          </div>
                      </div>
                      <div className="col-lg-12">
                          <div className="form-group">
                              <label htmlFor="">Pincode<span className="text-danger">*</span> </label>
                              <input type="number" required name="pincode" placeholder="Enter Pincode"  className="form-control" />
                          </div>
                      </div>
                      <div className="col-lg-12">
                          <div className="form-group">
                              <label htmlFor="">Product Type<span className="text-danger">*</span> </label>
                              <input type="text" required name="productType" placeholder="Enter Product Type"  className="form-control" />
                              <input type="hidden" required name="dealerId" value={dealer._id} placeholder="Enter Product Type"  className="form-control" />
                          </div>
                      </div>
                      <div className="col-lg-12">
                          <div className="form-group mx-auto d-block">
                          <div className="container-login100-form-btn">
                        <button
                        type="submit"
                          className="login100-form-btn btn-primary"
                        >
                          Register
                        </button>
                      </div>
                          </div>
                      </div>
                    </form>
                </div>
              </div>}
              {showOTP &&  <div className="container">
                <div className="row">
                  <form method="post" onSubmit={validateOTP}>

                      <div className="col-lg-12">
                          <div className="form-group">
                              <label htmlFor="">Enter OTP <span className="text-danger">*</span> </label>
                              <input type="number" placeholder="Enter 4 Digit OTP"  onChange={(e)=>{setOTP(e.target.value)}} className="form-control" />
                          </div>
                      </div>
                     
                     
                      <div className="col-lg-12">
                          <div className="form-group mx-auto d-block">
                          <div className="container-login100-form-btn">
                        <button
                        type="submit"
                          className="login100-form-btn btn-primary"
                        >
                          Verify OTP
                        </button>
                      </div>
                          </div>
                      </div>
                    </form>
                </div>
              </div>}
             
              {/* </form> */}
            </div>
          </div>
          {/* CONTAINER CLOSED */}
        </div>
      </div>
      {/* End PAGE */}
    </div>
  );
};
