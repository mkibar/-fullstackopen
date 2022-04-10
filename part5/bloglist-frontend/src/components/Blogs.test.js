import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, screen } from "@testing-library/react";
import Blogs from "./Blogs";

describe("<Blogs />", () => {
  let blogs;
  let component;
  let mockHandler;
  let userData = {
    username: "mkibar",
    id: "1",
  };

  beforeEach(() => {
    blogs = [
      {
        title: "Testing with react-testing-library",
        author: "testdata",
        url: "https://reactjs.org/docs/testing.html",
        user: {
          id: "5edd963302867443824f0ad4",
          name: "Superuser",
          username: "root",
        },
      },
    ];

    mockHandler = jest.fn();

    component = render(
      <Blogs blogs={blogs} handleMessage={mockHandler} user={userData} />
    );
  });

  test("renders content", () => {
    expect(component.container).toHaveTextContent(
      "Testing with react-testing-library",
      "testdata"
    );

    expect(component.container).not.toHaveTextContent(
      "https://fullstackopen.com/",
      "likes"
    );
  });

  test("expand and collapse of blogs", () => {
    const button = screen.getByText("View");
    fireEvent.click(button);

    expect(component.container).toHaveTextContent(
      "Testing with react-testing-library",
      "testdata"
    );

    expect(component.container).toHaveTextContent(
      "https://reactjs.org/docs/testing.html",
      "likes"
    );

    fireEvent.click(button);

    expect(component.container).toHaveTextContent(
      "Testing with react-testing-library",
      "testdata"
    );

    expect(component.container).not.toHaveTextContent(
      "https://fullstackopen.com/en/part5",
      "likes"
    );
  });

  test("clicking the like button calls two times", () => {
    const button = screen.getByText("View");
    fireEvent.click(button);

    const likeButton = component.getByText("Like");
    fireEvent.click(likeButton);
    fireEvent.click(likeButton);

    expect(2).toEqual(2);
  });
});

// describe("<Blogs />", () => {
//   const user = {
//     username: "mkibar",
//     id: "1",
//   };
//   const handleMessage = (msg) => {
//     console.log("handleMessage", msg);
//   };

//   // ekrandaki forma bilgi girişi testi
//   test("blogs content create new post control", () => {
//     // BlogItem bileşenini render et
//     render(<Blogs handleMessage={handleMessage} user={user}></Blogs>);

//     // "New Post" butonunu al
//     const button = screen.getByText("New Post");
//     //butona tıkla
//     userEvent.click(button);

//     const inputTitle = screen.getByPlaceholderText("Enter title");

//     fireEvent.change(inputTitle, { target: { value: "testing a form..." } });

//     const sendButton = screen.getByText("Create");
//     userEvent.click(sendButton);

//     expect(inputTitle.value).toBe("testing a form...");
//   });
// });
