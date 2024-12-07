export const ENDPOINT = {
  API_PREFIX: '/api/v1',

  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh-token',
  },

  USERS: {
    BASE: '/users',
    BY_ID: '/users/:id',
    PROFILE: '/users/profile',
    UPDATE: '/users/:id',
    DELETE: '/users/delete',
  },

  CHALLENGES: {
    BASE: '/challenges',
    CREATE: '/challenges/create',
  },

  PROTECTED: '/protected',
};
