import jwt from 'jsonwebtoken';

async function validationAdmin(req, res, next) {

    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Get token from Authorization header

    if (!token) {
        return res.json({ message: "You need to login first...", success: false });
    }

    try {
        const data = await new Promise((resolve, reject) => {
            jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
                if (err) {
                    return reject(err);
                }
                resolve(decoded);
            });
        });
        req.user = data; // Attach user data to request
        next(); // Call next middleware if verification is successful
    } catch (err) {
        return res.json({ message: "Token is invalid or expired", success: false });
    }
}

export default validationAdmin;
