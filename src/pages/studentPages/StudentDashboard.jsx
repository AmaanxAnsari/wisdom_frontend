import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getStudentVideosById } from "../../api";
import { Card, Container } from "react-bootstrap";

const StudentDashboard = () => {
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");
  const [studentVideos, setStudentVideos] = useState([]);

  const studentId = localStorage.getItem("user_id");

  const getStudentVideos = useCallback(async () => {
    setError("");
    setSuccessMessage("");
    try {
      const data = await getStudentVideosById(studentId);
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
  }, [studentId]);

  useEffect(() => {
    getStudentVideos();
  }, [getStudentVideos]);

  return (
    <div className="main-content mt-0">
      <div className="side-app">
        {/* CONTAINER */}
        <div className="main-container p-150 container-fluid">
          <div className="page-header">
            <h1 className="page-title mt-0">Dashboard</h1>
          </div>
          <Card className="p-4">
            <Card.Header>
              <Container fluid="md" className="student_container">
                <h4>Student Name</h4>
                <button className="btn btn-lg btn-primary">
                  Enroll to Other Course!
                </button>
              </Container>
            </Card.Header>

            <div className="row mt-5">
              <div className="col-md-4 col-xl-4">
                <Link to="/courses">
                  <div className="card text-white bg-primary">
                    <div className="card-body">
                      <h4 className="card-title">My Courses</h4>
                      <h2 className="mb-0 number-font">{2}</h2>
                    </div>
                  </div>
                </Link>
              </div>
              {/* COL END */}
              <div className="col-md-4 col-xl-4">
                <div className="card text-white bg-info">
                  <div className="card-body">
                    <h4 className="card-title">Completed Courses</h4>
                    <h2 className="mb-0 number-font">{1}</h2>
                  </div>
                </div>
              </div>
              {/* COL END */}
              <div className="col-md-4 col-xl-4">
                <div className="card text-white bg-success">
                  <div className="card-body">
                    <h4 className="card-title">Course Certificates</h4>
                    <h2 className="mb-0 number-font">{0}</h2>
                  </div>
                </div>
              </div>
              {/* COL END */}
            </div>
          </Card>
          <Card className="p-4">
            <Card.Header>
              <h1 className="page-title">Latest Videos</h1>
            </Card.Header>

            <div className="row">
              {studentVideos.map((video) => {
                return (
                  <>
                    <div className="col-xl-3 col-md-3">
                      <Link to={`/session/${video._id}`}>
                        <div className="card p-3 mt-5 card-shadow">
                          <img
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAZlBMVEUAAAD////09PRLS0sNDQ2wsLDs7OxAQEDY2Njg4ODx8fFOTk5HR0cYGBjV1dXExMQvLy8pKSlmZmZVVVWXl5e2trbo6OhwcHCoqKiEhIQhISFeXl6QkJDDw8M9PT2fn594eHg2NjbM0am9AAAC/UlEQVR4nO3di1LbMBCFYa8dO3HaEiglpVfo+79kUzotI3KzbHn24v97gj2TIZzIklyJSNusqohWTXtIV0m31p5kRuvukDBywENEqVrtGWbWVo32CDNrqphfMq+i5wMAAAAAAAAAAAAAAAAAAHDgedd1+8ef2mPM5nYjf0XdX31Xyz/9L+1hZrGRV/VH7WlmcC+JT9rzlPeQJpSd9kDFbd4klH20Eyv124Qin7VnKutEQnnUHqqoUwnl5oP2WAWdTCjbd9pzlXM6ocgX7cGKOZdQHrQnK+VsQunvtGcr43zCKB3uQsIgHe5iwhAd7nLCCB3uSsIAHe5qQvcd7npC7x1uQELZvteecoohCX13uGEJPXe4gQml/6o96VhDE0r9TXvUkQYnFPmuPes4GQnlh/awo+QklN7js42shC47XGZCedIeOFtuQn8dLjuhdM46XH5CkWftobOMSejrWeqohLJx1OHGJZT6XnvwwUYmdNThRid00+HGJ/SysWFCQieL4lMS+uhw0xLKzv4VeRMTyt58h5ua0P4PqukJrXe4AgnlxnSHK5FQassbG4okNN3hCiU0vCheKqH0t9pRziiW0GyHK5fQaocrmdDmxoaiCaU3WFPLJrT4KRZOKPbWb0ontLe2UTphpx3oSOmEoh3oCJ9hrvh/h/b2M/D/ME/4TmPwE+S3RY7wvw/D/8YPv04Tfa0t/Hpp+DXv8M8toj97Cv/8MPwzYJs9LcVejAvC76ext15xGvvazgi/NzH8/lLjPS3FPu9j4ffqhz9v4aGnpTj3lAh/ds1LT0txhvS/8OeAw5/ltrukfRV3KvwR/l4Mdz0txf00Hntaaun3RJncepBp0fe1+VjSvmrB9yY67mmppd5fGv4OWuc9LbXIu6Dd97RU/DvZ49+rH//dCPHfb7GAd5TEf89M9fKuoG3fWt3jCwAAAAAAAAAAAAAAAAAAgIvsX3I3zapqtEeYWVMF3qv8oq0k2omP1Foq6SJHXHeHhCJtE/PrZtW0h3S/Ac51IzFRrvwDAAAAAElFTkSuQmCC"
                            className="video-thumbnail mx-auto"
                            alt="img"
                          />
                          {/* <video src={video.url}></video> */}
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
            </div>
          </Card>
        </div>
        {/* CONTAINER CLOSED */}
      </div>
    </div>
  );
};

export default StudentDashboard;
