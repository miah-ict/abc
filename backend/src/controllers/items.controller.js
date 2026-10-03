const ItemModel = require('../models/item.model');

exports.getAllItems = async (req, res, next) => {
  try {
    const data = await ItemModel.findAll();
    res.json(data);
  } catch (err) {
    next(err);
  }
};

exports.createItem = async (req, res, next) => {
  try {
    const { title, description, status } = req.body;
    if (!title || !title.trim()) {
      return res.status(400).json({ error: 'Title is required' });
    }
    const data = await ItemModel.create({ title, description, status });
    res.status(201).json(data);
  } catch (err) {
    next(err);
  }
};

exports.updateItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await ItemModel.update(id, req.body);
    if (!data) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json(data);
  } catch (err) {
    next(err);
  }
};

exports.deleteItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await ItemModel.delete(id);
    if (!data) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json({ message: 'Item deleted successfully', ...data });
  } catch (err) {
    next(err);
  }
};
