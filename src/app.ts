import { corsOptions } from "../corsOptions";

require("dotenv").config();
import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import router from "./router/router";
import { connectToDb } from "@middleware/connecToDb";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(connectToDb);
app.use(cors(corsOptions));
app.use(router);

app.listen(process.env["PORT"], () => {
  console.log(`Server listening ${process.env["PORT"]}`);
});
