import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import clientsRoute from './routes/clients.js';
import invoicesRoute from './routes/invoices.js';


dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());


app.use('/api/clients', clientsRoute);
app.use('/api/invoices', invoicesRoute);


mongoose.connect(process.env.MONGO_URI)
.then(() => {
console.log('MongoDB Connected');
app.listen(5000, () => console.log('Server running on port 5000'));
})
.catch(err => console.log(err));
