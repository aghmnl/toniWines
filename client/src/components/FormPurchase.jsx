import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getPurchases, getStatuses } from "../store/actions/index";
import { Card, Container, Row, Col, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "../styles/FormPurchase.css";

// S43 : Crear Componente Tabla de Ordenes
// Tabla que muestra una lista de ordenes.
// Esta tabla es para el admin.
// Tiene que mostrar todas las ordenes de todos los usuarios.

function Purchases({ purchases, statuses, statusId, getStatuses, getPurchases }) {
	useEffect(() => {
		if (!statusId) {
			return;
		}

		getPurchases(statusId);
	}, [statusId]);
	useEffect(() => {
		getStatuses();
		if (!statusId) getPurchases();
	}, []);
	return (
		<div>
			<Nav id="navegacion2">
				<Nav.Item>
					<Nav.Link>
						<NavLink className="btn btn-light" to="/admin/purchases">
							Todas
						</NavLink>
					</Nav.Link>
				</Nav.Item>

				{statuses.map(status => (
					<Nav.Item>
						<Nav.Link>
							<NavLink className="btn btn-light" to={`/admin/purchases/status/${status.id}`}>
								{status.name}
							</NavLink>
						</Nav.Link>
					</Nav.Item>
				))}
			</Nav>
			<div className="col-10 purchases" style={{ marginTop: "10rem", textAlign: "left" }}>
				{purchases.map(purchase => (
					<Card id="card" style={{ width: "40rem", marginTop: "1rem" }}>
						<Container>
							<Row>
								<Col sm="6" style={{ alignSelf: "center" }}>
									<Card.Title>Compra: {purchase.id}</Card.Title>
								</Col>
								<Col sm="6" style={{ alignSelf: "center" }}>
									<Card.Subtitle className="mb-2 text-muted">Fecha compra: {purchase.date}</Card.Subtitle>
								</Col>
							</Row>
							<Row>
								<Col sm="4" style={{ alignSelf: "center" }}>
									<Card.Text>
										Usuario: {purchase.user.name} {purchase.user.last_name}
									</Card.Text>
								</Col>
								<Col sm="4" style={{ alignSelf: "center" }}>
									<Card.Text>Estado: {purchase.status.name}</Card.Text>
								</Col>
								<Col sm="4" style={{ alignSelf: "center" }}>
									<Card.Text>Método de pago: {purchase.pay_method.name}</Card.Text>
								</Col>
							</Row>
						</Container>
					</Card>
				))}
			</div>
		</div>
	);
}

export default connect(
	state => ({
		purchases: state.purchases,
		statuses: state.statuses,
	}),
	{ getPurchases, getStatuses }
)(Purchases);