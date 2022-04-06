const jwt = require("jsonwebtoken");
const Author = require("../models/author");
const Book = require("../models/book");
const User = require("../models/user");
const { UserInputError, AuthenticationError } = require("apollo-server");
const { PubSub } = require("graphql-subscriptions");
const { JWT_SECRET } = require("../utils/config");
const pubsub = new PubSub();

const resolvers = {
  Query: {
    bookCount: async () => await Book.collection.countDocuments(),
    authorCount: async () => await Author.collection.countDocuments(),
    allAuthors: async () => {
      const authors = await Author.find({});
      return authors.map((author) => {
        return { ...author._doc, bookCount: author.books.length };
      });
    },
    allBooks: async (root, args) => {
      console.log("args:", args);
      if (args.author && args.genre) {
        return await Book.find({
          author: { name: args.author },
          genres: { $in: args.genre },
        }).populate("author", { name: 1, born: 1, _id: 1 });
      } else if (args.author) {
        return await Book.find({ author: { name: args.author } }).populate(
          "author",
          { name: 1, born: 1, _id: 1 }
        );
      } else if (args.genre) {
        return await Book.find({ genres: { $in: args.genre } }).populate(
          "author",
          { name: 1, born: 1, _id: 1 }
        );
      } else {
        return await Book.find({}).populate("author", {
          name: 1,
          born: 1,
          _id: 1,
        });
      }
    },
    me: async (root, args, context) => {
      return context.currentUser;
    },
  },
  Author: {
    bookCount: async (root) => {
      // TODO: count fonksiyonu ile yap
      const author = await Author.findOne({ name: root.name });
      return author?.books.length;
    },
  },
  Mutation: {
    addBook: async (root, args, context) => {
      console.log("addBook>args:", args);
      const currentUser = context.currentUser;
      if (!currentUser) {
        console.log("currentUser not found");
        throw new AuthenticationError("not authenticated");
      }

      // yazarı ara
      var author = await Author.findOne({ name: args.author }).exec();
      if (!author) {
        // Yazar yoksa yazarı ekle
        const newAuthor = new Author({
          name: args.author,
          born: null,
        });

        try {
          author = await newAuthor.save();
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          });
        }
      }

      // Yazarın yazısını oluştur
      const newBook = new Book({
        title: args.title,
        published: args.published,
        genres: args.genres,
        author: author,
      });
      //const newBook = new Book({ ...args, author })

      console.log("addBook>newBook", newBook);

      let book = null;
      try {
        book = await newBook.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }

      // Yazarın yazılarını güncelle
      author.books = author.books.concat(book._id);
      try {
        author.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }

      pubsub.publish("BOOK_ADDED", { bookAdded: book });

      return book;
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new AuthenticationError("not authenticated");
      }

      let updateOptions = { new: true };
      let author = await Author.findOneAndUpdate(
        { name: args.name },
        { born: args.setBornTo },
        updateOptions
      );
      return author;

      // 2. yöntem
      // const author = await Author.findOne({ name: args.name });
      // if (!author) {
      //   throw new UserInputError("Author not found");
      // }
      // const updateObj = { born: args.setBornTo };
      // await author.updateOne(updateObj);

      // const updatedDoc = await Author.findOne({ name: args.name });
      // return updatedDoc;
    },
    createUser: async (root, args) => {
      let u = await User.findOne({ username: args.username });
      console.log("createUser>u", u);
      if (u) {
        throw new UserInputError("User exist");
      }

      const user = new User({
        username: args.username,
        password: "secret",
        favoriteGenre: args.favoriteGenre,
      });

      return await user.save().catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      });
    },
    login: async (root, args) => {
        console.log("login>args", args);
      const user = await User.findOne({ username: args.username });
      console.log("login>user", user);
      if (!user || args.password !== "secret") {
        throw new UserInputError("wrong credentials");
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, JWT_SECRET) };
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(["BOOK_ADDED"]),
    },
  },
};

module.exports = resolvers;
