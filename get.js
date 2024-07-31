const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    res.json({ message: 'Добро пожаловать в наше REST API!' });
  });
  

router.get('/item/:number', async (req, res) => {
    const { number } = req.params;

    try {
        const fetch = (await import('node-fetch')).default;

        const response = await fetch(`https://http.cat/${number}.jpg`);

        if (!response.ok) {
            return res.status(404).send('Изображение не найдено');
        }

        const imageBuffer = Buffer.from(await response.arrayBuffer());
        res.set('Content-Type', 'image/jpeg');
        res.send(imageBuffer);
    } catch (error) {
        console.error('Ошибка при получении изображения:', error);
        res.status(500).send('Произошла ошибка при получении изображения');
    }
});

module.exports = router;