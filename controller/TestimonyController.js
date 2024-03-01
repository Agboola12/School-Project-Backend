

const tutorInfo = async (req, res) => {  
    const { title, youtubeLink, pdfLink, userId } = req.body;
    const docs = (req.file.path);
   let result= await FirebaseImageUpload(req.file)
    try {
        const newInfo = await tutorDocument.create({ title, youtubeLink, pdfLink, pdfFile:result, userId });
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