import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';

import productRoutes from "./routes/product.route.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json()); // To allow json data to be sent in the request body
//Send data along with rthe request   

app.use('/api/products', productRoutes)

app.listen(port, ()=> {
    connectDB();
    console.log(`Server is running on port: ${port}`);
});
