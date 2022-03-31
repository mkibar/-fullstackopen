const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  comment: String,
  createDate: Date,
  blog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Blogs",
  },
});

commentSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

commentSchema.methods.getPublicFields = function () {
  var returnObject = {
    comment: this.comment,
    createDate: this.createDate,
    blog: this.blog._id.toString(),
    id: this._id.toString(),
  };
  return returnObject;
};

module.exports = mongoose.model("Comments", commentSchema);
