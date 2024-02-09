const kue = require('kue');
const createPushNotificationsJobs = require('./8-job');

// Create a Kue queue
const queue = kue.createQueue();

// Enter test mode for the queue
queue.testMode.enter();

describe('createPushNotificationsJobs function', () => {
    beforeEach(() => {
        // Clear the queue before each test
        queue.testMode.clear();
    });

    afterEach(() => {
        // Exit test mode and clear the queue after each test
        queue.testMode.exit();
    });

    it('should throw an error if jobs is not an array', () => {
        expect(() => {
            createPushNotificationsJobs({}, queue);
        }).toThrowError('Jobs is not an array');
    });

    it('should create a job for each object in the jobs array', () => {
        const jobs = [
            {
                phoneNumber: '4153518780',
                message: 'This is the code 1234 to verify your account'
            },
            {
                phoneNumber: '4153518781',
                message: 'This is the code 4562 to verify your account'
            }
        ];

        createPushNotificationsJobs(jobs, queue);

        expect(queue.testMode.jobs.length).toBe(jobs.length);
    });

    it('should log a message when a job is created', () => {
        const jobs = [
            {
                phoneNumber: '4153518780',
                message: 'This is the code 1234 to verify your account'
            }
        ];

        createPushNotificationsJobs(jobs, queue);

        // Check if the job creation log message is present
        expect(console.log).toHaveBeenCalledWith(expect.stringContaining('Notification job created'));
    });

    // Add more test cases for job completion, failure, and progress logging as needed
});

