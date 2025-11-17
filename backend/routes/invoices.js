import express from 'express';
import Invoice from '../models/Invoice.js';
import nodemailer from 'nodemailer';
import Client from '../models/Client.js';


const router = express.Router();


router.get('/', async (req, res) => {
const invoices = await Invoice.find();
res.json(invoices);
});


router.post('/', async (req, res) => {
const invoice = await Invoice.create(req.body);


const client = await Client.findById(req.body.clientId);


// Send Email
const transporter = nodemailer.createTransport({
service: 'gmail',
auth: {
user: process.env.EMAIL_USER,
pass: process.env.EMAIL_PASS
}
});


await transporter.sendMail({
from: process.env.EMAIL_USER,
to: client.email,
subject: 'Your Invoice',
text: `Invoice Details:\nAmount: ${invoice.amount} ${invoice.currency}\nDescription: ${invoice.description}`
});


res.json(invoice);
});


router.delete('/:id', async (req, res) => {
await Invoice.findByIdAndDelete(req.params.id);
res.json({ message: 'Invoice removed' });
});


export default router;
