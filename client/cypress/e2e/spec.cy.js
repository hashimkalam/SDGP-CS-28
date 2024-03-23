describe("Home Page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });

  it('displays the all the images', () => {
    cy.get('img').should('have.length', 9)
  })

  it('displays the Navbar links', () => {
    cy.get('a').should('contain', 'HOME')
    cy.get('a').should('contain', 'HOW IT WORKS')
    cy.get('a').should('contain', 'PRICING')
    cy.get('a').should('contain', 'ABOUT US')
    cy.get('button').should('contain', 'LOGIN')
    cy.get('button').should('contain', 'SIGNUP')
  })

  it('displays the hero section content', () => {
    cy.get('h1').should('contain', 'Unleash Your Inner Architect')
    cy.get('p').should('contain', 'Build a space that reflects your unique style and needs, effortlessly with a description using elitebluprint')
  })

  it('displays the How It Works section content', () => {
    cy.get('p').should('contain','Master the Magic: Your Guide to Generating Perfect Floor Plans')
    cy.get('h3').should('contain','Input text description')
    cy.get('p').should('contain','Ditch the blueprints, grab your keyboard. EliteBluPrint turns your natural language vision into detailed floor plans. No jargon, no fuss, just pure imagination')
    cy.get('h3').should('contain','Generate plan')
    cy.get('p').should('contain','From Wishful Thinking to Stunning Renderings: Watch your dream unfold as EliteBluPrint weaves your words into a visual masterpiece.')
    cy.get('h3').should('contain','Connect with architects')
    cy.get('p').should('contain','Dont stop at the blueprints! Consult with seasoned professionals who refine your vision, ensure code compliance, and guide you from dream to reality.')
  })

  it('displays the Pricing section content', () => {
    cy.get('h1').should('contain', 'Simple And Affordable Pricing')
    cy.get('p').should('contain', 'Skip the subscriptions, say goodbye to recurring fees. Build your forever home with one-time access to unlimited floor plan generation.')
  })

  it("displays the footer section content", () => {
    cy.get("p").should(
      "contain",
      "Analyze the available space and develop efficient"
    );
    cy.get("p").should(
      "contain",
      "floor plans that maximize functionality, flow, and"
    );
    cy.get("p").should("contain", "utilization of the area.");

    cy.get("p").should("contain", "NO 435, Galle Road, Colombo 03, Sri Lanka");
    cy.get("p").should("contain", "(+94) 705-03-9527");

    // Assert the presence of the "FOLLOW US" heading
    cy.get("h1").should("contain", "FOLLOW US");

    // Assert the presence of individual social media links
    cy.get("p").should("contain", "Behance");
    cy.get("p").should("contain", "Facebook");
    cy.get("p").should("contain", "Twitter");
    cy.get("p").should("contain", "LinkedIn");
  });

});

//----------------------------------------------LOGIN--------------------------------------------

describe("Login Page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/login");
  });

  it("displays the all the images", () => {
    cy.get("img").should("have.length", 3);
  });

  it("displays login form", () => {
    const email = "example@example.com";
    cy.get('input[type="email"]').type(email);
    cy.get("h2").should("contain", "login");

    const password = "12312344";
    cy.get('input[type="password"]').type(password);
  });

  it('Clicks the "Login Now" button', () => {
    cy.contains("Login Now").click();
  });

  it('Clicks the "Sign in with Google" button', () => {
    cy.contains("Sign in with Google").click();
  });

  it("Clicks the Don't have an account? Sign Up button", () => {
    cy.contains("Sign Up").click();
  });
});

//----------------------------------------------SIGNUP--------------------------------------------

describe("Sign Up Page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/signup");
  });

  it("displays the all the images", () => {
    cy.get("img").should("have.length", 3);
  });

  it("displays signup form", () => {
    const username = "example";
    cy.get('input[placeholder="Username"]').type(username);

    const email = "example@example.com";
    cy.get('input[type="email"]').type(email);

    const password = "12312344";
    cy.get('input[type="password"]').type(password);

    cy.contains("Sign Up").click();
  });

  it('Clicks the "Sign in with Google" button', () => {
    cy.contains("Sign in with Google").click();
  });

  it("Clicks the Don't have an account? Sign Up button", () => {
  cy.contains("Log In").click();
  });

});

//----------------------------------------------ABOUT US--------------------------------------------

describe("About us testing", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/aboutus");
  });

  it("displays the all the images", () => {
    cy.get("img").should("have.length", 22);
  });

  it("displays the Navbar links", () => {
    cy.get("button").should("contain", "LOGIN");
    cy.get("button").should("contain", "SIGNUP");
  });

  it("displays the footer section content", () => {
    cy.get("p").should(
      "contain",
      "Analyze the available space and develop efficient"
    );
    cy.get("p").should(
      "contain",
      "floor plans that maximize functionality, flow, and"
    );
    cy.get("p").should("contain", "utilization of the area.");

    cy.get("p").should("contain", "NO 435, Galle Road, Colombo 03, Sri Lanka");
    cy.get("p").should("contain", "(+94) 705-03-9527");

    cy.get("h1").should("contain", "FOLLOW US");

    cy.get("p").should("contain", "Behance");
    cy.get("p").should("contain", "Facebook");
    cy.get("p").should("contain", "Twitter");
    cy.get("p").should("contain", "LinkedIn");

  });
});

//------------------------------------------------------------------------------------------
describe("forgot password", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/forgotpassword");
  });

  it("forgot password form", () => {
    cy.get("h1").should("contain", "Forgotten Password");
    cy.get("p").should(
      "contain",
      "Please Enter Your Email For The OTP Message To Be Sent"
    );

    const email = "example@example.com";
    cy.get('input[type="email"]').type(email);

    cy.contains("Next").click();
  });
});

//------------------------------------------------------------------------------------------
describe("reset password", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/resetpassword");
  });

  it("reset password form", () => {
    cy.get("h2").should("contain", "Reset Password");

    const password = "1234567";
    cy.get('input[placeholder="New Password"]').type(password);
    cy.get('input[placeholder="Confirm Password"]').type(password);

    cy.contains("Reset Password").click();

    cy.contains("Back to Login").click();
  });
});

//---------------------------------workspace navigate--------------

describe("user workspace navigate", () => {

  it("works space access", () => {

    cy.visit("http://localhost:5173/login");

    const email = "Inuser@gmail.com";
    cy.get('input[type="email"]').type(email);

    const password = "Inuser123";
    cy.get('input[type="password"]').type(password);

    cy.contains("Login Now").click();

    cy.url().should("include", "/workspace");

  });

});

//---------------------------------individual userprofile check--------------

describe("User profile navigate", () => {

  it("user profile access", () => {

    cy.visit("http://localhost:5173/login");

    const email = "Inuser@gmail.com";
    cy.get('input[type="email"]').type(email);

    const password = "Inuser123";
    cy.get('input[type="password"]').type(password);

    cy.contains("Login Now").click();

    cy.url().should("include", "/workspace");

    cy.visit("http://localhost:5173/userprofile");

  });

});

//---------------------------------architect dashboard / userprofile check--------------

describe("Architect profile navigate", () => {

  it("architect navigate profile", () => {

    cy.visit("http://localhost:5173/login");

    const email = "Aruser@gmail.com";
    cy.get('input[type="email"]').type(email);

    const password = "Aruser123";
    cy.get('input[type="password"]').type(password);

    cy.contains("Login Now").click();

    cy.url().should("include", "/workspace");

    cy.visit("http://localhost:5173/dashboard");

    cy.contains("My Profile").click();

  });

});


//---------------------------------architect panal check--------------

describe("architect panal test", () => {

  it("user logout", () => {

    cy.visit("http://localhost:5173/login");

    const email = "Inuser@gmail.com";
    cy.get('input[type="email"]').type(email);

    const password = "Inuser123";
    cy.get('input[type="password"]').type(password);

    cy.contains("Login Now").click();

    cy.url().should("include", "/workspace");

    cy.visit("http://localhost:5173/architectpanel");

  });

});

//---------------------------------book appointment check--------------

describe("book appointment", () => {

  it("user logout", () => {

    cy.visit("http://localhost:5173/login");

    const email = "Inuser@gmail.com";
    cy.get('input[type="email"]').type(email);

    const password = "Inuser123";
    cy.get('input[type="password"]').type(password);

    cy.contains("Login Now").click();

    cy.url().should("include", "/workspace");

    cy.visit("http://localhost:5173/architectpanel");

    cy.contains("Book an appointment to meet an architect").click();

  });

});

//---------------------------------individual user logout check--------------

describe("User log out check", () => {

  it("user logout", () => {

    cy.visit("http://localhost:5173/login");

    const email = "Inuser@gmail.com";
    cy.get('input[type="email"]').type(email);

    const password = "Inuser123";
    cy.get('input[type="password"]').type(password);

    cy.contains("Login Now").click();

    cy.url().should("include", "/workspace");

    cy.visit("http://localhost:5173/userprofile");

    cy.contains("log out").click();

  });

});
