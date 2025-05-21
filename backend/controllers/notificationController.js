const Notification = require('../models/notification');

// Create a new notification
exports.createNotification = async (req, res) => {
  try {
    const notification = new Notification(req.body);
    await notification.save();
    res.status(201).send(notification);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Get all notifications
exports.getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({});
    res.send(notifications);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get a notification by ID
exports.getNotificationById = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);
    if (!notification) {
      return res.status(404).send();
    }
    res.send(notification);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update a notification by ID
exports.updateNotification = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!notification) {
      return res.status(404).send();
    }
    res.send(notification);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Delete a notification by ID
exports.deleteNotification = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndDelete(req.params.id);
    if (!notification) {
      return res.status(404).send();
    }
    res.send({ message: 'Notification deleted' });
  } catch (error) {
    res.status(500).send(error);
  }
};