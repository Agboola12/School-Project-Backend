const express = require('express');
const { tutorRegister, tutorLogin, getTutor, tutorImage, editTutor } = require('./controller/LecturerController');
const { verifyUser } = require('./middleware/authMiddleware');
const { upload } = require('./UploadImage');
const rout = express.Router();

rout.post("/tutorRegister", tutorRegister )
rout.post("/tutorLogin", tutorLogin )
rout.get("/getTutor", verifyUser ,getTutor )
rout.patch("/tutorImage/:_id",upload.single("userImageUrl") , tutorImage )
rout.patch("/editTutor/:_id", editTutor )





module.exports = {rout}
