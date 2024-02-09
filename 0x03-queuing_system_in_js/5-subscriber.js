import redis from 'redis';

// Create a Redis subscriber client
const subscriber = redis.createClient();

// Event handler for successful connection
subscriber.on('connect', () => {
    console.log('Redis client connected to the server');
});

// Event handler for connection error
subscriber.on('error', (err) => {
    console.error(`Redis client not connected to the server: ${err}`);
});

// Subscribe to the 'holberton school channel'
subscriber.subscribe('holberton school channel');

// Event handler for incoming messages
subscriber.on('message', (channel, message) => {
    console.log(`Received message on channel ${channel}: ${message}`);
    if (message === 'KILL_SERVER') {
        subscriber.unsubscribe('holberton school channel');
        subscriber.quit();
    }
});
