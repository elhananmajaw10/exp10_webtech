// server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const eventRoutes = require('./routes/events');
const ticketRoutes = require('./routes/tickets');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// ==============================
// ✅ CORS CONFIGURATION
// ==============================
app.use(cors({
  origin: "https://exp8-9-2.onrender.com", // <-- Your frontend Render URL
  credentials: true
}));

// ==============================
// ✅ MIDDLEWARE
// ==============================
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ==============================
// ✅ ROUTES
// ==============================
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/tickets', ticketRoutes);

// ==============================
// ✅ TEST ROUTES
// ==============================
app.get('/', (req, res) => {
  res.json({ message: 'Event Ticketing API is running!' });
});

app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working fine!' });
});

// ==============================
// ✅ DATABASE CONNECTION
// ==============================
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/event_ticketing';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB database connection established successfully'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// ==============================
// ✅ START SERVER
// ==============================
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port: ${PORT}`);
});
