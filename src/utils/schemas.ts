import Joi, { ObjectSchema } from "joi";
import { userData } from "../services/userService.js";

export const signUpSchema: ObjectSchema<userData> = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(10).required()
})
