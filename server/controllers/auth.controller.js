import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

// Function to generate placeholder image URL based on the first character of the username
const generatePlaceholderImage = (username) => {
  const initial = username.charAt(0).toLowerCase();
  return `https://ui-avatars.com/api/?name=${initial}&size=200`;
};

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  // Generate profile picture URL based on username
  const profilePicture = generatePlaceholderImage(username);
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
    profilePicture,
  });
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

export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: hashedPassword, ...rest } = user._doc;
      const expiryDate = new Date(Date.now() + 3600000); // 1 hour
      res
        .cookie('access_token', token, {
          httpOnly: true,
          expires: expiryDate,
        })
        .status(200)
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      // Generate profile picture URL based on username
      const profilePicture = generatePlaceholderImage(req.body.name);
      const newUser = new User({
        username:
          req.body.name.split(' ').join('').toLowerCase() +
          Math.random().toString(36).slice(-8),
        email: req.body.email,
        password: hashedPassword,
        profilePicture: req.body.photo || profilePicture, //// Use photo from Google response if available, otherwise generate placeholder image URL
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: hashedPassword2, ...rest } = newUser._doc;
      const expiryDate = new Date(Date.now() + 3600000); // 1 hour
      res
        .cookie('access_token', token, {
          httpOnly: true,
          expires: expiryDate,
        })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};

export const signout = (req, res) => {
  res
    .clearCookie('access_token')
    .json({ message: 'user has been logout successfully' });
};
