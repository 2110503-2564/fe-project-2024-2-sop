export async function getUserProfile(token: string) {
  try {
    console.log("Token being sent:", token);
    
    
    
    const response = await fetch("http://localhost:5000/api/v1/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to get user profile");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Profile fetch error:", error);
    return null;
  }
}
export default getUserProfile;