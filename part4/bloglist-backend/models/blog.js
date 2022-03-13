const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    // validate: {
    //   validator: function (v) {
    //     return /^(\d{2,3}-\d{3,})$/.test(v);
    //   },
    //   //message: 'Phone number format should be xx-xxxxxxx or xxx-xxxxxxxx !',
    //   message: (props) =>
    //     `${props.value} is not a valid phone number! 'Phone number format should be xx-xxxxxxx or xxx-xxxxxxxx !`,
    // },
  },
  author: String,
  url: String,
  likes: Number,
  tags: String,
  createDate: Date,
  lastUpdateDate: Date,
  user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    }
});

blogSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Blogs", blogSchema);
