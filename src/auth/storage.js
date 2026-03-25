export const useStorage = ({ appName }) => {
  /* sessions */

  // session Get
  const storageSessionGet = () => JSON.parse(localStorage.getItem(`${appName}_session`));

  // session Set
  const storageSessionSet = (session) => {
    const filteredSession = {
    server: session.server,
    engineVersion: session.engineVersion,
    uuid: session.uuid,
    sessionUuid: session.sessionUuid,
    token: session.token,
    refreshToken: session.refreshToken,
    email: session.profile.email
  };
    localStorage.setItem(`${appName}_session`, JSON.stringify(filteredSession));
  };

  // session Remove
  const storageSessionRemove = () => {
    localStorage.removeItem(`${appName}_session`);
  };

  /* prefs */

  // prefs Get
  const storagePrefsGet = () => {
    return JSON.parse(localStorage.getItem(`${appName}_preferences`));
  };

  // storage preferences
  // will be replaced by /users/me/config in the future
  const storagePrefsSet = (newPreferences) => {
    const existingPreferences = getPreferencesOnStorage() || {};
    // Fusionnez les nouvelles préférences avec les préférences existantes
    const preferences = {
      ...existingPreferences,
      ...newPreferences,
    };
    /* newPreferences = {
      notifSound: string, // not used
      callsLength: integer,
      ringtone: string,
      ringDevice: string,
      ringVolume: integer,
      audioDevice: string,
      audioVolume: string,
      cameraDevice: string,
      microDevice: string
    }
    utilisation: setPreferencesOnStorage({ callsLength: 5 });
    */
    localStorage.setItem(`${appName}_preferences`, JSON.stringify(preferences));
  };

  const getPreferencesOnStorage = () => {
    return JSON.parse(localStorage.getItem(`${appName}_preferences`));
  };

  return {
    storageSessionGet,
    storageSessionSet,
    storageSessionRemove,
    //storageLogInfoGet,
    //storageLogInfoSet,
    //storageRoomGet,
    //storageRoomSet,
    storagePrefsGet,
    storagePrefsSet,
  };
};
