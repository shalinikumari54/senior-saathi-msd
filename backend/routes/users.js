const express = require('express');
const {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} = require('../controllers/userController');
const { protect } = require('../middleware/auth');
const { roleCheck } = require('../middleware/roleCheck');

const router = express.Router();

// All routes require authentication
router.use(protect);

// @route   GET /api/users
router.get('/', roleCheck('admin'), getUsers);

// @route   GET /api/users/:id
router.get('/:id', getUser);

// @route   PUT /api/users/:id
router.put('/:id', updateUser);

// @route   DELETE /api/users/:id
router.delete('/:id', roleCheck('admin'), deleteUser);

module.exports = router;
