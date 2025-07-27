const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const createEmailTemplate = (userName, contestTitle, decision) => {
  const decisionMessage =
    decision === 'approved'
      ? '<div style="background-color: #d4edda; color: #155724; padding: 15px; border-radius: 5px; margin: 20px 0;"><p style="margin: 0;">🎉 Congratulations! Your offer is now visible to the contest creator.</p></div>'
      : '<div style="background-color: #f8d7da; color: #721c24; padding: 15px; border-radius: 5px; margin: 20px 0;"><p style="margin: 0;">Thank you for your participation. You can submit new offers for other contests.</p></div>';

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
      <div style="background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
        <h2 style="color: #333; margin-bottom: 20px; text-align: center;">Offer Moderation Result</h2>
        <p style="color: #555; font-size: 16px; line-height: 1.6;">Hello, ${userName}!</p>
        <p style="color: #555; font-size: 16px; line-height: 1.6;">Your offer for contest "<strong>${contestTitle}</strong>" has been <strong>${decision}</strong> by our moderator.</p>
        
        <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <p style="margin: 5px 0;"><strong>Decision:</strong> ${decision.toUpperCase()}</p>
        </div>
        
        ${decisionMessage}
        
        <p style="color: #555; font-size: 16px; line-height: 1.6;">Best regards,<br><strong>SquadHelp Team</strong></p>
      </div>
    </div>
  `;
};

const sendModerationNotification = async ({
  userEmail,
  userName,
  offerId,
  decision,
  contestTitle,
}) => {
  try {
    const subject = `Your offer has been ${decision}`;
    const html = createEmailTemplate(userName, contestTitle, decision);

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: userEmail,
      subject,
      html,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log(`Email sent successfully to ${userEmail} for offer ${offerId}`);
    return result;
  } catch (error) {
    console.error(`Failed to send email to ${userEmail}:`, error.message);
    throw error;
  }
};

module.exports = {
  sendModerationNotification,
};
