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
				<div className='categories-box'>
					{categories.length === 0 ? (
						<div className='no-categories'>No categories</div>
					) : (
						categories.map((category) => (
							<div className='category'>
								<span className='category-link' onClick={() => handleClick(category)} key={category}>
									<div className='category-bg'></div>

									<div className='category-name'>{category}</div>
								</span>
							</div>
						))
					)}
				</div>
			</main>
			<Footer />
		</div>
	);
}

export default Home;
