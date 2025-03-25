import { convertGoogleDriveUrl } from "@/libs/googleDrive";

interface UserProfile {
  name: string;
  email: string;
  tel: string;
  role: string;
  affiliate: string | null;
  imageUrl: string;
  createdAt: string;
}

export const fetchUserProfile = async (token: string): Promise<UserProfile> => {
  const response = await fetch("https://sop-job-fair-backend.vercel.app/api/v1/auth/me", {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) throw new Error("Failed to fetch profile");

  const data = await response.json();


  return {
    name: data?.data?.name || "",
    email: data?.data?.email || "",
    tel: data?.data?.tel || "",
    role: data?.data?.role || "user",
    affiliate: data?.data?.affiliate || null,
    imageUrl: data?.data?.image ? convertGoogleDriveUrl(data.data.image) : "", // Use the converted image URL
    createdAt: data?.data?.createdAt || "",
  };
};
