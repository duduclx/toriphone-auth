export const useLogin = ({ appName, Wazo, WazoApiClient, ApiRequester, AuthErrorDisplay }) => {
  // login backend Wazo
  const loginWazo = async (email, password, server) => {
    let res;

    if (email === "root") {
      res = await loginApi(email, password, server);
    } else {
      res = await loginUser(email, password, server);
    }

    return res;
  };

  // login user
  const loginUser = async (email, password, server) => {
    Wazo.Auth.init(appName, 3600);
    Wazo.Auth.setHost(server);
    try {
      const res = await Wazo.Auth.logIn(email.trim(), password.trim());
      let session = res;
      session.server = server;
      return session;
    } catch (e) {
      AuthErrorDisplay(e);
    }
  };

  // login root
  const loginApi = async (email, password, server) => {
    // init
    const client = new WazoApiClient({
      server: server,
      agent: null,
      clientId: appName,
      isMobile: false,
    });

    // retrieve session
    try {
      const res = await client.auth.logIn({ username: email.trim(), password: password.trim() });
      let session = res;
      session.server = server;

      const apiclient = new ApiRequester({
        server: server,
        clientId: appName,
        agent: null,
        token: session.token,
      });

      const profile = await apiclient.get(`auth/0.1/users/${session.uuid}`);
      session.profile = profile;
      return session;
    } catch (e) {
      AuthErrorDisplay(e);
    }
  };

  // loginLdap
  const loginLdap = async (email, password, server, extra) => {
    Wazo.Auth.init(appName, 3600);
    Wazo.Auth.setHost(server);
    try {
      // BACKEND_LDAP = "BACKEND_LDAP_USER" ou "LDAP_USER" ??
      const res = await Wazo.Auth.logIn(email.trim(), password.trim(), "LDAP_USER", extra);
      let session = res;
      session.server = server;
      return session;
    } catch (e) {
      AuthErrorDisplay(e);
    }
  };

  const loginStorage = async (rawSession) => {
    try {
      Wazo.Auth.init(appName, 3600);
      Wazo.Auth.setHost(rawSession.server);
      // prevent head error
      Wazo.Auth.usingEdgeServer = false;
      const res = await Wazo.Auth.logInViaRefreshToken(rawSession.refreshToken);
      return res;
    } catch (e) {
      AuthErrorDisplay(e);
    }
  };

  return {
    loginWazo,
    loginUser,
    loginApi,
    loginLdap,
    loginStorage,
  };
};
