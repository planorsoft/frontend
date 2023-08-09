import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forgotConfirmPassword } from "@/containers/Identity/actions";
import { useNavigate, useSearchParams } from "react-router-dom";
import ForgotConfirmPasswordForm from "@/components/ForgotConfirmPasswordForm";
import { getTenant } from "@/utils/tenant";
import { identityStatuses } from "@/constants/identity";
import { useToast } from "@chakra-ui/react";

function ForgorConfirmPassword() {
  const [Password, setPassword] = useState("");
  const [PasswordConfirm, setPasswordConfirm] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();
  const [searchParams] = useSearchParams();
  const identity = useSelector((state) => state.identity);

  const onChangePasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onChangePasswordConfirmHandler = (event) => {
    setPasswordConfirm(event.currentTarget.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (Password !== PasswordConfirm) {
      toast({
        title: "Şifreler eşleşmiyor.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }

    const token = searchParams.get("token").replaceAll(" ", "+");
    const email = searchParams.get("email");
    let tenant = getTenant();
    dispatch(forgotConfirmPassword(email, token, Password, tenant, toast));
  };

  useEffect(() => {
    if (identity.status === identityStatuses.ForgotConfirmPasswordSuccess) {
      navigate("/login");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [identity.loading]);
  

  return (
    <ForgotConfirmPasswordForm
      error={identity.error}
      onChangePassword={onChangePasswordHandler}
      onChangePasswordConfirm={onChangePasswordConfirmHandler}
      onSubmit={onSubmitHandler}
    />
  );
}


export default ForgorConfirmPassword;