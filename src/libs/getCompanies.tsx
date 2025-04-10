export default async function getCompanies(){
    await new Promise((resolve)=>setTimeout(resolve,300))
    
    const response = await fetch("https://sop-job-fair-backend.vercel.app/api/v1/companies")
    if(!response.ok){
        throw new Error("Failed to fetch companies")
    }

    return await response.json()
}