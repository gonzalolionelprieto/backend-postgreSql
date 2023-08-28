import productRouter from "./productsRouter.js";
import userRouter from "./userRouter.js";
import categoriesRouter from "./categoriesRouter.js";
import express from "express";

function routerApi(app) {
  const router = express.Router();
  app.use("/api/v1/", router);
  router.use("/products", productRouter);
  router.use("/user", userRouter);
  router.use("/categories", categoriesRouter);
}

export default routerApi;
