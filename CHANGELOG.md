# changelog

## v1.1.13
- suppression de tout le code lié au portail
- mise à jour de wazo-js-sdk
- mise à jour des packages

## v1.1.12-demo
- réécriture du code
- support de l'authentification LDAP
- mise à jour des packages

## v1.1.11-demo
- normalization de la réponse de userPasswordUpdate
- mise à jour des packages

## v1.1.8-demo
- mise à jour chalra-ui v3
- suppression de ColorModeSwitcher pour utiliser celui de la V3
- suppression de React-Select et AsyncSelectStyles (utilisation de NativeSelect)
- mise à jour des packages

## v1.1.7-demo
- suppression de validServer / validUser
- ajout de clientDemoAdd

## v1.1.7
- mise à jour du fichier de traduction
- ajout de configPortal pour un usage futur

## v1.1.6
- retrait d'un console log
- mise à jour packages

## v1.1.5
- corrige une erreur lors du refreshToken

## v1.1.4
- force la mise à jour de apiClient lors de la connexion
- logout ne supprime plus le localstorage

## v1.1.3
- supprime le localstorage lors de la déconnexion

## v1.1.2
- amélioration de la connexion root / admin

## v1.1.1
- reset apiclient lors de la déconnexion

## v1.1.0
- fix missing export

## v1.0.9
- fix bad user initial state
- fix bad setToken()
- remplace isClientApp par loginType : "client" | "admin" | "mobile"

## v1.0.8
- correction de l'erreur lors du login via api non autorisée

## v1.0.7
- retrait de isAdminApp et isMobileApp
- retrait de mauvaise fonction sur le websocket

## v1.0.6
- changer isModule par isClientApp, isAdminApp et isMobileApp
- fonctions loginUser... renommées pour plus de clareté
- ajout de l'event auth_session_expire_soon
- mise à jour des packages (dont Wazo/sdk#0.45.2)
- mise à jour React18 à React19
- mise à jour du readme
- logo toujours en rose

## V1.0.5
- suppression de auth_session_expire_soon
- mise à jour du readme

## v1.0.4
- désactivation du debug de i18next
- fix head error lors du logInViaRefreshToken

## v1.0.3
- suppression de la vérification de l'user sur portal
- suppression de l'enregistrement de la chat room dans le local storage
- suppression de la session lors de la déconnexion de l'utilisateur
- enregistrement minimale de la session dans le localStorage
- bouton de connexion un peu plus gros
- suppression de la session précédente lors d'une reconnexion automatique
- suppression de logInfo, utilisation de la session du localStorage

## v1.0.2
- mises à jour des packages

## v1.0.1
- mise à jour des packages

## v1.0.0
- check if user exist in authorized server

## V0.9.9
- add server info in useAuth

## V0.9.8
- update @wazo/sdk to 0.44.2
- update packages
- fix bad valid server verification
- only request user media when is module

## V0.9.7
- update packages
- remove unused packages
- add auth events, but still unused

## v0.9.6
- fix server allowed before connexion
- remove unused translation

## v0.9.5
- remove clientProvider
- add new portal verification

## v0.9.4
fix wss connect on refresh token

## v0.9.3
fix refresh token for
- user
- Wazo.Auth

## v0.9.2
export Wazo and apiClient

## v0.9.1
allow root login