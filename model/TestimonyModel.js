const  mongoose  = require('mongoose');

const SchoolTestimonySchema = mongoose.Schema({
    fullName: String,
    message: String,
    
}, {timestamps:true})

const SchoolTestimony = mongoose.model("SchoolTestimony", SchoolTestimonySchema);

module.exports = SchoolTestimony