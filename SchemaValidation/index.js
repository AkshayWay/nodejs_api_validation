const validateURL = require("./api_validation");
const customiseError = require("./customizeError");
const Joi = require("joi");

module.exports.apiValidation = async (req, res, next) => {
  const { body } = req;
  let pathParms;
  let payload = req.body;
  const url = req.originalUrl;
  switch (url) {
    case "/user":
      pathParms = validateURL.user();
      break;
    default:
      console.log("No URL Match");
  }
  let customError = {};
  customError.data = [];
  try {
    await pathParms.validateAsync(payload, { abortEarly: false });
  } catch (e) {
    let errorArray = customiseError.JoiCustomeErrors(e.details);
    customError.statusCode = 400;
    customError.data = customError.data.concat(errorArray);
  }
  if (customError.statusCode) {
    customError.data = customError.data.join(" ");
    next(res.send(customError));
  } else {
    next();
  }
};
