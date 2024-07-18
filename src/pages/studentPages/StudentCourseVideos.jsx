import { useCallback, useEffect, useState } from "react";
import { getStudentVideosByCourse } from "../../api";
import { Link, useParams } from "react-router-dom";

const StudentCourseVideos = () => {
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");
  const [studentVideos, setStudentVideos] = useState([]);

  const studentId = localStorage.getItem("user_id");

  const { courseId } = useParams();

  const getStudentVideos = useCallback(async () => {
    setError("");
    setSuccessMessage("");
    try {
      const data = await getStudentVideosByCourse(courseId);
      if (data.data) {
        console.log(data.data);
        setStudentVideos(data.data);
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
  }, [courseId]);

  useEffect(() => {
    getStudentVideos();
  }, [getStudentVideos]);

  return (
    <div className="main-content mt-0">
      <div className="side-app">
        {/* CONTAINER */}
        <div className="main-container container-fluid">
          {/* PAGE-HEADER */}
          <div className="page-header">
            <h1 className="page-title">My Courses</h1>
            <div>
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="javascript:void(0)">Pages</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  My Courses
                </li>
              </ol>
            </div>
          </div>
          {/* PAGE-HEADER END */}
          <div className="row">
            {/* <div className="mb-5 card-group overflow-hidden"> */}
            {studentVideos.map((video) => {
              return (
                <>
                  <div className="col-xl-3 col-md-3">
                    <Link to={`/video?courseId=${courseId}&videoId=${video._id}`}>
                    <div className="card mx-3 border-end shadow-none">
                      {/* <img src={video.url} className="card-img-top" alt="img" /> */}
                      <video src={video.url}></video>
                      <div className="card-body">
                        <h5 className="card-title">{video.name}</h5>
                        <p className="card-text">{video.description}</p>
                        <p className="card-text">
                          <small className="text-muted">{video.tags}</small>
                        </p>
                      </div>
                    </div>
                    </Link>
                  </div>
                </>
              );
            })}

            {/* </div> */}
          </div>
        </div>
        {/* CONTAINER CLOSED */}
      </div>
    </div>
  );
};

export default StudentCourseVideos;
