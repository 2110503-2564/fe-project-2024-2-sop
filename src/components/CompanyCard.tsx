import styles from './productcard.module.css';
import Image from 'next/image';
import InteractiveCard from './InteractiveCard';

export default function CompanyCard ({companyName , imgSrc }:{companyName:string,imgSrc:string}) {
    return (
        <InteractiveCard contentName={companyName}>
            <div className="w-full h-[70%] relative rounded-t-lg">
                 <Image src={imgSrc}
                alt='Company Picture'
                fill={true}
                sizes="(max-width: 768px) 100vw, 500px"
                className='object-cover rounded-t-lg'/>
            </div>
            <div className="w-full h-[15%] p-[10px]">
                {companyName}
            </div>
        </InteractiveCard>
    );
}
