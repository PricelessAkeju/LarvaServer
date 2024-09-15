import tutorModel from "../MODELS/tutorModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";



export const getTutor = async (req, res) => {
    // logic to get tutor
    try {
      const tutor = await tutorModel.find();
      if (tutor.length === 0) {
        return res.status(200).json({ message: "tutor info is intact" });
      }
      return res.status(200).json(tutor);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };

  export const createTutor = async (req, res) => {
    // logic to create tutor
  
    try {
      const { name, password, phone, email, username } = req.body;
      const saltRounds = 10;
      const hashedPassword = bcrypt.hashSync(password, saltRounds);
      const newTutor = new tutorModel({
        name,
        password: hashedPassword,
        username,
        phone,
        email,
      });
      await newTutor.save();
      return res.status(200).json({
        message: "User Created",
        newTutor,
      });
    } catch (error) {
      return res.status(500).json({
        error: error.message,
      });
    }
};
// TUTOR LOGIN CONTROLLER
export const loginTutor = async (req, res) => {
    try {
      const { username, password } = req.body;
      const tutor = await tutorrModel.findOne({ username });
      if (!tutor)
        return res.status(404).json({ message: "Invalid Credentials" });
  
      const passwordCompare = await bcrypt.compare(password, tutor.password);
      console.log(passwordCompare);
      if (!passwordCompare) {
        return res.status(401).json({ message: "Invalid Credentials" });
      }
      // TO GENERATE  BACKGROUND ACCESS TOKEN INCASE OF LOGIN
      const accessToken = jwt.sign(
        {
          id: tutor._id,
        },
        process.env.JWT_ACCESS_SECRET,
        { expiresIn: process.env.EXPIRATION }
      );
      // res.cookie("accessToken", accessToken, { maxAge: 3600000 });
  
      // using req.header
  
      return res.status(200).json({ message: "Login Success", accessToken });
    } catch (error) {
      return res.status(500).json({
        error: error.message,
      });
    }
  };
// AUTHENTICATION STATUS CONTROLLER TO CONFIRM LOGIN

export const authStatus = async (req, res) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          Authenticated: false,
          message: "Invalid token",
        });
      }
      const tutor = await tutorModel.findOne({ _id: req.user.id });
      if (!tutor) {
        return res.status(401).json({
          Authenticated: false,
          message: "User not found",
        });
      }
      return res.status(200).json({
        Authenticated: true,
        message: "User authenticated",
        id: tutor._id,
        name: tutor.name,
        username: tutor.username,
      });
    } catch (error) {
      return res.status(500).json({
        error: error.message,
      });
    }
  };
  
  // AUTHENTICATION STATUS TO CONFIRM LOGIN END HERE

  export const updateTutor = async (req, res) => {
    // logic to updateTutor
  
    try {
      const { id } = req.params;
      const updatedUser = req.body;
      const user = await tutorModel.findByIdAndUpdate(id, updatedUser, {
        new: true,
      });
      if (!user) {
        res.status(404).json({ msg: "user not found" });
      }
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({
        error: error.message,
      });
    }
  };
  
  
  export const deleteTutor = async (req, res) => {
    // logic to delete tutor
    try {
      const { id } = req.params;
      const deletedUser = await tutorModel.findByIdAndDelete(id);
      if (!deletedUser) {
        res.status(404).json({ msg: "user not found" });
      }
      return res.status(200).json({ msg: "user deleted" });
    } catch (error) {
      return res.status(500).json({
        error: error.message,
      });
    }
  };
  
  
  // LOGOUT CONTROLLER
  
  export const logoutTutor = async (req, res) => {
    try{
      res.clearCookie("accessToken");
      return res.status(200).json({ message: "Logged Out" });
    }
    catch(error){
      return res.status(500).json({ message:'Logout failed', error: error.message });
    }
  };