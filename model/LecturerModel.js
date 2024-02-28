const { genSalt, hash } = require('bcrypt');
const  mongoose  = require('mongoose');

const userChurchSchema = mongoose.Schema({
    fullName: String,
    email: {
        type: String,
        unique: true,
    },
    department: String,
    password: {
        type: String,
        select : false
    }
}, {timestamps:true})

userChurchSchema.pre("save", async function (next) {
        const salt = await genSalt(10);
        console.log(this.password)
        this.password = await hash(this.password, salt)
        next();
    })

const userChurch = mongoose.model("userChurch", userChurchSchema);

module.exports = userChurch