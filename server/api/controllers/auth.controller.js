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

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return res.status(404).send({
        message: "User not found",
      });
    }
    const validPassword = bcrypt.compareSync(password, validUser.password);
    if (!validPassword) {
      return res.status(401).send({
        message: "Wrong credentials",
      });
    }
    res.status(200).send({
      message: "User logged in successfully",
    });

  } catch (error) {
    next(error);
  }
}
