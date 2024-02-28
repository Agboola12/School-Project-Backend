const express = require('express');
const { tutorRegister, tutorLogin, getTutor } = require('./controller/LecturerController');
const { verifyUser } = require('./middleware/authMiddleware');
const rout = express.Router();

rout.post("/tutorRegister", tutorRegister )
rout.post("/tutorLogin", tutorLogin )
rout.get("/getTutor",verifyUser ,getTutor )





module.exports = {rout}
