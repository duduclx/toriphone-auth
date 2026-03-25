import i18n from "./i18n";
import { I18nextProvider } from "react-i18next";
import { Provider } from "./components/ui/provider";
import { AuthProvider } from "./AuthProvider";
import Login from "./components/Login";

import "./i18n";

export { useAuth } from "./AuthProvider";

export const UserLogin = ({ i18nInstance }) => {
  return (
    <I18nextProvider i18n={i18nInstance || i18n}>
      <Login />
    </I18nextProvider>
  );
};

export const UserAuthProvider = ({ i18nInstance, appName, loginType, children }) => {
  return (
    <I18nextProvider i18n={i18nInstance || i18n}>
      <Provider>
        <AuthProvider appName={appName} loginType={loginType}>
          {children}
        </AuthProvider>
      </Provider>
    </I18nextProvider>
  );
};

export const LoginAuthProvider = ({ i18nInstance, appName, loginType }) => {
  return (
    <I18nextProvider i18n={i18nInstance || i18n}>
      <AuthProvider appName={appName} loginType={loginType}>
        <Login />
      </AuthProvider>
    </I18nextProvider>
  );
};
