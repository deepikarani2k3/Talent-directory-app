const Talent = require('../models/Talent');
exports.getTalents = async (req, res) => {
  try {
    const { skill } = req.query;
    let query = {};

    if (skill) {
      // Filter by skill (case-insensitive)
      query.skills = { $regex: skill, $options: 'i' };
    }

    const talents = await Talent.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: talents.length,
      data: talents
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching talents',
      error: error.message
    });
  }
};
exports.addTalent = async (req, res) => {
  try {
    const { name, email, skills, experience } = req.body;

    // Validation
    if (!name || !email || !skills || experience === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: name, email, skills, experience'
      });
    }

    if (!Array.isArray(skills) || skills.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Skills must be an array with at least one skill'
      });
    }

    if (experience < 0 || experience > 70) {
      return res.status(400).json({
        success: false,
        message: 'Experience must be between 0 and 70 years'
      });
    }

    // Check if email already exists
    const existingTalent = await Talent.findOne({ email: email.toLowerCase() });
    if (existingTalent) {
      return res.status(400).json({
        success: false,
        message: 'Email already exists'
      });
    }

    const talent = new Talent({
      name,
      email: email.toLowerCase(),
      skills: skills.map(s => s.trim()),
      experience
    });

    await talent.save();

    res.status(201).json({
      success: true,
      message: 'Talent added successfully',
      data: talent
    });
  } catch (error) {
    // Handle validation errors from schema
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: messages
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error adding talent',
      error: error.message
    });
  }
};
