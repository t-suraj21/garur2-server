import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
  console.log('Auth middleware - Request received');
  console.log('Headers:', req.headers);
  
  try {
    // Get token from header
    const token = req.header('Authorization')?.replace('Bearer ', '');
    console.log('Token received:', token ? 'Yes' : 'No');

    if (!token) {
      console.log('No token provided');
      return res.status(401).json({
        success: false,
        message: 'No authentication token, access denied',
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Token decoded successfully. User ID:', decoded.id);
    
    // Set user ID in the request
    req.user = {
      _id: decoded.id || decoded._id // Handle both formats
    };
    
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(401).json({
      success: false,
      message: 'Token is not valid',
    });
  }
};

export default auth; 