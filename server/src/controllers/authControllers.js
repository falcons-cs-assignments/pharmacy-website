import { User } from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET_KEY, {
        expiresIn: 30*60, // expires in 30 mins
    });
}

const signup_user = async (req, res) => {
    const user = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role
    };
    try {
        const userData = await User.create(user);
        res.status(201).send(userData);
    }
    catch (err) {
        res.send(err)
    }
}

const login_user = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({ email });
        if (user) {
            const auth = bcrypt.compare(password, user.password);
            if (auth) {
                // const token = createToken(user._id);
                // console.log('token', token);
                // res.cookie("jwt", token);
                res.send(user);
            }
            else {
                res.send('Password is incorrect!');
            }
        }
    }
    catch (err) {
        res.send(err);
    }
}

export { signup_user, login_user };
