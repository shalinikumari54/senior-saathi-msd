const express = require('express');
const {
  getFeedbacks,
  getFeedbackByRequest,
  createFeedback,
  updateFeedback,
  deleteFeedback,
} = require('../controllers/feedbackController');
const { protect } = require('../middleware/auth');
const { roleCheck } = require('../middleware/roleCheck');

const router = express.Router();

// All routes require authentication
router.use(protect);

// @route   GET /api/feedback
router.get('/', roleCheck('admin'), getFeedbacks);

// @route   GET /api/feedback/request/:requestId
router.get('/request/:requestId', getFeedbackByRequest);

// @route   POST /api/feedback
router.post('/', createFeedback);

// @route   PUT /api/feedback/:id
router.put('/:id', updateFeedback);

// @route   DELETE /api/feedback/:id
router.delete('/:id', deleteFeedback);

module.exports = router;
