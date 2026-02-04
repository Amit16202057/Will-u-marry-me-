// api/logs.js
export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only accept POST requests for logging
  if (req.method === 'POST') {
    try {
      const logData = req.body;
      const timestamp = new Date().toISOString();
      
      // Add server-side timestamp
      logData.serverTimestamp = timestamp;
      logData.ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
      
      // Log to console (will appear in Vercel logs)
      console.log('💖 Proposal Log:', JSON.stringify(logData, null, 2));
      
      // In production, you could save to a database here
      // For now, we'll just return success
      
      return res.status(200).json({
        success: true,
        message: 'Log received',
        data: logData
      });
    } catch (error) {
      console.error('Error processing log:', error);
      return res.status(500).json({ 
        success: false, 
        error: error.message 
      });
    }
  }
  
  // GET request to retrieve logs (for admin viewing)
  if (req.method === 'GET') {
    try {
      // This is a simple in-memory store
      // In production, use a database like MongoDB, PostgreSQL, etc.
      
      return res.status(200).json({
        success: true,
        message: 'Log retrieval endpoint',
        note: 'In production, implement database storage here'
      });
    } catch (error) {
      console.error('Error retrieving logs:', error);
      return res.status(500).json({ 
        success: false, 
        error: error.message 
      });
    }
  }

  // Method not allowed
  return res.status(405).json({ 
    success: false, 
    error: 'Method not allowed' 
  });
}