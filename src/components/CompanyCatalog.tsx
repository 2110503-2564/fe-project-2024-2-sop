import Link from "next/link";
import CompanyCard from "./CompanyCard";
import { CompanyCatalogProps } from "@/libs/interfaces";



export default function CompanyCatalog({ companyJson, selectedSize }: CompanyCatalogProps) {
    
    const filteredCompanies =
        selectedSize === "All"
            ? companyJson.data
            : companyJson.data.filter((company) => company.company_size === selectedSize);

    return (
        <>
            <p className="text-gray-800 font-semibold text-lg">
                Explore {filteredCompanies.length} companies in our JobFair
            </p>

            <div className="flex flex-wrap flex-col justify-around m-5">
                {filteredCompanies.map((companyItem) => (
                    <Link href={`/company/${companyItem._id}`} key={companyItem._id} className="flex items-center justify-center my-5 ">
                        <CompanyCard companyName={companyItem.name} imgSrc={companyItem.company_picture} description={companyItem.description}
                        businessType={companyItem.business_type} />
                    </Link>
                ))}
            </div>
        </>
    );
}
