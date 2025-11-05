const Request = require('../models/Request');

// @desc    Get all requests
// @route   GET /api/requests
// @access  Private
const getRequests = async (req, res) => {
  try {
    let requests;

    if (req.user.role === 'admin') {
      requests = await Request.find({})
        .populate('seniorId', 'name email phone')
        .populate('volunteerId', 'name email phone');
    } else if (req.user.role === 'volunteer') {
      requests = await Request.find({ status: 'pending' })
        .populate('seniorId', 'name email phone');
    } else {
      // Senior can see their own requests
      requests = await Request.find({ seniorId: req.user._id })
        .populate('volunteerId', 'name email phone');
    }

    res.status(200).json(requests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get single request
// @route   GET /api/requests/:id
// @access  Private
const getRequest = async (req, res) => {
  try {
    const request = await Request.findById(req.params.id)
      .populate('seniorId', 'name email phone')
      .populate('volunteerId', 'name email phone');

    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    // Check if user is authorized to view this request
    if (
      req.user.role !== 'admin' &&
      request.seniorId._id.toString() !== req.user._id.toString() &&
      request.volunteerId?._id.toString() !== req.user._id.toString()
    ) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    res.status(200).json(request);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create new request
// @route   POST /api/requests
// @access  Private/Senior
const createRequest = async (req, res) => {
  const { description, location, urgency } = req.body;

  try {
    const request = await Request.create({
      seniorId: req.user._id,
      description,
      location,
      urgency: urgency || 'medium',
    });

    const populatedRequest = await Request.findById(request._id)
      .populate('seniorId', 'name email phone');

    res.status(201).json(populatedRequest);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update request
// @route   PUT /api/requests/:id
// @access  Private
const updateRequest = async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    // Check authorization
    if (req.user.role !== 'admin' && request.seniorId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const updatedRequest = await Request.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
      .populate('seniorId', 'name email phone')
      .populate('volunteerId', 'name email phone');

    res.status(200).json(updatedRequest);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Accept request (Volunteer)
// @route   PUT /api/requests/:id/accept
// @access  Private/Volunteer
const acceptRequest = async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    if (request.status !== 'pending') {
      return res.status(400).json({ message: 'Request is not available' });
    }

    const updatedRequest = await Request.findByIdAndUpdate(
      req.params.id,
      { volunteerId: req.user._id, status: 'accepted' },
      { new: true }
    )
      .populate('seniorId', 'name email phone')
      .populate('volunteerId', 'name email phone');

    res.status(200).json(updatedRequest);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Complete request
// @route   PUT /api/requests/:id/complete
// @access  Private/Volunteer
const completeRequest = async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    if (request.volunteerId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const updatedRequest = await Request.findByIdAndUpdate(
      req.params.id,
      { status: 'completed' },
      { new: true }
    )
      .populate('seniorId', 'name email phone')
      .populate('volunteerId', 'name email phone');

    res.status(200).json(updatedRequest);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete request
// @route   DELETE /api/requests/:id
// @access  Private/Admin or Senior
const deleteRequest = async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    // Check authorization
    if (
      req.user.role !== 'admin' &&
      request.seniorId.toString() !== req.user._id.toString()
    ) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await Request.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: 'Request removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getRequests,
  getRequest,
  createRequest,
  updateRequest,
  acceptRequest,
  completeRequest,
  deleteRequest,
};
