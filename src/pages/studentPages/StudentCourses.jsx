import { useCallback, useEffect, useState } from "react";
import { getStudentCourses } from "../../api";
import { Link } from "react-router-dom";

const StudentCourses = () => {
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");
  const [studentCourses, setStudentCourses] = useState([]);

  const studentId = localStorage.getItem("user_id");

  const getStudentCoursesAll = useCallback(async () => {
    setError("");
    setSuccessMessage("");
    try {
      const data = await getStudentCourses(studentId);
      if (data.data) {
        console.log(data.data);
        setStudentCourses(data.data);
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
  }, []);

  useEffect(() => {
    getStudentCoursesAll();
  }, [getStudentCoursesAll]);

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
            {studentCourses.map((course, i) => {
              return (
                <>
                  <div className="col-xl-3 col-md-3" key={i}>
                    <Link to={`/course/${course._id}`}>
                      <div className="card mx-3 border-end shadow-none">
                        <img
                          src={course.course_thumbnail}
                          className="card-img-top"
                          alt="Course_img"
                        />
                        <div className="card-body">
                          <h5 className="card-title">{course.name}</h5>
                          <p className="card-text">{course.overview}</p>
                          <p className="card-text">
                            {course.categories &&
                              course?.categories.map((category, i) => (
                                <span
                                  key={i}
                                  className="badge bg-primary badge-sm px-3 py-2 me-1 mb-1 mt-1"
                                >
                                  {category}
                                </span>
                              ))}
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

export default StudentCourses;
