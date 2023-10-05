import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { resetToken } from "@/containers/Identity/actions";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(resetToken());
    navigate("/");
  });

  return <div>Logout processing...</div>;
};

export default Logout;