
import Image from 'next/image';
import InteractiveCard from './InteractiveCard';
interface User {
    _id: string;
    name: string;
    email: string;
    role: string;
    token: string;
  }
export default function UserCard ({UserProfile}:{UserProfile:User}){
    // console.log("Yess",UserProfile)
    if (!UserProfile) {
        return <div className="text-center p-5">User not found</div>;
    }

    return (
        
        <div>
        <div className="w-full h-[70%] relative rounded-t-lg">
          <img
            src="https://lh3.googleusercontent.com/d/1QGpQrJxHVTsxNikeNaqwwBySvrVaV_yC=w500
"
            alt="User Picture"
            sizes="(max-width: 768px) 100vw, 500px"
            className="object-cover rounded-t-lg"
        
          />
        </div>
      
        <div className="w-full h-[15%] p-[10px]">
          {UserProfile.data.name}
        </div>
      </div>
      
          
           
            
       
    );
}