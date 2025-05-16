const BaseController = require('./baseController');
const { Price, Property } = require('../models');
const { Op } = require('sequelize');

class PriceController extends BaseController {
  constructor() {
    super(Price, {
      include: [
        { model: Property, as: 'Property' }
      ]
    });
  }
  
  // Get prices by property and date range
  getByPropertyAndDateRange = async (req, res) => {
    try {
      const { propertyId } = req.params;
      const { startDate, endDate } = req.query;
      
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
      
      const query = {
        where: { 
          property_id: propertyId
        },
        order: [['date', 'ASC']]
      };
      
      // Add date range filter if provided
      if (startDate && endDate) {
        query.where.date = {
          [Op.between]: [new Date(startDate), new Date(endDate)]
        };
      } else if (startDate) {
        query.where.date = {
          [Op.gte]: new Date(startDate)
        };
      } else if (endDate) {
        query.where.date = {
          [Op.lte]: new Date(endDate)
        };
      }
      
      const prices = await Price.findAll(query);
      
      res.status(200).json(prices);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching prices', error: error.message });
    }
  };
  
  // Bulk update prices
  bulkUpdate = async (req, res) => {
    try {
      const { propertyId } = req.params;
      const { prices } = req.body;
      
      if (!Array.isArray(prices) || prices.length === 0) {
        return res.status(400).json({ message: 'Invalid prices data. Expected an array of price objects.' });
      }
      
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
      
      // Process each price entry
      const results = await Promise.all(
        prices.map(async ({ date, price }) => {
          const [priceRecord, created] = await Price.findOrCreate({
            where: {
              property_id: propertyId,
              date: new Date(date)
            },
            defaults: {
              price
            }
          });
          
          if (!created) {
            await priceRecord.update({ price });
          }
          
          return priceRecord;
        })
      );
      
      res.status(200).json({
        message: 'Prices updated successfully',
        count: results.length,
        data: results
      });
    } catch (error) {
      res.status(500).json({ message: 'Error updating prices', error: error.message });
    }
  };
}

module.exports = new PriceController(); 