const server = require("express").Router();
const { Purchased_product } = require("../../db.js");
server.post("/add_product", (req, res, next) => {
	Purchased_product.findOrCreate({
		where: {
			purchaseId: req.body.cartId,
			productId: req.body.productId,
		},
		default: req.body,
	}).then(([purchased_product]) => {
		purchased_product.quantity += 1;
		purchased_product.save();
		res.json(purchased_product);
	});
});
// S38 : Crear Ruta para agregar Item al Carrito
// ATENCIÓN, el trello pedía POST /users/:idUser/cart
/* server.post("/", (req, res, next) => {
	Purchased_product.create(req.body)
		.then(() => res.sendStatus(200))
		.catch(err => next(err));
}); */

// S41 : Crear Ruta para editar las cantidades del carrito
// ATENCIÓN, el trello pedía PUT /users/:idUser/cart
// VER ABAJO QUE DICE POST Y DEBIERA DECIR PUT
server.put("/:id", (req, res, next) => {
	Purchased_product.update(req.body, { where: { id: parseInt(req.params.id) } })
		.then(() => res.sendStatus(200))
		.catch(err => next(err));
});
module.exports = server;
