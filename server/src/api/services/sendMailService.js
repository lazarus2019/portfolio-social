const oAuth2Client = require("../../config/nodemailer/nodemailer");
const nodemailer = require("nodemailer");
const { GG_REFRESH_TOKEN, GG_EMAIL, GG_CLIENT_ID, GG_CLIENT_SECRET_KEY } =
  process.env;

const mailTypes = {
  resetPassword: {
    subject: "Reset Your Password",
    from: 'Portfolio Social 👻" <foo@example.com>',
  },
  feedback: {
    subject: "User FeedBack",
    to: GG_EMAIL,
  },
  verifyAccount: {
    subject: "Email verification required",
    from: 'Portfolio Social 👻" <foo@example.com>',
  },
};

const sendEmail = async (from, to, subject, htmlBody) => {
  const accessToken = await oAuth2Client.getAccessToken();
  let transporter = await nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: GG_EMAIL,
      clientId: GG_CLIENT_ID,
      clientSecret: GG_CLIENT_SECRET_KEY,
      refreshToken: GG_REFRESH_TOKEN,
      accessToken: accessToken,
    },
  });

  await transporter.sendMail({
    from: from,
    to: to,
    subject: subject,
    html: htmlBody,
  });
};

const sendResetPasswordEmail = async (email, url) => {
  if (!email || !url)
    throw new Error("email and url is required || sendResetPasswordEmail");
  const htmlBody = `
    <p>You have a new contact request</p>
    <h3>Contact Details</h3>
    <ul>  
      <li>Email: ${email}</li>
    </ul>
    <a href="${url}">Click here to reset password</a>
    <h3>Message</h3>
  `;

  const { from, subject } = mailTypes.resetPassword;

  try {
    await sendEmail(from, email, subject, htmlBody);
  } catch {
    throw new Error(
      `Failed to send reset token to ${email} || sendResetPasswordEmail`
    );
  }
};

const sendVerificationEmail = async (email, url) => {
  if (!email || !url)
    throw new Error("email and url is required || sendVerificationEmail");
  const htmlBody = `
    <p>You have a new contact request</p>
    <h3>Contact Details</h3>
    <ul>  
      <li>Email: ${email}</li>
    </ul>
    <a href="${url}">Click here to verify account</a>
    <h3>Message</h3>
  `;
  const { from, subject } = mailTypes.verifyAccount;

  try {
    await sendEmail(from, email, subject, htmlBody);
  } catch {
    throw new Error(
      `Failed to send reset token to ${email} || sendVerificationEmail`
    );
  }
};

const sendFeedbackEmail = async (user, content) => {
  if (!user || !content)
    throw new Error("user and content is required || sendFeedbackEmail");
  const htmlBody = `
    <p>You have a new contact request</p>
    <h3>Contact Details</h3>
    <ul>  
      <li>Email: ${user?.email}</li>
    </ul>
    <h3>Message</h3>
    <p>${content}</p>
  `;
  const { to, subject } = mailTypes.feedback;

  const from = `${user?.fullName}`;

  try {
    await sendEmail(from, to, `${subject} from: ${from}`, htmlBody);
  } catch {
    throw new Error(
      `Failed to send reset token to ${email} || sendFeedbackEmail`
    );
  }
};

module.exports = {
  sendResetPasswordEmail,
  sendVerificationEmail,
  sendFeedbackEmail,
};
