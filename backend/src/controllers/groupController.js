const Group = require('../models/Group');
const Message = require('../models/Message');

exports.createGroup = async (req, res) => {
  const { name } = req.body;
  const ownerId = req.user.id;

  try {
    const group = new Group({ name, owner: ownerId });
    await group.save();
    res.status(201).json({ message: 'Group created successfully', group });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.deleteGroup = async (req, res) => {
  const { id } = req.params;
  const ownerId = req.user.id;

  try {
    const group = await Group.findById(id);
    if (!group) return res.status(404).json({ error: 'Group not found' });
    if (group.owner.toString() !== ownerId) return res.status(403).json({ error: 'Unauthorized' });

    await group.remove();
    res.json({ message: 'Group deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.addMember = async (req, res) => {
  const { groupId, userId } = req.body;

  try {
    const group = await Group.findById(groupId);
    if (!group) return res.status(404).json({ error: 'Group not found' });

    group.members.push(userId);
    await group.save();
    res.json({ message: 'Member added successfully', group });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.sendMessage = async (req, res) => {
  const { groupId, content } = req.body;
  const senderId = req.user.id;

  try {
    const message = new Message({ content, sender: senderId, group: groupId });
    await message.save();
    res.status(201).json({ message: 'Message sent successfully', message });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.likeMessage = async (req, res) => {
  const { messageId } = req.body;
  const userId = req.user.id;

  try {
    const message = await Message.findById(messageId);
    if (!message) return res.status(404).json({ error: 'Message not found' });

    if (!message.likes.includes(userId)) {
      message.likes.push(userId);
      await message.save();
    }

    res.json({ message: 'Message liked successfully', message });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
