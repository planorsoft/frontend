import { ChangeEvent, useEffect, useState } from "react";
import { login, resetToken } from "@/containers/Identity/actions";
import { getTenant } from "@/lib/tenant";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import jwtValid from "@/lib/jwtValid";
import { useToast } from "@/components/ui/use-toast"
import { useAppDispatch, useAppSelector } from "@/store";
import { IdentityState } from "./types";

function Login() {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();
  const identity = useAppSelector<IdentityState>((state) => state.identity);

  const onChangeEmailHandler = (event : ChangeEvent<HTMLInputElement>) => {
    setEmail(event.currentTarget.value);
  };

  const onChangePasswordHandler = (event : ChangeEvent<HTMLInputElement>) => {
    setPassword(event.currentTarget.value);
  };

  const onSubmitHandler = (event  : ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const tenant = getTenant();
    dispatch(login({ email: Email, password: Password, tenant: tenant}));
  };

  useEffect(() => {
    const isJwtValid = jwtValid();
    if (isJwtValid) {
      navigate("/dashboard");
    }
  }, []);


 

  return (
    <div>
      Login
    </div>
  );
}

export default Login;
