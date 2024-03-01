const dotenv = require("dotenv");
const nodemailer = require("nodemailer")
const bcrypt = require('bcrypt');
const schoolLearning = require("../model/LecturerModel");

dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.APP_MAIL,
        pass: process.env.APP_PASSWORD
    }
});
const generateRandom4DigitNumber = () => {
    const randomNumber = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
    return randomNumber;
};

const forgottenPassword = async (req, res) => {
    try {
        const { email } = req.body;

        // Check if email is provided
        if (!email) {
            return res.status(203).json({
                message: 'Email is required',
                status: false
            });
        }

        // Generate random 4-digit number
        const random4DigitNumber = generateRandom4DigitNumber();

        // Find user by email
        const user = await schoolLearning.findOne({ email });

        // If user exists, send email with OTP
        if (user) {
            // Send email
            await transporter.sendMail({
                from: process.env.APP_MAIL,
                to: email,
                subject: 'Successful',
                html: `
                    <div>
                        <h1 class="text-center">School Learrning</h1><br/>
                        <p>OTP code to reset the password</p>
                        <h3>${random4DigitNumber}</h3>
                    </div>`
            });

            // Update user's OTP in the database
            await schoolLearning.findOneAndUpdate({ email }, { $set: { otp: random4DigitNumber } });

            return res.status(201).json({
                message: 'User exists. Email sent with OTP.',
                status: true
            });
        } else {
            // If user does not exist
            return res.status(203).json({
                message: 'User not found',
                status: false
            });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: 'Something went wrong',
            status: false
        });
    }
};





const resetPassword = async (req, res) => {
    const { otpCode, newPassword, email } = req.body;
    try {
        if (!otpCode || !newPassword || !email) {
            return res.status(203).json({
                message: 'Fill the Input Correctly',
                status: false
            });
        }
        const user = await schoolLearning.findOne({ email });
        if (!user) {
            return res.status(203).json({
                message: 'User not found',
                status: false
            });
        }

        if (user.otp != otpCode) {
            return res.status(203).json({
                message: 'Invalid OTP',
                status: false
            });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await schoolLearning.findOneAndUpdate({ email }, { $set: { password: hashedPassword } });

        return res.status(201).json({
            message: 'Password reset successfully',
            status: true
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Internal server error',
            status: false
        });
    }
};



module.exports = { forgottenPassword, resetPassword }