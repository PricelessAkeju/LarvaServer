import studentModel from "../MODELS/studentModel.js"


export const getStudent = async (req, res) => {
    // logic to get tutor
    try {
      const student = await studentModel.find();
      if (student.length === 0) {
        return res.status(200).json({ message: "student info is intact" });
      }
      return res.status(200).json(tutor);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };

  export const createStudent = async (req, res) => {
    // logic to create student
  
    try {
      const { name, Cohort, Course, StudentNumber } = req.body;
     
      const newStudent = new studentModel({
        name,
        Cohort,
        Course,
        StudentNumber,
      });
      await newStudent.save();
      return res.status(200).json({
        message: "User Created",
        newStudent,
      });
    } catch (error) {
      return res.status(500).json({
        error: error.message,
      });
    }
};

export const updateStudent = async (req, res) => {
    // logic to updateStudent
  
    try {
      const { id } = req.params;
      const updatedUser = req.body;
      const user = await studentModel.findByIdAndUpdate(id, updatedUser, {
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