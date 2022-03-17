import { Router } from "express";
import { category } from "../../db/models/index.js";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const data = await category.findAll();
    res.send(data);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
    try {
      const data = await category.findByPk(req.params.id);
      res.send(data);
    } catch (error) {
      console.log(error);
    }
  });

router.post("/", async (req, res, next) => {
  try {
    const newCategory = await category.create(req.body);
    res.send(newCategory);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
    try {
      const result = await category.update(req.body, {
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
      const result = await category.destroy({ where: { id: req.params.id } });
      res.send({ result });
    } catch (error) {
      console.log(error);
    }
  });


export default router;