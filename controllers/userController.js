const BaseController = require('./baseController');
const { User, Property } = require('../models');

class UserController extends BaseController {
  constructor() {
    super(User, {
      include: [
        { model: Property, as: 'properties' }
      ]
    });
  }
  
  // Get current user profile
  getProfile = async (req, res) => {
    try {
      const user = await User.findByPk(req.user.id, {
        include: [
          { model: Property, as: 'properties' }
        ],
        attributes: { exclude: ['password'] }
      });
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching profile', error: error.message });
    }
  };
  
  // Update current user profile
  updateProfile = async (req, res) => {
    try {
      // Don't allow role changes via this endpoint
      delete req.body.role;
      
      const [updated] = await User.update(req.body, {
        where: { id: req.user.id }
      });
      
      if (updated === 0) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      const user = await User.findByPk(req.user.id, {
        attributes: { exclude: ['password'] }
      });
      
      res.status(200).json({
        message: 'Profile updated successfully',
        user
      });
    } catch (error) {
      res.status(500).json({ message: 'Error updating profile', error: error.message });
    }
  };
}

module.exports = new UserController(); 