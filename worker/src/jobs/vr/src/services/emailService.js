const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const { logVerificationCommunication } = require('./verificationService');

const sendVerificationEmail = async (entity_id, claimData, token) => {
  console.log(`[EmailService] 📧 Preparing verification email for ${entity_id}...`);

  const testRecipient = process.env.TEST_EMAIL_RECIPIENT || 'jitendratyagi2005@gmail.com';
  const senderEmail = process.env.SMTP_FROM || 'verification@platform.com';

  const isEducation = claimData.entity_type === 'EDUCATION';
  const isEmployment = claimData.entity_type === 'EMPLOYMENT';

  const subject = isEducation
    ? `Verification Request: ${claimData.university_name}`
    : `Verification Request: ${claimData.company_name}`;

  const detailsHtml = isEducation
    ? `
      <ul>
        <li><strong>Student Name:</strong> ${claimData.student_name}</li>
        <li><strong>University:</strong> ${claimData.university_name}</li>
        <li><strong>Degree:</strong> ${claimData.degree_name}</li>
        ${claimData.specialization ? `<li><strong>Specialization:</strong> ${claimData.specialization}</li>` : ''}
        <li><strong>Passing Year:</strong> ${claimData.passing_year}</li>
        
      </ul>
    `
    : `
      <ul>
        <li><strong>Company:</strong> ${claimData.company_name}</li>
        <li><strong>Position:</strong> ${claimData.job_role}</li>
      </ul>
    `;

  const mailOptions = {
    from: `"Verification Team" <${senderEmail}>`,
    to: testRecipient, // Overridden for testing
    subject: subject,
    html: `
      <h2>Verification Request</h2>
      <p>Hello,</p>
      <p>We are requesting verification for a claim made by an individual associated with <strong>${claimData.institution_company}</strong>.</p>
      <p><strong>Claim Details:</strong></p>
      ${detailsHtml}
      <p>Please use the following token for reference: <strong>${token}</strong></p>
      <p>Thank you,</p>
      <p>Verification Platform Team</p>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`[EmailService] ✅ Email sent to ${testRecipient}: ${info.messageId}`);

    await logVerificationCommunication(
      info.messageId,
      token,
      senderEmail,
      testRecipient,
      mailOptions.html
    );

    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error(`[EmailService] ❌ Failed to send email to ${testRecipient}:`, error.message);
    throw { code: 'EMAIL_DELIVERY_FAILED', message: error.message };
  }
};

module.exports = { sendVerificationEmail };
