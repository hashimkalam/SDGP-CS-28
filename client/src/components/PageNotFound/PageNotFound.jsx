import { useLocation, useNavigate } from "react-router-dom";

function PageNotFound() {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center ${
        location.pathname === "/userprofile" && "text-white"
      }`}
    >
      <h1>404</h1>
      <h3>Page Not Found</h3>

      <button
        className={`mt-5 border-2  ${
          location.pathname === "/userprofile"
            ? "border-white"
            : "border-[#000]"
        } p-2 px-3 rounded-xl`}
        onClick={() => navigate("/")}
      >
        Return Back To Home
      </button>
    </div>
  );
}

export default PageNotFound;
