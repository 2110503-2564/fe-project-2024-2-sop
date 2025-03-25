import { useState, useEffect } from 'react';
import Image from 'next/image';
import { User } from '@/libs/interfaces';

export default function UserCard({ UserProfile, onUpdateUser }: { 
  UserProfile: User; 
  onUpdateUser: (data: { name?: string; email?: string; tel?: string }) => Promise<void> 
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: UserProfile.data.name,
    email: UserProfile.data.email,
    tel: UserProfile.data.tel,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Sync form data when UserProfile changes
  useEffect(() => {
    setFormData({
      name: UserProfile.data.name,
      email: UserProfile.data.email,
      tel: UserProfile.data.tel,
    });
  }, [UserProfile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    
    try {
      await onUpdateUser(formData);
      setIsEditing(false);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to update profile');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!UserProfile) {
    return <div className="text-center p-5 text-gray-600">User not found</div>;
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-center">
        <Image
          src={"https://lh3.googleusercontent.com/d/1QGpQrJxHVTsxNikeNaqwwBySvrVaV_yC=w500"}
          alt="User Picture"
          width={128}
          height={128}
          className="object-cover rounded-full shadow-md"
          priority
        />
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          {error && (
            <div className="p-2 text-red-600 bg-red-100 rounded-md">
              {error}
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}    
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Tel</label>
            <input
              type="tel"
              name="tel"
              value={formData.tel}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => {
                setIsEditing(false);
                setError(null);
              }}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      ) : (
        <div className="text-center mt-4">
          <h2 className="text-xl font-semibold text-gray-800">{UserProfile.data.name}</h2>
          <p className="text-gray-600">Email: {UserProfile.data.email}</p>
          <p className="text-gray-600">Tel: {UserProfile.data.tel}</p>
          <span className="px-4 py-1 mt-2 inline-block bg-blue-100 text-blue-600 rounded-full text-sm">
            {UserProfile.data.role}
          </span>
          <button
            onClick={() => setIsEditing(true)}
            className="mt-4 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
}