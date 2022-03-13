const User = require('../models/user')

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((a, e) => a + e.likes, 0);
};

const favoriteBlog = (blogs) => {
  return blogs.reduce(function (prev, current) {
    return prev.likes > current.likes ? prev : current;
  });
};

const mostBlogs = (blogs) => {
  let output = Object.values(
    blogs.reduce((obj, { author }) => {
      if (obj[author] === undefined) obj[author] = { author: author, blogs: 1 };
      else obj[author].blogs++;
      return obj;
    }, {})
  );

  return output.reduce(function (prev, current) {
    return prev.blogs > current.blogs ? prev : current;
  });
};

const mostLikes = (blogs) => {
  let output = Object.values(
    blogs.reduce((obj, { author, likes }) => {
      if (obj[author] === undefined)
        obj[author] = { author: author, likes: likes };
      else obj[author].likes += likes;
      return obj;
    }, {})
  );

  return output.reduce(function (prev, current) {
    return prev.blogs > current.blogs ? prev : current;
  });
};

const usersInDb = async (userName) => {
    const users = await User.find({username:userName})
    return users.map(u => u.toJSON())
  }

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,

  usersInDb
};
