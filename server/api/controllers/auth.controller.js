import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  // Get the name, email, role and password from the request body
  const { username, email, role, password } = req.body;

  // add hashpassword to the password
  const hashedPassword = bcrypt.hashSync(password, 10);

  // create a new user with the details
  const newUser = new User({
    name: username,
    email,
    role,
    password: hashedPassword,
  });

  try {
    // save the user to the database
    await newUser.save();

    // send a success response
    res.status(201).send({
      message: "User created successfully",
    });
  } catch (error) {
    // send an error response if there is an error
    console.error(error.message);

    next(error);
  }
};

export const signin = async (req, res, next) => {
  // Get the email and password from the request body
  const { email, password } = req.body;

  // find the user with the email
  try {
    const validUser = await User.findOne({ email });

    // send a not found error if the user is not found
    if (!validUser) {
      return res.status(404).send({
        message: "User not found",
      });
    }

    // compare the password with the hashed password
    const validPassword = bcrypt.compareSync(password, validUser.password);
    if (!validPassword) {
      return res.status(401).send({
        message: "Wrong credentials",
      });
    }

    // create a token with the user id
    const token = jwt.sign(
      { id: validUser._id },    
      process.env.JWT_SECRET,     // secret key
      {
        expiresIn: "1d",          // token expires in 1 day
      }
    );
    const { password: hashedPassword, ...user } = validUser._doc;

    // send the token and user details as a response
    res
      .cookie("access_token", token, {
        httpOnly: true,                   // cookie is not accessible via client-side script
        secure: process.env.NODE_ENV === "production",      // cookie will only be sent over HTTPS
      })
      .status(200)
      .send({                                     // send the token and user details as a response
        message: "User logged in successfully",
        user,
      });
  } catch (error) {
    next(error);      // send an error response if there is an error
  }
};
