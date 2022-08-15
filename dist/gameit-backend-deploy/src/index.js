import express, { json } from "express";
import "express-async-errors";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routers/index.js";
import errorHandler from "./middlewares/errorHandlerMiddleware.js";
dotenv.config();
var app = express();
app.use(cors());
app.use(json());
app.use(router);
app.use(errorHandler);
var PORT = +process.env.PORT || 5000;
app.listen(PORT, function () {
    console.log("Server running at port ".concat(PORT));
});
