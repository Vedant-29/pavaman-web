import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/auth";

const ProtectedRoute = ({ element }) => {
  const { user } = useAuth();
  const location = useLocation();

  // Check if the user is not authenticated and just came from the sign-up page
  const fromSignUpPage = location.state?.fromSignUpPage;

  if (!user && !fromSignUpPage) {
    // Save the intended location before redirecting to the sign-up page
    localStorage.setItem("intendedLocation", location.pathname);
  }

  // Check if the user is not authenticated and just came from the sign-up page
  const fromProtectedRoute = location.state?.fromProtectedRoute;

  // Extract the user's role
  const role = user?.user_role;

  // Determine the appropriate redirect path based on the user's role
  const redirectPath = role === "admin" ? "/admin" : (fromProtectedRoute ? "/" : "/signup");

  return user ? (
    element
  ) : (
    <Navigate
      to={redirectPath}
      replace
      state={{ fromSignUpPage: true }}
    />
  );
};

export default ProtectedRoute;
