import { useCallback, useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ReactPlayer from "react-player";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { getStudentVideosByCourse, getStudentVideosById, getVideoById } from "../../api";

const StudentVideoDetails = () => {
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");
  const [studentVideos, setStudentVideos] = useState([]);
  // const [played, setPlayed] = useState(false);
  const [sessionVideo, setSessionVideo] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  // Fetch the MongoDB IDs from the query parameters
  const videoId = searchParams.get('videoId');
  const courseId = searchParams.get('courseId');
  const studentId = localStorage.getItem('user_id');

  // const dateString = sessionVideo && sessionVideo.updatedAt;
  // console.log(sessionVideo.updatedAt);
  // const date = new Date(dateString);
  // const options = { day: "numeric", month: "short", year: "numeric" };
  // const formattedDate = date.toLocaleDateString("en-GB", options);

  const getStudentVideos = useCallback(async () => {
    setError("");
    setSuccessMessage("");
    try {
      const data = await getStudentVideosByCourse(courseId);
      if (data.data) {
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

  const getStudentVideosAll = useCallback( async () => {
    setError("");
    setSuccessMessage("");
    try {
      const data = await getStudentVideosById(studentId);
      if (data.data) {
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
  },[studentId]);

  const getSessionVideoById = useCallback(async () => {
    setError("");
    setSuccessMessage("");
    try {
      const data = await getVideoById(videoId);
      if (data.data) {
        setSessionVideo(data.data);
        console.log(data.data);
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
  }, [videoId]);

  useEffect(() => {
    getSessionVideoById();
  }, [getSessionVideoById]);

  useEffect(() => {
    if(courseId){
    getStudentVideos();
    } else {
      getStudentVideosAll()
    }
  }, [courseId, getStudentVideos, getStudentVideosAll]);

  return (
    <div className="mx-5">
      {/* PAGE-HEADER */}
      <div className="page-header">
        <h1 className="page-title">{sessionVideo.name}</h1>
        <div>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link>Pages</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Video Details
            </li>
          </ol>
        </div>
      </div>
      {/* PAGE-HEADER END */}
      <Row>
        <Col
          lg={3}
          style={{ height: "800px", overflowY: "auto", position: "sticky" }}
        >
          <div className="row">
            {studentVideos.map((video, i) => {
              return (
                <div className="col-xl-12 col-md-12" key={i}>
                  <Link to={`/video?courseId=${courseId}&videoId=${video._id}`}>
                    <div
                      className="card border-end "
                      style={{ lineHeight: "1px" }}
                    >
                      {/* <img src={video.url} className="card-img-top" alt="img" /> */}
                      {/* <video height={"100px"} src={video.url}></video> */}
                      <div className="card-body">
                        <h5 className="card-title">{video.name}</h5>
                        {/* <p className="card-text">{formattedDate}</p> */}
                        <p className="card-text">
                          <small className="text-muted">{video.tags}</small>
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </Col>
        <Col lg={9}>
          <ReactPlayer
            // Disable download button
            config={{ file: { attributes: { controlsList: "nodownload" } } }}
            // Disable right click
            onContextMenu={(e) => e.preventDefault()}
            url={sessionVideo.url}
            controls
            width="100%"
            height="auto"
            // onProgress={(progress) => setPlayed(progress.playedSeconds)}
          />
          <h3 className="mt-3">{sessionVideo.name}</h3>
          <p>{sessionVideo.description}</p>
          {/* <p>{formattedDate}</p> */}
          <p>
            {sessionVideo.tags &&
              sessionVideo?.tags.map((tag, i) => (
                <span
                  key={i}
                  className="badge bg-primary badge-sm px-3 py-2 me-1 mb-1 mt-1"
                >
                  {tag}
                </span>
              ))}
          </p>
        </Col>
      </Row>
    </div>
  );
};

export default StudentVideoDetails;
