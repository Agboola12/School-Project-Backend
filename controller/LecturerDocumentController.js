const tutorDocument = require("../model/LecturerDocumentModel");

const tutorInfo = async (req, res) => {  
    const { title, youtubeLink, pdfLink, userId } = req.body;
    const docs = (req.file.path);
    try {
        const newInfo = await tutorDocument.create({ title, youtubeLink, pdfLink, pdfFile:docs, userId });
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
    tutorDocument.deleteOne({ _id })
        .then(data => {
            res.status(200).json({
                status: true,
                message: "Success in Deleting an Document",
                data
            })
        })
        .catch(err => {
            res.status(200).json({
                status: false,
                message: "Failed in Deleting an Document",
            })
            console.log(err, "problem in deleting document");
        })
}



const EditInfo =(req,res)=>{
    const { _id } = req.params;
    const { title, youtubeLink, pdfLink } = req.body;
    
    const document = (req.file.path);
   
    tutorDocument.findByIdAndUpdate(_id,{ title, youtubeLink, pdfLink ,pdfFile:document })
        .then(data => {
            res.status(201).json({
                status: true,
                message: "Document Editing successful",
                // data
            })
        }).catch(err => {
            res.status(203).json({
                status: false,
                message: "An error in editing Document"
            })
            console.log(err, "wahala o in in Document");
        })
}

const getInfo = (req, res) => {
    const user = req.params.id;
    tutorDocument.find({ userId: user })
    .then(data => {
            res.status(201).json({
                status: true,
                message: "Success in getting an Document",
                data
            })
        })
        .catch(err => {
            res.status(203).json({
                status: false,
                message: "Failed in getting an Document",
            })
            console.log(err, "problem in getting document");
        })
}


module.exports = {tutorInfo, getDocument, delInfo, EditInfo, getInfo}