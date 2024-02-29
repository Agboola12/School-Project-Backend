const express = require('express');
const { tutorRegister, tutorLogin, getTutor, tutorImage, editTutor } = require('./controller/LecturerController');
const { verifyUser } = require('./middleware/authMiddleware');
const { upload } = require('./UploadImage');
const { tutorInfo, getDocument, delInfo, EditInfo } = require('./controller/LecturerDocumentController');
const rout = express.Router();

rout.post("/tutorRegister", tutorRegister )
rout.post("/tutorLogin", tutorLogin )
rout.get("/getTutor", verifyUser ,getTutor )
rout.patch("/tutorImage/:_id",upload.single("userImageUrl") , tutorImage )
rout.patch("/editTutor/:_id", editTutor )

// document
rout.post("/tutorInfo",upload.single("pdfFile") , tutorInfo )
rout.get("/getDocument", getDocument )
rout.delete("/delInfo/:_id",delInfo )
rout.patch("/EditInfo/:_id", upload.single("pdfFile"), EditInfo )





module.exports = {rout}
