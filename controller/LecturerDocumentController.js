const tutorDocument = require("../model/LecturerDocumentModel");

const tutorInfo = async (req, res) => {  
    const { title, youtubeLink, pdfLink } = req.body;
    const file = (req.file.path);
    try {
        const newInfo = await tutorDocument.create({ title, youtubeLink, pdfLink, pdfFile:file });
        return res.status(201).json({
            status: true,
            message: "Document Submitted! This update will be shared with the Students.",
            data: newInfo,
        });
    } catch (error) {
        console.error(error);
        return res.status(203).json({
            status: false,
            message: "Oops, Document submission Failed.",
        });
    }
};

const getDocument = (req, res)=>{   
    tutorDocument.find({ })
        .then(data => {
            if (data) {
                res.status(201).send({
                    status: true,
                    message: "successful in getting info ",
                    data
                })
            }
        }).catch(err => {
            res.status(203).send({
                status: false,
                message: "No Sermon Found ",
            })
            console.log("Error in getting info:", err);
        })
}


module.exports = {tutorInfo, getDocument}