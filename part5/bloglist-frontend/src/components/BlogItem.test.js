import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogItem from "./BlogItem";

describe("<BlogItem />", () => {
  let container;
  const blog = {
    id: 1,
    title: "Blog Test - title",
    author: "Blog Test - author",
    url: "http://blogtest.com",
    likes: 13322,
    user: 1,
  };
  const user = {
    id: 1,
  };
  const setBlogItem = (blg) => {
    console.log(blg);
  };
  const deleteBlogItem = (blg) => {
    console.log(blg);
  };

  beforeEach(() => {
    // BlogItem bileşenini render et
    container = render(
      <BlogItem
        key={blog.id}
        blog={blog}
        setBlogItem={setBlogItem}
        deleteBlogItem={deleteBlogItem}
        user={user}
      >
      </BlogItem>
    ).container;
  });

  // ekrandaki iki nesnenin görünmediğini kontrol et
  test("blogitem content item default not visible control", () => {
    // component render edildiğinde "http://blogtest.com" ifadesini ara
    const elementUrl = screen.getByText("http://blogtest.com");
    // görülemiyor olması lazım
    expect(elementUrl).not.toBeVisible();

    // component render edildiğinde "13322" ifadesini ara
    const elementLike = screen.getByText("13322");
    // görülemiyor olması lazım
    expect(elementLike).not.toBeVisible();
  });

  // ekrandaki "View" butonuna tıklanınca iki elementin göründüğünü test et
  test("blogitem content button view clicked item visible control", () => {
    // view butonunu al
    const button = screen.getByText("View");
    //bıtona tıkla
    userEvent.click(button);

    // ekranda gösterilen verilerin içerisinde "http://blogtest.com" ara
    const elementUrl = screen.getByText("http://blogtest.com");
    // görünür halde mi?
    expect(elementUrl).toBeVisible();

    const elementLike = screen.getByText("13322");
    expect(elementLike).toBeVisible();
  });

  // ekrandaki "View" butonuna iki defa tıkla ve sonucu test et
  test("blogitem content button click visible and hide child item control", () => {
    // içerisinde View yazan nesneyi bul
    const button = screen.getByText("View");
    // (nesne bir buton) ve bu nesneye tıkla
    userEvent.click(button);

    // içerisinde Hide yazan nesneyi bul
    const closeButton = screen.getByText("Hide");
    // (nesne bir buton) ve bu nesneye tıkla
    userEvent.click(closeButton);

    // yukarıdaki işlemleri yaptıktan sonra .togglableContent sınıfının bulunduğu elmenti ara
    const div = container.querySelector(".togglableContent");
    // elementin style özelliğinde "display: none" yazıyor olması lazım
    expect(div).toHaveStyle("display: none");
  });

  // ekrandaki "Lİke" butonuna iki defa tıkla ve sonucu test et
  test("blogitem content like button to twice click control", () => {
    // içerisinde View yazan nesneyi bul
    const button = screen.getByText("View");
    // (nesne bir buton) ve bu nesneye tıkla
    userEvent.click(button);

    // içerisinde Like yazan nesneyi bul
    const likeButton = screen.getByText("Like");
    // (nesne bir buton) ve bu nesneye tıkla
    userEvent.click(likeButton);
    // (nesne bir buton) ve bu nesneye ikinci defa tıkla
    userEvent.click(likeButton);

    // yukarıdaki işlemleri yaptıktan sonra .like-item sınıfının bulunduğu elmenti ara
    const div = container.querySelector(".like-item");
    // elementin içeriğinde yazan like değerini kontrol et
    expect(div).toHaveTextContent(blog.likes);
  });
});
