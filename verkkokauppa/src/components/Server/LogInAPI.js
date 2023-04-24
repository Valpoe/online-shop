/*
const LogIn = async (credentials) => {
    const response = await fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    });
  
    if (!response.ok) {
      throw new Error('Kirjautuminen epäonnistui');
    }
  
    const data = await response.json();
    return data;
  };
  
  export default logIn;
*/
  export const logIn = async (loginData) => {
    //console.log("login apissa")
    console.log(JSON.stringify(loginData))
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
      });
      const data = await response.json();
      return data;
    } catch (error) {
      //console.log("login apissa");
     console.log(JSON.stringify(error));
     return { success: false, message: "Invalid credentials" };
    }
  };


 