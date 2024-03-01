const express = require('express');
const { tutorRegister, tutorLogin, getTutor, tutorImage, editTutor, getAllUser, tutorDetails, getAll, verifyToken } = require('./controller/LecturerController');
const { verifyUser } = require('./middleware/authMiddleware');
const { upload } = require('./UploadImage');
const { tutorInfo, getDocument, delInfo, EditInfo, getInfo } = require('./controller/LecturerDocumentController');
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


// document
rout.post("/tutorInfo",upload.single("pdfFile") , tutorInfo )
rout.get("/getDocument", getDocument )
rout.delete("/delInfo/:_id",delInfo )
rout.patch("/EditInfo/:_id", upload.single("pdfFile"), EditInfo )
rout.get("/getInfo/:id", getInfo )






module.exports = {rout}
