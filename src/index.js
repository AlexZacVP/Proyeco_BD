import app from "./app";
import principal from './routes/app.routes';

const express = require('express');
//Iniciar
app.use("/", principal  );

app.listen(app.get("PORT"), ()=>{
    console.log(`http://localhost:${app.get("PORT")}`);
});



