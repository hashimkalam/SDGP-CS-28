import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const resetPassword = async (req, res, next) => {
  const { email, newPassword } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send({
        message: "User not found",
      });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    transporter.sendMail({
      from: process.env.EMAIL_ADDRESS, // sender address
      to: email, // send to user's email address
      subject: 'Password Reset Successful',
      text: 'Your password has been successfully reset.', // plain text body
      html: '<p>Your password has been <strong>successfully reset</strong>. If you did not request this change, please contact our support immediately.</p>', // html body
    }, (error, info) => {
      if (error) {
        console.log('Error sending email', error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

    const hashedPassword = bcrypt.hashSync(newPassword, 10);

    await User.updateOne(
      { email },
      { password: hashedPassword }
    );

    res.status(200).send({
      message: "Password reset successful",
    });
  } catch (error) {
    next(error);
  }
};