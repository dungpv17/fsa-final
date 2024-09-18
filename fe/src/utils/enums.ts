export enum HTTP_STATUS_CODE {
  SUCCESS = 200,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  PROXY_AUTHENTICATION_REQUIRED = 407,
  CONFLICT = 409,
  INTERNAL_SERVER_ERROR = 500,
  PAYMENT_REQUIRED = 402,
}

export enum ENDPOINT_API {
  REFRESH_TOKEN = '/refresh-token',
  LOGIN = '/auth/login',
  LOGOUT = '/auth/logout',
  REGISTER = '/auth/register',
  USER = '/auth/user',
}

export enum ROUTE_PATH {
  LOGIN = '/login',
  HOME = '/',
  REST = '*',
}

export enum ROLES {
  ADMIN = "ADMIN",
  USER = "USER",
}

export enum VARIANT_COLOR {
  SUCCESS = 'success',
  DANGER = 'destructive'
}