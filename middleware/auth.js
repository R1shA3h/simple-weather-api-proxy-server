const authenticate = (req, res, next) => {
    const authHeader = req.headers['authorization'];
  
    // Check if Authorization header is present
    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: 'Authorization header is missing',
      });
    }
  
    // Decode credentials from the Authorization header
    const base64Credentials = authHeader.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [username, password] = credentials.split(':');
  
    // Validate credentials against environment variables
    if (
      username === process.env.PROXY_AUTH_USERNAME &&
      password === process.env.PROXY_AUTH_PASSWORD
    ) {
      next(); // Proceed to the next middleware or route
    } else {
      return res.status(401).json({
        success: false,
        message: 'Invalid username or password',
      });
    }
  };
  
  module.exports = authenticate;
  