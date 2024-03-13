import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Loading from "../../pages/loading/Loading";
import { useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";

const PublicRoute = () => {
  const { user, loading } = useSelector((state) => state.auth);
  const { state } = useLocation();

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return <Outlet />;
  }
  return <Navigate to={"/"} state={state?.from?.state} replace={true} />;
};

export default PublicRoute;
