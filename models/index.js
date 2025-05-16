const User = require('./User');
const Property = require('./Property');
const Booking = require('./Booking');
const Calendar = require('./Calendar');
const Message = require('./Message');
const CleaningTask = require('./CleaningTask');
const Price = require('./Price');
const Stat = require('./Stat');

// User - Property relationship
User.hasMany(Property, { foreignKey: 'user_id', as: 'properties' });
Property.belongsTo(User, { foreignKey: 'user_id' });

// Property - Booking relationship
Property.hasMany(Booking, { foreignKey: 'property_id', as: 'bookings' });
Booking.belongsTo(Property, { foreignKey: 'property_id' });

// Property - Calendar relationship
Property.hasMany(Calendar, { foreignKey: 'property_id', as: 'calendars' });
Calendar.belongsTo(Property, { foreignKey: 'property_id' });

// Booking - Message relationship
Booking.hasMany(Message, { foreignKey: 'booking_id', as: 'messages' });
Message.belongsTo(Booking, { foreignKey: 'booking_id' });

// Property - CleaningTask relationship
Property.hasMany(CleaningTask, { foreignKey: 'property_id', as: 'cleaningTasks' });
CleaningTask.belongsTo(Property, { foreignKey: 'property_id' });

// Booking - CleaningTask relationship
Booking.hasMany(CleaningTask, { foreignKey: 'booking_id', as: 'cleaningTasks' });
CleaningTask.belongsTo(Booking, { foreignKey: 'booking_id' });

// User - CleaningTask relationship (assigned cleaner)
User.hasMany(CleaningTask, { foreignKey: 'assigned_to', as: 'assignedTasks' });
CleaningTask.belongsTo(User, { foreignKey: 'assigned_to', as: 'cleaner' });

// Property - Price relationship
Property.hasMany(Price, { foreignKey: 'property_id', as: 'prices' });
Price.belongsTo(Property, { foreignKey: 'property_id' });

// Property - Stat relationship
Property.hasMany(Stat, { foreignKey: 'property_id', as: 'stats' });
Stat.belongsTo(Property, { foreignKey: 'property_id' });

module.exports = {
  User,
  Property,
  Booking,
  Calendar,
  Message,
  CleaningTask,
  Price,
  Stat
}; 