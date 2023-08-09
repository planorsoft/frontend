import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/containers/Identity/actions";
import { useNavigate } from "react-router-dom";
import LoginForm from "@/components/LoginForm";
import { getTenant } from "@/utils/tenant";

function Login() {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const identity = useSelector((state) => state.identity);

  const onChangeEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  const onChangePasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    let tenant = getTenant();
    dispatch(login(Email, Password, tenant, navigate));
  };

  return (
    <LoginForm
      error={identity.error}
      onChangeEmail={onChangeEmailHandler}
      onChangePassword={onChangePasswordHandler}
      onSubmit={onSubmitHandler}
    />
  );
}


export default Login;