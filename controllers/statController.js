const BaseController = require('./baseController');
const { Stat, Property } = require('../models');
const { Op } = require('sequelize');
const sequelize = require('../config/database');

class StatController extends BaseController {
  constructor() {
    super(Stat, {
      include: [
        { model: Property, as: 'Property' }
      ]
    });
  }
  
  // Get stats by property
  getByProperty = async (req, res) => {
    try {
      const { propertyId } = req.params;
      const { year, month, platform } = req.query;
      
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
        order: [['month', 'DESC']]
      };
      
      // Add filters if provided
      if (year && month) {
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0); // Last day of the month
        
        query.where.month = {
          [Op.between]: [startDate, endDate]
        };
      } else if (year) {
        const startDate = new Date(year, 0, 1);
        const endDate = new Date(year, 11, 31);
        
        query.where.month = {
          [Op.between]: [startDate, endDate]
        };
      }
      
      if (platform) {
        query.where.platform = platform;
      }
      
      const stats = await Stat.findAll(query);
      
      res.status(200).json(stats);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching stats', error: error.message });
    }
  };
  
  // Get property performance summary
  getPropertySummary = async (req, res) => {
    try {
      const { propertyId } = req.params;
      const { year } = req.query;
      
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
        attributes: [
          [sequelize.fn('SUM', sequelize.col('revenue')), 'totalRevenue'],
          [sequelize.fn('AVG', sequelize.col('occupancy_rate')), 'avgOccupancyRate'],
          [sequelize.col('platform'), 'platform']
        ],
        group: ['platform']
      };
      
      // Add year filter if provided
      if (year) {
        const startDate = new Date(year, 0, 1);
        const endDate = new Date(year, 11, 31);
        
        query.where.month = {
          [Op.between]: [startDate, endDate]
        };
      }
      
      const stats = await Stat.findAll(query);
      
      // Calculate total across all platforms
      const totalRevenue = stats.reduce((sum, stat) => sum + parseFloat(stat.dataValues.totalRevenue || 0), 0);
      const avgOccupancyRate = stats.reduce((sum, stat) => {
        return sum + parseFloat(stat.dataValues.avgOccupancyRate || 0);
      }, 0) / (stats.length || 1);
      
      res.status(200).json({
        propertyId,
        totalRevenue,
        avgOccupancyRate,
        platformBreakdown: stats
      });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching property summary', error: error.message });
    }
  };
}

module.exports = new StatController(); 