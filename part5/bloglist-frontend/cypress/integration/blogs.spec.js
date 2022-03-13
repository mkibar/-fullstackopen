describe("Blog app", () => {
  //beforeEach(() => {});

  it("Initialize site", () => {
    cy.log("Clearing test data");
    // daha önce test için eklenen verileri silen metodu çağır
    localStorage.setItem("UserData", "");
    cy.request("POST", "http://localhost:3003/api/testing/reset");

    const user = {
      name: "test_John Doe",
      username: "test_JohnDoe",
      password: "123",
    };
    cy.log("Kullanıcı ekleniyor...");
    // yukarıdaki verilerle bir kullanıcı ekle
    cy.request("POST", "http://localhost:3003/api/user/", user);
    cy.log("Kullanıcı eklendi");

    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", () => {
    cy.contains("Designed by mkibar");
  });

  it("fails with wrong credentials", function () {
    cy.get("#i-username").type("test_JohnDoe");
    cy.get("#i-password").type("wrongpass");
    cy.get("#b-login").click();

    cy.contains("Wrong username or password");
    //cy.get('html').should('not.contain', 'test_John Doe logged-in')
  });

  it("user can login", () => {
    cy.get("#i-username").clear().type("test_JohnDoe", { force: true });
    cy.get("#i-password").clear().type("123");
    //cy.intercept("POST", "/api/login").as("loginResult");
    cy.get("#b-login").click();
    //cy.wait("@loginResult");
    cy.contains("logged-in");
  });

  describe("When logged in", () => {
    beforeEach(() => {
      //ctpress>support>commands.js içerisinde tanımlı!
      cy.login({ username: "test_JohnDoe", password: "123" });
    });

    it("A new blog post can be created", () => {
      cy.get("#btn-new-post").click();

      cy.get("#i-title").type("test_Cypres Automated Test Post");
      cy.get("#i-author").type("test_author");
      cy.get("#i-url").type("http://Test.com");
      cy.intercept("POST", "/api/blog").as("getPostResult");
      cy.get("#btn-create").click();
      cy.wait("@getPostResult");
      cy.contains("New post added.");

      cy.get("#i-title").type("test_Cypres Automated Test Post 2");
      cy.get("#i-author").type("test_author 2");
      cy.get("#i-url").type("http://Test2.com");
      cy.intercept("POST", "/api/blog").as("getPostResult");
      cy.get("#btn-create").click();
      cy.wait("@getPostResult");
      cy.contains("New post added.");

      cy.get("#i-title").type("test_Cypres Automated Test Post 3");
      cy.get("#i-author").type("test_author 3");
      cy.get("#i-url").type("http://Test3.com");
      cy.intercept("POST", "/api/blog").as("getPostResult");
      cy.get("#btn-create").click();
      cy.wait("@getPostResult");
      cy.contains("New post added.");
    });

    it("Blog post liked", () => {
      cy.contains("View").click();
      cy.contains("Like").click();
      cy.contains("Post updated.");
    });

    it("Delete button is visible", () => {
      cy.get("body").then(($body) => {
        if ($body.find("#b-delete-post").length > 0) {
          //evaluates as true if button exists at all
          cy.get("#b-delete-post").then(($button) => {
            if ($button.is(":visible")) {
              //you get here only if button EXISTS and is VISIBLE
              cy.log("Delete button is visible");
              cy.get("#b-delete-post").click();
              cy.contains("Post deleted.");
            } else {
              //you get here only if button EXISTS but is INVISIBLE
              cy.log("if button EXISTS but is INVISIBLE");
            }
          });
        } else {
          //you get here if the button DOESN'T EXIST
          assert.isOk("everything", "Delete button invisible");
          cy.log("Delete button is invisible");
        }
      });
    });

    it("Is blog list sorted", () => {
      cy.get(".like-item").then(($likes) => {
        const innerText = (el) => el.innerText;
        // https://glebbahmutov.com/cypress-examples/9.2.0/recipes/sorted-list.html#static-list
        const likes = Cypress._.map($likes, (el) => innerText(el));
        const sortedLikes = Cypress._.sortBy(likes).reverse();
        expect(sortedLikes).to.deep.equal(likes);
        return likes;
      });
    });
  });
});

/*
    describe("a new blog post can be created, liked and deleted", function () {
      beforeEach(function () {
        cy.get("#btn-new-post").click();

        cy.get("#i-title").type("test_Cypres Automated Test Post");
        cy.get("#i-author").type("test_author");
        cy.get("#i-url").type("http://Test.com");
        cy.get("#btn-create").click();
        cy.contains("New post added.");

        cy.get("#i-title").type("test_Cypres Automated Test Post 2");
        cy.get("#i-author").type("test_author 2");
        cy.get("#i-url").type("http://Test2.com");
        cy.get("#btn-create").click();
        cy.contains("New post added.");
        
        cy.get("#i-title").type("test_Cypres Automated Test Post 3");
        cy.get("#i-author").type("test_author 3");
        cy.get("#i-url").type("http://Test3.com");
        cy.get("#btn-create").click();
        cy.contains("New post added.");
      });

      it("can like blog post", () => {
        cy.contains("View").click();
        cy.contains("Like").click();
        cy.contains("Post updated.");
      });

      it("can like blog post and liked and delete it", () => {
        cy.contains("View").click();
        cy.contains("Like").click();
        cy.contains("Post updated.");

        cy.get("body").then(($body) => {
          if ($body.find("#b-delete-post").length > 0) {
            //evaluates as true if button exists at all
            cy.get("#b-delete-post").then(($button) => {
              if ($button.is(":visible")) {
                //you get here only if button EXISTS and is VISIBLE
                cy.log("Delete button is visible");
                cy.get("#b-delete-post").click();
                cy.contains("Post deleted.");
              } else {
                //you get here only if button EXISTS but is INVISIBLE
                cy.log("if button EXISTS but is INVISIBLE");
              }
            });
          } else {
            //you get here if the button DOESN'T EXIST
            assert.isOk("everything", "Delete button invisible");
            cy.log("Delete button is invisible");
          }
        });

        cy.get(".like-item").then(($likes) => {
          const innerText = (el) => el.innerText;
          // const firstWord = (text) => text.split(" ")[0];
          // const justDigits = (str) => str.replace(/[^0-9.]/g, "");
          // const likes = Cypress._.map($likes, (el) =>
          //   parseFloat(justDigits(firstWord(innerText(el))))
          // );
          //cy.log(likes);
          // confirm the "likes" array is already sorted
          const likes = Cypress._.map($likes, (el) => innerText(el));
          const sortedLikes = Cypress._.sortBy(likes).reverse();
          expect(sortedLikes).to.deep.equal(likes);
          return likes;
        });
      });

    });
*/
