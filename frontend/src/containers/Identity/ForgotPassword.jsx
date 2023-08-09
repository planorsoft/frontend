import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "@/containers/Identity/actions";
import ForgotPasswordForm from "@/components/ForgotPasswordForm";
import { getTenant } from "@/utils/tenant";
import { useToast } from "@chakra-ui/react";

function ForgotPassword() {
  const [Email, setEmail] = useState("");
  const toast = useToast();
  const dispatch = useDispatch();
  const identity = useSelector((state) => state.identity);

  const onChangeEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    let tenant = getTenant();
    dispatch(forgotPassword(Email, tenant, toast));
  };

  return (
    <ForgotPasswordForm
      error={identity.error}
      onChangeEmail={onChangeEmailHandler}
      onSubmit={onSubmitHandler}
    />
  );
}


export default ForgotPassword;