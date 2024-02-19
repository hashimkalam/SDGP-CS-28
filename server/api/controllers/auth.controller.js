import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const Token =require("../models/token.js")
const sendEmail =require("../utils/sendConEmail.js")
const crypto = require("crypto")

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
      process.env.JWT_SECRET // secret key
    );
    const { password: hashedPassword, ...user } = validUser._doc;
    const expiryDate = new Date(Date.now() + 3600000); // 1 hour
    // send the token and user details as a response
    res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: true,
        expires: expiryDate,
        sameSite: "None",
      })
      .status(200)
      .send({
        message: "User logged in successfully",
        user,
      });
  } catch (error) {
    next(error); // send an error response if there is an error
  }
};

export const google = async (req, res, next) => {
  try {
    const validUser = await User.findOne({
      email: req.body.email,
    });

    if (validUser) {
      const token = jwt.sign(
        { id: validUser._id },
        process.env.JWT_SECRET // secret key
      );
      const { password: hashPassword, ...user } = validUser._doc;

      const expiryDate = new Date(Date.now() + 3600000); // 1 hour

      // send the token and user details as a response
      res
        .cookie("access_token", token, {
          httpOnly: true,
          secure: true,
          expires: expiryDate,
          sameSite: "None",
        })
        .status(200)
        .send({
          message: "User logged in successfully",
          user,
        });
    } else {
      const generatedPassword = Math.random().toString(36).slice(-8);

      const hashedPassword = bcrypt.hashSync(generatedPassword, 10);

      const { name, email, photo, role } = req.body;
      console.log(req.body);
      const newUser = new User({
        name:
          name.split(" ").join("").toLowerCase() +
          Math.floor(Math.random() * 1000).toString(),
        email,
        role,
        password: hashedPassword,
        profilePicture: photo,
      });

      await newUser.save();

      const validUser = await User.findOne({
        email: req.body.email,
      });

      const token = jwt.sign(
        { id: validUser._id },
        process.env.JWT_SECRET // secret key
      );

      const expiryDate = new Date(Date.now() + 3600000); // 1 hour

      const { password: hashPassword, ...user } = validUser._doc;

      res
        .cookie("access_token", token, {
          httpOnly: true,
          secure: true,
          expires: expiryDate,
          sameSite: "None",
        })
        .status(200)
        .send({
          message: "User created and logged in successfully",
          user,
        });
    }
  } catch (error) {
    next(error); // send an error response if there is an error
  }
};

export const signout = (req, res) => {
  res
    .clearCookie("access_token")
    .status(200)
    .send("User logged out successfully");
};
