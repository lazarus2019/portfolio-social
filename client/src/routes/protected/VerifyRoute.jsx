import {  useMemo } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Outlet } from "react-router";
import NotFound from "@/components/NotFound/NotFound";

function VerifyRoute(props) {
  const user = useSelector((store) => store?.user?.value);
  const havePermission = useMemo(() => {
    return user?.isAccountVerified || false;
  }, [user]);

  return (
    <>
      {havePermission ? (
        <Outlet />
      ) : (
        <NotFound desc="You need to verify your email address to access this page" />
      )}
    </>
  );
}

VerifyRoute.propTypes = {};

export default VerifyRoute;
