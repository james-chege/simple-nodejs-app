import Joi from "joi";

const email = Joi.when("username", {
  is: Joi.exist(),
  then: Joi.string().email(),
  otherwise: Joi.string()
    .email()
    .required()
}).required();

export default {
  register: {
    body: {
      user: {
        email,
        username: Joi.string().required(),
        full_name: Joi.string().required()
      }
    }
  },
  update: {
    username: Joi.string(),
    full_name: Joi.string(),
    email
  }
};
