const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  lineId: { type: String, unique: true },
  displayName: String,
  pictureUrl: String,
  bank: String,
  accountNumber: String,
  qrPicUrl: String,
  contact: String, // IG/FB/เบอร์โทร
  groups: [{ type: mongoose.Schema.Types.ObjectId, ref: "Group" }],
});
module.exports = mongoose.model("User", UserSchema);
