import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { UploadImage } from "../components/UploadImage";
import { getAllCourses, getAllStudents, getTotalCounts } from "../api";

const Dashboard = () => {
  let id = localStorage.getItem("user_id");

  // const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");
  const [clients, setClients] = useState([]);
  // const [loading, setLoading] = useState(false);
  // const closeButton = useRef(null);
  // const getData = useCallback(async () => {
  //   const getUrl = `${process.env.REACT_APP_API_URL}/dealer/${id}`;
  //   const config = {
  //     headers: {
  //       Authorization: `Bearer ${localStorage.getItem("user_token")}`,
  //     },
  //   };
  //   console.log("geturl", getUrl);
  //   setError("");
  //   try {
  //     const data = await axios.get(getUrl, config);
  //     if (data.data) {
  //       setClients(data.data);
  //       console.log("data123132", data.data);
  //     } else {
  //       setError("Something Went Wrong !! ");
  //     }
  //   } catch (err) {
  //     console.log("err12123", err);
  //     if (err.response) {
  //       setError(err.response.data.message);
  //     } else {
  //       setError(err.message);
  //     }
  //     // console.log("errr",err.response.data.message);

  //     // throw new Error("Unable to get a token.");
  //   }
  // }, [id]);

  // useEffect(() => {
  //   getData();
  // }, [id, getData]);

  //  STUDENT COUNT
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalCourses, setTotalCourses] = useState(0);
  // const[totalDeletedStudents,setTotalDeletedStudents]=useState(0);
  // const[totalDeletedCourses,setTotalDeletedCourses]=useState(0);

  // const getStudents = async () => {
  //   setLoading(true);
  //   setError("");
  //   setSuccessMessage("");
  //   try {
  //     const data = await getAllStudents();
  //     if (data.data) {
  //       setClients(data.data.reverse());
  //       setTotalStudents(data.data.length);
  //     } else {
  //       setError("Something Went Wrong !! ");
  //     }
  //     setLoading(false);
  //   } catch (err) {
  //     if (err.response) {
  //       setError(err.response.data.message);
  //     } else {
  //       setError(err.message);
  //     }
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   getStudents();
  // }, [])



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getTotalCounts();
        setTotalStudents(response.data.totalStudents || 0);
        // setTotalDeletedStudents(response.data.totalDeletedStudents || 0);
        setTotalCourses(response.data.totalCourses || 0);
        // setTotalDeletedCourses(response.data.totalDeletedCourses || 0);
      } catch (error) {
        setError("Error fetching total counts");
      }
    };

    fetchData();
  }, []);
  // COURSE COUNT
  // const getCourse = async () => {
  //   setLoading(true);
  //   setError("");
  //   setSuccessMessage("");

  //   try{
  //     const data = await getAllCourses();
  //     if(data.data){
  //       setClients(data.data.reverse());
  //       setTotalCourses(data.data.length)
  //     }else{
  //       setError("Something went wrong !! ")
  //     }
  //     setLoading(false);
  //   }catch(err){
  //     if(err.response){
  //       setError(err.message);
  //     }
  //     setLoading(false)
  //   }
  // };

  // useEffect(()=>{
  //   getCourse();
  // },[])





  return (
    <div className="main-content app-content mt-0">
      <div className="side-app">
        {/* CONTAINER */}
        <div className="main-container container-fluid">
          {/* PAGE-HEADER */}
          <div className="page-header">
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
            <h1 className="page-title">Dashboard</h1>
            <div>
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="/">Home</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Dashboard
                </li>
              </ol>
            </div>
          </div>
          {/* PAGE-HEADER END */}
          {/* ROW-1 */}
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xl-12">
              <div className="row">
                {clients && clients.isActive === false ? (
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xl-12">
                    <div className="card overflow-hidden">
                      <div className="card-body">
                        <div className="d-flex">
                          {/* <UploadImage
                            getDataFunction={getData()}
                            retailerData={clients}
                          /> */}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}

                <div className="col-lg-6 col-md-6 col-sm-12 col-xl-3">
                  <div className="card overflow-hidden">
                    <div className="card-body">
                      <div className="d-flex">
                        <div className="mt-2">
                          <h6 className>Total Courses</h6>
                          <h2 className="mb-0 number-font">{totalCourses}</h2>
                        </div>
                        <div className="ms-auto">
                          <div className="chart-wrapper mt-1">
                            <canvas
                              id="saleschart"
                              className="h-8 w-9 chart-dropshadow"
                            />
                          </div>
                        </div>
                      </div>
                      <span className="text-muted fs-12">
                        <span className="text-secondary">
                          <i className="fe fe-arrow-up-circle  text-secondary" />{" "}
                          3%
                        </span>
                        Last week
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 col-xl-3">
                  <div className="card overflow-hidden">
                    <div className="card-body">
                      <div className="d-flex">
                        <div className="mt-2">
                          <h6 className>Total Students</h6>
                          <h2 className="mb-0 number-font">{totalStudents}</h2>
                        </div>
                        <div className="ms-auto">
                          <div className="chart-wrapper mt-1">
                            <canvas
                              id="leadschart"
                              className="h-8 w-9 chart-dropshadow"
                            />
                          </div>
                        </div>
                      </div>
                      <span className="text-muted fs-12">
                        <span className="text-pink">
                          <i className="fe fe-arrow-down-circle text-pink" />{" "}
                          0.75%
                        </span>
                        Last 6 days
                      </span>
                    </div>
                  </div>
                </div>
                {/* <div className="col-lg-6 col-md-6 col-sm-12 col-xl-3">
                  <div className="card overflow-hidden">
                    <div className="card-body">
                      <div className="d-flex">
                        <div className="mt-2">
                          <h6 className>Total Deleted Courses</h6>
                          <h2 className="mb-0 number-font">{totalDeletedCourses}</h2>
                        </div>
                        <div className="ms-auto">
                          <div className="chart-wrapper mt-1">
                            <canvas
                              id="leadschart"
                              className="h-8 w-9 chart-dropshadow"
                            />
                          </div>
                        </div>
                      </div>
                      <span className="text-muted fs-12">
                        <span className="text-pink">
                          <i className="fe fe-arrow-down-circle text-pink" />{" "}
                          0.75%
                        </span>
                        Last 6 days
                      </span>
                    </div>
                  </div>
                </div> */}
                {/* <div className="col-lg-6 col-md-6 col-sm-12 col-xl-3">
                  <div className="card overflow-hidden">
                    <div className="card-body">
                      <div className="d-flex">
                        <div className="mt-2">
                          <h6 className>Total Deleted Students</h6>
                          <h2 className="mb-0 number-font">{totalDeletedStudents}</h2>
                        </div>
                        <div className="ms-auto">
                          <div className="chart-wrapper mt-1">
                            <canvas
                              id="leadschart"
                              className="h-8 w-9 chart-dropshadow"
                            />
                          </div>
                        </div>
                      </div>
                      <span className="text-muted fs-12">
                        <span className="text-pink">
                          <i className="fe fe-arrow-down-circle text-pink" />{" "}
                          0.75%
                        </span>
                        Last 6 days
                      </span>
                    </div>
                  </div>
                </div> */}
                {/* <div className="col-lg-6 col-md-6 col-sm-12 col-xl-3">
                  <div className="card overflow-hidden">
                    <div className="card-body">
                      <div className="d-flex">
                        <div className="mt-2">
                          <h6 className>Total students</h6>
                          <h2 className="mb-0 number-font">{totalStudents}  </h2>
                        </div>
                        <div className="ms-auto">
                          <div className="chart-wrapper mt-1">
                            <canvas
                              id="profitchart"
                              className="h-8 w-9 chart-dropshadow"
                            />
                          </div>
                        </div>
                      </div>
                      <span className="text-muted fs-12">
                        <span className="text-green">
                          <i className="fe fe-arrow-up-circle text-green" />{" "}
                          0.9%
                        </span>
                        Last 9 days
                      </span>
                    </div>
                  </div>
                </div> */}
                {/* <div className="col-lg-6 col-md-6 col-sm-12 col-xl-3">
                  <div className="card overflow-hidden">
                    <div className="card-body">
                      <div className="d-flex">
                        <div className="mt-2">
                          <h6 className>Total Cost</h6>
                          <h2 className="mb-0 number-font">$59,765</h2>
                        </div>
                        <div className="ms-auto">
                          <div className="chart-wrapper mt-1">
                            <canvas
                              id="costchart"
                              className="h-8 w-9 chart-dropshadow"
                            />
                          </div>
                        </div>
                      </div>
                      <span className="text-muted fs-12">
                        <span className="text-warning">
                          <i className="fe fe-arrow-up-circle text-warning" />{" "}
                          0.6%
                        </span>
                        Last year
                      </span>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
          {/* ROW-1 END */}
        </div>
        {/* CONTAINER END */}
      </div>
    </div>
  );
};
export default Dashboard;
