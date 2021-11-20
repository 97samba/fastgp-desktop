const moment = require("moment");
export const ValidatePassword = (password1, password2) => {
  if (password1 === "" && password2 === "") {
    return "Erreur mot de passe";
  }
  if (password1 !== password2) {
    return "Mot passe different";
  }
  if (password1.length < 8) {
    return "Minimum 8 caractéres";
  }
  return "";
};

export const ValidateBirthday = (birthday) => {
  if (moment().subtract(12, "years").isSameOrAfter(birthday)) {
    return "";
  }
  return "13 ans minimum";
};
