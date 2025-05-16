const BaseController = require('./baseController');
const { CleaningTask, Property, Booking, User } = require('../models');
const { Op } = require('sequelize');

class CleaningTaskController extends BaseController {
  constructor() {
    super(CleaningTask, {
      include: [
        { model: Property, as: 'Property' },
        { model: Booking, as: 'Booking' },
        { model: User, as: 'cleaner' }
      ]
    });
  }
  
  // Get tasks by property
  getByProperty = async (req, res) => {
    try {
      const propertyId = req.params.propertyId;
      
      // Check if user has access to this property
      const property = await Property.findOne({
        where: {
          id: propertyId,
          ...(req.user.role !== 'admin' && req.user.role !== 'cleaner' ? { user_id: req.user.id } : {})
        }
      });
      
      if (!property && req.user.role !== 'cleaner') {
        return res.status(404).json({ message: 'Property not found or access denied' });
      }
      
      const query = {
        where: { property_id: propertyId },
        include: this.associationsToInclude
      };
      
      // If user is a cleaner, only show assigned tasks
      if (req.user.role === 'cleaner') {
        query.where.assigned_to = req.user.id;
      }
      
      const tasks = await CleaningTask.findAll(query);
      
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching cleaning tasks', error: error.message });
    }
  };
  
  // Get upcoming tasks
  getUpcoming = async (req, res) => {
    try {
      const query = {
        where: {
          cleaning_date: {
            [Op.gte]: new Date()
          },
          status: {
            [Op.ne]: 'completed'
          }
        },
        include: this.associationsToInclude,
        order: [['cleaning_date', 'ASC']]
      };
      
      // If user is a cleaner, only show assigned tasks
      if (req.user.role === 'cleaner') {
        query.where.assigned_to = req.user.id;
      }
      // If user is not admin or cleaner, filter by properties they own
      else if (req.user.role !== 'admin') {
        query.include.push({
          model: Property,
          where: { user_id: req.user.id },
          required: true
        });
      }
      
      const tasks = await CleaningTask.findAll(query);
      
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching upcoming cleaning tasks', error: error.message });
    }
  };
  
  // Update task status
  updateStatus = async (req, res) => {
    try {
      const { id } = req.params;
      const { status, notes } = req.body;
      
      const task = await CleaningTask.findByPk(id, {
        include: this.associationsToInclude
      });
      
      if (!task) {
        return res.status(404).json({ message: 'Cleaning task not found' });
      }
      
      // Check if user has permission to update this task
      if (req.user.role === 'cleaner' && task.assigned_to !== req.user.id) {
        return res.status(403).json({ message: 'Access denied: This task is not assigned to you' });
      }
      
      if (req.user.role === 'owner' || req.user.role === 'manager') {
        const property = await Property.findOne({
          where: {
            id: task.property_id,
            user_id: req.user.id
          }
        });
        
        if (!property) {
          return res.status(403).json({ message: 'Access denied: You do not own this property' });
        }
      }
      
      // Update the task
      const updatedTask = await task.update({
        status,
        notes: notes || task.notes
      });
      
      res.status(200).json({
        message: 'Cleaning task status updated successfully',
        data: updatedTask
      });
    } catch (error) {
      res.status(500).json({ message: 'Error updating cleaning task status', error: error.message });
    }
  };
}

module.exports = new CleaningTaskController(); 