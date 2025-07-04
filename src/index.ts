import express, { Request, Response } from "express";
import { PORT } from "./config/env";
import cors from "cors";
import connect from "./config/database";
import bodyParser from "body-parser";
import router from "./routes/api";

const app = express();

connect();

app.use(cors());
app.use(express.static("files"));
app.use(bodyParser.json());
app.use("/api", router);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
