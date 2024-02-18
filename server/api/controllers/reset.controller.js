import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const resetPassword = async (req, res, next) => {
  const { email, newPassword } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send({
        message: "User not found",
      });
    }

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