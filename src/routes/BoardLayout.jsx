import PropTypes from "prop-types";
import BoardSidebar from "components/Board/BoardSidebar";
import { Outlet, useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import Loading from "components/Loading/Loading";

function BoardLayout(props) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const user = useSelector((store) => store?.user?.value);

  useEffect(() => {
    if (!user) {
      toast.error("You must login first to access this perform");
      navigate("/login");
    }
    setLoading(false);
  }, [navigate]);

  return loading ? (
    <Loading fullHeight />
  ) : (
    <div className="flex">
      <BoardSidebar user={user} />
      <div className="f-grow x-full y-full">
        <Outlet />
      </div>
    </div>
  );
}

BoardLayout.propTypes = {};

export default BoardLayout;
