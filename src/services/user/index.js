import { Router } from "express";
import { user } from "../../db/models/index.js";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const data = await user.findAll();
    res.send(data);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
    try {
      const data = await user.findByPk(req.params.id);
      res.send(data);
    } catch (error) {
      console.log(error);
    }
  });

router.post("/", async (req, res, next) => {
  try {
    const newCategory = await user.create(req.body);
    res.send(newCategory);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
    try {
      const result = await user.update(req.body, {
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
      const result = await user.destroy({ where: { id: req.params.id } });
      res.send({ result });
    } catch (error) {
      console.log(error);
    }
  });


export default router;