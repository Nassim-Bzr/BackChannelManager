const BaseController = require('./baseController');
const { Message, Booking, Property } = require('../models');

class MessageController extends BaseController {
  constructor() {
    super(Message, {
      include: [
        { model: Booking, as: 'Booking' }
      ]
    });
  }
  
  // Get messages by booking
  getByBooking = async (req, res) => {
    try {
      const bookingId = req.params.bookingId;
      
      // Check if user has access to this booking
      const booking = await Booking.findOne({
        where: { id: bookingId },
        include: [{ 
          model: Property,
          where: req.user.role !== 'admin' ? { user_id: req.user.id } : {},
          required: true
        }]
      });
      
      if (!booking) {
        return res.status(404).json({ message: 'Booking not found or access denied' });
      }
      
      const messages = await Message.findAll({
        where: { booking_id: bookingId },
        order: [['sent_at', 'ASC']]
      });
      
      res.status(200).json(messages);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching messages', error: error.message });
    }
  };
}

module.exports = new MessageController(); 