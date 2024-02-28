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

const tutorLogin = async (req, res) => {
    const { email, password } = req.body;

    schoolLearning.findOne({ email }).select("+password").exec()
        .then(async data => {
            if (data) {
                try {
                    const validPassword = await compare(password, data.password)
                    if (validPassword) {
                        // jsonwebtoken
                        const token = jwt.sign({
                            email: data.email,
                            _id: data._id
                        },
                            process.env.JWT_SECRET,

                            { expiresIn: "12h" }
                        )
                        data.password = "";
                        res.status(201).json({
                            token,
                            status: true,
                            message: " Login successful",
                            data: { email: req.body.email }
                        })
                    }
                    else {
                        res.status(203).json({
                            status: false,
                            message: " Password is not correct"
                        })
                    }
                }
                catch (error) {
                    res.send(error)
                    console.log(error);
                }
            }
            else {
                res.status(203).json({
                    status: false,
                    message: "Email does not match "
                })
            }
        }).catch(err => {
            if (err) {
                res.status(500).json({
                    status: false,
                    message: err
                })
                console.log(err);
            }
        })
}

const getTutor = async (req, res) => {
    let data = await jwt.verify(req.headers.authorization, process.env.JWT_SECRET);

    if (!data) {
        res.send({ message: "Invalid token", status: false })
    } else {
        schoolLearning.findById(data._id)
            .then(data => {
                res.status(201).json({
                    status: true,
                    data,
                    message: "User profile fetched"
                })
            })
            .catch(err => {
                res.status(203).json({
                    status: false,
                    message: "An error occurres when fetching user profile"
                })
                console.log(err, "Problem getting user");
            })
    }
}

const tutorImage = (req, res) => {
    const { _id } = req.params;
    const image = (req.file.path);

    schoolLearning.findByIdAndUpdate(_id, { userImageUrl: image })
        .then(data => {
            res.status(201).json({
                status: true,
                message: "Profile updated successfully.",
                // data

            })
        }).catch(err => {
            res.status(203).json({
                status: false,
                message: "An error in editing profile"
            })
            console.log(err, "wahala o in editing profile");
        })
}

const editTutor = (req, res) => {
    const { _id } = req.params;
    const { fullName, email, department } = req.body;

    schoolLearning.findByIdAndUpdate(_id, {  fullName, email, department })
        .then(data => {
            // console.log(data);
            res.status(200).json({
                status: true,
                message: "User Editing successful",
                // data

            })
        }).catch(err => {
            res.status(200).json({
                status: false,
                message: "An error in editing profile"
            })
            console.log(err, "wahala o in editing profile");
        })
}


module.exports = { tutorRegister, tutorLogin, getTutor, tutorImage, editTutor}


  