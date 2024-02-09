const kue = require('kue');

// Create a Redis connection
const redisConfig = {
    redis: {
        port: 6379,
        host: '127.0.0.1'
    }
};

// Create a Kue queue with Redis configuration
const queue = kue.createQueue(redisConfig);

// Function to send a notification
function sendNotification(phoneNumber, message) {
    console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);
}

// Process jobs from the push_notification_code queue
queue.process('push_notification_code', (job, done) => {
    const { phoneNumber, message } = job.data;
    sendNotification(phoneNumber, message);
    done();
});

