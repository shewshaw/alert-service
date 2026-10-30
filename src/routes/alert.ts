import { Router } from "express";

import { AlertService } from "../services/alertService";
import { Alert, AlertInput } from "../types/alertType";


export function createAlertRoutes(alertService: AlertService): Router {
    const router = Router();

    router.get("/", (req, res) => {
        res.status(200).json({ message: `alert route called.` });
    });

    router.get("/list", (req, res) => {
        const alerts: Alert[] = alertService.findAll();
        res.status(200).json({ alerts, message: `alert list route called.` });
    });

    router.post("/", (req, res) => {
        const alert: Alert = alertService.save(req.body);
        const duplicate = alert.duplicate;
        res.status(duplicate ? 200: 201 ).json({ alert, message: `alert post route called.` });
    })

    return router;
}