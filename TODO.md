## Login
- samlLogIn
- forgot password

## setonRefreshtoken
- UserTokenRefresh semble se jouer lorsque l'appel API n'est plus fait avec le bon token

## root login
- le token n'est pas refresh
    - user.refreshToken est bien présent
    - apiClient.refreshToken: undefined
- le rawConnect ne fonctionne pas
- Wazo.Auth.server: undefined
- Wazo.Auth.connected: false (car pas un utilisateur)

## session
- apparition de session.metadata.admin: true
- metadata semble être utilisé pour le portal Wazo.io
```json
{
    "uuid": "eed24e56-5ab0-4daf-ab53-e37519ccc547",
    "tenant_uuid": "84168c4d-6d43-4fb6-b3e1-91ffdf2e3265",
    "auth_id": "eed24e56-5ab0-4daf-ab53-e37519ccc547",
    "pbx_user_uuid": "eed24e56-5ab0-4daf-ab53-e37519ccc547",
    "xivo_uuid": "31359d1b-43b9-4ddd-b24a-37658b1a853f",
    "purpose": "user",
    "admin": true
}
```

## Auth events
- auth_refresh_token_created
- auth_refresh_token_deleted
- auth_session_created
- auth_session_deleted
- auth_session_expire_soon
- auth_tenant_added
- auth_tenant_deleted
- auth_tenant_updated
- auth_user_external_auth_added
- auth_user_external_auth_authorized
- auth_user_external_auth_deleted