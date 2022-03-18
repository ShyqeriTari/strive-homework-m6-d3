import { Router } from "express";
import { product, review, category, productCategory, user } from "../../db/models/index.js";
import { Op } from "sequelize";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const data = await product.findAll({ 
      limit: [2],
      offset:[2],
      include: [
      { model: category },
      { model: review, include: user },
    ], });
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});

router.get("/search", async (req, res, next) => {
  try {
    const data = await product.findAll({
      include: review,
      where: {
        [Op.or]: [
          req.query.name && {
            name: {
              [Op.iLike]: `%${req.query.name}%`,
            },
          },
          req.query.description && {
            description: {
              [Op.iLike]: `%${req.query.description}%`,
            },
          },
          req.query.category && {
            category: {
              [Op.iLike]: `%${req.query.category}%`,
            },
          },
          req.query.range && {
            price: {
              [Op.between]: [parseInt(req.query.range.split("-")), parseInt(req.query.range.split("-")[1])],
            },
          },
        ],
      },
    order: [   req.query.order && 
        [req.query.order.split(",")[0], req.query.order.split(",")[1]]
      ],
    });
    res.send(data);
  } catch (error) {
    console.log(error);
    next(error)
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
    const { categoryId, ...rest } = req.body;

    const newProduct = await product.create(rest);
    const catArr = []
    for(let i=0; i< categoryId.length; i++){

    const productsCategory = {
      productId: newProduct.id,
      categoryId: categoryId[i],
    };
    catArr.push(productsCategory)
   
  }
  const prodCat = await productCategory.bulkCreate(catArr)
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