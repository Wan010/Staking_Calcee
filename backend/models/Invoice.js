import mongoose from 'mongoose';


const invoiceSchema = new mongoose.Schema({
clientId: String,
amount: Number,
currency: String,
description: String,
date: String,
});


export default mongoose.model('Invoice', invoiceSchema);
