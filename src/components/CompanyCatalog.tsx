import Link from "next/link";
import Companycard from "./CompanyCard";

export default async function CarCatalog({companyJson}:{companyJson:Object}){
    const companyJsonReady = await companyJson    
    return(
        <>
        Explore {companyJsonReady.count} models in our catalog
        
        <div style={{margin:"20px",display:"flex",
                flexDirection:"row",alignContent:"space-around",
                justifyContent:"space-around",flexWrap:"wrap"
            }}>

{
                    companyJsonReady.data.map((companyItem:Object)=>(
                        <Link href={`/company/${companyItem.id}`}
                        className="w-1/5">
                        <Companycard companyName={companyItem.name} imgSrc={"/img.jpg"}/>
                        </Link>
                    
                    ))

               }
                
               
            </div>
        
        </>
    )
}