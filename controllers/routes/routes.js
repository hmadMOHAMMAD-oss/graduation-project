const express = require('express')
const controller = require('../controllers.js');
const router = express.Router();

router.get("/login", controller.homepage);
router.post('/login', controller.login);
  
  router.get("/profile", function (req, res) {
    const sessionCookie = req.cookies.session || "";
  
    admin
      .auth()
      .verifySessionCookie(sessionCookie, true /** checkRevoked */)
      .then((userData) => {
        console.log("Logged in:", userData.email)
        res.render("profile.html");
      })
      .catch((error) => {
        res.redirect("/login");
      });
  });
  
  router.get("/", function (req, res) {
    //if the user is logined in, redirect to the home page
            res.render("login.html");
  });
  
  router.post("/sessionLogin", (req, res) => {
    const idToken = req.body.idToken.toString();
  
    const expiresIn = 60 * 60 * 24 * 5 * 1000;
  
    admin
      .auth()
      .createSessionCookie(idToken, { expiresIn })
      .then(
        (sessionCookie) => {
          const options = { maxAge: expiresIn, httpOnly: true };
          res.cookie("session", sessionCookie, options);
          res.end(JSON.stringify({ status: "success" }));
        },
        (error) => {
          res.status(401).send("UNAUTHORIZED REQUEST!");
        }
      );
  });
  
  router.get("/sessionLogout", (req, res) => {
    res.clearCookie("session");
    res.redirect("/login");
  });