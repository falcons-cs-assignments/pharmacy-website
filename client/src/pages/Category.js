import "../styles/Category.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loading from "../components/Loading";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function Category() {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();
	const { categoryName } = useParams();

	useEffect(() => {
		axios
			.get("/api/products")
			.then((res) => {
				const products = res.data;
				const categoryProducts = products.filter((product) => product.category === categoryName);

				setProducts(categoryProducts);
				setLoading(false);
			})
			.catch((err) => {
				console.log(err.data);
				navigate("/login-signup");
			});
	}, [navigate, categoryName]);

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
								<img src={process.env.PUBLIC_URL + "/images/panadol.png"} alt={product.name} />
								<p>{product.name}</p>
								<p>{product.price}$</p>
							</li>
						))
					)}
				</ul>
			</main>
			<Footer />
		</div>
	);
}

export default Category;
