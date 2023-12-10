import UserModel, { validate } from '../models/userSchema.js'
import bcrypt from 'bcrypt';
import { ErrorCode, SuccessCode } from '../utils/responseHandle.js';
import Joi from 'joi';


export async function Register(req, res) {
    try {
        const { error } = validate(req.body);
        if (error) return ErrorCode(res,400, error.message)


        const user = await UserModel.findOne({ email: req.body.email })
        if (user) return ErrorCode(res,409, "User with given email already registered")

        const salt = await bcrypt.genSalt(Number(process.env.SALT))
        const hash = await bcrypt.hash(req.body.password, salt)

        await new UserModel({ ...req.body, password: hash }).save()

        return SuccessCode(res,201, "User Created Successfully")

    }
    catch (err) {
        return ErrorCode(res,500, err.message);
    }
}


const validation = (data) => {
    const Schema = Joi.object({
        email: Joi.string().email().required().label('Email'),
        password: Joi.string().required().label('Password'),
    })
    return Schema.validate(data)
}

export async function Login(req, res) {
    try {
        const { error } = validation(req.body)
        if (error) return ErrorCode(res,400, error, message)

        const user = await UserModel.findOne({ email: req.body.email })

        if (!user) return ErrorCode(res,401, "Please Register")

        const validPassword = await bcrypt.compare(req.body.password, user.password)
        if (!validPassword) return ErrorCode(res,401, "invalid password")

        const token = user.generateAuthToken();
        return SuccessCode(res,200, "Login successful", token)

    } catch (err) {
        return ErrorCode(res,500, err.message)
    }
}