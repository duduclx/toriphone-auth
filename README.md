# toriphone-auth

Ce module renvois:
- du code Jsx prêt à l'emploi pour afficher l'interface d'administration.
- un context React gérant l'authentification et le package Wazo-js-sdk

## remarques
Lorsque apiClient est mis à jour, cela ne force pas un refresh des applications,
créant une requête avec l'ancien token.

Le Auth devrait être directement inclus dans chaque projet, et non être ici.

Si toriphone-sdk est contruit, alors il doit intégrer complètement la gestion de l'authentification et du renouvellement du token et de apiClient.

## build

Il faut faire le build avant chaque release:
```sh
npm run build
```

## utilisation des tags

Créer un tag :
```sh
git tag v1.0.0
```

Pousser le tag vers le dépôt distant :
```sh
git push origin v1.0.0
```

supprimer un tag :
```sh
git tag - d v1.0.0
git push origin --delete v1.0.0
```

## importation

importer la branche par défaut:
```json
"toriphone-auth": "git+https://github.com/duduclx/toriphone-auth.git",
```

importer une version spécifique :
```json
"toriphone-auth": "git+https://github.com/duduclx/toriphone-auth.git#v1.0.0",
```

importer une branche spécifique :
```json
"toriphone-auth": "git+https://github.com/duduclx/toriphone-auth.git#feature-branch",
```

## installation

```sh
npm install
```

## utilisation

dans le fichier où doit apparaitre l'interface:

Pour afficher uniquement la page de Login

```js
import { UserLogin } from "toriphone-auth";
import { I18nextProvider } from "react-i18next";
import i18n from "../../i18n";

...

<I18nextProvider i18n={i18n}>
    <UserLogin i18nInstance={i18n} />
</I18nextProvider>
```

Pour afficher le provider et laisser le choix de l'enfant:

```js
import { UserAuthProvider } from "toriphone-auth";
import { I18nextProvider } from "react-i18next";
import i18n from "../../i18n";

...

<I18nextProvider i18n={i18n}>
    <UserAuthProvider
    i18nInstance={i18n}
    appName="Mon app"
    >
    {children}
    </UserAuthProvider>
</I18nextProvider>
```

Pour afficher le provider et la page de login:

```js
import { LoginAuthProvider } from "toriphone-auth";
import { I18nextProvider } from "react-i18next";
import i18n from "../../i18n";

...

<I18nextProvider i18n={i18n}>
    <LoginAuthProvider
    i18nInstance={i18n}
    />
</I18nextProvider>
```

Pour récupérer l'utilisateur:

```js
import { useAuth } from "toriphone-auth";

...

const {
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
     } = useAuth();
```

## dépedances

Dans votre projet, vous devez avoir obligatoirement avoir:
- "@chakra-ui/react": "^3.0.0",
- "react": "^19.0.0",
- "react-dom": "^19.0.0"
