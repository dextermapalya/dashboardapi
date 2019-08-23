// export const AUTH_LOGIN = 'auth/login/';
export const AUTH_LOGIN = 'custom/login/';
export const AUTH_REGISTRATIONS = 'v1/activeregistrations/';
export const AUTH_SUBSCRIPTIONS = 'v1/activesubscriptions/';
export const AUTH_INSTALLATIONS = 'v1/activeinstallations/';
export const AUTH_RENEWALS = 'v1/activerenewals/';
export const AUTH_APPERRORS = 'v1/apperrors/';
export const LOCAL_BASE_URL = 'http://192.168.60.57/api/';
// export const PRODUCTION_BASE_URL = 'http://52.66.16.118/api/';
export const PRODUCTION_BASE_URL = 'http://dashboard.sunnxt.com/api/';
export const LOCAL_STORAGE_USERINFO_KEY = 'userinfo';
export const ROLES = [
  { graph_type: 'SubscriptionChart', props: { title: 'Subscriptions Hourly' }, roles: ['tech', 'business'] },
  { graph_type: 'RegistrationChart', props: { title: 'Registrations Hourly' }, roles: ['tech', 'management'] },
  { graph_type: 'InstallChart', props: { title: 'Installations Hourly' }, roles: ['tech', 'management'] },
  { graph_type: 'RenewalChart', props: { title: 'Renewals Hourly' }, roles: ['tech', 'business'] },
  { graph_type: 'ApperrorsChart', props: { title: 'App Errors' }, roles: ['tech', 'management'] },
];
export const TOKEN_EXPIRY_MINUTES = 1;
