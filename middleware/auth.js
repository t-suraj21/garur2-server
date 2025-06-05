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
      id: decoded.id || decoded.userId // Handle both formats
    };
    
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token has expired. Please login again.',
        code: 'TOKEN_EXPIRED'
      });
    }
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Invalid token. Please login again.',
        code: 'INVALID_TOKEN'
      });
    }

    res.status(401).json({
      success: false,
      message: 'Authentication failed',
      code: 'AUTH_FAILED'
    });
  }
};

export default auth; 