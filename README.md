# BackChannel Manager API

API backend for property management system with MySQL database.

## Features

- RESTful API with Express.js
- MySQL database with Sequelize ORM
- JWT authentication
- Models for users, properties, bookings, calendars, messages, cleaning tasks, prices, stats
- Docker setup for easy development

## Requirements

- Node.js 16+
- MySQL 8.0+
- npm or yarn

## Setup

### Local Development

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create `.env` file based on `env.example`:
   ```
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=password
   DB_NAME=backchannel_db
   JWT_SECRET=your_jwt_secret_key
   PORT=3000
   ```
4. Create MySQL database:
   ```
   CREATE DATABASE backchannel_db;
   ```
5. Run migrations:
   ```
   npm run dev
   ```
   > Note: The database tables will be automatically created during first run through Sequelize sync.

6. Start the server:
   ```
   npm run dev
   ```

### Docker Setup

1. Make sure Docker and Docker Compose are installed
2. Run:
   ```
   docker-compose up
   ```
   > This will start both the API server and a MySQL database.

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and get JWT token

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/users` - Get all users (admin only)
- `GET /api/users/:id` - Get a specific user (admin only)
- `POST /api/users` - Create a user (admin only)
- `PUT /api/users/:id` - Update a user (admin only)
- `DELETE /api/users/:id` - Delete a user (admin only)

### Properties
- `GET /api/properties` - Get all properties
- `GET /api/properties/upcoming-bookings` - Get properties with upcoming bookings
- `GET /api/properties/:id` - Get a specific property
- `GET /api/properties/:id/performance` - Get property performance stats
- `POST /api/properties` - Create a property
- `PUT /api/properties/:id` - Update a property
- `DELETE /api/properties/:id` - Delete a property

### Bookings
- `GET /api/bookings` - Get all bookings
- `GET /api/bookings/upcoming` - Get upcoming bookings
- `GET /api/bookings/property/:propertyId` - Get bookings by property
- `GET /api/bookings/:id` - Get a specific booking
- `POST /api/bookings` - Create a booking
- `PUT /api/bookings/:id` - Update a booking
- `DELETE /api/bookings/:id` - Delete a booking

### Calendars
- `GET /api/calendars` - Get all calendars
- `GET /api/calendars/property/:propertyId` - Get calendars by property
- `GET /api/calendars/:id` - Get a specific calendar
- `POST /api/calendars` - Create a calendar
- `PUT /api/calendars/:id` - Update a calendar
- `DELETE /api/calendars/:id` - Delete a calendar

### Messages
- `GET /api/messages` - Get all messages
- `GET /api/messages/booking/:bookingId` - Get messages by booking
- `GET /api/messages/:id` - Get a specific message
- `POST /api/messages` - Create a message
- `PUT /api/messages/:id` - Update a message
- `DELETE /api/messages/:id` - Delete a message

### Cleaning Tasks
- `GET /api/cleaning-tasks` - Get all cleaning tasks
- `GET /api/cleaning-tasks/upcoming` - Get upcoming cleaning tasks
- `GET /api/cleaning-tasks/property/:propertyId` - Get tasks by property
- `GET /api/cleaning-tasks/:id` - Get a specific task
- `POST /api/cleaning-tasks` - Create a task
- `PUT /api/cleaning-tasks/:id` - Update a task
- `PUT /api/cleaning-tasks/:id/status` - Update task status
- `DELETE /api/cleaning-tasks/:id` - Delete a task

### Prices
- `GET /api/prices` - Get all prices
- `GET /api/prices/property/:propertyId` - Get prices by property and date range
- `GET /api/prices/:id` - Get a specific price
- `POST /api/prices` - Create a price
- `POST /api/prices/property/:propertyId/bulk` - Bulk update prices
- `PUT /api/prices/:id` - Update a price
- `DELETE /api/prices/:id` - Delete a price

### Stats
- `GET /api/stats` - Get all stats
- `GET /api/stats/property/:propertyId` - Get stats by property
- `GET /api/stats/property/:propertyId/summary` - Get property summary
- `GET /api/stats/:id` - Get a specific stat
- `POST /api/stats` - Create a stat
- `PUT /api/stats/:id` - Update a stat
- `DELETE /api/stats/:id` - Delete a stat 