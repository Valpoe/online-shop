const { logIn } = require('./LogInAPI');
//import { logIn } from "./LogInAPI";

describe('logIn function', () => {
    it('should return data on successful login', async () => {
      const loginData = { email: 'jarmo.jalkanen@gmail.com', password: '55' };
      const response = { json: jest.fn(() => Promise.resolve({ success: true })) };
      jest.spyOn(window, 'fetch').mockResolvedValue(response);
  
      const result = await logIn(loginData);
  
      expect(result).toEqual({ success: true });
      expect(window.fetch).toHaveBeenCalledWith('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData)
      });
    });
  /*
    it('should log error on failed login', async () => {
      const loginData = { email: 'jarmo.jalkanen@gmail.com', password: 'wrong-password' };
      const response = { json: jest.fn(() => Promise.resolve({ success: email, message: 'Invalid credentials' })) };
      jest.spyOn(window, 'fetch').mockResolvedValue(response);
      jest.spyOn(console, 'log');
  
      const result = await logIn(loginData);
  
      expect(result).toEqual({ success: false, message: 'Invalid credentials' });
      expect(window.fetch).toHaveBeenCalledWith('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData)
      });
      expect(console.log).toHaveBeenCalledWith(JSON.stringify({ success: false, message: 'Invalid credentials' }));
    });*/
    test('logIn with invalid credentials', async () => {
        const loginData = { email: 'jarmo.jalkanen@gmail.com', password: 'wrong-password' };
        const expectedResponse = { success: false, message: 'Invalid credentials' };
      
        fetch.mockResolvedValue({
          json: () => Promise.resolve(expectedResponse)
        });
      
        const response = await logIn(loginData);
      
        expect(response).toEqual(expectedResponse);
        expect(fetch).toHaveBeenCalledWith('http://localhost:5000/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(loginData)
        });
      });
  });