import { Router } from "express";
import { product, shoppingCart } from "../../db/models/index.js";


const router = Router();

router.get("/", async (req, res, next) => {
    try {
        const data = await shoppingCart.findAll({ include:  product  });
        res.send(data);
    } catch (error) {
        console.log(error);
    }
});

router.get("/:id", async (req, res, next) => {
  try {
    const data = await shoppingCart.findByPk(req.params.id,  { include: product});
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const newShop = await shoppingCart.create(req.body);
    res.send(newShop);
  } catch (error) {
    console.log(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const result = await shoppingCart.update(req.body, {
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
    const rows = await shoppingCart.destroy({ where: { id: req.params.id } });
    res.send({ rows });
  } catch (error) {
    console.log(error);
  }
});

export default router;