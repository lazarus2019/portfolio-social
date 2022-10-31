import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import Loading from "@/components/Loading/Loading";
import NotFound from "@/components/NotFound/NotFound";
import authUtils from "@/utils/authUtils";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

function PrivateRoute() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [havePermission, setHavePermission] = useState(false);
  useEffect(() => {
    setLoading(true);
    const checkAuth = async () => {
      // Check auth here
      const isAuth = await authUtils.isAuthenticated();
      if (isAuth) {
        setHavePermission(true);
      } else {
        setError("You don't have permission to access this page!");
      }
    };
    checkAuth();
    setLoading(false);
  }, [navigate]);
  return (
    <>
      <Header hasBg={true} />
      {loading ? (
        <Loading fullHeight />
      ) : havePermission ? (
        <>
          <Outlet />
        </>
      ) : (
        <NotFound desc={error} />
      )}
      <div className="container p-15">
        <div className="separate"></div>
      </div>
      <Footer />
    </>
  );
}

export default PrivateRoute;
