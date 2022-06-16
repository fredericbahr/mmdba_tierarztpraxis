import "dotenv/config";
import express from "express";
import animalRouter from "./src/routes/animalRoutes";
import customerRouter from "./src/routes/customerRoutes";
import raceRouter from "./src/routes/raceRoutes";
import router from "./src/routes/route";
import speciesRouter from "./src/routes/speciesRoutes";

const port = process.env.PORT || 8080;

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: false }));

server.use("/", router);
server.use("/api", customerRouter);
server.use("/api", raceRouter);
server.use("/api", speciesRouter);
server.use("/api", animalRouter);

server.listen(port, () => {
  console.log(`Server started on port ${port}:`);
  console.log(`http://localhost:${port}`);
});
