const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/user');

const signup = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        const existingUser = await UserModel.findOne({ email });

        if (existingUser) {
            return res.status(409).json({ message: "User already exists, you can log in", success: false });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new UserModel({ firstName, lastName, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: "Signup successful", success: true });
    } catch (err) {
        console.error('Signup error:', err);
        res.status(500).json({ message: "Internal server error", success: false });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(403).json({ message: 'Invalid email or password', success: false });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(403).json({ message: 'Invalid email or password', success: false });
        }

        const jwtToken = jwt.sign({ email: user.email, _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.status(200).json({
            message: "Login successful",
            success: true,
            jwtToken,
            email,
            name: `${user.firstName} ${user.lastName}`
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: "Internal server error", success: false });
    }
};

const update = async (req, res) => {
  try {
      const { firstName, lastName, bio } = req.body;
      const userId = req.user._id;

      const user = await UserModel.findById(userId);

      if (!user) {
          return res.status(404).json({ message: 'User not found', success: false });
      }

      user.firstName = firstName || user.firstName;
      user.lastName = lastName || user.lastName;
      user.bio = bio || user.bio;

      // Handling image upload
      if (req.file) {
          user.image = req.file.path; // Assuming image is saved on the server
      }

      await user.save();

      res.json({ message: 'Profile updated successfully', success: true });
  } catch (error) {
      console.error('Error updating profile:', error.message);
      res.status(500).json({ message: 'Internal server error', success: false });
  }
};


const get = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await UserModel.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found', success: false });
        }

        res.json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: "Internal server error", success: false });
    }
};

module.exports = {
    signup,
    login,
    update,
    get
};
