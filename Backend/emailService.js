import nodemailer from 'nodemailer';

// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'autocarenadeeka@gmail.com',
    pass: 'Nadeeka@123',
  },
});


// Create a transporter object using SMTP transport (same as before)

const sendEmailToCustomer = async (to, subject, text) => {
  try {
    const info = await transporter.sendMail({
      from: 'autocarenadeeka@gmail.com',
      to,
      subject,
      text,
    });
    console.log('Email sent:', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

module.exports = { transporter, sendEmailToCustomer };

// Export the transporter for use in other files
export default transporter;
