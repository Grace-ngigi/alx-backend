const kue = require('kue');
const queue = kue.createQueue();

// Define the job data
const jobData = {
    phoneNumber: '+1234567890',
    message: 'Hello, this is a notification!'
};

// Create a job in the push_notification_code queue
const job = queue.create('push_notification_code', jobData)
    .save((err) => {
        if (!err) {
            console.log(`Notification job created: ${job.id}`);
        }
    });

// Event handler for job completion
job.on('complete', () => {
    console.log('Notification job completed');
});

// Event handler for job failure
job.on('failed', () => {
    console.log('Notification job failed');
});
