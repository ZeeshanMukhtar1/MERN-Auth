import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, 'user not found in db'));

    const validpassword = bcryptjs.compareSync(password, validUser.password);
    if (!validpassword) return next(errorHandler(401, 'invalid password'));
    // at this stage user is valid, we wanna store something unique from that user (like username , email or _id , _id is best usage )and store it in the browser for future , on future  browser takes that credtilas and send it to server to verify the user
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    // we dont wanna send password to the client
    const { password: hashedPassword, ...rest } = validUser._doc;
    // console.log(validUser);
    const expirydate = new Date(new Date().getTime() + 60 * 60 * 1000); // 1 hour
    res
      .cookie('access_token', token, {
        httpOnly: true,
        expires: expirydate,
      })
      .status(200)
      .json({ ...rest, token });
    // we can see the token and the expires time in the browser network tab in headers section , and can see the cookie in application tab in cookies section, after refresh we still can access the cookie means later we can use it to verify the user
  } catch (error) {
    next(error);
  }
};
