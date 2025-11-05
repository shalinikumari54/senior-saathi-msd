const express = require('express');
const {
  getRequests,
  getRequest,
  createRequest,
  updateRequest,
  acceptRequest,
  completeRequest,
  deleteRequest,
} = require('../controllers/requestController');
const { protect } = require('../middleware/auth');
const { roleCheck } = require('../middleware/roleCheck');

const router = express.Router();

// All routes require authentication
router.use(protect);

// @route   GET /api/requests
router.get('/', getRequests);

// @route   GET /api/requests/:id
router.get('/:id', getRequest);

// @route   POST /api/requests
router.post('/', roleCheck('senior'), createRequest);

// @route   PUT /api/requests/:id
router.put('/:id', updateRequest);

// @route   PUT /api/requests/:id/accept
router.put('/:id/accept', roleCheck('volunteer'), acceptRequest);

// @route   PUT /api/requests/:id/complete
router.put('/:id/complete', roleCheck('volunteer'), completeRequest);

// @route   DELETE /api/requests/:id
router.delete('/:id', deleteRequest);

module.exports = router;
