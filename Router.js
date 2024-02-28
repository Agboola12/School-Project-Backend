const express = require('express');
const { tutorRegister } = require('./controller/LecturerController');
const rout = express.Router();

rout.post("/tutorRegister", tutorRegister )




module.exports = {rout}
