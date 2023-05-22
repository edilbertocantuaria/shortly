import joi from "joi"


export const registerUserSchema = joi.object({
    name: joi.string().trim().required(),
    email: joi.string().email().required(),
    password: joi.string().trim().required(),
    confirmPassword: joi.string().valid(joi.ref('password')).required().trim()
});

export const loginUserSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().trim().required(),
});