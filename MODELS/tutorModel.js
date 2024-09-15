import mongoose from "mongoose";


const tutorSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type : String, 
        unique: true,
    },
    email:{
        type: String,
        unique: true,
    },
        
   phone: {
        type: Number,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    student: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "studentModel"
    }]

}, {timestamps: true})

const tutorModel = mongoose.model("tutorModel", tutorSchema)


export default tutorModel;