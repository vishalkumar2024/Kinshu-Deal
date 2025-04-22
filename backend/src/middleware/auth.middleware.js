import jwt from 'jsonwebtoken';

const authenticate = async (req, res, next) => {
    const { token } = req.params;
    const tkn = token.replace(/^["']|["']$/g, '');

    console.log(typeof token)
    if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }
    try {
        const decoded = jwt.verify(tkn, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        console.error('Token verification error:', error.message);
        res.status(400).json({ error: 'Invalid token.' });
    }
};

export default authenticate;