// Netlify Function: return-email-password.js
exports.handler = async (event) => {
    // Parse the incoming data from the request body
    const mymytoken = process.env.GITHUB_TOKEN;
    const REPO_NAME = 'githubgiriskaytit'; // Example repository name
    const BASE_URL = `https://api.github.com/repos/recinilt/${REPO_NAME}/contents/`;

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
          
          try {
            const response = await fetch(url, {
              method: 'PUT',
              headers: {
                Authorization: `token ${mymytoken}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                message: `Create user file for ${username}`,
                content,
              }),
            });
    
            if (response.ok) {
              //alert('Kayıt başarılı!');
              //registerContainer.classList.add('hidden');
              //authContainer.classList.remove('hidden');
            } else {
              //const errorData = await response.json();
              // alert(`Hata: ${errorData.message}`);
            }
          } catch (error) {
            console.error('Error:', error);
            alert('Bir hata oluştu!');
          }
        
          // Return the email and password
          return {
            statusCode: 200,
            body: JSON.stringify({
              message: `Şu kişinin epostası: ${email}, şifresi: ${mymytoken}`,
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
  
  