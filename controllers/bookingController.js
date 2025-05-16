const BaseController = require('./baseController');
const { Booking, Message, CleaningTask, Property } = require('../models');
const { Op } = require('sequelize');

class BookingController extends BaseController {
  constructor() {
    super(Booking, {
      include: [
        { model: Message, as: 'messages' },
        { model: CleaningTask, as: 'cleaningTasks' },
        { model: Property, as: 'Property' }
      ]
    });
  }
  
  // Get upcoming bookings
  getUpcoming = async (req, res) => {
    try {
      const query = {
        where: {
          check_in: {
            [Op.gte]: new Date()
          }
        },
        include: this.associationsToInclude,
        order: [['check_in', 'ASC']]
      };
      
      // If user is not admin, filter by properties they own
      if (req.user && req.user.role !== 'admin') {
        query.include.push({
          model: Property,
          as: 'Property',
          where: { user_id: req.user.id },
          required: true
        });
      }
      
      const bookings = await Booking.findAll(query);
      
      res.status(200).json(bookings);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching upcoming bookings', error: error.message });
    }
  };
  
  // Get bookings by property
  getByProperty = async (req, res) => {
    try {
      const propertyId = req.params.propertyId;
      
      // Check if user has access to this property
      const property = await Property.findOne({
        where: {
          id: propertyId,
          ...(req.user.role !== 'admin' ? { user_id: req.user.id } : {})
        }
      });
      
      if (!property) {
        return res.status(404).json({ message: 'Property not found or access denied' });
      }
      
      const bookings = await Booking.findAll({
        where: { property_id: propertyId },
        include: this.associationsToInclude,
        order: [['check_in', 'DESC']]
      });
      
      res.status(200).json(bookings);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching bookings by property', error: error.message });
    }
  };
}

module.exports = new BookingController(); 