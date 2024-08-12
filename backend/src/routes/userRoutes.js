const express = require('express');
const { createUser, editUser } = require('../controllers/userController');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   POST /api/users
// @desc    Create a user (Admin only)
// @access  Private
router.post('/', auth, createUser);

// @route   PUT /api/users/:id
// @desc    Edit a user (Admin only)
// @access  Private
router.put('/:id', auth, editUser);

module.exports = router;
