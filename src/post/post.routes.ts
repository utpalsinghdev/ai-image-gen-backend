import { Router } from "express";
import { createPost, getPosts, healthCheck } from "./post.controller";



const router = Router();


router.get("/", healthCheck);
router.post("/add-image", createPost);
router.get("/all", getPosts);

export default router;