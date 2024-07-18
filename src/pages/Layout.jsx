import React, { useEffect } from "react";
import { Header } from "../components/Header";
import { useNavigate } from "react-router-dom";
export const Layout = (props) => {
  const navigate = useNavigate();

 

  useEffect(()=>{
    let user_token = localStorage.getItem('user_token');
    // console.log("user_token",user_token);
    if(user_token === null)
    { localStorage.clear();
      navigate("/",{ state: { message: "Session Expired, Please Login To Continue !!" } });;
    }
  },[navigate])
  return (
    <div className="app sidebar-mini ltr light-mode">
      <div>
        <div className="page">
          <div className="page-main">
            <Header />

            <div style={{ marginTop: "5%" }}>{props.children}</div>
          </div>

          {/*/Sidebar-right*/}
          
          {/* FOOTER */}
          <footer className="footer">
            <div className="container">
              <div className="row align-items-center flex-row-reverse">
                <div className="col-md-12 col-sm-12 text-center">
                  Copyright © <span id="year" />{" "}
                  {/* <a href="javascript:void(0)">SoftechSolution</a> */}
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
export default Layout;
