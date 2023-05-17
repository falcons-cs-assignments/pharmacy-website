import { Product } from "../models/Product.js";
import { ObjectId } from "mongodb";

// Create a new product
const create_product = async (req, res) => {
	const { name, description, category, price, image } = req.body;
	try {
		const product = await Product.create({
			name,
			description,
			category,
			price,
			image,
		});
		res.status(201).send(product);
	} catch (err) {
		res.status(500).send(err);
	}
};

// Get all products
const get_all_products = async (req, res) => {
	try {
		const products = await Product.find();
		res.send(products);
	} catch (err) {
		res.status(500).send(err);
	}
};

// Get a single product by ID
const get_product_by_id = async (req, res) => {
	if (!ObjectId.isValid(req.params.id)) {
		res.status(404).send("Invalid ObjectID!");
		return;
	}
	try {
		const product = await Product.findById(req.params.id);
		if (!product) {
			res.status(404).send("Product with given ID is not found!");
		} else {
			res.send(product);
		}
	} catch (err) {
		res.status(500).send(err);
	}
};

// Update a product
const update_product = async (req, res) => {
	if (!ObjectId.isValid(req.params.id)) {
		res.status(404).send("Invalid ObjectID!");
		return;
	}
	try {
		const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
		if (!product) {
			res.status(404).send("Product with given ID is not found!");
		} else {
			res.send(product);
		}
	} catch (err) {
		res.status(500).send(err);
	}
};

// Delete a product
const delete_product = async (req, res) => {
	if (!ObjectId.isValid(req.params.id)) {
		res.status(404).send("Invalid ObjectID!");
		return;
	}
	try {
		const product = await Product.findByIdAndDelete(req.params.id);
		if (!product) {
			res.status(404).send("Product with given ID is not found!");
		} else {
			res.send(product);
		}
	} catch (err) {
		res.status(500).send(err);
	}
};

export { create_product, get_all_products, get_product_by_id, update_product, delete_product };
