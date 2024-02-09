const express = require('express');
const redis = require('redis');
const kue = require('kue');
const { promisify } = require('util');

// Create Redis client
const client = redis.createClient();
const hsetAsync = promisify(client.hset).bind(client);
const hgetAsync = promisify(client.hget).bind(client);

// ReserveSeat function
async function reserveSeat(number) {
    await hsetAsync('available_seats', 'numberOfAvailableSeats', number);
}

// GetCurrentAvailableSeats function
async function getCurrentAvailableSeats() {
    const seats = await hgetAsync('available_seats', 'numberOfAvailableSeats');
    return parseInt(seats) || 0;
}

// Set initial available seats to 50
reserveSeat(50);

// Initialize reservationEnabled to true
let reservationEnabled = true;

// Create Kue queue
const queue = kue.createQueue();

// Express server
const app = express();
const PORT = 1245;

// Middleware to parse JSON
app.use(express.json());

// Route to get available seats
app.get('/available_seats', async (req, res) => {
    const numberOfAvailableSeats = await getCurrentAvailableSeats();
    res.json({ numberOfAvailableSeats });
});

// Route to reserve a seat
app.get('/reserve_seat', (req, res) => {
    if (!reservationEnabled) {
        return res.json({ status: 'Reservation are blocked' });
    }

    const job = queue.create('reserve_seat')
        .save((err) => {
            if (!err) {
                res.json({ status: 'Reservation in process' });
            } else {
                res.json({ status: 'Reservation failed' });
            }
        });

    job.on('complete', (result) => {
        console.log(`Seat reservation job ${job.id} completed`);
    });

    job.on('failed', (err) => {
        console.log(`Seat reservation job ${job.id} failed: ${err}`);
    });
});

// Route to process the queue and reserve seats
app.get('/process', async (req, res) => {
    res.json({ status: 'Queue processing' });

    const currentAvailableSeats = await getCurrentAvailableSeats();
    if (currentAvailableSeats === 0) {
        reservationEnabled = false;
    }

    if (currentAvailableSeats > 0) {
        queue.process('reserve_seat', async (job, done) => {
            const newAvailableSeats = await getCurrentAvailableSeats();
            if (newAvailableSeats > 0) {
                await reserveSeat(newAvailableSeats - 1);
                done();
            } else {
                done(new Error('Not enough seats available'));
            }
        });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

