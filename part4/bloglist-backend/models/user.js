const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, minlength: 3, maxlength: 25, unique: true },
  passwordHash: { type: String, minlength: 3 },
  name: String,
  createDate: Date,
  lastUpdateDate: Date,
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blogs",
    },
  ],
});

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  },
});

module.exports = mongoose.model("Users", userSchema);
