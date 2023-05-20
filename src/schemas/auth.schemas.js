import joi from "joi"

export const userSchema = joi.object ({
    name: joi.string().trim().required(),
    email: joi.string().email().required(),
    password: joi.string().trim().required(),

});