import Joi, { ObjectSchema } from "joi";
import { userData } from "../services/userService.js";

export const signUpSchema: ObjectSchema<userData> = Joi.object({
    email: Joi.string().email().required(),
    username: Joi.string().required(),
    password: Joi.string().min(10).required(),
    confirmPassword: Joi.string().required().valid(Joi.ref('password')),
    image: Joi.string().regex(/(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|gif|png|svg))/)
})

export const signInSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

export const postSchema = Joi.object({
    tittle: Joi.string().required(),
    content: Joi.string().required(),
    categoryId: Joi.number().integer().required(),
    coverImg: Joi.string().regex(/(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|gif|png|svg))/)
});