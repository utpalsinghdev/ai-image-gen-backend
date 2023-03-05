import { Router } from "express";
import { generate, healthCheck } from "./ai.controller";



const router = Router();


router.get("/", healthCheck);
router.post("/generate-image", generate);

export default router;