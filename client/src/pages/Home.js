import "../styles/Home.css";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
	const [categories, setCategories] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		axios
			.get("/api/products")
			.then((res) => {
				const products = res.data;
				const uniqueCategories = new Set();

				// Iterate over products and add category to set
				products.forEach((product) => {
					uniqueCategories.add(product.category);
				});

				// Convert set to an array
				setCategories(Array.from(uniqueCategories));
			})
			.catch((err) => {
				console.log(err);
				navigate("/login");
			});
	}, [navigate]);

	const handleClick = (category) => {
		navigate(`/category/${category}`);
	};

	return (
		<div id='home'>
			<Navbar />
			<main>
				<ul className='categories-list'>
					{categories.length === 0 ? (
						<li className='no-categories'>No categories</li>
					) : (
						categories.map((category) => (
							<li className='category' onClick={() => handleClick(category)} key={category}>
								<span>{category}</span>
							</li>
						))
					)}
				</ul>
			</main>
			<footer>
				<div className='container'>
					<div className='left'>
						<p>&copy; 2023 copy right reserved</p>
					</div>
					<div className='right'>
						<a href='/'>
							<i className='fab fa-facebook'></i>
						</a>
						<a href='/'>
							<i className='fab fa-twitter'></i>
						</a>
						<a href='https://github.com/falcons-cs-assignments/pharmacy-website' rel='noreferrer' target='_blank'>
							<i className='fab fa-github'></i>
						</a>
					</div>
				</div>
			</footer>
		</div>
	);
}

export default Home;
