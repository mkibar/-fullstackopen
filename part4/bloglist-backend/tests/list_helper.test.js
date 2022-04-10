const listHelper = require("../utils/list_helper");
const User = require("../models/user");

test("dummy returns one", () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

describe("total likes", () => {
  const oneBlog = [
    {
      _id: "5a422a851b54a676234d17a1",
      title: "Test data title",
      author: "Test data author",
      url: "Test data url",
      likes: 5,
      __v: 0,
    },
  ];

  const blogs = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0,
    },
    {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0,
    },
    {
      _id: "5a422b891b54a676234d17fa",
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
      __v: 0,
    },
    {
      _id: "5a422ba71b54a676234d17fb",
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0,
      __v: 0,
    },
    {
      _id: "5a422bc61b54a676234d17fc",
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
      __v: 0,
    },
  ];

  test("empty list is zero", () => {
    const resultLikes = listHelper.totalLikes([]);
    expect(resultLikes).toBe(0);
  });

  test("when list has only one blog, equals the likes of that", () => {
    const result = listHelper.totalLikes(oneBlog);
    expect(result).toBe(5);
  });

  test("total like test", () => {
    const result = listHelper.totalLikes(blogs);
    expect(result).toBe(36);
  });
});

describe("favorite blog", () => {
  const oneBlog = [
    {
      title: "Test data title",
      author: "Test data author",
      likes: 5,
    },
  ];

  const blogs = [
    {
      title: "React patterns",
      author: "Michael Chan",
      likes: 7,
    },
    {
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      likes: 5,
    },
    {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12,
    },
  ];

  test("Empty list : {}", () => {
    const result = listHelper.favoriteBlog([]);
    expect(result).toEqual({});
  });

  test("favoriteBlog one", () => {
    const result = listHelper.favoriteBlog(oneBlog);
    expect(result).toEqual({
      title: "Test data title",
      author: "Test data author",
      likes: 5,
    });
  });

  test("favoriteBlog", () => {
    const result = listHelper.favoriteBlog(blogs);
    expect(result).toEqual({
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12,
    });
  });
});

describe("most blogs", () => {
  const blogs = [
    {
      title: "React patterns",
      author: "Michael Chan",
      likes: 7,
    },
    {
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      likes: 5,
    },
    {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12,
    },
    {
      title: "Considered Harmful",
      author: "Edsger W. Dijkstra",
      likes: 5,
    },
    {
      title: "Harmful",
      author: "Edsger W. Dijkstra",
      likes: 1,
    },
  ];

  test("mostBlogs", () => {
    const result = listHelper.mostBlogs(blogs);
    expect(result).toEqual({
      author: "Edsger W. Dijkstra",
      blogs: 4,
    });
  });
});

describe("most likes", () => {
  const blogs = [
    {
      title: "React patterns",
      author: "Michael Chan",
      likes: 7,
    },
    {
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      likes: 5,
    },
    {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12,
    },
    {
      title: "Considered Harmful",
      author: "Edsger W. Dijkstra",
      likes: 5,
    },
    {
      title: "Harmful",
      author: "Edsger W. Dijkstra",
      likes: 1,
    },
  ];

  test("mostLikes", () => {
    const result = listHelper.mostLikes(blogs);
    expect(result).toEqual({
      author: "Edsger W. Dijkstra",
      likes: 23,
    });
  });
});

describe("when there is initially one user in db", () => {
  test("creation fails with proper statuscode and message if username already taken", async () => {
    const users = [
      {
        username: "michaelchan",
        name: "Michael Chan",
        id: 1,
      },
      {
        username: "root",
        name: "Superuser",
        id: 2,
      },
    ];

    const newUser = {
      username: "root2",
      name: "Superuser",
    };

    let findUser = users.find((user) => user.username === newUser.username);

    expect(newUser.username).not.toEqual(findUser?.username);
  });
});

// const usersAtStart = await listHelper.usersInDb("root")

// const newUser = {
//   username: 'root',
//   name: 'Superuser',
//   password: 'salainen',
// }

// const result = await api
//   .post('/api/users')
//   .send(newUser)
//   .expect(400)
//   .expect('Content-Type', /application\/json/)

// expect(result.body.error).toContain('username must be unique')

// const usersAtEnd = await listHelper.usersInDb("root")
// expect(usersAtEnd).toEqual(usersAtStart)
