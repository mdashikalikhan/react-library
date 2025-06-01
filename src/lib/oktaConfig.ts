
export const oktaConfig = {
    clientId: '0oarwbt81pUxnJSnt697',
    issuer: 'https://trial-1482496.okta.com/oauth2/default',
    redirectUri: 'http://localhost:3000/login/callback',
    scopes: ['openid', 'profile', 'email'],
    pkce: true,
    disableHttpCheck: true
}