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

const getTestimony = (req, res)=>{   
    SchoolTestimony.find( { limit: 3 })
        .then(data => {
            if (data) {
                res.status(201).send({
                    status: true,
                    message: "Successful in getting Testimony ",
                    data
                })
            }
        }).catch(err => {
            res.status(203).send({
                status: false,
                message: "No Testimony Found ",
            })
            console.log("Error in getting Testimony:", err);
        })
}


module.exports ={userTestimony}