export const AUTH_CONFIG = {
  baseURL: 'https://adalyze.se',
  google: {
    clientId: '1049491948915-62najl3om2tjjda27tpn6r9lv33qeira.apps.googleusercontent.com',
    redirectUri: `${window.location.origin}/auth/callback`
  },
  github: {
    clientId: 'Ov23lixWnse2HzGATCQA',
    redirectUri: `${window.location.origin}/auth/callback`
  },
  linkedin: {
    clientId: '77lbj0rc6y7sry',
    redirectUri: `${window.location.origin}/auth/callback`
  }
};