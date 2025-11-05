const Feedback = require('../models/Feedback');
const Request = require('../models/Request');

// @desc    Get all feedback
// @route   GET /api/feedback
// @access  Private/Admin
const getFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find({})
      .populate('userId', 'name email')
      .populate('requestId', 'description status')
      .sort({ createdAt: -1 });

    res.status(200).json(feedbacks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get feedback for a request
// @route   GET /api/feedback/request/:requestId
// @access  Private
const getFeedbackByRequest = async (req, res) => {
  try {
    const feedback = await Feedback.findOne({ requestId: req.params.requestId })
      .populate('userId', 'name email')
      .populate('requestId', 'description status');

    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }

    res.status(200).json(feedback);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create new feedback
// @route   POST /api/feedback
// @access  Private
const createFeedback = async (req, res) => {
  const { requestId, message, rating } = req.body;

  try {
    // Check if request exists and is completed
    const request = await Request.findById(requestId);
    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    if (request.status !== 'completed') {
      return res.status(400).json({ message: 'Can only provide feedback for completed requests' });
    }

    // Check if user is authorized (senior who made the request)
    if (request.seniorId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized to provide feedback' });
    }

    // Check if feedback already exists
    const existingFeedback = await Feedback.findOne({ requestId });
    if (existingFeedback) {
      return res.status(400).json({ message: 'Feedback already exists for this request' });
    }

    const feedback = await Feedback.create({
      userId: req.user._id,
      requestId,
      message,
      rating,
    });

    const populatedFeedback = await Feedback.findById(feedback._id)
      .populate('userId', 'name email')
      .populate('requestId', 'description status');

    res.status(201).json(populatedFeedback);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update feedback
// @route   PUT /api/feedback/:id
// @access  Private
const updateFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);

    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }

    // Check if user owns the feedback
    if (feedback.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const updatedFeedback = await Feedback.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
      .populate('userId', 'name email')
      .populate('requestId', 'description status');

    res.status(200).json(updatedFeedback);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete feedback
// @route   DELETE /api/feedback/:id
// @access  Private/Admin or Owner
const deleteFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);

    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }

    // Check authorization
    if (
      req.user.role !== 'admin' &&
      feedback.userId.toString() !== req.user._id.toString()
    ) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await Feedback.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: 'Feedback removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getFeedbacks,
  getFeedbackByRequest,
  createFeedback,
  updateFeedback,
  deleteFeedback,
};
