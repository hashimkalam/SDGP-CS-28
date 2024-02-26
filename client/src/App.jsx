import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import ForgotPassword from "./Pages/ForgotPassword/ForgotPassword";
import Register from "./Pages/Register/Register";
import Download from "./Pages/Download/Download";
import Workspace from "./Pages/workspace/Workspace";
import ResetPassword from "./Pages/Reset/reset";
import ArchitectPanel from "./Pages/ArchitectPanel/ArchitectPanel";
import Workspaces from "./Pages/workspace/Workspaces";
import Navbar from "./components/navbar/navbar";

import UserProfile from "./Pages/UserProfile/userProfile";
import Panel from "./Pages/dashboard/Panel";
import Navbar from "./components/navbar/navbar";

function App() {
  return (
    <div className="bg-[#5E5ABA] min-h-screen">
      <Router>
        <Routes>
          <Route
            path="/login"
            element={
              <div>
                <Register />
              </div>
            }
          />
          <Route
            path="/signup"
            element={
              <div>
                <Register />
              </div>
            }
          />

          <Route
            path="/forgotpassword"
            element={
              <div>
                <ForgotPassword />
              </div>
            }
          />

          <Route
            path="/resetpassword"
            element={
              <div>
                <ResetPassword />
              </div>
            }
          />
          <Route
            path="/workspace"
            element={
              <div>
                <Navbar />
                <Workspace />
              </div>
            }
          />
          {/*<Route
            path="/workspaceHistory"
            element={
              <div>
                <Navbar />
                <WorkspaceHistory />
              </div>
            }
          />*/}
          <Route
            path="/workspaces"
            element={
              <div className="bg-[#090E34] h-screen">
                <Navbar />
                <Workspaces />
              </div>
            }
          />
          <Route
            path="/userprofile"
            element={
              <div className="bg-[#090E34]">
                <Navbar />
                <UserProfile />
              </div>
            }
          />
          <Route
            path="/download"
            element={
              <div className="bg-[#090E34]">
                <Navbar />
                <Download />
              </div>
            }
          />
          <Route
            path="/architectpanel"
            element={
              <div className="bg-[#5E5ABA]">
                <Navbar />
                <ArchitectPanel />
              </div>
            }
          />
          <Route
            path="/userprofile"
            element={
              <div className="bg-[#090E34] h-screen">
                <UserProfile />
              </div>
            }
          />
          <Route
            path="/dashboard"
            element={
              <div className="bg-[#5E5ABA] h-screen">
                <Panel />
              </div>}
          />
          <Route
            path="/"
            element={
              <div className="bg-[#5E5ABA] h-screen">
                <Navbar />
                <Home />
              </div>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
