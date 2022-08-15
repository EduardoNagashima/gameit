import Joi from "joi";
export var signUpSchema = Joi.object({
    email: Joi.string().email().required(),
    username: Joi.string().required(),
    password: Joi.string().required(),
    confirmPassword: Joi.string().required().valid(Joi.ref('password')),
    image: Joi.string().regex(/(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|gif|png|svg))/)
});
export var signInSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});
export var postSchema = Joi.object({
    tittle: Joi.string().required(),
    content: Joi.string().required(),
    categoryId: Joi.number().integer().required(),
    coverImg: Joi.string().regex(/(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|gif|png|svg))/).required()
});
