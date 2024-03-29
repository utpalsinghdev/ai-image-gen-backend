import { cleanEnv } from "envalid";
import { port, str } from "envalid/dist/validators";

export default cleanEnv(process.env, {
    PORT: port(),
    DATABASE_URL: str(),
    OPEN_API_KEY: str(),
    CLOUDINARY_CLOUD_NAME: str(),
    CLOUDINARY_CLOUD_API_KEY: str(),
    CLOUDINARY_CLOUD_API_SECRET: str(),
});
