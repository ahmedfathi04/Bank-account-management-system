import jwt from "jsonwebtoken"
import userModel from "../models/user.model.js";

const verifyToken = async (req,res,next)=>{
    const authHeader = req.headers['authorization'] || req.headers['Authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ status: 'error', message: 'Token missing or malformed' });
    }
    const token = authHeader.split(' ')[1]; // Get token that is after 'Base'

    if(!token) return res.status(401).json({ status: 'error', message: 'Unauthorized' });
    
    let currentUser = jwt.verify(token, 'JWT_SECRET_KEY')

    let currentUserInfo = await userModel.findById(currentUser.id)

    req.role = currentUserInfo.role;
    req.userId = currentUser.id;

    next()
}

export {verifyToken}
