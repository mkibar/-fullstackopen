const usersRouter = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const auth = require("../utils/auth");

usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs", {
    title: 1,
    author: 1,
    id: 1,
    url: 1,
  });
  response.json(users);
});

usersRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body;
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return response.status(400).json({
      error: "username must be unique",
    });
  }

  const saltRounds = 12;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();

  response.status(201).json(savedUser);
});

// blogRouter.get("/", (request, response) => {
//   User.find({}).then((blogs) => {
//     response.json(blogs);
//   });
// });

// blogRouter.get("/:id", (request, response, next) => {
//   Blog.findById(request.params.id)
//     .then((blog) => {
//       if (blog) {
//         response.json(blog);
//       } else {
//         response.status(404).end();
//       }
//     })
//     .catch((error) => next(error));
// });

// blogRouter.post("/", (request, response, next) => {
//   const body = request.body;

//   const blog = new Blog({
//     title: body.title,
//     author: body.author,
//     url: body.url,
//     tags: body.tags,
//     likes:0,
//     createDate: new Date(),
//   });

//   blog
//     .save()
//     .then((savedBlog) => {
//       response.json(savedBlog);
//     })
//     .catch((error) => next(error));
// });

// blogRouter.delete("/:id", (request, response, next) => {
//   console.log("request.params.id", request.params.id);
//   Blog.findByIdAndRemove(request.params.id)
//     .then(() => {
//       response.status(204).end();
//     })
//     .catch((error) => next(error));
// });

// blogRouter.put("/:id", (request, response, next) => {
//   const body = request.body;

//   const blog = {
//     title: body.title,
//     author: body.author,
//     url: body.url,
//     tags: body.tags,
//     likes:body.likes,
//     lastUpdateDate: new Date(),
//   };

//   let updateOptions = { new: true, runValidators: true };
//   Blog.findByIdAndUpdate(request.params.id, blog, updateOptions)
//     .then((updatedBlog) => {
//       response.json(updatedBlog);
//     })
//     .catch((error) => next(error));
// });

module.exports = usersRouter;
