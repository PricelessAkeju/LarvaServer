import {Router} from "express"
import { headerAuth } from "../UTILS/authMiddleware.js"
import { createTutor, deleteTutor, getTutor, loginTutor, logoutTutor, updateTutor } from "../CONTROLLERS/tutorController.js"


const router = Router()


router.get('/tutor', getTutor)
router.post('/tutor', createTutor)
router.put('/tutor/:id', updateTutor)
router.delete('/tutor/:id', deleteTutor)
router.post('/login',loginTutor)
router.get('/status', headerAuth, authStatus)
router.get('/logout',logoutTutor)

export default router;