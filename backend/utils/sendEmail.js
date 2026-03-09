const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
    // If real credentials are provided, use them.
    if (process.env.EMAIL_HOST && process.env.EMAIL_USER && process.env.EMAIL_PASS) {
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT || 587,
            secure: process.env.EMAIL_SECURE === 'true', 
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const message = {
            from: `${process.env.FROM_NAME || 'SkillSwap Admin'} <${process.env.FROM_EMAIL || 'noreply@skillswap.io'}>`,
            to: options.email,
            subject: options.subject,
            text: options.message,
        };

        const info = await transporter.sendMail(message);
        console.log('Real Email Sent: %s', info.messageId);
    } else {
        // Fallback: Just log the OTP to the console so the user can see it for local testing!
        console.warn('\n==================================================');
        console.warn('⚠️ NO REAL EMAIL CREDENTIALS PROVIDED IN .ENV');
        console.warn('mocking email delivery...');
        console.warn(`To: ${options.email}`);
        console.warn(`Subject: ${options.subject}`);
        console.warn(`Message:\n${options.message}`);
        console.warn('==================================================\n');
    }
};

module.exports = sendEmail;
