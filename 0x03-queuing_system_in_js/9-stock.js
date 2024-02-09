const express = require('express');
const redis = require('redis');
const { promisify } = require('util');

// Initialize Express app and Redis client
const app = express();
const client = redis.createClient();

// Promisify Redis methods
const hgetAsync = promisify(client.hget).bind(client);
const hsetAsync = promisify(client.hset).bind(client);

// Array of products
const listProducts = [
    { itemId: 1, itemName: 'Suitcase 250', price: 50, initialAvailableQuantity: 4 },
    { itemId: 2, itemName: 'Suitcase 450', price: 100, initialAvailableQuantity: 10 },
    { itemId: 3, itemName: 'Suitcase 650', price: 350, initialAvailableQuantity: 2 },
    { itemId: 4, itemName: 'Suitcase 1050', price: 550, initialAvailableQuantity: 5 }
];

// Data access functions
function getItemById(id) {
    return listProducts.find(product => product.itemId === id);
}

// Server configuration
app.listen(1245, () => {
    console.log('Server is running on port 1245');
});

// Routes
app.get('/list_products', (req, res) => {
    res.json(listProducts.map(product => ({
        itemId: product.itemId,
        itemName: product.itemName,
        price: product.price,
        initialAvailableQuantity: product.initialAvailableQuantity
    })));
});

app.get('/list_products/:itemId', async (req, res) => {
    const itemId = parseInt(req.params.itemId);
    const product = getItemById(itemId);
    if (!product) {
        return res.json({ status: 'Product not found' });
    }

    const currentQuantity = await getCurrentReservedStockById(itemId);
    res.json({ ...product, currentQuantity });
});

app.get('/reserve_product/:itemId', async (req, res) => {
    const itemId = parseInt(req.params.itemId);
    const product = getItemById(itemId);
    if (!product) {
        return res.json({ status: 'Product not found' });
    }

    const currentQuantity = await getCurrentReservedStockById(itemId);
    if (currentQuantity >= product.initialAvailableQuantity) {
        return res.json({ status: 'Not enough stock available', itemId });
    }

    await reserveStockById(itemId, currentQuantity + 1);
    res.json({ status: 'Reservation confirmed', itemId });
});

// Redis operations
async function reserveStockById(itemId, stock) {
    await hsetAsync('item:' + itemId, 'stock', stock);
}

async function getCurrentReservedStockById(itemId) {
    const stock = await hgetAsync('item:' + itemId, 'stock');
    return parseInt(stock) || 0;
}

