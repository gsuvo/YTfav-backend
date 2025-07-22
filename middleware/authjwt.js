const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(400).json({ message: 'Invalid token.' });
        req.user = { id: decoded.id };
        next();
    });
}