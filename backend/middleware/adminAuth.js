import jwt from 'jsonwebtoken'

const adminAuth = async(req, res ,next)=>{
    try {
        const {token} = req.headers
        if(!token){
            return res.json({success:false , messege : " Not Authorized Login Again"})
        }
        const token_decode = jwt.verify(token , process.env.JWT_SECRET)
        if (!token_decode) {
              return res.json({success:false , messege : " Not Authorized Login Again"})
        }
        next()
    } catch (error) {
        console.log(error);
        res.json({success: false , messege : error.messege})
        
    }
}

export default adminAuth