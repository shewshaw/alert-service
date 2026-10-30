import express from "express";
import {AlertRepository} from "../src/repository/alertRepository";
import {AlertService} from "../src/services/alertService"; 

import { createDemoRoutes } from "./routes/demo";
import { createAlertRoutes } from "./routes/alert";

const app = express();

app.use(express.json());

const alertRepository = new AlertRepository();
const alertService = new AlertService(alertRepository);


app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/demo", createDemoRoutes());
app.use("/alert", createAlertRoutes(alertService));

export default app;