const express = require('express');
const router = express.Router();

const cache = require('./memory_cache');

const API_URL = 'https://http.cat';

router.get('/', (req, res) => {
    res.json({ message: 'Добро пожаловать в наше REST API!' });
  });
  

router.get('/item/:number', async (req, res) => {
    const { number } = req.params;

    const cached_data = cache.get_data(`/item/${number}`);

    if (cached_data){
        console.log('Данные взяты из кеша');
        res.set('Content-Type', 'image/jpeg');
        res.send(cached_data);
        return;
    }

    try {
        const fetch = (await import('node-fetch')).default;

        const response = await fetch(`${API_URL}/${number}.jpg`);

        if (!response.ok) {
            return res.status(404).send('Изображение не найдено');
        }

        const imageBuffer = Buffer.from(await response.arrayBuffer());
        res.set('Content-Type', 'image/jpeg');
        res.send(imageBuffer);
        cache.set_data(`/item/${number}`, imageBuffer);
        console.log('Данные получены из API и сохранены в кеш');
    } catch (error) {
        console.error('Ошибка при получении изображения:', error);
        res.status(500).send('Произошла ошибка при получении изображения');
    }
});


router.get('/cache/size', async (req, res) => {

    const max_size = cache.get_max_size();
    const current_size = cache.get_current_size();
    res.json({max_size: max_size, Current_Size: current_size});
});

module.exports = router;