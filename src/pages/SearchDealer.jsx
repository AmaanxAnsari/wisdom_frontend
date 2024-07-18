import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import '../login.css';
import {  useParams } from 'react-router-dom';
export const SearchDealer = () => {

  let { id } = useParams();
  const [dealer, setDealer] = useState("");

  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
 
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("user_token")}`,
    },
  };

 

  const checkDealer = async () => {
    setLoading(true);

    console.log("checkdealercalled",dealer);
    if(dealer.length <= 0)
    {
       setError("Please Enter Dealer Code");
       setLoading(false);

    }
    else
    {
      const getUrl = `${process.env.REACT_APP_API_URL}/dealer/filter?code=${dealer}`;

      setError("");
      try {
        const data = await axios.get(getUrl,config);
        if (data.data) {
          console.log("success",data.data);

          navigate(`/dealer/${dealer}`)
        } else {
          setError("Something Went Wrong !! ");
        }
      } catch (err) {
        if (err.response) {
          setError(err.response.data.message);
        } else {
          setError(err.message);
        }
  
      }
    }
    setLoading(false);

    
  };

  useEffect(()=>{
    setDealer();
    // getClientData(id);
  },[id])

 


  return (
    <div className="app  ltr login-img">
    
      <div className="page">
        <div className>
          {/* CONTAINER OPEN */}
          <div className="col col-login mx-auto mt-7">
            <div className="text-center">
              <a href="index.html">
                <img
                  src="logo.png"
                  style={{ width: "100px", height: "100px" }}
                  alt="logo"
                />
              </a>
            </div>
          </div>
          <div className="container-login100">
            <div className="wrap-login100 p-6">
              {/* <form className="login100-form validate-form"> */}
              <span className="login100-form-title pb-5">Search Dealer By Code</span>
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

              <div className="panel panel-primary">
                
                <div className="container">
                    <div className="row">
                    <div className="col-lg-8">
                          <div className="form-group">
                            {/* <label htmlFor="">Enter Dealer Name</label> */}
                            <input
                              type="text"
                              placeholder="Enter Dealer Name"
                              className="form-control"
                              onChange={(e)=>{
                                setDealer(e.target.value);
                              }}
                            />
                          </div>
                        </div>
                        <div className="col-lg-2">
                          {dealer && ( <button
                          onClick={checkDealer}
                          className="btn btn-primary btm-sm"
                        
                        >
                          {loading ? "Loading." : "Search"}
                          {/* Search */}
                        </button>)}
                       
                        </div>
                    </div>
                      
                      </div>
              </div>
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
