import "../styles/Home.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loading from "../components/Loading";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
	const [categories, setCategories] = useState([]);
	const [loading, setLoading] = useState(true);
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
				setLoading(false);
			})
			.catch((err) => {
				console.log(err);
				navigate("/login-signup");
			});
	}, [navigate]);

	const handleClick = (category) => {
		navigate(`/category/${category}`);
	};

	if (loading) return <Loading />;

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
			<Footer />
		</div>
	);
}

export default Home;
