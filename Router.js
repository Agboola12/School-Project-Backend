const express = require('express');
const { tutorRegister, tutorLogin, getTutor, tutorImage, editTutor, getAllUser, tutorDetails, getAll, verifyToken } = require('./controller/LecturerController');
const { verifyUser } = require('./middleware/authMiddleware');
const { upload ,uploadFile} = require('./UploadImage');
const { tutorInfo, getDocument, delInfo, EditInfo, getInfo } = require('./controller/LecturerDocumentController');
const { forgottenPassword, resetPassword } = require('./controller/ForgottenPasswordController');
const rout = express.Router();

// tutor
rout.post("/tutorRegister", tutorRegister )
rout.get("/verify/:token", verifyToken )

rout.post("/tutorLogin", tutorLogin )
rout.get("/getTutor", verifyUser ,getTutor )
rout.patch("/tutorImage/:_id",upload.single("userImageUrl") , tutorImage )
rout.patch("/editTutor/:_id", editTutor )
rout.get("/getAllUser", getAllUser )
rout.get("/tutorDetails/:_id", tutorDetails )
rout.get("/getAll", getAll )


rout.post("/forgottenPassword", forgottenPassword )
rout.post("/resetPassword", resetPassword )



// document
rout.post("/tutorInfo",uploadFile.single("pdfFile") , tutorInfo )
rout.get("/getDocument", getDocument )
rout.delete("/delInfo/:_id",delInfo )
rout.patch("/EditInfo/:_id", uploadFile.single("pdfFile"), EditInfo )
rout.get("/getInfo/:id", getInfo )






module.exports = {rout}
