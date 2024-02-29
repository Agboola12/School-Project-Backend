const tutorDocument = require("../model/LecturerDocumentModel");

const tutorInfo = async (req, res) => {  
    const { title, youtubeLink, pdfLink } = req.body;
    const docs = (req.file.path);
    try {
        const newInfo = await tutorDocument.create({ title, youtubeLink, pdfLink, pdfFile:docs });
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

const delInfo = (req, res) => {
    const { _id } = req.params;

    adminNews.deleteOne({ _id })
        .then(data => {
            res.status(200).json({
                status: true,
                message: "Success in Deleting an News and Event",
                data
            })
        })
        .catch(err => {
            res.status(200).json({
                status: false,
                message: "Failed in Deleting an News and Event",
            })
            console.log(err, "problem in deleting users");
        })
}


module.exports = {tutorInfo, getDocument, delInfo}