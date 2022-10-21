import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

function PrivateRoute() {
  const navigate = useNavigate();
  useEffect(() => {
    const checkAuth = async () => {
      // Check auth here
      // const isAuth = await
      //   if (isAuth) {
      //     return;
      //   } else {
      //     navigate("/");
      //   }
    };
    // checkAuth()
  }, [navigate]);
  return (
    <>
      <Outlet />
    </>
  );
}

export default PrivateRoute;
