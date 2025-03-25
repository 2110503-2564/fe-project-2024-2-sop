export async function userLogIn(email: string, password: string) {
    try {
      const response = await fetch('https://sop-job-fair-backend.vercel.app/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
  
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to login');
      }
      
      return data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
}
export default userLogIn;