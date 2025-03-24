
import styles from './productcard.module.css';
import Image from 'next/image';
import InteractiveCard from './InteractiveCard';

export default function Productcard ({companyName , imgSrc }:{companyName:string,imgSrc:string}){


    return (
        <InteractiveCard contentName={companyName}>
        
            <div className="w-full h-[70%] relative rounded-t-lg">
                 <Image src={imgSrc}
                alt = 'Product Picture'
                fill = {true}
                className='object-cover rounded-t-lg'/>

            </div>
           
           <div className="w-full h-[15%] p-[10px]">
            {companyName}
           </div>
            
           
            
        </InteractiveCard>
    );
}