import { PrismaClient } from '@prisma/client'
import { RequestHandler } from "express";
import { v2 as cloudinary } from "cloudinary";
import env from "../utils/validateEnv"
const prisma = new PrismaClient()


cloudinary.config({
    cloud_name: env.CLOUDINARY_CLOUD_NAME,
    api_key: env.CLOUDINARY_CLOUD_API_KEY,
    api_secret: env.CLOUDINARY_CLOUD_API_SECRET
});


export const healthCheck: RequestHandler = async (req, res, next) => {
    try {
        res.status(200).json({ message: "at post route 🚀" })
    } catch (error) {
        next(error);
    }
}

export const createPost: RequestHandler = async (req, res, next) => {
    const { name, prompt, photo } = req.body;
    try {
        const photoRes = await cloudinary.uploader.upload(photo);

        const post = await prisma.post.create({
            data: {
                name,
                prompt,
                photo: photoRes.secure_url
            }
        })
        res.status(201).json({ success: true, message: "Image Uploaded SuccessFully 🔥", post })
    } catch (error) {
        next(error);
        res.status(500).json({ success: false, message: "Something went wrong" })
    }
}

export const getPosts: RequestHandler = async (req, res, next) => {
    try {
        const posts = await prisma.post.findMany();

        res.status(200).json({ success: true, message: "All Images fetched 🔥", posts })
    } catch (error) {
        next(error);
        res.status(500).json({ success: false, message: "Something went wrong" })
    }

}