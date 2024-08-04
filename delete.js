const express = require('express');
const router = express.Router();

const cache = require('./memory_cache');


router.delete('/cache/size', async (req, res) => { // Очистка кеша
    cache.delete_data();
    const max_size = cache.get_max_size();
    const current_size = cache.get_current_size();
    res.json({max_size: max_size, Current_Size: current_size});
});


module.exports = router;