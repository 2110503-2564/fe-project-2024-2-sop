export const convertGoogleDriveUrl = (driveUrl: string): string => {
    if (driveUrl.includes("drive.google.com/file/d/")) {
      const fileId = driveUrl.split("/file/d/")[1].split("/")[0];
      return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`;
    }
    if (driveUrl.includes("id=")) {
      const fileId = driveUrl.split("id=")[1].split("&")[0];
      return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`;
    }
    return driveUrl;
  };
  
  export const getAlternativeImageUrl = (url: string): string => {
    const fileId = url.includes("id=") ? url.split("id=")[1].split("&")[0] : "";
    return fileId ? `https://lh3.googleusercontent.com/d/${fileId}` : "";
  };
  