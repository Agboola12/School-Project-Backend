const SchoolTestimony = require("../model/TestimonyModel");


const userTestimony = async (req, res) => {  
    const { fullName, message } = req.body;
    
    try {
        const newInfo = await SchoolTestimony.create({ fullName, message });
        return res.status(201).json({
            status: true,
            message: "Testimony Submitted! This update will be shared with the Students.",
            data: newInfo,
        });
    } catch (error) {
        console.error(error);
        return res.status(203).json({
            status: false,
            message: "Oops, Testimony submission Failed.",
        });
    }
};

const getTestimony = (req, res) => {   
    SchoolTestimony.find().sort({ createdAt: -1 }).limit(3)
        .then(data => {
            res.status(200).send({
                status: true,
                message: "Successfully retrieved testimonies",
                data
            });
        }).catch(err => {
            res.status(200).send({
                status: false,
                message: "Error retrieving testimonies",
                error: err.message
            });
            console.error("Error in getting testimonies:", err);
        });
}


// const getTestimony = (req, res)=>{   
//     // SchoolTestimony.find({}, null, { limit: 3 })
//     SchoolTestimony.find().sort({ createdAt: -1 }).limit(3)
//         .then(data => {
//             if (data) {
//                 res.status(201).send({
//                     status: true,
//                     message: "Successful in getting Testimony ",
//                     data
//                 })
//             }
//         }).catch(err => {
//             res.status(203).send({
//                 status: false,
//                 message: "No Testimony Found ",
//             })
//             console.log("Error in getting Testimony:", err);
//         })
// }


module.exports ={userTestimony, getTestimony}