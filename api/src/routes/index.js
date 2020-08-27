const { Router } = require("express");
// import all routers;
const productRouter = require("./product.js");
const categoryRouter = require("./category.js");
const strainRouter = require("./strain.js");
const cellarRouter = require("./cellar.js");
const userRouter = require("./user.js");
const purchaseRouter = require("./purchase.js");
const purchProdRouter = require("./purchProd.js");
const statusRouter = require("./status.js");
const reviewRouter = require("./review.js");
const router = Router();

module.exports = router;

router.use("/product", productRouter);
router.use("/category", categoryRouter);
router.use("/strain", strainRouter);
router.use("/cellar", cellarRouter);
router.use("/user", userRouter);
router.use("/purchase", purchaseRouter);
router.use("/purchase/purchProd", purchProdRouter); // ¿¿Se puede esto??
router.use("/status", statusRouter);
router.use("/review", reviewRouter);
