import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import ForgotPassword from "./Pages//ForgotPassword/ForgotPassword";
import Register from "./Pages/Register/Register";
import Download from "./Pages/Download/Download";
import Workspace from "./Pages/workspace/Workspace";
import Panel from "./Pages/Dashboard/Panel"; 

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route
            path="/login"
            element={
              <div className="bg-[#5E5ABA] h-screen">
                <Register />
              </div>
            }
          />
          <Route
            path="/signup"
            element={
              <div className="bg-[#5E5ABA] h-screen">
                <Register />
              </div>
            }
          />

          <Route
            path="/forgotpassword"
            element={
              <div className="bg-[#5E5ABA] h-screen">
                <ForgotPassword />
              </div>
            }
          />
          <Route
          path="/workspace"
          element={
            <div className="bg-[#5E5ABA] h-screen">
              <Workspace />
            </div>
          }
        />
          <Route
            path="/download"
            element={
              <div className="bg-[#090E34]">
                <Download />
              </div>
            }
          />
          <Route
            path="/"
            element={
              <div className="bg-[#5E5ABA] h-screen">
                <Home />
              </div>
            }
          />
          <Route
            path="/dashboard"
            element={
              <div className="bg-[#5E5ABA] h-screen">
                <Panel />
              </div>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
