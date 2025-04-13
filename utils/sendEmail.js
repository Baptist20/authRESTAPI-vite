const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, html) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  const mailOptions = {
    from: `${process.env.EMAIL_USER}`,
    to,
    subject,
    html,
  };

  console.log(process.env.EMAIL_PASSWORD, process.env.EMAIL_USER);
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
