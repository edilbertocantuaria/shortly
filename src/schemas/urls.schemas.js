import joi from "joi"


export const validateUrlSchema = joi.object({
 url: joi.string().trim().uri().required(),
});

