const allowedTo = (...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.role)){
            return res.status(403).json({ status: 'error', message: 'Forbidden' });
        }
        
        next()
    }
}


export {allowedTo};