const User = require("../models/user");

const createAccount = async (body) => {
  const { firstname, lastname, username, terms, password } = body;

  let user = new User({
    username: username,
    password,
    firstname: firstname,
    lastname: lastname,
    terms: terms,

  });

  const results = await User.create(user);

  return results;
};

const signIn = async (body) => {
  const { email, password } = body;

  let results = await User.findOne({username:email})

    return results;
};

module.exports = { createAccount, signIn };
