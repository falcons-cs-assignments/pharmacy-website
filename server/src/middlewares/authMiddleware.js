import jwt from "jsonwebtoken";
import { User } from "../models/User.js";


const createToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
		expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES,
	});
};


export const authToken = (req, res, next) => {
	const token = req.cookies.jwt;
	if (token) {
		jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decodedToken) => {
			if (err) {
				res.clearCookie("jwt");
				res.status(401).json({ status: "Authentication failed", error: err });
				return;
			} else {
				// console.log("decodedToken", decodedToken);
				try {
					const user = await User.findById(decodedToken.id);
					if (user) {
						req.user = {
							_id: user._id,
							role: user.role, // Include the role in the req.user object
						};
						const newtoken = createToken(user._id);
						res.cookie("jwt", newtoken);
						next();
					} else {
						res.status(401).send("Unauthorized");
					}
				} catch (err) {
					console.log("err", err);
					res.status(401).send("Unauthorized");
				}
			}
		});
	} else {
		console.log("Token not found!");
		res.status(401).send("You are not authenticated!");
	}
};

// Middleware to check if user is an admin
export const isAdmin = async (req, res, next) => {
	try {
		const user = await User.findById(req.user._id);
		if (user && user.role === "Admin") {
			next();
		} else {
			res.status(403).send("Forbidden");
		}
	} catch (err) {
		res.status(500).send(err);
	}
};

// Middleware to check if user is authorized
export const isAuthorized = async (req, res, next) => {
	try {
		const user = await User.findById(req.user._id);
		if (user && (user.role === "Admin" || req.params.id === user._id.toString())) {
			next();
		} else {
			res.status(403).send("Forbidden");
		}
	} catch (err) {
		res.status(500).send(err);
	}
};
