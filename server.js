require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');

// Import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const propertyRoutes = require('./routes/properties');
const bookingRoutes = require('./routes/bookings');
const calendarRoutes = require('./routes/calendars');
const messageRoutes = require('./routes/messages');
const cleaningTaskRoutes = require('./routes/cleaning-tasks');
const priceRoutes = require('./routes/prices');
const statRoutes = require('./routes/stats');

// Import models for database sync
require('./models');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to BackChannel Manager API' });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/calendars', calendarRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/cleaning-tasks', cleaningTaskRoutes);
app.use('/api/prices', priceRoutes);
app.use('/api/stats', statRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'production' ? {} : err
  });
});

// Database connection and server start
const startServer = async () => {
  try {
    // Sync database models
    await sequelize.sync({ alter: process.env.NODE_ENV !== 'production' });
    console.log('Database synchronized successfully');
    
    // Start server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

startServer(); 