const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;

const tokenSchema = new Schema({
  userId: {
    type: Schema.Types.Objectid,
    required: true,
    ref: "user",
    unique: true,
  },
  token: { type: String, required: true },
  createdAt: { typel: Date, default: Date.now(), expires: 3600 }, // 1 Hour
});

module.exports = mongoose.model("token", tokenSchema);
