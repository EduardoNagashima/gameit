import express, { json } from "express";
import "express-async-errors";
import dotenv from "dotenv";
import router from "./routers/index.js";
import errorHandler from "./middlewares/errorHandlerMiddleware.js";
dotenv.config();

const app = express();
app.use(json());
app.use(router);
app.use(errorHandler);

const PORT = +process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
})