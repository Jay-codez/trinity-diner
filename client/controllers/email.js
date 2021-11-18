const nodemailer = require("nodemailer");

async function main(receiver, subject, message) {
  
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "capstonetest771@gmail.com", // generated ethereal user
        pass: "!!capstone2021", // generated ethereal password
      },
    });
  
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: "capstonetest771@gmail.com", // sender address
      to: receiver, // list of receivers
      subject, // Subject line
      text: message, // plain text body
      //html: "<b>Hello world?</b>", // html body
    });
  
    console.log("Message sent: %s", info.messageId);

  }


module.exports = {main}