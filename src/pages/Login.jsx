import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// import '../login.css';

const Login = (props) => {
  let type = props.type;
  let headingMessaeg = type === "admin" ? "Login Admin" : "Login Student";
  const { state } = useLocation();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [password, setPassword] = useState(
    type === "admin" ? "123456" : ""
  );
  const [email, setEmail] = useState(
    type === "admin" ? "admin@example.com" : ""
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (state) {
      let { message } = state;
      setError(message);
    }

  }, [state]);

  const checklogin = async () => {
    setLoading(true);

    const postURL =
      type === "admin"
        ? `${process.env.REACT_APP_API_URL}/admin/login`
        : `${process.env.REACT_APP_API_URL}/student/login`;

    setError("");

    if (password.length > 0 && email.length > 0) {
      try {
        let body = {
            email: email,
            password: password,
          }

        const token = await axios.post(postURL, body);
        if (token.data._id) {
          localStorage.setItem("user_id", token.data._id);
          localStorage.setItem("user_email", token.data.email);
          localStorage.setItem("user_token", token.data.token);
          localStorage.setItem(
            "user_type",
            type === "admin" ? "admin" : "student"
          );
          type === "admin" ? navigate("/admin_dashboard") : navigate("/dashboard");
        } else {
          setError("Wrong Credentials !! ");
          setLoading(false);
        }
      } catch (err) {
        if (err.response) {
          setError(err.response.data.message);
        } else {
          setError(err.message);
        }
        setLoading(false);
      }
    }
  };


  if(loading)
  {
    return <div className="mx-auto b-block" style={{marginTop:"25%"}}> <img
          src="assets/images/loader.svg"
          className="loader-img"
          alt="Loader"
        />
      </div>
  }

  return (
    <div className="app  ltr login-img">
      <div className="page">
        <div className>
          {/* CONTAINER OPEN */}
          <div className="col col-login mx-auto mt-8">
            <div className="text-center">
              <img src="jsw_steel_logo.png" style={{ height: "120px" }} alt="logo" />
            </div>
          </div>
          <div className="container-login100">
            <div className="wrap-login100 p-7">
              <span className="login100-form-title pb-5">{headingMessaeg}</span>
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
                <div className="tab-menu-heading">
                  <div className="tabs-menu1">
                    {/* Tabs */}
                  </div>
                </div>
                <div className="panel-body tabs-menu-body p-0 pt-5">
                  <div className="tab-content">
                    {loading ? (
                      <div className="text-center">
                        <img
                          src="assets/images/loader.svg"
                          className="loader-img"
                          alt="Loader"
                        />
                      </div>
                    ) : (
                      <>
                        <div className="tab-pane active" id="tab5">
                          {type === "admin" ? (
                            <div
                              className="wrap-input100 validate-input input-group"
                              data-bs-validate="Valid email is required: ex@abc.xyz"
                            >
                              <a
                                href="/"
                                className="input-group-text bg-white text-muted"
                              >
                                <i
                                  className="zmdi zmdi-email text-muted"
                                  aria-hidden="true"
                                />
                              </a>
                              <input
                                className="input100 border-start-0 form-control ms-0"
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => {
                                  setEmail(e.target.value);
                                }}
                              />
                            </div>
                          ) : (
                            <div
                              className="wrap-input100 validate-input input-group"
                              data-bs-validate="Valid email is required: ex@abc.xyz"
                            >
                              <a
                                href="/"
                                className="input-group-text bg-white text-muted"
                              >
                                <i
                                  className="zmdi zmdi-email text-muted"
                                  aria-hidden="true"
                                />
                              </a>
                              <input
                                className="input100 border-start-0 form-control ms-0"
                                type="email"
                                placeholder="email"
                                value={email}
                                onChange={(e) => {
                                  setEmail(e.target.value);
                                }}
                              />
                            </div>
                          )}

                          <div
                            className="wrap-input100 validate-input input-group"
                            id="Password-toggle"
                          >
                            <a
                              href="/"
                              className="input-group-text bg-white text-muted"
                            >
                              <i
                                className="zmdi zmdi-eye text-muted"
                                aria-hidden="true"
                              />
                            </a>
                            <input
                              className="input100 border-start-0 form-control ms-0"
                              type="password"
                              placeholder="Password"
                              value={password}
                              onChange={(e) => {
                                setPassword(e.target.value);
                              }}
                            />
                          </div>

                          <div className="container-login100-form-btn">
                            <button
                              onClick={checklogin}
                              className="login100-form-btn btn-primary"
                            >
                              {headingMessaeg}
                            </button>
                          </div>
                          {/* <div className="text-center pt-3">
      <p className="text-dark mb-0">Not a member?<a href="register.html" className="text-primary ms-1">Sign UP</a></p>
    </div>
    <label className="login-social-icon"><span>Login with Social</span></label>
    <div className="d-flex justify-content-center">
      <a href="javascript:void(0)">
        <div className="social-login me-4 text-center">
          <i className="fa fa-google" />
        </div>
      </a>
      <a href="javascript:void(0)">
        <div className="social-login me-4 text-center">
          <i className="fa fa-facebook" />
        </div>
      </a>
      <a href="javascript:void(0)">
        <div className="social-login text-center">
          <i className="fa fa-twitter" />
        </div>
      </a>
    </div> */}
                        </div>
                        <div className="tab-pane" id="tab6">
                          <div
                            id="mobile-num"
                            className="wrap-input100 validate-input input-group mb-4"
                          >
                            <a
                              href="/"
                              className="input-group-text bg-white text-muted"
                            >
                              <span>+91</span>
                            </a>
                            <input className="input100 border-start-0 form-control ms-0" />
                          </div>
                          <div
                            id="login-otp"
                            className="justify-content-around mb-5"
                          >
                            <input
                              className="form-control text-center w-15"
                              id="txt1"
                              maxLength={1}
                            />
                            <input
                              className="form-control text-center w-15"
                              id="txt2"
                              maxLength={1}
                            />
                            <input
                              className="form-control text-center w-15"
                              id="txt3"
                              maxLength={1}
                            />
                            <input
                              className="form-control text-center w-15"
                              id="txt4"
                              maxLength={1}
                            />
                          </div>
                          <span>
                            Note : Login with registered mobile number to
                            generate OTP.
                          </span>
                          <div className="container-login100-form-btn ">
                            <a
                              href="/"
                              className="login100-form-btn btn-primary"
                              id="generate-otp"
                            >
                              Proceed
                            </a>
                          </div>
                        </div>
                      </>
                    )}
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
export default Login;
