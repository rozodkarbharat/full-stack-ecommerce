var jwt = require("jsonwebtoken");

const userModel = require("../model/user.model");

const Authentication = (req, res, next) => {
  try {
    const token = req.headers.token.split(" ")[1];
    jwt.verify(token, "secret", async function (err, decoded) {
      if (err) {
        res.send("Please login");
      } else {
        const logindata = await userModel.findOne({
          username: decoded.username,
        });

        if (logindata) {
          req.body.username = logindata.username;
          next();
        } else {
          res.status(401).send("Please login");
        }
      }
    });
  } catch (err) {
    res.status(500).send("server error");
  }
};
module.exports = Authentication;
