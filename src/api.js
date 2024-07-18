import axios from "axios";
const API_URL = `${process.env.REACT_APP_API_URL}`;

export const getToken = () =>
  localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("token"))
    : null;

// Functions Start //
export async function postMethodNormalAPI(url, body) {
  const apiData = await axios.post(url, body, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("user_token")}`,
      "Content-Type": "application/json",
    },
  });
  return apiData;
}
export async function postMethodNormalAPIPUT(url, body) {
  const apiData = await axios.put(url, body, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("user_token")}`,
      "Content-Type": "application/json",
    },
  });
  return apiData;
}
export async function postMethodMultiPartAPI(url, body) {
  const apiData = await axios.post(url, body, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("user_token")}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return apiData;
}
export async function getMethodNormal(
  url,
  token = localStorage.getItem("user_token")
) {
  const apiData = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("user_token")}`,
      "Content-Type": "application/json",
    },
  });
  return apiData;
}

export async function getAllCourses() {
  return getMethodNormal(`${API_URL}/course`);
}
export async function getTotalCounts() {
  return getMethodNormal(`${API_URL}/counts`);
}
export async function getCourseById(id) {
  return getMethodNormal(`${API_URL}/course/${id}`);
}
export async function createCourse(body) {
  return postMethodMultiPartAPI(`${API_URL}/course`, body);
}

// export async function updateCourse( body) {
//   // console.log(`course id : ${id} in API`)
//   return postMethodNormalAPIPUT(`${API_URL}/course`, body);
// }
export async function updateCourse(id, body) {
  // Use the id parameter in the URL
  const url = `${API_URL}/course/${id}`;
  const apiData = await postMethodMultiPartAPI(url, body);
  return apiData;
}
// export async function updateStudent(body) {
//   // console.log(`course id : ${id} in API`)
//   return postMethodNormalAPIPUT(`${API_URL}/student`, body);
// }
export async function getAllVideos() {
  return getMethodNormal(`${API_URL}/videos`);
}
export async function getVideoById(id) {
  return getMethodNormal(`${API_URL}/videos/${id}`);
}
export async function createVideo(body) {
  return postMethodNormalAPI(`${API_URL}/videos`, body);
}
export async function updateVideo(id, body) {
  // Use the id parameter in the URL
  const url = `${API_URL}/videos/${id}`;
  const apiData = await postMethodNormalAPIPUT(url, body);
  return apiData;
}

// Students Urls
export async function getAllStudents() {
  return getMethodNormal(`${API_URL}/student`);
}
export async function getStudentById(id) {
  return getMethodNormal(`${API_URL}/student/${id}`);
}
export async function addStudent(body) {
  return postMethodNormalAPI(`${API_URL}/student`, body);
}
export async function updateStudent(id, body) {
  // Use the id parameter in the URL
  const url = `${API_URL}/student/${id}`;
  const apiData = await postMethodNormalAPIPUT(url, body);
  return apiData;
}

// Video URLs
export async function uploadVideo(body) {
  return postMethodMultiPartAPI(`${API_URL}/video/upload`, body);
}
export async function addVideoDetails(body) {
  return postMethodNormalAPI(`${API_URL}/video`, body);
}
export async function getTags() {
  return getMethodNormal(`${API_URL}/tags`);
}

// Student API methods
export async function getStudentVideosById(id) {
  return getMethodNormal(`${API_URL}/studentVideos/${id}`);
}
export async function getStudentCourses(id) {
  return getMethodNormal(`${API_URL}/studentCourses/${id}`);
}
export async function getStudentVideosByCourse(id) {
  return getMethodNormal(`${API_URL}/courseVideos/${id}`);
}
