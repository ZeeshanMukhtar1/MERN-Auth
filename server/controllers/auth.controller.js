import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  // after getting the password from user simply hash it using bcryptjs
  // 1st simple approch
  // const hashedPassword = await bcryptjs.hash(password, 10);
  // 2nd asysnc approch
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    // next(error);
    res.status(500).json(error.message);
  }
};
