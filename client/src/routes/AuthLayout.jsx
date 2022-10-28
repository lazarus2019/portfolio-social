import authUtils from "@/utils/authUtils";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

function AuthLayout() {
  const navigate = useNavigate();
  useEffect(() => {
    const checkAuth = async () => {
      // Check auth here
      const user = await authUtils.isAuthenticated();
      if (user) navigate("/");
    };
    checkAuth();
  }, []);
  return (
    <>
      <Outlet />
    </>
  );
}

export default AuthLayout;
