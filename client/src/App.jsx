import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import ForgotPassword from "./Pages/ForgotPassword/ForgotPassword";
import Register from "./Pages/Register/Register";
import Download from "./Pages/Download/Download";
import ResetPassword from "./Pages/Reset/reset";
import ArchitectPanel from "./Pages/ArchitectPanel/ArchitectPanel";
import Workspaces from "./Pages/workspace/Workspaces";
import Panel from "./Pages/dashboard/Panel";
import Navbar from "./components/navbar/navbar";
import AppointmentForm from "./components/AppointmentForm";
import UserProfile from "./Pages/UserProfile/userProfile";
import { useSelector } from "react-redux";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import Footer from "./components/footer/footer";

function App() {
  const currentUser = useSelector((state) => state?.user?.currentUser);

  return (
    <div className="min-h-screen">
      <Router>
        <Routes>
          <Route
            path="/"
            //exact={true}
            element={
              <div className="bg-[#5E5ABA] h-screen">
                <Navbar />
                <Home />
              </div>
            }
          />

          {!currentUser?.user && (
            <Route
              path="/login"
              //exact={true}
              element={
                <div>
                  <Register />
                </div>
              }
            />
          )}
          {!currentUser?.user && (
            <Route
              //exact={true}
              path="/signup"
              element={
                <div>
                  <Register />
                </div>
              }
            />
          )}
          {!currentUser?.user && (
            <Route
              path="/forgotpassword"
              //exact={true}
              element={
                <div>
                  <ForgotPassword />
                </div>
              }
            />
          )}
          {!currentUser?.user && (
            <Route
              path="/resetpassword"
              //exact={true}
              element={
                <div>
                  <ResetPassword />
                </div>
              }
            />
          )}
          <Route
            path="/workspace"
            //exact={true}
            element={
              <div>
                {currentUser ? (
                  <div className="bg-[#090E34] h-screen">
                    <Navbar />
                    <Workspaces />
                  </div>
                ) : (
                  <PageNotFound />
                )}
              </div>
            }
          />
          {currentUser?.user?.role === "individual" && (
            <Route
              // exact={true}
              path="/download"
              element={
                <div className="bg-[#090E34] min-h-screen">
                  <Navbar />
                  <Download />
                </div>
              }
            />
          )}
          <Route
            path="/architectpanel"
            // exact={true}
            element={
              <div className="bg-[#005BE2]">
                <Navbar />
                <ArchitectPanel />
                <Footer />
              </div>
            }
          />
          {currentUser?.user?.role === "individual" && (
            <Route
              path="/appointment"
              //  exact={true}
              element={
                <div className="bg- bg-[#005BE2] h-screen">
                  <Navbar />
                  <AppointmentForm />
                </div>
              }
            />
          )}
          {currentUser?.user?.role === "individual" && (
            <Route
              path="/userprofile"
              // exact={true}
              element={
                <div className="bg-[#090E34] min-h-screen">
                  <Navbar />
                  <UserProfile />
                </div>
              }
            />
          )}
          {currentUser?.user?.role === "architect" && (
            <Route
              path="/dashboard"
              // exact={true}
              element={
                <div className="bg-gray-100 h-screen">
                  <Navbar />
                  <Panel />
                </div>
              }
            />
          )}

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
