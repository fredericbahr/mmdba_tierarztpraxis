import "dotenv/config";
import express from "express";
import { appendFile } from "fs";
import router from "./src/routes/route";

const port = process.env.PORT || 8080;

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: false }));

server.use("/", router);

server.listen(port, () => {
  console.log(`Server started on port ${port}:`);
  console.log(`http://localhost:${port}`);
});
