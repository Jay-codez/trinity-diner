const Contact = require("../models/Contact")

const saveContact = async (body) =>{
    const results = await Contact.create(body)

    return results;
}



module.exports = {saveContact}