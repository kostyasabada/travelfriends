import { Injectable } from '@angular/core';

const apiRoot = 'api';

@Injectable({
  providedIn: 'root'
})
export class UrlsService {
  readonly Api = {
    // Auth
    // LOGIN: `${apiRoot}/user/login`,
    SIGNUP: `${apiRoot}/user/signup`,
    USERLIST: `${apiRoot}/user/userlist`,

    // AUTH_CONFIG: `${apiRoot}/auth/get-auth-config`,
    // AUTH_TOKEN: `${apiRoot}/auth/get-auth-token`,
    // AUTH_REDIRECT_URL: `${apiRoot}/auth/get-auth-redirect-url`,
    // AUTH_LOGOUT: `${apiRoot}/auth/logout`,
    // AUTH_LOGOUT_URL: `${apiRoot}/auth/get-logout-redirect-url`,
    // AUTH_CHANGE_USER_GROUP: `${apiRoot}/auth/change-user-group`,
    // AUTH_SET_DEFAULT_USER_GROUP: `${apiRoot}/auth/set-default-user-group`,
    // AUTH_CHANGE_USER_ICMOREALIASES: `${apiRoot}/auth/change-user-icmorealiases`,

    // Config
    CONFIG: `${apiRoot}/config`,
  };
}
