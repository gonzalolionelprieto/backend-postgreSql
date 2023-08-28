import Express from "express";
import { faker } from "@faker-js/faker";

const router = Express.Router();

router.get("/", (req, res) => {
  const categories = [];
  const { size } = req.query;
  const limit = size || 20;
  for (let i = 0; i < limit; i++) {
    categories.push({
      categorie: faker.commerce.department(),
    });
  }
  res.json([categories]);
});

//poner los router estaticos antes de los dinamicos
router.get("/filter", (req, res) => {});

router.get("/:id", (req, res) => {
  const id = req.params.id;
});

export default router;
