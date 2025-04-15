import * as fs from 'fs-extra';
import * as sgMail from '@sendgrid/mail';
const sendGridApiKey = process.env.SENDGRID_API_KEY;
if (!sendGridApiKey) {
  throw new Error('SENDGRID_API_KEY is not defined in environment variables');
}

sgMail.setApiKey(sendGridApiKey);
const fromEmail = process.env.FROM_EMAIL_ADDRESS;
if (!fromEmail) {
  throw new Error('FROM_EMAIL_ADDRESS is not defined in environment variables');
}

export const otpGenerator = (): string => {
  return Math.floor(1000 + Math.random() * 9000).toString();
};

export const otpSend = async (email: string, otp: string) => {
  const templatePath = "src/templates/otpEmail.html";
  let htmlContent = fs.readFileSync(templatePath, 'utf8');
  htmlContent = htmlContent.replace('{{OTP}}', otp);
  const msg = {
    to: email,
    from: fromEmail,
    subject: `Your OTP is ${otp}`,
    text: 'Do not share this OTP with anyone.',
    html: htmlContent,
  };

  try {
    await sgMail.send(msg);
    return true;
  } catch (error) {
    console.log('SendGrid Error:', error);
    return false;
  }
};
