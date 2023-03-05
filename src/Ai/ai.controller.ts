import { PrismaClient } from '@prisma/client'
import { RequestHandler } from "express";
import {
    Configuration,
    OpenAIApi,
} from "openai";
import env from "../utils/validateEnv"

const configuration = new Configuration({
    apiKey: env.OPEN_API_KEY
});

const openai = new OpenAIApi(configuration);

export const healthCheck: RequestHandler = async (req, res, next) => {
    try {
        res.status(200).json({ message: "at ai route 🚀" })
    } catch (error) {
        next(error);
    }
}

export const generate: RequestHandler = async (req, res, next) => {
    try {
        const { prompt } = req.body;
        const apiRes = await openai.createImage({
            prompt: prompt,
            n: 1,
            size: "1024x1024",
            response_format: "b64_json"
        });

        const image = apiRes.data.data[0].b64_json;

        res.status(200).json({ success: true, message: "Image Generated Successfully 🔥", image })
    }
    catch (error) {
        next(error);
    }
}