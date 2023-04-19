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
  
  export default LogIn;
  