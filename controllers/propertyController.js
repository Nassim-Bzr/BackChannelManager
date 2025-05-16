const BaseController = require('./baseController');
const { Property, Booking, Calendar, CleaningTask, Price, Stat } = require('../models');
const { Op } = require('sequelize');

class PropertyController extends BaseController {
  constructor() {
    super(Property, {
      userSpecific: true,
      include: [
        { model: Booking, as: 'bookings' },
        { model: Calendar, as: 'calendars' },
        { model: CleaningTask, as: 'cleaningTasks' },
        { model: Price, as: 'prices' },
        { model: Stat, as: 'stats' }
      ]
    });
  }
  
  // Get properties with upcoming bookings
  getWithUpcomingBookings = async (req, res) => {
    try {
      const query = {
        include: [
          {
            model: Booking,
            as: 'bookings',
            where: {
              check_in: {
                [Op.gte]: new Date()
              }
            },
            required: true
          }
        ]
      };
      
      // Add user filtering for non-admin users
      if (req.user && req.user.role !== 'admin') {
        query.where = { user_id: req.user.id };
      }
      
      const properties = await Property.findAll(query);
      
      res.status(200).json(properties);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching properties', error: error.message });
    }
  };
  
  // Get property performance stats
  getPerformance = async (req, res) => {
    try {
      const propertyId = req.params.id;
      const query = {
        where: { id: propertyId },
        include: [
          { model: Stat, as: 'stats' }
        ]
      };
      
      // Add user filtering for non-admin users
      if (req.user && req.user.role !== 'admin') {
        query.where.user_id = req.user.id;
      }
      
      const property = await Property.findOne(query);
      
      if (!property) {
        return res.status(404).json({ message: 'Property not found' });
      }
      
      res.status(200).json(property);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching property performance', error: error.message });
    }
  };
}

module.exports = new PropertyController(); 