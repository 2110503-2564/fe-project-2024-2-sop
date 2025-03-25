import Image from "next/image";
import InteractiveCard from "./InteractiveCard";

export default function CompanyCard({
  companyName,
  imgSrc,
  description,
  
  businessType,
  
}: {
  companyName: string;
  imgSrc: string;
  description: string;
  
  businessType: string;
 
}) {
  return (
    <InteractiveCard>
      <div className="w-full h-[250px] flex bg-white rounded-lg shadow-lg overflow-hidden p-5">
        
        <div className="w-2/5 h-full flex items-center justify-center">
          <div className="w-[90%] h-[90%] relative rounded-lg overflow-hidden">
          <Image
              src={imgSrc}
              alt="Company Picture"
              width={180}  
              height={180}
              className="object-cover rounded-lg"
            />
          </div>
        </div>

        
        <div className="w-3/5 py-10    block">
          <h2 className="text-xl font-semibold">{companyName}</h2>
          <p className="text-sm text-gray-600 mt-2">{description}{description}</p>
          <p className="text-sm text-gray-800 mt-2">{businessType}</p>
          
        </div>
      </div>
    </InteractiveCard>
  );
}
