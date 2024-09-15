import mongoose from "mongoose"


const studentSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    Cohort: {
        type : String, 
        unique: true,
    },
    Course:{
        type: String,
        required: true,
    },
        
    StudentNumber: {
        type: Number,
        unique: true,
    },
    
    tutor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "tutorModel"
    }

}, {timestamps: true})

const studentModel = mongoose.model("studentModel", studentSchema)



export default studentModel;