const { Users } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const env = require("dotenv").config().parsed;

class AuthController {
  // async generateToken(payload) {
  generateToken = async (payload) => {
    const accessToken = jwt.sign(
      { userId: payload.id },
      env.JWT_ACCESS_TOKEN_SECRET,
      { expiresIn: env.JWT_ACCESS_TOKEN_EXPIRES_IN }
    );

    const refreshToken = jwt.sign(
      { userId: payload.id },
      env.JWT_REFRESH_TOKEN_SECRET,
      { expiresIn: env.JWT_REFRESH_TOKEN_EXPIRES_IN }
    );

    return { accessToken, refreshToken };
  };

  // async login(req, res) {
  login = async (req, res) => {
    try {
      const user = await Users.findOne({ where: { email: req.body.email } });

      if (!user) {
        return res.status(400).json({ message: "USER_NOT_FOUND" });
      }

      // Check if password is valid
      const isPasswordValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!isPasswordValid) {
        return res.status(400).json({ message: "INVALID_PASSWORD" });
      }

      // Generate token
      const { accessToken, refreshToken } = await this.generateToken(user);

      return res.status(200).json({
        message: "LOGIN_SUCCESS",
        accessToken: accessToken,
        refreshToken: refreshToken,
        user,
      });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };

  // async register(req, res) {
  register = async (req, res) => {
    try {
      const { nama, email, password } = req.body;

      // Check if email already exists
      const userExist = await Users.findOne({ where: { email: email } });
      if (userExist) {
        return res.status(400).json({ message: "EMAIL_ALREADY_EXISTS" });
      }

      // Create new user
      const user = await Users.create({
        nama: nama,
        email: email,
        password: bcrypt.hashSync(password, 10),
      });

      // Check if user created, kalau tidak ada maka return error
      if (!user) {
        return res.status(400).json({ message: "CREATE_USER_FAILED" });
      }

      // Generate token
      const { accessToken, refreshToken } = await this.generateToken(user);

      return res.status(200).json({
        message: "USER_CREATED",
        accessToken: accessToken,
        refreshToken: refreshToken,
        user,
      });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };

  //  create new token using refresh token
  refreshToken = async (req,res)=>{
    const refreshToken = req.body.refreshToken;
    if(!refreshToken){
      res.status(401).json({message:"REFRESH_TOKEN_REQUIRED"});
    }
  
    const verified = jwt.verify(refreshToken,env.JWT_REFRESH_TOKEN_SECRET);
   
    try {
      if(!verified){
        throw { message:"UNAUTHORIZED" };
      }
      const userId=verified.userId;
      const user = await Users.findOne({where:{id:userId}});
      if(!user){
        throw { message:"USER_NOT_FOUND" };
      }
      const { accessToken, refreshToken } = await this.generateToken(user);
      return res.status(200).json({accessToken,refreshToken});
    }catch(e){
      if (e.message == "invalid token") {
        e.message = "INVALID_TOKEN";
      } else if (e.message == "jwt expired") {
        e.message = "TOKEN_EXPIRED";
      }
      res.status(401).json({message:e.message});
    }
  }
}

module.exports = new AuthController();