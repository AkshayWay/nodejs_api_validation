module.exports.getUser = (req, res) => {
  let payload = req.body;
  console.log(payload);
  res.send("Successful get api operation");
};
module.exports.postUser = (req, res) => {
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let age = req.body.age;

  res.send("New user created");
};
module.exports.editUser = (req, res) => {
  let path = req;
  console.log("path", path);
  res.send("User data successfully edited");
};
module.exports.deleteUser = (req, res) => {
  let path = req;
  console.log("path", path);
  res.send("User data successfully deleted");
};
