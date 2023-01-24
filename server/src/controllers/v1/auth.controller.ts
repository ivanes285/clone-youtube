import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../../models/User";
import bcrypt from "bcrypt";
import IError from "../../interfaces/IError";

 const googleGitAuth = async (req:Request, res:Response) => {
    try {
      const {email}= req.body;
      if (!email) {
        throw { code: 400, message: "Email is required and it was not found ,try to Verify your Google Account" };
      }
      const user = await User.findOne({email});
      if (user) {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!);
        res.cookie('token', token, { httpOnly: true })
        res.status(200).json(user);
      } else {
        const { password } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        const newUser = new User({...req.body, password: hashPassword});
        const savedUser = await newUser.save();
        const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET!);
        res.cookie('token', token, { httpOnly: true })
        res.status(200).json(user);
      }
    } catch (error ) {
      const typedError = error as IError;
     res.status(typedError.code).json({ message: typedError.message });
    }
  };

  export {googleGitAuth };
