const express = require('express');
const router = express.Router();

const cache = require('./memory_cache');


router.put('/cache/size', async (req, res) => { // Обновление размера кеша
    const { new_size }= req.body;
    if (typeof new_size === 'number' && new_size > 0) {
        cache.set_max_size(new_size);
        const max_size = cache.get_max_size();
        const current_size = cache.get_current_size();
        res.json({max_size: max_size, Current_Size: current_size});
    }
    else
    {
        res.status(400).send('Некорректный размер кеша! Проверьте, что указываете new_size: value');
    }
});


module.exports = router;