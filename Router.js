const express = require('express');
const { tutorRegister, tutorLogin, getTutor, tutorImage } = require('./controller/LecturerController');
const { verifyUser } = require('./middleware/authMiddleware');
const rout = express.Router();

rout.post("/tutorRegister", tutorRegister )
rout.post("/tutorLogin", tutorLogin )
rout.get("/getTutor", verifyUser ,getTutor )
rout.patch("/tutorImage/:_id",upload.single("userImageUrl") , tutorImage )





module.exports = {rout}
