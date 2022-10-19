const { google } = require("googleapis");
const {
  GG_REFRESH_TOKEN,
  GG_CLIENT_SECRET_KEY,
  GG_CLIENT_ID,
  GG_REDIRECT_URI,
} = process.env;

const oAuth2Client = new google.auth.OAuth2(
  GG_CLIENT_ID,
  GG_CLIENT_SECRET_KEY,
  GG_REDIRECT_URI
);

oAuth2Client.setCredentials({ refresh_token: GG_REFRESH_TOKEN });

module.exports = oAuth2Client;
