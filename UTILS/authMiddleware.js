import jwt from 'jsonwebtoken'


export const headerAuth = (req,res,next)=>{
    const header = req.headers['authorization']
    if(!header|| !header.startsWith('Bearer')) {
        return res.status(401).json({msg: 'No Token Provided'})     
}
    const token = header.split(' ')[1]

    try{
        const decodedToken = jwt.verify( token, process.env.JWT_ACCESS_SECRET)
        req.user = decodedToken
        next()
    }
    catch(error){
        return res.status(401).json({msg: 'Unauthorized'})
    }

}