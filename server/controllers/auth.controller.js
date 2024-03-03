import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs'; // bcrypt and bcryptjs are not the same , brrypt create issues in production
import { errorHandler } from '../utils/error.js';

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  // aftet gettti g the password from user we will hash it ⭐
  // const hashassword = await bcryptjs.hash(password, 10); 1st approch
  const hasdhassword = bcryptjs.hashSync(password, 10); // 2nd async approch
  const newUser = new User({ username, email, password: hasdhassword });
  try {
    await newUser.save();
    res.status(201).json('User created successfully!');
  } catch (error) {
    next(error);
    // In case we need to show a custom error using the constructor
    // next(errorHandler(300, 'wrong data'));
  }
};
