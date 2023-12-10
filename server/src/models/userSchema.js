import { Schema, model } from "mongoose";
import jwt from 'jsonwebtoken';
import joi from 'joi';
import passwordComplexity from 'joi-password-complexity'

const UserShema = new Schema({

    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
}, { timestamps: true })

UserShema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY, { expiresIn: "7d" })
    return token;
}

export default model('user', UserShema);


export const validate = (data) => {
    const UserSchema = joi.object({
        firstName: joi.string().required().label('First Name'),
        lastName: joi.string().required().label('Last Name'),
        email: joi.string().email().required().label('Email'),
        password: passwordComplexity().required().label('Password'),
    })

    return UserSchema.validate(data)

}
