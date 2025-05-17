import jwt from 'jsonwebtoken'
import 'dotenv/config.js'

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']
    if(!token) return res.status(401).json({message: 'Authorization key is missing.'})

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decoded) => {
        if(error) return res.status(403).json({message: 'Invalid token.'})
        // console.log(decoded)
        next()
    })
}

export default verifyToken;
