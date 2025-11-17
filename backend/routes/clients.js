import express from 'express';
import Client from '../models/Client.js';
const router = express.Router();


router.get('/', async (req, res) => {
const data = await Client.find();
res.json(data);
});


router.post('/', async (req, res) => {
const saved = await Client.create(req.body);
res.json(saved);
});


router.delete('/:id', async (req, res) => {
await Client.findByIdAndDelete(req.params.id);
res.json({ message: 'Deleted' });
});


export default router;
