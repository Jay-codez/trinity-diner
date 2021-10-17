const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const accountSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});


const Account = mongoose.model("Account", accountSchema);
module.exports = Account;
