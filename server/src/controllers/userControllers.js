import { User } from "../models/User.js";
import bcrypt from "bcrypt";
import { ObjectId } from "mongodb";

const get_all_users = async (req, res) => {
	const users = await User.find();
	res.send(users);
};

const get_one_user = async (req, res) => {
	if (!ObjectId.isValid(req.params.id)) {
		res.status(404).send("Invalid ObjectID!");
		return;
	}
	const user = await User.findById(req.params.id);
	if (!user) {
		res.status(404).send("user with given ID is not found!");
	} else {
		res.send(user);
	}
};

const update_one_user = async (req, res) => {
	if (!ObjectId.isValid(req.params.id)) {
		res.status(404).send("Invalid ObjectID!");
		return;
	}
	const user = await User.findById(req.params.id);
	if (!user) {
		res.status(404).send("user with given ID is not found!");
	} else {
		if (req.body.newPassword) {
			const auth = await bcrypt.compare(req.body.oldPassword, user.password);
			if (!auth) {
				res.status(401).json({
					success: false,
					error: "Password is incorrect",
				});
				return;
			} else {
				if (req.body.newPassword.length < 8) {
					res.status(405).send("Password must be at least 8 characters long");
					return;
				}
				const salt = await bcrypt.genSalt();
				req.body.newPassword = await bcrypt.hash(req.body.newPassword, salt);
			}
		} else {
			req.body.newPassword = undefined;
		}
		const newUser = {
			name: req.body.name,
			email: req.body.email,
			password: req.body.newPassword,
			role: req.body.role,
		};
		if (req.body.favOperation === "add") {
			if (!user.favorites.some((product) => product._id === req.body.favProduct._id)) {
				newUser.favorites = [...user.favorites, req.body.favProduct];
			}
		} else if (req.body.favOperation === "remove") {
			newUser.favorites = user.favorites.filter((product) => product._id !== req.body.favProduct);
		}
		try {
			// check if user being updated is the last admin and if, don't allow changing own role
			if (user.role === "Admin") {
				const admins = await User.find({ role: "Admin" });
				if (admins.length < 2 && req.body.role && req.body.role !== "Admin") {
					res.status(405).send("this is the last admin account and can't change its own role");
					return;
				}
			}
			const updateUser = await User.findByIdAndUpdate(req.params.id, newUser);
			res.status(200).send("updated successfully");
		} catch (err) {
			res.status(500).send(err);
		}
	}
};

const delete_one_user = async (req, res) => {
	if (!ObjectId.isValid(req.params.id)) {
		res.status(404).send("Invalid ObjectID!");
		return;
	}
	try {
		const userToDelete = await User.findById(req.params.id);
		if (!userToDelete) {
			res.status(404).send("User with the given ID is not found!");
			return;
		} else {
			// check if the userToDelete is the last admin user and if, reject
			if (userToDelete.role === "Admin") {
				const admins = await User.find({ role: "Admin" });
				if (admins.length < 2) {
					res.status(405).send("this is the last admin account and can't be deleted!");
					return;
				}
			}
			await User.findByIdAndDelete(req.params.id);
			res.status(200).send("Deleted successfully");
		}
	} catch (err) {
		res.status(500).send(err);
	}
};

export { get_all_users, get_one_user, update_one_user, delete_one_user };
