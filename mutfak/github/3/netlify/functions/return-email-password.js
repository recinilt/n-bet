// Netlify Function: return-email-password.js
exports.handler = async (event) => {
    // Parse the incoming data from the request body
    if (event.httpMethod === 'POST') {
      try {
        const { email, password } = JSON.parse(event.body);
  
        // Validate input
        if (!email || !password) {
          return {
            statusCode: 400,
            body: JSON.stringify({ message: 'Email and password are required.' }),
          };
        }
  
        // Return the email and password
        return {
          statusCode: 200,
          body: JSON.stringify({
            message: `Şu kişinin epostası: ${email}, şifresi: ${password}`,
          }),
        };
      } catch (error) {
        return {
          statusCode: 500,
          body: JSON.stringify({ message: 'Error parsing request body.' }),
        };
      }
    }
  
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method not allowed. Use POST.' }),
    };
  };
  