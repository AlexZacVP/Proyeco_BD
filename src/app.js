import express  from "express";
import path from 'path';
import  config  from "./config";
import principal from "./routes/app.routes"
import morgan from "morgan";

const app= express();

//Configuracion
app.set("PORT",config.PORT);

//Recibe los datos de los formularios con app.controller (req.body)
app.use(express.urlencoded({extended: true}));

//Plantillas ejs para las views
app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"views"));

// Static files - Complementos como imagenes, archivos css, framework, codigos fuentes, javascript front-end se coloca en otra carpeta llamada 'public'
app.use(express.static(path.join(__dirname, "public")));

//Middleware
app.use(morgan('dev'));
//Cargar nuestras rutas
app.use(principal);




export default app;