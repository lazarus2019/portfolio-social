import { setUser } from "@/redux/slices/userSlice";
import authUtils from "@/utils/authUtils";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";

function AppLayout() {
  const dispatch = useDispatch();
  useEffect(() => {
    const checkAuth = async () => {
      // Check auth here
      const user = await authUtils.isAuthenticated();
      if (user) {
        dispatch(setUser(user));
      }
    };
    checkAuth();
  }, [dispatch]);
  return (
    <>
      <Outlet />
    </>
  );
}

export default AppLayout;
