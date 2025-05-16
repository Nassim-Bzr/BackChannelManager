const BaseController = require('./baseController');
const { Calendar, Property } = require('../models');

class CalendarController extends BaseController {
  constructor() {
    super(Calendar, {
      include: [
        { model: Property, as: 'Property' }
      ]
    });
  }
  
  // Get calendars by property
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
      
      const calendars = await Calendar.findAll({
        where: { property_id: propertyId },
        include: this.associationsToInclude
      });
      
      res.status(200).json(calendars);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching calendars by property', error: error.message });
    }
  };
}

module.exports = new CalendarController(); 