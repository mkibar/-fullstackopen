import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blogs from "./Blogs";

describe("<Blogs />", () => {
  const user = {
    username: "mkibar",
    id: "1",
  };
  const handleMessage = (msg) => {
    console.log("handleMessage", msg);
  };

  // ekrandaki forma bilgi girişi testi
  test("blogs content create new post control", () => {
    // BlogItem bileşenini render et
    render(<Blogs handleMessage={handleMessage} user={user}></Blogs>);

    // "New Post" butonunu al
    const button = screen.getByText("New Post");
    //butona tıkla
    userEvent.click(button);

    const inputTitle = screen.getByPlaceholderText("Enter title");

    fireEvent.change(inputTitle, { target: { value: "testing a form..." } });

    const sendButton = screen.getByText("Create");
    userEvent.click(sendButton);

    expect(inputTitle.value).toBe("testing a form...");

    //const inputTitle = container.querySelector("#i.title");
    // const inputAuthor = container.querySelector("#i.author");
    // const inputUrl = container.querySelector("#i.url");
    // const sendButton = container.querySelector("#btn-create");

    //userEvent.type(inputTitle, "testing a form...");
    // userEvent.type(inputAuthor, "testing author");
    // userEvent.type(inputUrl, "testing url");
    // userEvent.click(sendButton);

    //expect(screen.queryByDisplayValue(inputTitle)).toBe("testing a form...");
    //expect(inputTitle).toBe("testing a form...");
    // expect(createBlogPost.mock.calls).toHaveLength(1);
    // expect(createBlogPost.mock.calls[0][0].content).toBe("testing a form...");
    // expect(createBlogPost.mock.calls[0][1].content).toBe("testing author");
  });
});
