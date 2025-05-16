// Generic CRUD controller for all models
class BaseController {
  constructor(model, options = {}) {
    this.model = model;
    this.options = options;
    this.associationsToInclude = options.include || [];
  }

  // Get all records
  getAll = async (req, res) => {
    try {
      const query = {
        include: this.associationsToInclude
      };
      
      // Add filtering for user_id if applicable
      if (this.options.userSpecific && req.user && !req.user.role !== 'admin') {
        query.where = { user_id: req.user.id };
      }

      const records = await this.model.findAll(query);
      res.status(200).json(records);
    } catch (error) {
      res.status(500).json({ message: `Error fetching ${this.model.name}s`, error: error.message });
    }
  };

  // Get a specific record by ID
  getById = async (req, res) => {
    try {
      const id = req.params.id;
      const query = {
        where: { id },
        include: this.associationsToInclude
      };
      
      // Add filtering for user_id if applicable
      if (this.options.userSpecific && req.user && req.user.role !== 'admin') {
        query.where.user_id = req.user.id;
      }

      const record = await this.model.findOne(query);
      
      if (!record) {
        return res.status(404).json({ message: `${this.model.name} not found` });
      }
      
      res.status(200).json(record);
    } catch (error) {
      res.status(500).json({ message: `Error fetching ${this.model.name}`, error: error.message });
    }
  };

  // Create a new record
  create = async (req, res) => {
    try {
      // Add user_id if applicable
      if (this.options.userSpecific && req.user) {
        req.body.user_id = req.user.id;
      }

      const record = await this.model.create(req.body);
      
      res.status(201).json({
        message: `${this.model.name} created successfully`,
        data: record
      });
    } catch (error) {
      res.status(500).json({ message: `Error creating ${this.model.name}`, error: error.message });
    }
  };

  // Update an existing record
  update = async (req, res) => {
    try {
      const id = req.params.id;
      const query = {
        where: { id }
      };
      
      // Add filtering for user_id if applicable
      if (this.options.userSpecific && req.user && req.user.role !== 'admin') {
        query.where.user_id = req.user.id;
      }

      const [updated] = await this.model.update(req.body, query);
      
      if (updated === 0) {
        return res.status(404).json({
          message: `${this.model.name} not found or you don't have permission to update it`
        });
      }
      
      const updatedRecord = await this.model.findByPk(id, {
        include: this.associationsToInclude
      });
      
      res.status(200).json({
        message: `${this.model.name} updated successfully`,
        data: updatedRecord
      });
    } catch (error) {
      res.status(500).json({ message: `Error updating ${this.model.name}`, error: error.message });
    }
  };

  // Delete a record
  delete = async (req, res) => {
    try {
      const id = req.params.id;
      const query = {
        where: { id }
      };
      
      // Add filtering for user_id if applicable
      if (this.options.userSpecific && req.user && req.user.role !== 'admin') {
        query.where.user_id = req.user.id;
      }

      const deleted = await this.model.destroy(query);
      
      if (deleted === 0) {
        return res.status(404).json({
          message: `${this.model.name} not found or you don't have permission to delete it`
        });
      }
      
      res.status(200).json({
        message: `${this.model.name} deleted successfully`,
        id
      });
    } catch (error) {
      res.status(500).json({ message: `Error deleting ${this.model.name}`, error: error.message });
    }
  };
}

module.exports = BaseController; 