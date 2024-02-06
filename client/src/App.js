import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import Register from "./components/Register/Register";
import Download from "./components/Download/Download";

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
        </Routes>
      </Router>
    </div>
  );
}

export default App;
