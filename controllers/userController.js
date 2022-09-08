// module.exports = {
//   getUser: (req, res) => {
//     res.send("Inside user controller!!");
//   },
//   postUser: (req, res) => {
//     let firstName = req.body.firstName;
//     let lastName = req.body.lastName;

//     res.send(`${firstName} " A. " ${lastName}`);
//   },
// };
module.exports.getUser = (req, res) => {
  res.send("Inside user controller!!");
};
module.exports.postUser = (req, res) => {
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let age = req.body.age;

  res.send(`${firstName} A. ${lastName} ${age}`);
};
