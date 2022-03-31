const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const Comment = require("../models/comment");
const User = require("../models/user");
const auth = require("../utils/auth");

blogRouter.get("/", auth, (request, response) => {
  Blog.find({})
    .populate("user", { username: 1, name: 1, id: 1 })
    .then((blogs) => {
      response.json(blogs);
    });
});

blogRouter.get("/:id", auth, (request, response, next) => {
  Blog.findById(request.params.id)
    .then((blog) => {
      if (blog) {
        response.json(blog);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

blogRouter.get("/:id/comments", auth, (request, response, next) => {
  Comment.find({ blog: request.params.id })
    .then((comment) => {
      if (comment) {
        response.json(comment);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

// post comment from a blog
blogRouter.post("/:id/comments", auth, (request, response, next) => {
  Blog.findById(request.params.id)
    .then((blog) => {
      if (blog) {
        const body = request.body;

        const comment = new Comment({
          comment: body.comment,
          createDate: new Date(),
          blog: blog,
        });

        comment
          .save()
          .then((savedComment) => {
            if (savedComment) {
              response.json(savedComment.getPublicFields());
            } else {
              response.status(404).end();
            }
          })
          .catch((error) => next(error));
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

blogRouter.post("/", auth, async (request, response, next) => {
  const body = request.body;

  const user = await User.findById(request.user.id);
  if (!user) {
    return response.status(401).json({
      error: "User not found",
    });
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    tags: body.tags,
    likes: 0,
    createDate: new Date(),
    user: user,
  });

  const savedBlog = await blog.save().catch((error) => next(error));

  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.json(savedBlog);
});

blogRouter.delete("/:id", auth, async (request, response, next) => {
  const post = await Blog.findById(request.params.id).catch((error) =>
    next(error)
  );

  if (post) {
    if (post.user.toString() === request.user.id) {
      post.remove().catch((error) => next(error));
      response.status(204).end();
    } else {
      response.status(401).json({
        error: "You can only delete your own posts",
      });
    }
  } else {
    response.status(401).json({
      error: "Post not found",
    });
  }
});

blogRouter.put("/:id", auth, (request, response, next) => {
  const body = request.body;

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    tags: body.tags,
    likes: body.likes,
    lastUpdateDate: new Date(),
  };

  let updateOptions = { new: true, runValidators: true };
  Blog.findByIdAndUpdate(request.params.id, blog, updateOptions)
    .populate("user", { username: 1, name: 1, id: 1 })
    .then((updatedBlog) => {
      response.json(updatedBlog);
    })
    .catch((error) => next(error));
});

module.exports = blogRouter;
