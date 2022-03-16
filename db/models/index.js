
   
import product from "./product.js";
import review from "./review.js";

review.belongsTo(product, { onDelete: "CASCADE" }); 
product.hasMany(review, { onDelete: "CASCADE" }); 

export { product, review };