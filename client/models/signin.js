const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const signinSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})


const Signin = mongoose.model("Signin", signinSchema);
module.exports = Signin;
