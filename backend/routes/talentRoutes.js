const express = require('express');
const { getTalents, addTalent } = require('../controllers/talentController');

const router = express.Router();

router.get('/', getTalents);
router.post('/', addTalent);

module.exports = router;
