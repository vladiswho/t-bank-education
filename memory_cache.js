class Memory_cache {
    constructor(max_size = 10) {
        this.cache = new Map();
        this.max_size = max_size;
    }

    get_data(url) {
        return this.cache.get(url);
    }

    get_max_size() {
        return this.max_size;
    }

    get_current_size() {
        return this.cache.size;
    }

    set_data(url, value) {
        if (this.cache.size >= this.max_size) {
            const firstKey = this.cache.keys().next().value;
            this.cache.delete(firstKey);
        }
        this.cache.set(url, value);
    }

    set_max_size(new_size) {
        this.max_size = new_size;
        while (this.cache.size > this.max_size) {
            const firstKey = this.cache.keys().next().value;
            this.cache.delete(firstKey);
        }
    }
}

const cache = new Memory_cache(5);

module.exports = cache;