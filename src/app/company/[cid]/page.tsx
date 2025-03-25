import SessionCatalogCID from "@/components/SessionCatalogCID";
import getCompany from "@/libs/getCompany";
import getSessions from "@/libs/getSessions";
import Image from "next/image";

export default async function CompanyDetailPage({ params }: { params: { cid: string } }) {
    const CompanyDetail = await getCompany(params.cid);
    const sessions = await getSessions();

    return (
        <main className="flex flex-col items-center p-5 min-h-screen bg-gray-100">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">{CompanyDetail.data.name}</h1>

            <div className="flex flex-col md:flex-row max-w-4xl w-full bg-white p-6 rounded-lg shadow-lg gap-6">
               
                <div className="w-full md:w-1/4 flex justify-center items-center">
                    <div className="relative w-full aspect-square max-w-[200px] rounded-lg overflow-hidden shadow-md">
                        <Image
                            src={CompanyDetail.data.company_picture}
                            alt="Company Picture"
                            fill
                            className="object-cover rounded-lg"
                        />
                    </div>
                </div>

                <div className="flex-1 text-left text-gray-700 p-4">
                    <p className="mb-2"><strong>Business Type:</strong> {CompanyDetail.data.business_type}</p>
                    <p className="mb-2"><strong>Description:</strong> {CompanyDetail.data.description}</p>
                    <p className="mb-2"><strong>Website:</strong> {CompanyDetail.data.website}</p>
                    <p className="mb-2"><strong>Email:</strong> {CompanyDetail.data.email}</p>
                    <p className="mb-2"><strong>Tel:</strong> {CompanyDetail.data.tel}</p>
                    <p className="mb-2"><strong>Company Size:</strong> {CompanyDetail.data.company_size}</p>
                    <p className="mb-2"><strong>Address:</strong> {CompanyDetail.data.address}, {CompanyDetail.data.district}, {CompanyDetail.data.province}, {CompanyDetail.data.country}, {CompanyDetail.data.postalcode}</p>
                </div>
            </div>

            
            <div className="mt-6 w-full lg:max-w-6xl xl:max-w-7xl">
                <SessionCatalogCID sessionJson={sessions} companyId={params.cid} />
            </div>
        </main>
    );
}
