import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
// import { Login } from "./pages/Login";
// import { Layout } from "./pages/Layout";
// import { Dashboard } from "./pages/Dashboard";
// import { Courses } from "./pages/Courses";
// import { Students } from "./pages/Students";
import { lazy, Suspense } from "react";
import StudentHeader from "./components/StudentHeader";
import { Loading } from "./pages/Loading";
import NotFound from "./pages/NotFound";
import StudentCourses from "./pages/studentPages/StudentCourses";
import StudentDashboard from "./pages/studentPages/StudentDashboard";
import StudentVideoDetails from "./pages/studentPages/StudentVideoDetails";
import StudentCourseVideos from "./pages/studentPages/StudentCourseVideos";
// import { Videos } from "./pages/Videos";
const Certificate = lazy(() => import("./components/Certificate"));
const Login = lazy(() => import("./pages/Login"));
const Layout = lazy(() => import("./pages/Layout"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Courses = lazy(() => import("./pages/Courses"));
const Students = lazy(() => import("./pages/Students"));
const Videos = lazy(() => import("./pages/Videos"));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login type="student" />}></Route>
          <Route path="/admin" element={<Login type="admin" />}></Route>

          <Route
            path="admin_dashboard"
            element={
              <Layout>
                <Dashboard />
              </Layout>
            }
          ></Route>
          <Route
            path="admin_courses"
            element={
              <Layout>
                <Courses />
              </Layout>
            }
          ></Route>
          <Route
            path="admin_videos"
            element={
              <Layout>
                <Videos />
              </Layout>
            }
          ></Route>
          <Route
            path="/certificate"
            element={
              <Layout>
                <Certificate />
              </Layout>
            }
          ></Route>
          <Route
            path="/courses"
            element={<><StudentHeader/><StudentCourses/></>}
          ></Route>
          <Route
            path="/course/:courseId"
            element={<><StudentHeader/><StudentCourseVideos/></>}
          ></Route>
          <Route
            path="/dashboard"
            element={<><StudentHeader/><StudentDashboard/></>}
          ></Route>
          <Route
            path="/video"
            element={<><StudentHeader/><StudentVideoDetails/></>}
          ></Route>
          {/* <Route path="admin_users" element={<Layout ><Employees /></Layout>}></Route> */}
          <Route
            path="admin_students"
            element={
              <Layout>
                <Students />
              </Layout>
            }
          ></Route>
          {/* <Route path="admin_customers_by_id/:id" element={<Layout ><CustomerById /></Layout>}></Route>
          <Route path="admin_dealer_by_id/:id" element={<Layout ><DealerById /></Layout>}></Route> */}
          <Route path="*" element={<NotFound />} />
          {/* <Route path="search_dealer" element={<SearchDealer />}></Route>
          <Route path="dealer/:id" element={<GetDealer />}></Route> */}

          {/* // login dealer */}
          {/* <Route path="/login_retailer" element={<Login type="dealer" />}></Route>
          <Route path="dealer_dashboard" element={<Layout ><Dashboard /></Layout>}></Route> */}
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
