const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Dealer = require('../models/Dealer');

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const dealer = await Dealer.findOne({ where: { username } });
    if (!dealer) {
      return res.status(401).json({ message: 'User not found' });
    }

    const isMatch = bcrypt.compareSync(password, dealer.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Wrong password' });
    }

    const token = jwt.sign(
      { id: dealer.id, username: dealer.username },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
  
};
