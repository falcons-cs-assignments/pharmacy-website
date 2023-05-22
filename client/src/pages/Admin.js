import "../styles/Admin.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import { useState } from "react";

function Admin() {
	const [message, setMessage] = useState("");

	const handleSubmit = (event) => {
		event.preventDefault();
		axios
			.post("/api/products/", {
				name: event.target.name.value,
				description: event.target.description.value,
				category: event.target.category.value,
				price: event.target.price.value,
				image: event.target.image.value,
			})
			.then((res) => {
				setMessage("Added successfully");
				setTimeout(() => {
					setMessage("");
				}, 1000);
			})
			.catch((err) => {
				setMessage("error");
				setTimeout(() => {
					setMessage("");
				}, 1000);
			});
	};

	return (
		<div id='admin'>
			<Navbar />
			<main>
				<h1>Add product</h1>
				<form onSubmit={handleSubmit}>
					<label htmlFor='name'>Product name</label>
					<input type='text' name='name' id='name' placeholder='Product name' />

					<label htmlFor='description'>Product description</label>
					<input type='text' name='description' id='description' placeholder='Product description' />

					<label htmlFor='category'>Category</label>
					<input type='text' name='category' id='category' placeholder='category' />

					<label htmlFor='price'>Product price</label>
					<input type='text' name='price' id='price' placeholder='Product price' />

					<label htmlFor='image'>Product image</label>
					<input type='text' name='image' id='image' placeholder='Product image' />

					<input type='submit' value='Add product' />
				</form>
				<p className='message'>{message}</p>
			</main>
			<Footer />
		</div>
	);
}

export default Admin;
