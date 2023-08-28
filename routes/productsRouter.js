import Express from "express";
import productService from "../services/productServices.js";
import {
  getProductSchema,
  updateProductSchema,
  createProductSchema,
} from "../schemas/product.schema.js";
import { validator } from "../midlewares/validator.handler.js";

const router = Express.Router();

const service = new productService();

//retorna todos los id
router.get("/", (req, res) => {
  let limit = req.query;
  limit = limit || 10;
  const products = service.find(limit);
  res.json({ products });
});

//poner los router estaticos antes de los dinamicos
router.get("/filter", (req, res) => {});

//agregar producto
router.post(
  "/",
  validator(createProductSchema, "body"),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newProduct = await service.create(body);
      res.status(201).json({
        message: "Product created",
        data: newProduct,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/:id",
  validator(getProductSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await service.findOne(id);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
);

//editar por id
router.patch(
  "/:id",
  validator(getProductSchema, "params"),
  validator(updateProductSchema, "body"),

  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const product = await service.update(id, body);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
);

//eliminar por id
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const response = await service.delete(id);
  res.json({
    response,
  });
});

export default router;
