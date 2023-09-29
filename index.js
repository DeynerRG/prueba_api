import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import contactosRouter from './routes/contactosRoute.js';

const PORT = 8080;
const app = express();

// Middlewares iniciales
app.use( cors() );
app.use( express.json() );

app.use('/contactos', contactosRouter);


app.listen(PORT, ()=>{
    console.log(`server running in port ${ PORT }`);
})
