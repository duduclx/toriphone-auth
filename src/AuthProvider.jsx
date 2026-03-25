import { useState, useContext, createContext, useEffect } from "react";

import Wazo, { WazoApiClient, ApiRequester } from "@wazo/sdk";

import { useStorage } from "./auth/storage";
import { useUser } from "./auth/user";
import { useError } from "./auth/error";
import { useLogin } from "./auth/login";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children, appName = "tori_desktop" }) => {

  // resources
  const [loading, setLoading] = useState(false);

  // apiClient
  const [apiClient, setApiClient] = useState({});

  // storage
  const {
    storageSessionGet,
    storageSessionSet,
    storageSessionRemove,
    storagePrefsGet,
    storagePrefsSet,
  } = useStorage({ appName });

  // user
  const {
    user,
    setUser,
    userLogout,
    userPasswordUpdate,
  } = useUser({ setApiClient, Wazo, storageSessionRemove });

  // error
  const {
    authErrorMessage,
    setAuthErrorMessage,
    AuthErrorDisplay,
  } = useError();

  // login
  const {
    loginWazo,
    loginUser,
    loginApi,
    loginLdap,
    loginStorage
  } = useLogin({ appName, Wazo, WazoApiClient, ApiRequester, AuthErrorDisplay })

  // debug
  // console.log("user", user)

  /**
   * Login user (root, user, ldap)
   * @param {*} email 
   * @param {*} password 
   * @param {*} server 
   * @param {*} extra 
   */
  const userLogin = async (email, password, server, extra = null) => {
    // states
    setLoading(true);
    setAuthErrorMessage("");

    let session = null;

    // login
    if( extra ) {
      session = await loginLdap(email, password, server, extra);
    } else {
      session = await loginWazo(email, password, server);
    }

    if (session) {
      // valid user
      validUser(session);
  
      // get apiclient
      await apiClientSet(session);
  
      // update wss token
      webSocketUpdateToken(session);
    }

  }

  /**
   * Connect from storage
   * @returns 
   */
  const userLoginFromStorage = async () => {
    const rawSession = storageSessionGet();
    if (rawSession) {
       let session = null;
      session = await loginStorage(rawSession)
      if (session) {
          session.refreshToken = rawSession.refreshToken;
          session.server = rawSession.server;
          Wazo.Auth.setRefreshToken(rawSession.refreshToken);
          validUser(session);
          await apiClientSet(session);
          webSocketUpdateToken(session);
          // remove previous session
          await Wazo.auth.deleteUserSession(rawSession.uuid, rawSession.sessionUuid);
        }
    }
  };

  const validUser = async (session, valid) => {
    setUser(session);
    setLoading(false);
    storageSessionSet(session);
  };

  const apiClientSet = async (session) => {
    const apiClientGet = Wazo.getApiClient();
    // force server and clientId when root --> logout --> root
    apiClientGet.client.server = session.server;
    apiClientGet.client.clientId = appName; 
    // end force
    apiClientGet.client.setToken(session.token);
    setApiClient(apiClientGet);
  }

  const webSocketUpdateToken = (session) => {
    Wazo.Websocket.updateToken(session.token);
    // Wazo.Websocket.ws.updateToken(session.token);
    // Wazo.Websocket.ws.reconnect();
    // onAuthSessionExpireSoon
    Wazo.Websocket.on("auth_session_expire_soon", () => {
      UserTokenRefresh();
      });
  }

  // refresh token on all composants
  const UserTokenRefresh = async () => {
    Wazo.Auth.setOnRefreshToken(async (token) => {
      // update user
      setUser((prevUser) => ({
        ...prevUser,
        token: token,
      }));
      Wazo.Auth.setApiToken(token);
      // update apiClient
      setApiClient((prev) => {
        prev.client.token = token; 
        return { ...prev };
      });
      //apiClient.client.setToken(token);
      // update websocket
      Wazo.Websocket.updateToken(token);
      //Wazo.Websocket.ws.updateToken(token);
      Wazo.Websocket.ws.reconnect();
    });
  };

  /**
   * auto reconnexion
   */
  useEffect(() => {
    const fetchData = async () => {
      await userLoginFromStorage();
    };
    fetchData();
  }, []);

  /**
   * Ask user media permissions
   */
  useEffect(() => {
      // Fonction pour demander les autorisations audio et vidéo
      const requestMediaPermissions = () => {
        navigator.mediaDevices
          .getUserMedia({ audio: true, video: true })
          .then(() => {
            //console.log("L'utilisateur a accordé les autorisations audio et vidéo.");
          })
          .catch((error) => {
            //console.error("Erreur lors de la demande de permission audio/vidéo :", error);
          });
      };
  
      // Vérifier les autorisations du microphone
      navigator.permissions
        .query({ name: "microphone" })
        .then((microphonePermissionStatus) => {
          if (microphonePermissionStatus.state === "granted") {
            // Les autorisations du microphone sont déjà accordées
          } else {
            // Les autorisations du microphone ne sont pas encore accordées, demander à l'utilisateur
            requestMediaPermissions();
          }
        })
        .catch((error) => {
          //console.error("Erreur lors de la vérification des autorisations du microphone :", error);
        });
  
      // Vérifier les autorisations de la caméra vidéo
      navigator.permissions
        .query({ name: "camera" })
        .then((cameraPermissionStatus) => {
          if (cameraPermissionStatus.state === "granted") {
            // Les autorisations de la caméra vidéo sont déjà accordées
          } else {
            // Les autorisations de la caméra vidéo ne sont pas encore accordées, demander à l'utilisateur
            requestMediaPermissions();
          }
        })
        .catch((error) => {
          //console.error("Erreur lors de la vérification des autorisations de la caméra vidéo :", error);
        });
  }, []);

  const value = {
    user,
    setUser,
    userLogin,
    userLogout,
    userPasswordUpdate,
    authErrorMessage,
    setAuthErrorMessage,
    apiClient,
    Wazo,
    storageSessionGet,
    storageSessionSet,
    storageSessionRemove,
    storagePrefsGet,
    storagePrefsSet
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
