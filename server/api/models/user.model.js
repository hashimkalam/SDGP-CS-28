import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  role: {
    type: String,
    enum: ['user', 'architect'],
    default: 'user',
    required: true,
  },
  password: {
    type: String,
    required: true,
  }
}, {
    timestamps: true,
});

// Create a model from the schema
const User = mongoose.model('User', userSchema); // 'User' is the name of the model

// Export the model
export default User;