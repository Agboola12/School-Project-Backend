const { compare } = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const nodemailer = require('nodemailer');
const schoolLearning = require("../model/LecturerModel");


dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.APP_MAIL,
        pass: process.env.APP_PASSWORD
    }
});




// Registering User
const userRegister = async (req, res) => {
    // console.log(req.body);
    const { fullName, email, department, password } = req.body;
    

    try {
        

        const alreadyExists = await userChurch.findOne({ email });

        if (alreadyExists) {
            return res.status(200).json({
                status: false,
                message: "Email already exists",
            });
        }
        const verificationToken = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '12h' });
        
        const newUser = await schoolLearning.create({ joinDate, titles, fullName, email, mobile, postalCode, address, Dob, gender, code, department, admin, password, verificationToken  });

        
        const verificationLink = `${process.env.FrontendUrl}verify?token=${verificationToken}`;
        

        await transporter.sendMail({
            from: process.env.APP_MAIL,
            to: req.body.email,
            subject: 'Successful',
            html:
                `<div>
                    <h1 class="text-center">RCCG Victory Centre</h1><br/>
                    <p>Welcome to RCCG Victory Centre. Excited to journey together!</p>
                    <h3>${req.body.fullName}</h3>
                    <p>Please click the following link to verify your account:</p>
                    <a href="${verificationLink}">${verificationLink}</a>
                </div>`
        })
            // console.log(newUser);
        return res.status(200).json({
            status: true,
            message: "Account Created! Welcome to RCCG Victory Centre. Excited to journey together!  Please check your email for verification.",
            data: newUser,
        })

    } catch (error) {
        console.error(error);
        return res.status(200).json({
            status: false,
            message: "Oops, Onboarding failed",
        });
    }
};


  