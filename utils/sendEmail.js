const nodemailer = require("nodemailer");

const sendEmail = async (options) => {

  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    // port: process.env.PORT,
    service: 'gmail',
    secure: false,
    auth: {
      user: 'omarmokh78@gmail.com',
      pass: 'jmggdyxjesblorpk'
    }
  });
  let mailOptions = {
    from: 'omarmokh78@gmail.com', // sender address
    to: options.email, // list of receivers
    subject: options.subject, // Subject line
    text: options.message
  }
  await transporter.sendMail(mailOptions);
}

module.exports = sendEmail;