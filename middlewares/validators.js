const Joi = require("joi");
const { errorMsg, successMsg } = require("../utils/response");

const validator = (req, res, next, schema) => {
  const validated = schema.validate(req.body);
  if (validated.error) {
    const message = validated.error.details[0].message.replace(
      /[;\\\\/:*?\"<>|&]/g,
      "'"
    );
    return errorMsg(res, "PAYLOAD ERROR", 400, message);
  }
  next();
};

const CustomerSignupValidation = (req, res, next) => {
  const schema = Joi.object({
    first_name: Joi.string().min(3).required(),
    last_name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    password: Joi.string().min(6).required(),
  });
  validator(req, res, next, schema);
};

const SigninValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  validator(req, res, next, schema);
};

const BranchSignupValidation = (req, res, next) => {
  const schema = Joi.object({
    branchName: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    state: Joi.string().required(),
    city: Joi.string().required(),
    password: Joi.string().min(6).required(),
  });
  validator(req, res, next, schema);
};

const BranchSigninValidation = (req, res, next) => {
  const schema = Joi.object({
    branchName: Joi.string().required(),
    password: Joi.string().required(),
  });
  validator(req, res, next, schema);
};

const VendorSignupValidation = (req, res, next) => {
  const schema = Joi.object({
    brandName: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    password: Joi.string().min(6).required(),
  });
  validator(req, res, next, schema);
};

module.exports = {
  CustomerSignupValidation,
  SigninValidation,
  BranchSigninValidation,
  BranchSignupValidation,
  VendorSignupValidation,
};
