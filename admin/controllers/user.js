const User = require("../models/user");
const passport = require("passport")

const createAccount = async (body) => {
  const { firstname, lastname, username, terms, password } = body;

  let user = new User({
    username: username,
    firstname: firstname,
    lastname: lastname,
    terms: terms,

  });

user.setPassword(password)
  const results = await User.register(user, password);

  let authenticate = User.authenticate();
  await authenticate(username, password);

  return results;
};

const signIn = async (body) => {
//   const { username, password } = body;
//   let authenticate = User.authenticate();

//   let results = await authenticate(username, password);
//   return results;
};

module.exports = { createAccount, signIn };
