import product from "./product.js";
import review from "./review.js";
import category from "./category.js"
import productCategory from "./productCategory.js";
import user from "./user.js"
import shoppingCart from "./shoppingCart.js"

review.belongsTo(product, { onDelete: "CASCADE" }); 
product.hasMany(review, { onDelete: "CASCADE" }); 

review.belongsTo(user, { onDelete: "CASCADE" }); 
user.hasMany(review, { onDelete: "CASCADE" });

shoppingCart.belongsTo(product)
product.hasOne(shoppingCart)

product.belongsToMany(category, { through: productCategory });
category.belongsToMany(product, { through: productCategory });

export { product, review, category, user, productCategory, shoppingCart };
