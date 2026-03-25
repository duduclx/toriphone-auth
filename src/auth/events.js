/**
 * callback from https://wazo-platform.org/documentation/events/authentication/
 */
const useEvents = () => {

    // auth_refresh_token_created
    const onAuthRefreshTokenCreated = (data) => {
        console.log('auth_refresh_token_created', data)
    }

    // auth_refresh_token_deleted
    const onAuthRefreshTokenDeleted = (data) => {
        console.log('auth_refresh_token_deleted', data)
    }

    // auth_session_created
    const onAuthSessionCreated = (data) => {
        console.log('auth_session_created', data)
    }

    // auth_session_deleted
    const onAuthSessionDeleted = (data) => {
        console.log('auth_session_deleted', data)
    }

    // auth_session_expire_soon
    const onAuthSessionExpireSoon = (data) => {
        console.log('auth_session_expire_soon', data)
    }

    // auth_tenant_added
    const onAuthTenantAdded = (data) => {
        console.log('auth_tenant_added', data)
    }

    // auth_tenant_deleted
    const onAuthTenantDeleted = (data) => {
        console.log('auth_tenant_deleted', data)
    }

    // auth_tenant_updated
    const onAuthTenantUpdated = (data) => {
        console.log('auth_tenant_updated', data)
    }

    // auth_user_external_auth_added
    const onAuthUserExternalAuthAdded = (data) => {
        console.log('auth_user_external_auth_added', data)
    }

    // auth_user_external_auth_authorized
    const onAuthUserExternalAuthAuthorized = (data) => {
        console.log('auth_user_external_auth_authorized', data)
    }

    // auth_user_external_auth_deleted
    const onAuthUserExternalAuthDeleted = (data) => {
        console.log('auth_user_external_auth_deleted', data)
    }

  return {
    onAuthRefreshTokenCreated,
    onAuthRefreshTokenDeleted,
    onAuthSessionCreated,
    onAuthSessionDeleted,
    onAuthSessionExpireSoon,
    onAuthTenantAdded,
    onAuthTenantDeleted,
    onAuthTenantUpdated,
    onAuthUserExternalAuthAdded,
    onAuthUserExternalAuthAuthorized,
    onAuthUserExternalAuthDeleted
  }
}

export default useEvents
