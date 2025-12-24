const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Handle uncaught exceptions (sync errors)
process.on('uncaughtException', (err) => {
  console.log('Uncaught Exception. Shutting down...');
  console.log(err);
  process.exit(1);
});

// Load environment variables
dotenv.config({ path: './config.env' });

// Import app
const app = require('./app');

// Database connection
const DB = process.env.DATABASE;

mongoose
  .connect(DB)
  .then(() => {
    console.log('DB connection successful');
  })
  .catch((err) => {
    console.log('DB connection error:', err);
  });

// Start server (IMPORTANT: no production check)
const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});

// Handle unhandled promise rejections (async errors)
process.on('unhandledRejection', (err) => {
  console.log('Unhandled Rejection. Shutting down...');
  console.log(err);
  server.close(() => {
    process.exit(1);
  });
});
