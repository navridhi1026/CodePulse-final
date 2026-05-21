const nodemailer = require('nodemailer');

/**
 * Mailer Utility (CE-02 Syllabus L55-59)
 * Using Nodemailer to send transactional emails.
 */

// 1. Create a transporter object using the default SMTP transport
// For Viva, we can use Ethereal (test account) or generic settings.
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.ethereal.email',
    port: process.env.EMAIL_PORT || 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER || 'test@ethereal.email',
        pass: process.env.EMAIL_PASS || 'testpassword',
    },
});

/**
 * Function to send Welcome Email
 * @param {string} to - Recipient email
 * @param {string} name - User's name
 */
const sendWelcomeEmail = async (to, name) => {
    try {
        const info = await transporter.sendMail({
            from: '"CodePulse Team" <noreply@codepulse.com>',
            to: to,
            subject: "Welcome to CodePulse! 🚀",
            text: `Hi ${name},\n\nWelcome to CodePulse! Hard work pays off. Start solving problems and level up your skills.\n\nHappy Coding!`,
            html: `
                <div style="font-family: Arial, sans-serif; border: 1px solid #ddd; padding: 20px; border-radius: 10px; max-width: 600px;">
                    <h2 style="color: #4f46e5;">Welcome to CodePulse, ${name}! 🚀</h2>
                    <p>Hard work pays off. Start solving problems and level up your skills.</p>
                    <a href="http://localhost:5173" style="background-color: #4f46e5; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block; margin-top: 10px;">Go to Dashboard</a>
                    <hr style="margin: 20px 0; border: 0; border-top: 1px solid #eee;">
                    <p style="font-size: 12px; color: #888;">This is an automated email from the CodePulse CE-01/CE-02 Demo System.</p>
                </div>
            `,
        });

        console.log("Email sent: %s", info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        return true;
    } catch (error) {
        console.error("Error sending email:", error);
        return false;
    }
};

module.exports = { sendWelcomeEmail };
