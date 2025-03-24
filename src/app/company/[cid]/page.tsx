import Image from "next/image"
import getCompany from "@/libs/getCompany"
import { Link } from "@mui/material"
export default  async function  CompanyDetailPage({params}:{params:{cid:string}}){
    

    const CompanyDetail = await getCompany(params.cid)
    
    return(
        <main className="text-center p-5">
            <h1 className="text-lg font-medium">{CompanyDetail.data.name}</h1>
            <div className=" flex flex-row my-5">
                <Image src={CompanyDetail.data.company_picture} 
                    alt ='Company Picture'
                    width={0} height={0} sizes="100vw"
                    className="rounded-lg w-[30%] bg-black"
                />
                <div  className="text-md mx-5 text-left">{CompanyDetail.data.description}
                    <div>Business Type : {CompanyDetail.data.business_type}</div>
                    <div>Website : {CompanyDetail.data.website}</div>
                    <div>Email : {CompanyDetail.data.email}</div>
                    <div>Company Size : {CompanyDetail.data.company_size}</div>
                    <div>Address : {CompanyDetail.data.address} , {CompanyDetail.data.district}
                    {CompanyDetail.data.province} {CompanyDetail.data.country}
                    {CompanyDetail.data.postalcode}</div>
{/* 
                <Link href={`/reservations?id=${params.cid}&model=${CompanyDetail.data.model}`}>
                
                <button className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 shadow-sm text-white">
                Make Reservation
                </button>
                

                </Link> */}



                </div>
            </div>
           
        </main>

    )
}

export async function generateStaticParams(){
    return [{cid:'001'},{cid:'002'},{cid:'003'},{cid:'004'}]
}