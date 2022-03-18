import express from "express";
import * as models from "./db/models/index.js";
import cors from "cors";
import { testDB, syncDB } from "./db/index.js";
import reviewRoute from "./services/review/index.js";
import productRoute from "./services/product/index.js";
import categoryRoute from "./services/category/index.js";
import userRoute from "./services/user/index.js";
import cartRoute from "./services/shoppingCart/index.js";

const server = express();

server.use(express.json());

server.use(cors());

server.use("/review", reviewRoute);
server.use("/product", productRoute);
server.use("/category", categoryRoute);
server.use("/user", userRoute);
server.use("/cart", cartRoute);

const { PORT } = process.env;

const initalize = async () => {
    try {
        server.listen(PORT, async () => {
            await testDB();
            await syncDB();

            console.log("✅ Server is listening on port " + PORT);
        });

        server.on("error", (error) => {
            console.log("❌ Server is not running due to error : " + error);
        });
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

initalize();