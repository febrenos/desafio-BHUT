const { Router } = require('express');
const { getExternalCars, createCar } = require('./externalApi');
const Log = require('./logModel');
const axios = require('axios');

const router = Router();

// Sua rota da API
router.get('/', (req, res) => {
    res.send('API online');
});

// GET cars
router.get('/listCars', async (req, res) => {
    try {
        const cars = await getExternalCars();
        res.json(cars);
    } catch (error) {
        console.error('Error request external API:', error.message);
        res.status(500).json({ error: 'Error request external API' });
    }
});

// POST car
router.post('/createCar', async (req, res) => {
    try {
        const newCar = req.body;
        const createdCar = await createCar(newCar);
        const log = new Log({ date: new Date(), car_id: createdCar._id });
        await log.save();

        // Post information to the webhook
        await postToWebhook(createdCar);

        res.json(createdCar);
    } catch (error) {
        console.error('Error creating car in external API:', error.message);
        res.status(500).json({ error: 'Error creating car in external API' });
    }
});

const postToWebhook = async (car) => {
    const webhookUrl = 'https://example.com/webhook'; // Replace with your actual webhook URL
    try {
        await axios.post(webhookUrl, car);
        console.log('Posted car data to webhook:', car);
    } catch (error) {
        console.error('Error posting car data to webhook:', error.message);
        // Handle any error while posting to the webhook
    }
};

// GET logs
router.get('/logs', async (req, res) => {
    try {
        const logs = await Log.find({});
        res.json(logs);
    } catch (error) {
        console.error('Error fetching logs from the database:', error.message);
        res.status(500).json({ error: 'Error fetching logs from the database' });
    }
});

module.exports = router;
