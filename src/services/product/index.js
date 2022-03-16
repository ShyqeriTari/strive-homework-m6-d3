import { Router } from "express";
import { product, review } from "../../db/models/index.js";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const data = await product.findAll({ include: review });
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const data = await product.findByPk(req.params.id, { include: review });
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const newProduct = await product.create(req.body);
    res.send(newProduct);
  } catch (error) {
    console.log(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const result = await product.update(req.body, {
      where: {
        id: req.params.id,
      },
      returning: true,
    });
    res.send(result[1][0]);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const result = await product.destroy({ where: { id: req.params.id } });
    console.log(result);
    res.send({ result });
  } catch (error) {
    console.log(error);
  }
});

export default router;