import "../styles/Category.css";
import Navbar from "../components/Navbar";
import Loading from "../components/Loading";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function Category() {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();
	const { category_name } = useParams();

	useEffect(() => {
		axios
			.get("/api/products")
			.then((res) => {
				const products = res.data;
				const categoryProducts = products.filter((product) => product.category === category_name);

				setProducts(categoryProducts);
				setLoading(false);
			})
			.catch((err) => {
				console.log(err);
				navigate("/login-signup");
			});
	}, [navigate, category_name]);

	const handleClick = (productId) => {
		navigate(`/product/${productId}`);
	};

	if (loading) return <Loading />;

	return (
		<div id='category'>
			<Navbar />
			<main>
				<ul className='products-list'>
					{products.length === 0 ? (
						<li className='no-products'>No products</li>
					) : (
						products.map((product) => (
							<li className='product' onClick={() => handleClick(product._id)} key={product._id}>
								<img src={product.image} alt={product.name} />
								<p>{product.name}</p>
								<p>{product.price}$</p>
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

export default Category;
