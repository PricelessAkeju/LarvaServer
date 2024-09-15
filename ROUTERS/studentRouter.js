import {Router} from "express"
import { createStudent, getStudent, updateStudent } from "../CONTROLLERS/studentController"


const router = Router()

router.get('/student', getStudent)
router.post('/student', createStudent)
router.put('/student/:id', updateStudent)
export default router;