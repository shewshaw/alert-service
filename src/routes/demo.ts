import { Router } from "express";


export function createDemoRoutes(): Router {
    const router = Router();

    router.get("/", (req, res) => {
        res.status(200).json({ message: `demo route called.` });
    });

    return router;
}