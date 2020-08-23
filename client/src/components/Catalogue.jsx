import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { connect, useDispatch } from "react-redux";
import { getCategories, getCatalogue, getProducts, cleanCatalogue, searchProduct } from "../store/actions/index";
import { Nav, Spinner, Pagination, Container, Row, Col } from "react-bootstrap";
import { NavLink, useLocation } from "react-router-dom";
import "../styles/Catalogue.css";
function Catalogue({
	category,
	products,
	categories,
	getCatalogue,
	cleanCatalogue,
	getCategories,
	getProducts,
	searchProduct,
	pag,
	pags,
}) {
	const location = useLocation();
	useEffect(() => {
		if (!pag) return;
		getCatalogue(pag);
		return () => {
			cleanCatalogue();
		};
	}, [pag]);
	useEffect(() => {
		if (!category) return;
		getProducts(category);
	}, [category]);
	useEffect(() => {
		getCategories();
	}, []);
	useEffect(() => {
		if (!location.search) return;
		const searchParams = new URLSearchParams(location.search);
		searchProduct(searchParams.get("search"));
	}, [location]);
	return (
		<div>
			<Nav id="navegacion" activeKey="/catalogue/category/1">
				<Nav.Item>
					<Nav.Link>
						<NavLink to="/catalogue/0">Todos</NavLink>
					</Nav.Link>
				</Nav.Item>
				{categories.map(category => (
					<Nav.Item>
						<Nav.Link>
							<NavLink to={`/catalogue/category/${category.id}`}>{category.name}</NavLink>
						</Nav.Link>
					</Nav.Item>
				))}
			</Nav>
			<Container>
				<Col>
					{/* Acá va a selececcionar las cepas
					<Form>
						{["checkbox"].map(type => (
							<div key={`default-${type}`} className="mb-3">
								<Form.Check type={type} id={`default-${type}`} label={`default ${type}`} />
							</div>
						))}
					</Form> */}
				</Col>
				<Col>
					<Row>
						{(() => {
							if (!products) return;
							let active = pag;
							let buttons = [];
							for (let i = 0; i <= Math.floor(pags / 10); i++) {
								buttons.push(
									<Pagination.Item key={i + 1} active={i === parseInt(active)}>
										<NavLink to={"/catalogue/" + i}>{i + 1}</NavLink>
									</Pagination.Item>
								);
							}
							return buttons.map(button => button);
						})()}
					</Row>
					<Row>
						<div className="catalogue">
							{!!products
								? products.map(product => (
										<ProductCard
											id={product.id}
											name={product.name}
											price={product.price}
											cellar={product.cellar}
											img={product.img}
										/>
								  ))
								: (() => {
										setInterval(() => {
											return "Catálogo vacío";
										}, 1000);
										return <Spinner animation="border" />;
								  })()}
						</div>
					</Row>
				</Col>
			</Container>
		</div>
	);
}
export default connect(
	({ catalogue, products, categories }) => {
		return {
			pags: catalogue.count,
			products: !Object.values(catalogue).length ? products : catalogue.rows,
			categories: categories,
		};
	},
	{
		getCategories,
		getCatalogue,
		cleanCatalogue,
		getProducts,
		searchProduct,
	}
)(Catalogue);
