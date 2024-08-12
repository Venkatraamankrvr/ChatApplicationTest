const express = require('express');
const { createGroup, deleteGroup, addMember, sendMessage, likeMessage } = require('../controllers/groupController');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   POST /api/groups
// @desc    Create a group
// @access  Private
router.post('/', auth, createGroup);

// @route   DELETE /api/groups/:id
// @desc    Delete a group
// @access  Private
router.delete('/:id', auth, deleteGroup);

// @route   POST /api/groups/members
// @desc    Add a member to a group
// @access  Private
router.post('/members', auth, addMember);

// @route   POST /api/groups/messages
// @desc    Send a message in a group
// @access  Private
router.post('/messages', auth, sendMessage);

// @route   POST /api/groups/messages/like
// @desc    Like a message in a group
// @access  Private
router.post('/messages/like', auth, likeMessage);

module.exports = router;
