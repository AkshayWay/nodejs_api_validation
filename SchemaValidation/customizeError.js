module.exports.JoiCustomeErrors = (JoiErrorArr) => {
  let errorArray = [];
  for (let i = 0; i < JoiErrorArr.length; i++) {
    let CorresParam = JoiErrorArr[i].context.key;
    let ErrType = JoiErrorArr[i].type
      ? JoiErrorArr[i].type
          .substring(
            JoiErrorArr[i].type.indexOf(".") + 1,
            JoiErrorArr[i].type.length
          )
          .toLowerCase()
      : "";
    switch (ErrType) {
      case "required":
        errorArray.push("Error:" + "Required " + CorresParam + "\n");
        break;
      case "empty":
        errorArray.push("Error:" + "Please enter " + CorresParam + "\n");
        break;
      default:
        errorArray.push(JoiErrorArr[i].message + "\n");
        break;
    }
  }

  return errorArray;
};
