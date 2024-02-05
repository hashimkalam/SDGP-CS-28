import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

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
