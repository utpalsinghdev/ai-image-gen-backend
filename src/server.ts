import app from "./app";
import env from "./utils/validateEnv"
import mongoose from "mongoose";

const port = env.PORT;


app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port} 🚀`);
});

