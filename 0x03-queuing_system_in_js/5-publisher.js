import redis from 'redis';

// Create a Redis publisher client
const publisher = redis.createClient();

// Event handler for successful connection
publisher.on('connect', () => {
    console.log('Redis client connected to the server');
});

// Event handler for connection error
publisher.on('error', (err) => {
    console.error(`Redis client not connected to the server: ${err}`);
});

// Function to publish a message to the 'holberton school channel' after a specified time
function publishMessage(message, time) {
    setTimeout(() => {
        console.log(`About to send "${message}"`);
        publisher.publish('holberton school channel', message);
    }, time);
}

// Call the publishMessage function
publishMessage('Hello, Holberton!', 1000);
publishMessage('KILL_SERVER', 5000); 
