import { useState } from "react";
import { useTranslation } from "react-i18next";

export const useError = () => {
  // requirements
  const { t } = useTranslation();

  // resource
  const [authErrorMessage, setAuthErrorMessage] = useState("");

  // functions
  const AuthErrorDisplay = (e) => {
    if (e.toString().includes("TypeError")) {
        setAuthErrorMessage(t("login.form_error_server"));
    } else {
      const error = JSON.parse(e.message);
      if (error.reason && error.reason[0].includes("Authentication")) {
        setAuthErrorMessage(t("login.form_error_login"));
      } else {
        setAuthErrorMessage(t("login.form_error_other"));
      }
    }
  };

  return {
    authErrorMessage,
    setAuthErrorMessage,
    AuthErrorDisplay,
  };
};
