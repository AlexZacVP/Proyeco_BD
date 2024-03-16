import { config } from "dotenv";
config();

//Configurar puerto
export default {
    PORT: process.env.PORT || 3001,
}