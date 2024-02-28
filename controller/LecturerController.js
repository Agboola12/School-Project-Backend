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
const tutorRegister = async (req, res) => {
    
    const { fullName, email, department, password } = req.body;
    
    try {
        const alreadyExists = await schoolLearning.findOne({ email });

        if (alreadyExists) {
            return res.status(203).json({
                status: false,
                message: "Email already exists",
            });
        }
        
        const newUser = await schoolLearning.create({ fullName, email, department, password  });
        
        await transporter.sendMail({
            from: process.env.APP_MAIL,
            to: req.body.email,
            subject: 'Successful',
            html:
                `<div>
                    <h1 class="text-center">RCCG Victory Centre</h1><br/>
                    <p>Welcome to our Student Learning Site. Enjoy your stays with us</p>
                    <h3>${req.body.fullName}</h3>
                </div>`
        })
            // console.log(newUser);
        return res.status(201).json({
            status: true,
            message: "Welcome to our Student Learning Site. Enjoy your stays with us.",
            data: newUser,
        })

    } catch (error) {
        console.error(error);
        return res.status(203).json({
            status: false,
            message: "Oops, Onboarding failed",
        });
    }
};


module.exports = { tutorRegister}


  