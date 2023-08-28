import Express from "express";
import { faker } from "@faker-js/faker";

const router = Express.Router();

router.get("/", (req, res) => {
  const users = [];
  const { size } = req.query;
  const limit = size || 20;
  for (let i = 0; i < limit; i++) {
    users.push({
      username: faker.internet.userName(),
      gender: faker.person.gender(),
      job: faker.person.jobTitle(),
      email: faker.internet.email(),
    });
  }
  res.json([users]);
});

//poner los router estaticos antes de los dinamicos
router.get("/filter", (req, res) => {});

router.get("/:id", (req, res) => {
  const id = req.params.id;
});

export default router;
