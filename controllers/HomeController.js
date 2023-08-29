const bcryptjs = require("bcryptjs");

const { connect } = require("../dbconfig");
const User = require('../models/User');
const { userResponseParser } = require("../parser/userResponseParser");
const { JWTController } = require("./JWTController");
const { UserController } = require("./UserController");

exports.HomeController = {
  async register(req, res) {
    await connect();

    let user = await UserController.getUserByEmail(req.body.email);

    if (user) {
      return res.render('error.twig', { 
          error: "User account already exists" 
      });
    }

    const hashedPassword = bcryptjs.hashSync(req.body.password, 10);

    user = await User.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: hashedPassword
    });

    const token = JWTController.createToken({email:user.email}, true);

    res.cookie("refresh_token", token.refresh_token, {
        expires: new Date(Date.now() + 30 * 24 * 360000),
        httpOnly: true,
    });

    res.render('pages/home', { 
      title: 'bienvenue sur le site',
        user: userResponseParser(user), 
        access_token: token.access_token 
    });
  },

  async login(req, res) {
    await connect();

    let user = await UserController.getUserByEmail(req.body.email);

    if (!user) {
      return res.render('error.twig', { 
          error: "Please register" 
      });
    }

    if (bcryptjs.compareSync(req.body.password, user.password)) {
        const token = JWTController.createToken({email:user.email}, true);

        res.cookie("refresh_token", token.refresh_token, {
            expires: new Date(Date.now() + 30 * 24 * 360000),
            httpOnly: true,
        });

        res.render('home.twig', { 
            user: userResponseParser(user), 
            access_token: token.access_token 
        });
    } else {
        res.render('error.twig', { 
            error: "Incorrect password" 
        });
    }
  },

  async logout(req, res) {
    res.clearCookie("refresh_token");
    res.render('home.twig', { 
        user: null, 
        access_token: null 
    });
  },

  async getHome(req, res) {
    // Vous pouvez passer des données à votre vue si nécessaire
    res.render('pages/home', { title: 'Bienvenue dans notre restaurant Food Paradise' });
  }


};
