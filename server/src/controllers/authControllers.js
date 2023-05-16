import { User } from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const createToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
		expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES,
	});
};

const signup_user = async (req, res) => {
	const user = {
		name: req.body.name,
		email: req.body.email,
		password: req.body.password,
		role: "User",
	};
	try {
		if (req.body.role && req.body.role !== "User") {
			res.status(405).send("You can only signup for an account with role 'User'");
			return;
		}
		const userData = await User.create(user);
		res.status(201).json({
			success: true,
			data: userData,
			role: user.role,
		});
	} catch (err) {
		res.status(500).json({
			success: false,
			error: err.message,
		});
	}
};

const login_user = async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await User.findOne({ email });
		if (user) {
			const auth = await bcrypt.compare(password, user.password);
			if (auth) {
				const token = createToken(user._id);
				res.cookie("jwt", token);
				res.status(200).json({
					success: true,
					token: token,
					expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES,
				});
			} else {
				res.status(401).json({
					success: false,
					error: "Password is incorrect",
				});
			}
		} else {
			res.status(404).json({
				success: false,
				error: "User not found",
			});
		}
	} catch (err) {
		res.status(500).json({
			success: false,
			error: "Login failed",
		});
	}
};

const logout_user = (req, res) => {
	res.clearCookie("jwt");
	res.status(200).json({
		success: true,
		message: "User logged out successfully",
	});
};

export { signup_user, login_user, logout_user };
