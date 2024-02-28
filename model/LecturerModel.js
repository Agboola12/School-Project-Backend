const { genSalt, hash } = require('bcrypt');
const  mongoose  = require('mongoose');

const schoolLearningSchema = mongoose.Schema({
    fullName: String,
    email: {
        type: String,
        unique: true,
    },
    department: String,
    userImageUrl:String,
    password: {
        type: String,
        select : false
    }
}, {timestamps:true})

schoolLearningSchema.pre("save", async function (next) {
        const salt = await genSalt(10);
        console.log(this.password)
        this.password = await hash(this.password, salt)
        next();
    })

const schoolLearning = mongoose.model("schoolLearning", schoolLearningSchema);

module.exports = schoolLearning