// const mongoose = require("mongoose");

// Validation checking function


//it checks whether the value is null or undefined.
const isValid = (value) => {
  if (typeof value === "undefined" || value === null) return false; 
  return true;
};


// it checks, is there any key is available or not in request body
const isValidRequestBody = (requestBody) => {
  return Object.keys(requestBody).length > 0; 
};

// it checks, is there any key is available or not in request body
const isValidString = (value) => {
  if (typeof value === "string" && value.trim().length === 0) return false; 
  return true;
};

const isValidPlanId =  (status) => {
  return ["FREE", "TRIAL", "LITE_1M", "PRO_1M", "LITE_6M", "PRO_6M"].indexOf(status) !== -1;
};

module.exports = {
  isValid,
  isValidRequestBody,
  isValidString,
  isValidPlanId,
};
  