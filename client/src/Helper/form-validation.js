import * as yup from "yup";

export const registerSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(4).max(15).required(),

});

export const userSchema = yup.object().shape({
    email: yup.string().email(),
    bio: yup.string().min(6).max(60),
    phonenumber: yup.string().matches(/^[0-9]+$/, "it must be an 11digit number").min(11).max(11),
    password: yup.string().max(15).min(4),
    name: yup.string().required()

})