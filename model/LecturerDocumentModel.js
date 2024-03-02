const  mongoose  = require('mongoose');

const tutorDocumentSchema = mongoose.Schema({
    courseTitle: String,
    courseCode: String,
    youtubeLink: String,
    pdfLink:String,
    pdfFile:String,
    userId:String,
    
}, {timestamps:true})

const tutorDocument = mongoose.model("tutorDocument", tutorDocumentSchema);

module.exports = tutorDocument