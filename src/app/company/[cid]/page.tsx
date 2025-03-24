import Image from "next/image";
import getCompany from "@/libs/getCompany";

export default async function CompanyDetailPage({ params }: { params: { cid: string } }) {
    const CompanyDetail = await getCompany(params.cid);

    return (
        <main className="text-center p-5 min-h-screen bg-gray-100">
            <h1 className="text-3xl font-bold text-gray-800">{CompanyDetail.data.name}</h1>

            <div className="grid md:grid-cols-3 gap-6 bg-white p-6 rounded-lg shadow-md mt-6">
                
                <div className="col-span-1 flex justify-center">
                    <Image
                        src={CompanyDetail.data.company_picture}
                        alt="Company Picture"
                        width={200}
                        height={200}
                        className="rounded-lg shadow-md"
                    />
                </div>

                
                <div className="col-span-2 text-left text-gray-700">
                    <p className="mb-2"><strong>Business Type:</strong> {CompanyDetail.data.business_type}</p>
                    <p className="mb-2"><strong>Website:</strong> {CompanyDetail.data.website}</p>
                    <p className="mb-2"><strong>Email:</strong> {CompanyDetail.data.email}</p>
                    <p className="mb-2"><strong>Company Size:</strong> {CompanyDetail.data.company_size}</p>
                    <p className="mb-2"><strong>Address:</strong> {CompanyDetail.data.address}, {CompanyDetail.data.district}, {CompanyDetail.data.province}, {CompanyDetail.data.country}, {CompanyDetail.data.postalcode}</p>
                </div>
            </div>
        </main>
    );
}
