const express = require('express');
const connectDB = require('./config/db')

// Create the server
const server = express();

// Connect to the data base
connectDB()

// Enable express.json
server.use( express.json({ extended: true}))

// Define port for the app
const PORT = process.env.PORT || 4000;

// Define the routes
server.use('/api/users', require('./routes/users'))
server.use('/api/auth', require('./routes/auth'))
server.use('/api/projects', require('./routes/project'))
server.use('/api/tasks', require('./routes/task'))

server.listen(PORT, () => {
  console.log(`The server is running on localhost:${PORT}`)
})