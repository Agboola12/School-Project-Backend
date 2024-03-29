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
        console.log(alreadyExists)

        if (alreadyExists) {
            return res.status(200).json({
                status: false,
                message: "Email already exists",
            });
        }

        const verificationToken = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '12h' });
        
        const newUser = await schoolLearning.create({ fullName, email, department, password  });

        const verificationLink = `${process.env.FrontendUrl}verify?token=${verificationToken}`;


        
        await transporter.sendMail({
            from: process.env.APP_MAIL,
            // to: process.env.APP_MAIL,
            to: req.body.email,
            subject: 'Successful',
            html:
                `<div>
                    <h1 class="text-center">Learning Site</h1><br/>
                    <p>Welcome to our Student Learning Site. Enjoy your stays with us</p>
                    <h3>${req.body.fullName}</h3>
                    <h3>${req.body.email}</h3>
                    <h3>${req.body.department}</h3>
                    <p>Please click the following link to verify your account:</p>
                    <a href="${verificationLink}">${verificationLink}</a>
                </div>`
        })
            // console.log(newUser);
        return res.status(201).json({
            status: true,
            message: "Account Created! Excited to journey together! Please check your email for verification.",
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

const verifyToken =async (req, res)=>{
    const { token } = req.params;
    console.log(token)
    try {
      // Verify the token

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Update user's verification status in the database
      const user = await schoolLearning.findOneAndUpdate(
          { email: decoded.email },
          { $set: { isVerified: true }, $unset: { verificationToken: '' } }
          );
        //   console.log(user)
  
      if (!user) return res.status(404).send('Invalid verification token.');
       return res.status(201).json({
        status: true,
        message:"success"
    });
      
      // Redirect to success page after verification
    } catch (error) {
      console.error(error);
      res.status(500).send('Error verifying email.');
    }
};

const tutorLogin = async (req, res) => {
    const { email, password } = req.body;

    schoolLearning.findOne({ email, isVerified:true }).select("+password").exec()
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

const getAllUser = (req, res)=>{   
    schoolLearning.find({ isVerified: true})
        .then(data => {
            if (data) {
                res.status(201).send({
                    status: true,
                    message: "Successful in getting All Tutor ",
                    data
                })
            }
        }).catch(err => {
            res.status(203).send({
                status: false,
                message: "No Tutor Found ",
            })
            console.log("Error in getting Tutor:", err);
        })
}

const tutorDetails = (req, res)=>{
    const _id = req.params   
    schoolLearning.findOne({_id })
        .then(data => {
            if (data) {
                res.status(200).send({
                    status: true,
                    message: "Successful in getting Tutor Details ",
                    data
                })
            }
        }).catch(err => {
            res.status(200).send({
                status: false,
                message: "Failed in gettings Tutor Details",
            })
            console.log("Error in getting  Tutor Details:", err);
        })
}

const getAll = (req, res)=>{   
    schoolLearning.find({ isVerified: true }, null, { limit: 3 })
        .then(data => {
            if (data) {
                res.status(201).send({
                    status: true,
                    message: "Successful in getting All Tutor ",
                    data
                })
            }
        }).catch(err => {
            res.status(203).send({
                status: false,
                message: "No Tutor Found ",
            })
            console.log("Error in getting Tutor:", err);
        })
}


module.exports = { tutorRegister, tutorLogin, getTutor, tutorImage, editTutor, getAllUser, tutorDetails, getAll, verifyToken }


  