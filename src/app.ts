import "dotenv/config"
import express, { NextFunction, Request, Response } from "express";
import createHttpError, { isHttpError } from "http-errors";
import morgan from "morgan";
import cors from "cors";
import testrou from "./test/test.routes";
import post from "./post/post.routes";
import ai from "./Ai/ai.routes";
const app = express();
app.use(morgan("dev"))
app.use(express.json({
    limit: "50mb"
}));


app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
}))


app.use("/api/v1/test", testrou)
app.use("/api/v1/post", post)
app.use("/api/v1/ai", ai)

app.use((req: Request, res: Response, next: NextFunction) => {
    next(createHttpError(404, "Endpoint Not found"))
});

app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    console.error(error);
    let errorMessage = "An unknown error occurred!";
    let errorCode = 500;
    if (isHttpError(error)) {
        errorMessage = error.message;
        errorCode = error.status;
    }
    res.status(errorCode).json({ message: errorMessage })
});

export default app;