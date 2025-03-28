import jwt from 'jsonwebtoken';

async function validationAdmin(req, res, next) {

    const token  = req.cookies.token
 
    
    if (!token) {
        return res.json({ message: "You need to login first...", success: false });
    }

    try {
        const data = await jwt.verify(token,process.env.JWT_SECRET,{complete:true})
        
        req.user = data.payload.id; // Attach user data to request
        next(); // Call next middleware if verification is successful
    } catch (err) {
        return res.json({ message: "Token is invalid or expired", success: false });
    }
}

export default validationAdmin;
